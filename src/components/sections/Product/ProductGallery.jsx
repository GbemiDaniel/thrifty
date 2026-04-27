export default function ProductGallery() {
    return (
        <div className="flex flex-col md:flex-row gap-4 w-full h-auto md:h-[650px]">

            {/* THUMBNAILS (Left side on desktop) */}
            <div className="flex flex-row md:flex-col gap-4 w-full md:w-[20%] order-2 md:order-1 h-full">
                <div className="w-full aspect-square md:aspect-auto md:flex-1 bg-[#dcdcdc] rounded-sm cursor-pointer border-2 border-black" />
                <div className="w-full aspect-square md:aspect-auto md:flex-1 bg-[#dcdcdc] rounded-sm cursor-pointer border-2 border-transparent hover:border-gray-400" />
                <div className="w-full aspect-square md:aspect-auto md:flex-1 bg-[#dcdcdc] rounded-sm cursor-pointer border-2 border-transparent hover:border-gray-400" />
            </div>

            {/* MAIN HERO (Right side on desktop) */}
            <div className="w-full md:w-[80%] aspect-square md:aspect-auto md:h-full bg-[#dcdcdc] rounded-sm order-1 md:order-2" />

        </div>
    );
}