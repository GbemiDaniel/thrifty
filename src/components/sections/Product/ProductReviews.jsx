export default function ProductReviews() {
    // Dummy data mirroring the exact design file
    const reviews = [
        {
            id: 1,
            name: "Samantha D.",
            content: "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.",
            date: "August 14, 2023"
        },
        {
            id: 2,
            name: "Alex M.",
            content: "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top. Being a UI designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me.",
            date: "August 15, 2023"
        },
        {
            id: 3,
            name: "Ethan R.",
            content: "This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt.",
            date: "August 16, 2023"
        },
        {
            id: 4,
            name: "Olivia P.",
            content: "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents that, but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out.",
            date: "August 17, 2023"
        },
        {
            id: 5,
            name: "Liam K.",
            content: "This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion.",
            date: "August 18, 2023"
        },
        {
            id: 6,
            name: "Ava H.",
            content: "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter.",
            date: "August 19, 2023"
        }
    ];

    // Helper for the 5 solid stars
    const StarRating = () => (
        <div className="flex gap-1 text-[#FFC107]">
            {[...Array(5)].map((_, i) => (
                <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
            ))}
        </div>
    );

    return (
        <section className="w-full mt-16 md:mt-24 border-t border-gray-100 pt-16">

            {/* 1. Header & Controls */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">

                {/* Title */}
                <h2 className="text-2xl font-bold text-black flex items-baseline gap-2">
                    All Reviews <span className="text-gray-400 font-normal text-lg">(451)</span>
                </h2>

                {/* Action Controls */}
                <div className="flex items-center gap-3 w-full md:w-auto">
                    {/* Filter Button */}
                    <button className="bg-gray-100 p-2.5 rounded-sm hover:bg-gray-200 transition-colors">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="4" y1="21" x2="4" y2="14"></line>
                            <line x1="4" y1="10" x2="4" y2="3"></line>
                            <line x1="12" y1="21" x2="12" y2="12"></line>
                            <line x1="12" y1="8" x2="12" y2="3"></line>
                            <line x1="20" y1="21" x2="20" y2="16"></line>
                            <line x1="20" y1="12" x2="20" y2="3"></line>
                            <line x1="1" y1="14" x2="7" y2="14"></line>
                            <line x1="9" y1="8" x2="15" y2="8"></line>
                            <line x1="17" y1="16" x2="23" y2="16"></line>
                        </svg>
                    </button>

                    {/* Sort Dropdown */}
                    <div className="flex items-center gap-2 bg-gray-100 px-4 py-2.5 rounded-sm cursor-pointer hover:bg-gray-200 transition-colors">
                        <span className="text-sm font-medium text-black">Latest</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M6 9l6 6 6-6" />
                        </svg>
                    </div>

                    {/* Write Review Button */}
                    <button className="bg-black text-white px-6 py-2.5 text-sm font-medium rounded-sm hover:bg-black/80 transition-colors ml-auto md:ml-0">
                        Write a Review
                    </button>
                </div>
            </div>

            {/* 2. Reviews Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {reviews.map((review) => (
                    <div key={review.id} className="border border-gray-200 p-6 rounded-md flex flex-col gap-4">

                        {/* Card Header (Stars & Options) */}
                        <div className="flex justify-between items-center">
                            <StarRating />
                            <button className="text-gray-400 hover:text-black">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                                </svg>
                            </button>
                        </div>

                        {/* User Info */}
                        <div className="flex items-center gap-2">
                            <h3 className="font-bold text-black">{review.name}</h3>
                            {/* Verified Green Check */}
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="#00C853" className="mt-0.5">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                            </svg>
                        </div>

                        {/* Review Content */}
                        <p className="text-sm text-gray-500 leading-relaxed grow">
                            "{review.content}"
                        </p>

                        {/* Date */}
                        <p className="text-xs font-medium text-gray-400 mt-2">
                            Posted on {review.date}
                        </p>

                    </div>
                ))}
            </div>

            {/* 3. See More Button */}
            <div className="mt-10 flex justify-center">
                <button className="bg-black text-white px-8 py-3 text-sm font-medium hover:bg-black/80 transition-colors duration-300 flex items-center gap-2 rounded-sm">
                    See More <span>→</span>
                </button>
            </div>

        </section>
    );
}