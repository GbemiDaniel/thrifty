import Image from "next/image";
import Link from "next/link";
import styles from "./ProductCard.module.css";

export default function ProductCard({ image, title, category, price, id }) {
    return (
        <Link href={`/product/${id}`} className="group flex flex-col gap-2 cursor-pointer">
            {/* MACRO: Aspect ratio locked to 4/5 for clothing photography */}
            <div className="relative w-full aspect-4/5 bg-card overflow-hidden rounded-sm">
                <div className={styles.imageWrapper}>
                    <Image
                        src={image}
                        alt={title}
                        fill
                        sizes="(max-width: 768px) 50vw, 33vw"
                        className="object-cover object-center"
                        loading="lazy"
                        decoding="async" /* CRITICAL: Decodes off the main thread to prevent scroll hitches */
                        quality={80} /* Drops payload size slightly for massive performance gains */
                    />
                </div>
            </div>

            {/* MICRO: Centered typography matching the design */}
            <div className="flex flex-col items-center text-center mt-2">
                <h3 className="text-sm font-bold text-foreground">{title}</h3>
                <p className="text-xs text-foreground/50 mt-1">{category}</p>
                <p className="text-sm font-bold text-foreground mt-1">{price}</p>
            </div>
        </Link>
    );
}