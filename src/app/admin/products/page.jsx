import Link from "next/link";
import { cookies } from "next/headers";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { createClient } from "@/utils/supabase/server";
import ProductsTableClient from "@/components/admin/ProductsTableClient";

export default async function ProductsPage() {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { data: products, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

    const safeProducts = products || [];

    const processedProducts = safeProducts.map(product => {
        const totalStock = Array.isArray(product.variants) 
            ? product.variants.reduce((sum, variant) => sum + (Number(variant.stock) || 0), 0)
            : 0;
        return { ...product, totalStock };
    });

    const allCount = processedProducts.length;
    const draftCount = processedProducts.filter(p => (p.status || '').toLowerCase() === 'draft').length;
    const publishedCount = processedProducts.filter(p => (p.status || '').toLowerCase() === 'published').length;

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between mb-6">
                <Breadcrumb items={[{ label: 'Dashboard', href: '/admin' }, { label: 'Products' }]} />
                <Link href="/admin/products/new" className="bg-black text-white hover:bg-black/90 px-6 py-2 rounded-lg font-medium transition-colors">
                    Add product
                </Link>
            </div>

            {error && (
                <div className="bg-destructive/10 text-destructive p-4 rounded-lg">
                    Error fetching products: {error.message}
                </div>
            )}

            <ProductsTableClient 
                processedProducts={processedProducts} 
                allCount={allCount} 
                draftCount={draftCount} 
                publishedCount={publishedCount} 
            />
        </div>
    );
}