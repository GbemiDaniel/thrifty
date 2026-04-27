import Link from "next/link";

export default function ProductBreadcrumbs() {
    return (
        <nav className="text-xs font-medium text-foreground/50 flex gap-2 uppercase tracking-wide">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <span>/</span>
            <Link href="/men" className="hover:text-foreground transition-colors">Men</Link>
            <span>/</span>
            <span className="text-foreground">Oversized Sweatshirt</span>
        </nav>
    );
}