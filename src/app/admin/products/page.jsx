import Link from "next/link";
import { cookies } from "next/headers";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { Search, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { createClient } from "@/utils/supabase/server";
const formatTableText = (text, maxWords = 5, stripHtml = false) => {
  if (!text) return '-';
  
  // Step 1: Strip HTML if requested
  let cleanText = text;
  if (stripHtml) {
    cleanText = cleanText.replace(/<[^>]+>/g, ''); // Basic regex to remove HTML tags
    // Decode common HTML entities that might be left over
    cleanText = cleanText.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&'); 
  }

  // Step 2: Truncate by word count
  const words = cleanText.trim().split(/\s+/);
  if (words.length > maxWords) {
    return words.slice(0, maxWords).join(' ') + '...';
  }
  
  return cleanText;
};
export default async function ProductsPage() {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { data: products, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

    const safeProducts = products || [];

    const allCount = safeProducts.length;
    const draftCount = safeProducts.filter(p => (p.status || '').toLowerCase() === 'draft').length;
    const publishedCount = safeProducts.filter(p => (p.status || '').toLowerCase() === 'published').length;

    return (
        <div className="flex flex-col gap-6">
            {/* Header Section */}
            <div className="flex items-center justify-between mb-6">
                <Breadcrumb 
                    items={[
                        { label: 'Dashboard', href: '/admin' }, 
                        { label: 'Products' }
                    ]} 
                />
                <Link
                    href="/admin/products/new"
                    className="bg-black text-white hover:bg-black/90 px-6 py-2 rounded-lg font-medium transition-colors"
                >
                    Add product
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col">
                {/* Filter Tabs */}
                <div className="flex items-center gap-6 px-6 pt-4 border-b border-border text-sm">
                    <div className="pb-3 border-b-2 border-violet-600 text-slate-900 font-semibold cursor-pointer">
                        All <span className="text-slate-500 font-normal ml-1">{allCount}</span>
                    </div>
                    <div className="pb-3 text-muted-foreground hover:text-foreground cursor-pointer transition-colors font-medium">
                        Draft <span className="ml-1">{draftCount}</span>
                    </div>
                    <div className="pb-3 text-muted-foreground hover:text-foreground cursor-pointer transition-colors font-medium">
                        Published <span className="ml-1">{publishedCount}</span>
                    </div>
                </div>

                {/* Toolbar */}
                <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between border-b border-border bg-admin-sidebar gap-4">
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-xl text-sm font-medium bg-admin-sidebar hover:bg-muted transition-colors">
                            Category <ChevronDown className="w-4 h-4 text-muted-foreground" />
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-xl text-sm font-medium bg-admin-sidebar hover:bg-muted transition-colors">
                            Stock <ChevronDown className="w-4 h-4 text-muted-foreground" />
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-xl text-sm font-medium bg-admin-sidebar hover:bg-muted transition-colors">
                            <span className="text-muted-foreground">Sort by name</span> <ChevronDown className="w-4 h-4 text-muted-foreground" />
                        </button>
                    </div>

                    <div className="flex items-center bg-admin-background border border-border rounded-xl px-3 py-2 w-full sm:w-64">
                        <Search className="w-4 h-4 text-muted-foreground mr-2" />
                        <input
                            type="text"
                            placeholder="Search"
                            className="bg-transparent border-none outline-none w-full text-sm placeholder:text-muted-foreground"
                        />
                    </div>
                </div>

                {/* Data Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 text-slate-500 font-medium border-y border-slate-200">
                            <tr>
                                <th className="px-6 py-4 font-medium w-12 text-center">
                                    <input type="checkbox" className="rounded border-border cursor-pointer" />
                                </th>
                                <th className="px-6 py-4 font-medium">Product</th>
                                <th className="px-6 py-4 font-medium">Price</th>
                                <th className="px-6 py-4 font-medium">Category</th>
                                <th className="px-6 py-4 font-medium">Description</th>
                                <th className="px-6 py-4 font-medium text-center">Status</th>
                                <th className="px-6 py-4 font-medium text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border bg-admin-sidebar">
                            {safeProducts.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="px-6 py-12 text-center text-muted-foreground">
                                        {error ? (
                                            <span className="text-destructive">Error fetching products: {error.message}</span>
                                        ) : (
                                            "No products found. Click 'Add product' to create one."
                                        )}
                                    </td>
                                </tr>
                            ) : (
                                safeProducts.map((product) => (
                                    <tr key={product.id} className="hover:bg-muted/30 transition-colors">
                                        <td className="px-6 py-4 text-center">
                                            <input type="checkbox" className="rounded border-border cursor-pointer" />
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-12 bg-muted rounded-md overflow-hidden flex-shrink-0 border border-border flex items-center justify-center">
                                                    {product.images && product.images.length > 0 ? (
                                                        <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <span className="text-[10px] text-muted-foreground">No img</span>
                                                    )}
                                                </div>
                                                <span className="font-medium text-foreground">{formatTableText(product.title, 4, false) || 'No Title'}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-muted-foreground">
                                            {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(product.price || 0)}
                                        </td>
                                        <td className="px-6 py-4 text-muted-foreground capitalize">
                                            {product.category || '-'}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-muted-foreground">
                                                {formatTableText(product.description, 8, true)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`text-sm ${(product.status || '').toLowerCase() === 'published'
                                                    ? 'text-emerald-600 font-semibold'
                                                    : 'text-blue-600 font-semibold'
                                                }`}>
                                                {product.status ? product.status.charAt(0).toUpperCase() + product.status.slice(1) : 'Draft'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Link href={`/admin/products/${product.id}`} className="text-blue-600 font-semibold hover:underline text-sm">
                                                View
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Bottom Pagination Bar */}
                <div className="p-4 flex items-center justify-between text-sm text-muted-foreground bg-admin-sidebar">
                    <div>
                        showing 1 - {Math.min(10, allCount)} of {allCount}
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="w-8 h-8 flex items-center justify-center rounded-md border border-border hover:bg-muted transition-colors">
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-foreground text-background font-medium">
                            1
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted font-medium transition-colors">
                            2
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted font-medium transition-colors">
                            3
                        </button>
                        <span>...</span>
                        <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted font-medium transition-colors">
                            10
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-md border border-border hover:bg-muted transition-colors">
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}