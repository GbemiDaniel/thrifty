import Image from "next/image";
import styles from "./PromoBanner.module.css";

export default function PromoBanner() {
    return (
        <section className="w-full px-sm md:px-md py-lg flex justify-center">
            {/* MACRO: Solid gray background, explicit bounds, relative positioning to fix right-edge sub-pixel gaps */}
            <div className="relative w-full max-w-[1440px] h-[220px] md:h-[300px] rounded-md overflow-hidden bg-[#dcdcdc] flex items-center">

                {/* LEFT SIDE: Text Area */}
                <div className="relative z-10 w-[55%] md:w-[45%] flex flex-col justify-center pl-6 sm:pl-10 md:pl-16">
                    
                    {/* Desktop Text */}
                    <div className="hidden md:flex flex-col">
                        <div className="flex items-baseline gap-3">
                            <span className="text-7xl font-normal tracking-tight leading-none text-[#1a1a1a]">20%</span>
                            <span className="text-4xl font-light leading-none text-[#1a1a1a]">Off</span>
                        </div>
                        <span className="block text-4xl font-light mt-2 text-[#1a1a1a]">Winter sale!</span>
                    </div>

                    {/* Mobile Text */}
                    <div className="flex md:hidden flex-col">
                        <span className="block text-5xl sm:text-6xl font-normal tracking-tight leading-none mb-1 text-[#1a1a1a]">20%</span>
                        <span className="block text-2xl font-light leading-tight text-[#1a1a1a]">Off Winter</span>
                        <span className="block text-2xl font-light leading-tight text-[#1a1a1a]">sale!</span>
                    </div>

                </div>

                {/* RIGHT SIDE: Image Area - Absolutely pinned to right-0 to guarantee 0px gap */}
                <div className="absolute inset-y-0 right-0 w-[65%] md:w-[60%] h-full z-0">
                    
                    {/* Additive gradient overlay from CSS module */}
                    <div className={styles.imageFadeOverlay} />

                    <Image
                        src="/images/banner image.jpg"
                        alt="Winter Sale"
                        fill
                        className="object-cover object-right md:object-center"
                        sizes="(max-width: 768px) 65vw, 60vw"
                        quality={100}
                        priority
                    />
                </div>

            </div>
        </section>
    );
}