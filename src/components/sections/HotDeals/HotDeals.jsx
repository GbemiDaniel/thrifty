import ProductCard from "@/components/shared/ProductCard/ProductCard";
import styles from "./HotDeals.module.css";

// Dummy data: Update the image paths here to match your local files
const hotDealsData = [
    { id: 1, image: "/images/product-1.jpg", title: "Product", category: "Shirt", price: "$40" },
    { id: 2, image: "/images/product-2.jpg", title: "Product", category: "Shirt", price: "$40" },
    { id: 3, image: "/images/product-3.jpg", title: "Product", category: "Shirt", price: "$40" },
    { id: 4, image: "/images/product-4.jpg", title: "Product", category: "Shirt", price: "$40" },
    { id: 5, image: "/images/product-5.jpg", title: "Product", category: "Shirt", price: "$40" },
    { id: 6, image: "/images/product-6.jpg", title: "Product", category: "Shirt", price: "$40" },
];

export default function HotDeals() {
    return (
        <section className="w-full px-sm md:px-md py-lg md:py-section flex flex-col items-center">

            {/* Header */}
            <div className="text-center mb-6 md:mb-8">
                <h2 className="text-h2 font-bold mb-1">Hot Deals</h2>
                <p className="text-sm text-foreground/70">Get the best deals on sale!</p>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-6 md:gap-10 mb-8 border-b border-border w-max px-4">
                <button className={styles.activeTab}>Men's</button>
                <button className={styles.inactiveTab}>Women's</button>
                <button className={styles.inactiveTab}>Accessories</button>
            </div>

            {/* Grid: 2 columns mobile, 3 columns desktop */}
            <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-12">
                {hotDealsData.map((product) => (
                    <ProductCard key={product.id} {...product} />
                ))}
            </div>

            {/* Action Button: Full width on mobile, fixed width on desktop */}
            <div className="w-full md:w-auto mt-10 md:mt-14">
                <button className="w-full md:w-[200px] bg-foreground text-background py-3 text-sm font-medium hover:opacity-80 transition-opacity">
                    View All
                </button>
            </div>

        </section>
    );
}