// src/lib/constants.js

export const heroSlides = [
    {
        id: 1,
        image: "/images/hero-1.png",
        title: "New Sweatshirt Collection",
        cta: "Learn More",
        href: "/men"
    },
    {
        id: 2,
        image: "/images/hero-2.png",
        title: "Sweatshirt for women",
        cta: "Shop The Drop",
        href: "/women"
    },
    {
        id: 3,
        image: "/images/hero-3.png",
        title: "Not forgetting the Kids",
        cta: "Pick a pair",
        href: "#"
    },
    {
        id: 4,
        image: "/images/hero-4.png",
        title: "Outdoors and sports",
        cta: "Find your gear",
        href: "/accessories"
    },
    {
        id: 5,
        image: "/images/hero-5.png",
        title: "Outdoors and sports for kids",
        cta: "Get their gear",
        href: "#"
    }
];

export const globalCatalog = [
    // --- MEN ---
    {
        id: "prod-m-01",
        title: "Heavyweight Boxy Tee",
        price: 40,
        category: "men",
        subCategory: "T-shirts",
        dressStyle: "Casual",
        image: "/images/product-1.jpg",
        description: "A premium, ultra-heavyweight cotton tee cut with a modern boxy silhouette. Perfect for layering or strong standalone wear.",
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: [{ name: "Onyx", hex: "#111111" }, { name: "Bone", hex: "#EBE6DE" }]
    },
    {
        id: "prod-m-02",
        title: "Washed Cargo Pant",
        price: 65,
        category: "men",
        subCategory: "Jeans",
        dressStyle: "Casual",
        image: "/images/product-2.jpg",
        description: "Utility meets streetwear. These enzyme-washed cargo pants feature articulated knees and an adjustable hem for versatile styling.",
        sizes: ["28", "30", "32", "34", "36"],
        colors: [{ name: "Olive", hex: "#4B5320" }, { name: "Carbon", hex: "#333333" }]
    },
    {
        id: "prod-m-03",
        title: "Oversized Zip Hoodie",
        price: 55,
        category: "men",
        subCategory: "Hoodie",
        dressStyle: "Casual",
        image: "/images/product-3.jpg",
        description: "Crafted from dense 450gsm fleece with a relaxed drop-shoulder fit. Features a heavy-duty two-way zipper and double-lined hood.",
        sizes: ["M", "L", "XL"],
        colors: [{ name: "Heather Grey", hex: "#9CA3AF" }, { name: "Onyx", hex: "#111111" }]
    },
    {
        id: "prod-m-04",
        title: "Textured Knit Polo",
        price: 45,
        category: "men",
        subCategory: "Shirts",
        dressStyle: "Chic",
        image: "/images/product-4.jpg",
        description: "Elevated casual. A breathable, open-knit cotton polo with a relaxed camp collar and subtle ribbed detailing.",
        sizes: ["S", "M", "L", "XL"],
        colors: [{ name: "Cream", hex: "#F5F5DC" }, { name: "Navy", hex: "#0F172A" }]
    },
    {
        id: "prod-m-05",
        title: "Graphic Vintage Tee",
        price: 35,
        category: "men",
        subCategory: "T-shirts",
        dressStyle: "Party",
        image: "/images/product-5.jpg",
        description: "Faded and heavily washed to replicate decades of wear. Features a distressed archive print on the chest.",
        sizes: ["S", "M", "L"],
        colors: [{ name: "Washed Black", hex: "#2A2A2A" }]
    },
    {
        id: "prod-m-06",
        title: "Technical Track Jacket",
        price: 85,
        category: "men",
        subCategory: "Shirts",
        dressStyle: "Casual",
        image: "/images/product-6.jpg",
        description: "Water-resistant nylon ripstop with a mesh lining. Features geometric panelling and concealed zipper pockets.",
        sizes: ["M", "L", "XL", "XXL"],
        colors: [{ name: "Graphite", hex: "#4B5563" }, { name: "Crimson", hex: "#991B1B" }]
    },

    // --- WOMEN ---
    {
        id: "prod-w-01",
        title: "Cropped Fleece Hoodie",
        price: 50,
        category: "women",
        subCategory: "Hoodie",
        dressStyle: "Casual",
        image: "/images/product-2.jpg",
        description: "A super-soft, cropped silhouette designed to pair perfectly with high-waisted bottoms. Features raw-edge detailing.",
        sizes: ["XS", "S", "M", "L"],
        colors: [{ name: "Ash", hex: "#B0B4B4" }, { name: "Onyx", hex: "#111111" }]
    },
    {
        id: "prod-w-02",
        title: "Ribbed Baby Tee",
        price: 30,
        category: "women",
        subCategory: "T-shirts",
        dressStyle: "Casual",
        image: "/images/product-4.jpg",
        description: "The ultimate 90s staple. Cut from a stretchy, thick cotton rib knit that holds its shape all day.",
        sizes: ["XS", "S", "M", "L"],
        colors: [{ name: "Bone", hex: "#EBE6DE" }, { name: "Matcha", hex: "#8A9A5B" }]
    },
    {
        id: "prod-w-03",
        title: "Parachute Track Pants",
        price: 65,
        category: "women",
        subCategory: "Jeans",
        dressStyle: "Party",
        image: "/images/product-6.jpg",
        description: "Voluminous, lightweight nylon pants with an adjustable toggle waist and ankles for customizable draping.",
        sizes: ["XS", "S", "M"],
        colors: [{ name: "Slate", hex: "#64748B" }, { name: "Off-White", hex: "#F8F9FA" }]
    },
    {
        id: "prod-w-04",
        title: "Vegan Leather Jacket",
        price: 120,
        category: "women",
        subCategory: "Shirts",
        dressStyle: "Chic",
        image: "/images/product-1.jpg",
        description: "An oversized, distressed moto jacket made from premium buttery vegan leather with heavy silver hardware.",
        sizes: ["S", "M", "L"],
        colors: [{ name: "Vintage Black", hex: "#1C1C1C" }]
    },
    {
        id: "prod-w-05",
        title: "Seamless Rib Tank",
        price: 25,
        category: "women",
        subCategory: "T-shirts",
        dressStyle: "Casual",
        image: "/images/product-3.jpg",
        description: "A second-skin basic engineered without seams for ultimate comfort and a smoothing silhouette.",
        sizes: ["XS/S", "M/L"],
        colors: [{ name: "Espresso", hex: "#3B2F2F" }, { name: "Onyx", hex: "#111111" }, { name: "Bone", hex: "#EBE6DE" }]
    },
    {
        id: "prod-w-06",
        title: "Pleated Midi Skirt",
        price: 55,
        category: "women",
        subCategory: "Shorts",
        dressStyle: "Formal",
        image: "/images/product-5.jpg",
        description: "Constructed from a heavy twill blend that holds crisp knife pleats. Features a hidden side zipper.",
        sizes: ["XS", "S", "M", "L"],
        colors: [{ name: "Charcoal", hex: "#36454F" }, { name: "Sand", hex: "#C2B280" }]
    },

    // --- ACCESSORIES ---
    {
        id: "prod-a-01",
        title: "Chunky Silver Chain",
        price: 45,
        category: "accessories",
        subCategory: "Shirts",
        dressStyle: "Party",
        image: "/images/product-3.jpg",
        description: "A heavy-link Cuban chain cast in premium stainless steel. Tarnish-resistant and built for daily wear.",
        sizes: ["18 inch", "20 inch"],
        colors: [{ name: "Silver", hex: "#C0C0C0" }]
    },
    {
        id: "prod-a-02",
        title: "Nylon Crossbody Bag",
        price: 40,
        category: "accessories",
        subCategory: "Hoodie",
        dressStyle: "Casual",
        image: "/images/product-5.jpg",
        description: "A tactical-inspired everyday bag constructed from durable ballistic nylon. Features multiple organizational compartments.",
        sizes: ["One Size"],
        colors: [{ name: "Onyx", hex: "#111111" }, { name: "Olive", hex: "#4B5320" }]
    },
    {
        id: "prod-a-03",
        title: "Distressed Dad Hat",
        price: 25,
        category: "accessories",
        subCategory: "T-shirts",
        dressStyle: "Casual",
        image: "/images/product-1.jpg",
        description: "A low-profile unstructured cap made from heavily washed cotton twill. Finished with an embroidered tonal logo.",
        sizes: ["One Size"],
        colors: [{ name: "Faded Black", hex: "#2A2A2A" }, { name: "Washed Navy", hex: "#1A2421" }]
    },
    {
        id: "prod-a-04",
        title: "Everyday Crew Socks",
        price: 15,
        category: "accessories",
        subCategory: "Shorts",
        dressStyle: "Casual",
        image: "/images/product-2.jpg",
        description: "Thick, cushioned terry cotton socks engineered with arch support and a ribbed calf that stays up.",
        sizes: ["S/M", "L/XL"],
        colors: [{ name: "White", hex: "#FFFFFF" }, { name: "Onyx", hex: "#111111" }]
    },
    {
        id: "prod-a-05",
        title: "Retro Sunglasses",
        price: 55,
        category: "accessories",
        subCategory: "Shirts",
        dressStyle: "Chic",
        image: "/images/product-4.jpg",
        description: "A modernized rectangular frame cut from thick, high-quality acetate. Fitted with polarized dark lenses.",
        sizes: ["One Size"],
        colors: [{ name: "Tortoise", hex: "#7A4A3A" }, { name: "Onyx", hex: "#111111" }]
    },
    {
        id: "prod-a-06",
        title: "Classic Leather Belt",
        price: 40,
        category: "accessories",
        subCategory: "Jeans",
        dressStyle: "Formal",
        image: "/images/product-6.jpg",
        description: "Cut from thick, full-grain leather that will develop a unique patina over time. Finished with a brushed steel buckle.",
        sizes: ["30", "32", "34", "36", "38"],
        colors: [{ name: "Black", hex: "#000000" }, { name: "Saddle", hex: "#8B4513" }]
    }
];

export const hotDealsData = {
    men: globalCatalog.filter(p => p.category === "men").slice(0, 6),
    women: globalCatalog.filter(p => p.category === "women").slice(0, 6),
    accessories: globalCatalog.filter(p => p.category === "accessories").slice(0, 6),
};