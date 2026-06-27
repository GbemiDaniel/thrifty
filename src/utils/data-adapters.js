export function mapSupabaseToUIProduct(dbProduct) {
  if (!dbProduct) return null;

  return {
    id: dbProduct.id,
    title: dbProduct.title || dbProduct.name || "",
    price: dbProduct.price || 0,
    category: dbProduct.category || "unisex",
    subCategory: dbProduct.sub_category || "", 
    dressStyle: dbProduct.dress_style || "Casual",
    // Safely extract the first image URL
    image: (dbProduct.images && dbProduct.images.length > 0) ? dbProduct.images[0] : "/placeholder.jpg",
    
    // Pass the full array to the PDP ImageGallery
    images: dbProduct.images || [], 
    
    description: dbProduct.description || "",
    // Pass arrays directly as they are already well-formed in the DB
    sizes: dbProduct.sizes || [],
    colors: dbProduct.colors || []
  };
}
