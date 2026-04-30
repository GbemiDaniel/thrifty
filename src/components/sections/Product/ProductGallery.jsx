export default function ProductGallery() {
    return (
        <div className="flex flex-col md:flex-row gap-4 w-full h-auto md:aspect-4/3">

            {/* THUMBNAILS (Left side on desktop) */}
            <div className="flex flex-row md:flex-col gap-4 w-full md:w-1/5 order-2 md:order-1 h-full">
                <div className="w-full aspect-square md:aspect-auto md:flex-1 bg-border rounded-sm cursor-pointer border-2 border-foreground" />
                <div className="w-full aspect-square md:aspect-auto md:flex-1 bg-border rounded-sm cursor-pointer border-2 border-transparent hover:border-foreground/30" />
                <div className="w-full aspect-square md:aspect-auto md:flex-1 bg-border rounded-sm cursor-pointer border-2 border-transparent hover:border-foreground/30" />
            </div>

            {/* MAIN HERO (Right side on desktop) */}
            <div className="w-full md:flex-1 aspect-square md:aspect-auto md:h-full bg-border rounded-sm order-1 md:order-2" />

        </div>
    );
}