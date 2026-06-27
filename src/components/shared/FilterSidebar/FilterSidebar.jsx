"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { SlidersHorizontal, ChevronRight, ChevronUp, Check } from "lucide-react";

export default function FilterSidebar({ dynamicMaxPrice = 1000 }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentMaxLimit = dynamicMaxPrice;
  const sliderStep = currentMaxLimit > 10000 ? 500 : currentMaxLimit > 1000 ? 50 : 10;

  // Local draft states
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedStyles, setSelectedStyles] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [draftMinPrice, setDraftMinPrice] = useState("");
  const [draftMaxPrice, setDraftMaxPrice] = useState("");

  // Collision-safe handlers
  const handleMinChange = (e) => {
    const maxVal = draftMaxPrice === "" ? currentMaxLimit : parseInt(draftMaxPrice);
    const value = Math.min(Number(e.target.value), maxVal - sliderStep);
    setDraftMinPrice(value);
  };

  const handleMaxChange = (e) => {
    const minVal = draftMinPrice === "" ? 0 : parseInt(draftMinPrice);
    const value = Math.max(Number(e.target.value), minVal + sliderStep);
    setDraftMaxPrice(value);
  };

  const trackRef = useRef(null);

  const handleTrackClick = (e) => {
    if (!trackRef.current) return;
    
    // Get click position relative to the track
    const rect = trackRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickPercentage = Math.max(0, Math.min(1, clickX / rect.width));
    
    // Convert to raw price and snap to the nearest step
    const rawValue = clickPercentage * currentMaxLimit;
    const snappedValue = Math.round(rawValue / sliderStep) * sliderStep;

    // Determine which thumb is closer to the tap
    const currentMin = draftMinPrice === "" ? 0 : parseInt(draftMinPrice);
    const currentMax = draftMaxPrice === "" ? currentMaxLimit : parseInt(draftMaxPrice);
    
    const distanceToMin = Math.abs(snappedValue - currentMin);
    const distanceToMax = Math.abs(snappedValue - currentMax);

    if (distanceToMin <= distanceToMax) {
        // Prevent Min from crossing Max
        setDraftMinPrice(Math.min(snappedValue, currentMax - sliderStep));
    } else {
        // Prevent Max from crossing Min
        setDraftMaxPrice(Math.max(snappedValue, currentMin + sliderStep));
    }
  };

  // Accordion state
  const [expanded, setExpanded] = useState({ type: true, price: true, colors: true, size: true, style: true });

  // Populate local state from URL search params on mount
  useEffect(() => {
    const typesParam = searchParams.get("type");
    const stylesParam = searchParams.get("style");
    const colorsParam = searchParams.get("color");
    const sizesParam = searchParams.get("size");
    const minPriceParam = searchParams.get("minPrice");
    const maxPriceParam = searchParams.get("maxPrice");

    setSelectedTypes(typesParam ? typesParam.split(",") : []);
    setSelectedStyles(stylesParam ? stylesParam.split(",") : []);
    setSelectedColors(colorsParam ? colorsParam.split(",") : []);
    setSelectedSizes(sizesParam ? sizesParam.split(",") : []);
    
    setDraftMinPrice(minPriceParam ? minPriceParam : "");
    setDraftMaxPrice(maxPriceParam ? maxPriceParam : "");
  }, [searchParams]);

  const toggleSection = (section) => setExpanded((prev) => ({ ...prev, [section]: !prev[section] }));

  const toggleType = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const toggleStyle = (style) => {
    setSelectedStyles((prev) =>
      prev.includes(style) ? prev.filter((s) => s !== style) : [...prev, style]
    );
  };

  const toggleColor = (color) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const toggleSize = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleApply = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (selectedTypes.length > 0) {
      params.set("type", selectedTypes.join(","));
    } else {
      params.delete("type");
    }

    if (selectedStyles.length > 0) {
      params.set("style", selectedStyles.join(","));
    } else {
      params.delete("style");
    }

    if (selectedColors.length > 0) {
      params.set("color", selectedColors.join(","));
    } else {
      params.delete("color");
    }

    if (selectedSizes.length > 0) {
      params.set("size", selectedSizes.join(","));
    } else {
      params.delete("size");
    }

    const finalMinPrice = draftMinPrice === "" ? 0 : parseInt(draftMinPrice);
    const finalMaxPrice = draftMaxPrice === "" ? currentMaxLimit : parseInt(draftMaxPrice);

    if (finalMinPrice > 0) {
      params.set("minPrice", finalMinPrice);
    } else {
      params.delete("minPrice");
    }

    if (finalMaxPrice < currentMaxLimit) {
      params.set("maxPrice", finalMaxPrice);
    } else {
      params.delete("maxPrice");
    }

    // Push the updated URL without scrolling to top
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  // Static Data
  const categories = ["T-shirts", "Shorts", "Shirts", "Hoodie", "Jeans"];
  const dressStyles = ["Casual", "Chic", "Party", "Formal"];
  const sizes = [
    "XX-Small", "X-Small", "Small", "Medium", "Large", 
    "X-Large", "XX-Large", "3X-Large", "4X-Large"
  ];
  const colors = [
    { name: "Green", class: "bg-green-500" },
    { name: "Red", class: "bg-red-500" },
    { name: "Yellow", class: "bg-yellow-400" },
    { name: "Orange", class: "bg-orange-500" },
    { name: "Cyan", class: "bg-cyan-400" },
    { name: "Blue", class: "bg-blue-600" },
    { name: "Purple", class: "bg-purple-500" },
    { name: "Pink", class: "bg-pink-500" },
    { name: "White", class: "bg-white" },
    { name: "Black", class: "bg-black" },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 shrink-0 sticky top-32 gap-6 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-border">
        <h2 className="font-bold text-lg text-foreground">Filters</h2>
        <SlidersHorizontal className="w-5 h-5 text-muted-foreground" />
      </div>

      {/* Categories (Type) */}
      <div className="flex flex-col gap-4 pb-6 border-b border-border">
        <div 
          className="flex items-center justify-between cursor-pointer"
          onClick={() => toggleSection('type')}
        >
          <h3 className="font-bold text-foreground">Category</h3>
          <ChevronUp className={`w-4 h-4 text-foreground transition-transform duration-200 ${expanded.type ? '' : 'rotate-180'}`} />
        </div>
        {expanded.type && (
          <div className="flex flex-col gap-4 pt-2">
            {categories.map((cat) => {
              const catValue = cat.toLowerCase();
              const isSelected = selectedTypes.includes(catValue);
              return (
                <button
                  key={catValue}
                  onClick={() => toggleType(catValue)}
                  className={`flex items-center justify-between text-sm font-medium transition-colors ${
                    isSelected ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {cat}
                  <ChevronRight className={`w-4 h-4 ${isSelected ? "text-foreground" : ""}`} />
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Price */}
      <div className="flex flex-col gap-4 pb-6 border-b border-border">
        <div 
          className="flex items-center justify-between cursor-pointer"
          onClick={() => toggleSection('price')}
        >
          <h3 className="font-bold text-foreground">Price</h3>
          <ChevronUp className={`w-4 h-4 text-foreground transition-transform duration-200 ${expanded.price ? '' : 'rotate-180'}`} />
        </div>
        {expanded.price && (
          <div className="pt-2">
            <div className="flex flex-col space-y-4">
                {/* Price Readout */}
                <div className="flex justify-between items-center text-sm font-medium text-foreground">
                    <span>${draftMinPrice ? parseInt(draftMinPrice).toLocaleString() : "0"}</span>
                    <span className="text-muted-foreground mx-2">-</span>
                    <span>${draftMaxPrice ? parseInt(draftMaxPrice).toLocaleString() : currentMaxLimit.toLocaleString()}</span>
                </div>

                {/* Dual Slider Track */}
                <div 
                    ref={trackRef}
                    onPointerDown={handleTrackClick}
                    className="relative h-2 w-full bg-muted rounded-full mt-2 cursor-pointer pointer-events-auto"
                >
                    {/* Active Visual Track */}
                    <div 
                        className="absolute h-full bg-foreground rounded-full pointer-events-none"
                        style={{ 
                            left: `${((draftMinPrice === "" ? 0 : parseInt(draftMinPrice)) / currentMaxLimit) * 100}%`, 
                            right: `${100 - ((draftMaxPrice === "" ? currentMaxLimit : parseInt(draftMaxPrice)) / currentMaxLimit) * 100}%` 
                        }}
                    ></div>

                    {/* Min Range Input */}
                    <input 
                        type="range" 
                        min="0"
                        max={currentMaxLimit}
                        step={sliderStep}
                        value={draftMinPrice === "" ? 0 : draftMinPrice}
                        onChange={handleMinChange}
                        className="absolute w-full h-2 top-0 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-background [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-foreground [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer z-20"
                    />

                    {/* Max Range Input */}
                    <input 
                        type="range" 
                        min="0"
                        max={currentMaxLimit}
                        step={sliderStep}
                        value={draftMaxPrice === "" ? currentMaxLimit : draftMaxPrice}
                        onChange={handleMaxChange}
                        className="absolute w-full h-2 top-0 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-background [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-foreground [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer z-30"
                    />
                </div>
            </div>
          </div>
        )}
      </div>

      {/* Colors */}
      <div className="flex flex-col gap-4 pb-6 border-b border-border">
        <div 
          className="flex items-center justify-between cursor-pointer"
          onClick={() => toggleSection('colors')}
        >
          <h3 className="font-bold text-foreground">Colors</h3>
          <ChevronUp className={`w-4 h-4 text-foreground transition-transform duration-200 ${expanded.colors ? '' : 'rotate-180'}`} />
        </div>
        {expanded.colors && (
          <div className="grid grid-cols-5 gap-3 pt-2">
            {colors.map((color) => {
              const colorValue = color.name.toLowerCase();
              const isSelected = selectedColors.includes(colorValue);
              const isWhite = color.name === "White";
              return (
                <button
                  key={colorValue}
                  onClick={() => toggleColor(colorValue)}
                  className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 ${color.class} ${
                    isWhite ? "border border-border" : ""
                  } ${isSelected ? "ring-2 ring-foreground ring-offset-2" : ""}`}
                  aria-label={`Select ${color.name} color`}
                >
                  {isSelected && (
                    <Check
                      className={`w-3 h-3 ${isWhite ? "text-black" : "text-white"}`}
                    />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Size */}
      <div className="flex flex-col gap-4 pb-6 border-b border-border">
        <div 
          className="flex items-center justify-between cursor-pointer"
          onClick={() => toggleSection('size')}
        >
          <h3 className="font-bold text-foreground">Size</h3>
          <ChevronUp className={`w-4 h-4 text-foreground transition-transform duration-200 ${expanded.size ? '' : 'rotate-180'}`} />
        </div>
        {expanded.size && (
          <div className="flex flex-wrap gap-2 pt-2">
            {sizes.map((size) => {
              const sizeValue = size.toLowerCase();
              const isSelected = selectedSizes.includes(sizeValue);
              return (
                <button
                  key={sizeValue}
                  onClick={() => toggleSize(sizeValue)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    isSelected
                      ? "bg-foreground text-background"
                      : "bg-muted text-muted-foreground hover:bg-foreground hover:text-background"
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Dress Style */}
      <div className="flex flex-col gap-4 pb-6">
        <div 
          className="flex items-center justify-between cursor-pointer"
          onClick={() => toggleSection('style')}
        >
          <h3 className="font-bold text-foreground">Dress Style</h3>
          <ChevronUp className={`w-4 h-4 text-foreground transition-transform duration-200 ${expanded.style ? '' : 'rotate-180'}`} />
        </div>
        {expanded.style && (
          <div className="flex flex-col gap-3 pt-2">
            {dressStyles.map((style) => {
              const styleValue = style.toLowerCase();
              const isSelected = selectedStyles.includes(styleValue);
              return (
                <button
                  key={styleValue}
                  onClick={() => toggleStyle(styleValue)}
                  className="flex items-center justify-between group"
                >
                  <span className={`text-sm font-medium transition-colors ${isSelected ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"}`}>
                    {style}
                  </span>
                  <div className={`w-4 h-4 rounded-[4px] border flex items-center justify-center transition-colors ${isSelected ? "bg-foreground border-foreground text-background" : "border-border group-hover:border-foreground"}`}>
                    {isSelected && <Check className="w-3 h-3" />}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Apply Button */}
      <button
        onClick={handleApply}
        className="w-full bg-foreground text-background font-bold py-3.5 rounded-full hover:opacity-90 transition-opacity mt-2"
      >
        Apply Filter
      </button>
    </aside>
  );
}
