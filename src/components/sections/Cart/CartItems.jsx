import Image from "next/image";

export default function CartItems() {
    // Dummy data mirroring the 3 identical items in the design
    const items = [1, 2, 3];

    return (
        <div className="w-full border border-gray-200 rounded-md p-6">
            <div className="flex flex-col gap-6">

                {items.map((item, index) => (
                    <div key={item} className={`flex gap-6 pb-6 ${index !== items.length - 1 ? 'border-b border-gray-100' : ''}`}>

                        {/* Image Placeholder */}
                        <div className="w-[120px] h-[120px] bg-[#dcdcdc] rounded-sm flex-shrink-0" />

                        {/* Item Details */}
                        <div className="flex flex-col justify-between flex-grow py-1">

                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-sm font-bold text-black mb-1">Gradient Graphic T-shirt</h3>
                                    <p className="text-xs text-gray-500 mb-0.5">Size: Large</p>
                                    <p className="text-xs text-gray-500">Color: White</p>
                                </div>

                                {/* Delete Icon (Red SVG) */}
                                <button className="text-[#FF4D4D] hover:text-red-700 transition-colors pt-1">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                                    </svg>
                                </button>
                            </div>

                            <div className="flex justify-between items-center mt-4">
                                <span className="text-lg font-bold text-black">$145</span>

                                {/* Quantity Selector */}
                                <div className="flex items-center justify-between bg-[#f5f5f5] rounded-full w-[100px] h-9 px-3">
                                    <button className="text-lg text-gray-500 hover:text-black leading-none pb-0.5">−</button>
                                    <span className="text-xs font-bold">1</span>
                                    <button className="text-lg text-gray-500 hover:text-black leading-none pb-0.5">+</button>
                                </div>
                            </div>

                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
}