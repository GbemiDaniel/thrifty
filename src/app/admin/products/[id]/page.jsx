import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import ProductForm from "@/components/admin/ProductForm";

export default async function EditProductPage({ params }) {
  const { id } = await params;
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !product) {
    notFound(); 
  }

  // Pure separation of concerns: Server fetches, Form handles UI.
  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8">
        <ProductForm initialData={product} />
    </div>
  );
}
