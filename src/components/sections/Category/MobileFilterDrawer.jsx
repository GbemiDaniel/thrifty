"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { ChevronRight, ChevronUp, Check, Filter } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function MobileFilterDrawer() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isOpen, setIsOpen] = useState(false);

  // Local draft states
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedStyles, setSelectedStyles] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 200]);

  // Accordion state
  const [expanded, setExpanded] = useState({ type: true, price: true, colors: true, size: true, style: true });

  // Populate local state from URL search params on mount and when drawer opens
  useEffect(() => {
    if (!isOpen) return;
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
    
    const initialMin = minPriceParam ? parseInt(minPriceParam) : 0;
    const initialMax = maxPriceParam ? parseInt(maxPriceParam) : 200;
    setPriceRange([initialMin, initialMax]);
  }, [searchParams, isOpen]);

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

    if (priceRange[0] > 0) {
      params.set("minPrice", priceRange[0]);
    } else {
      params.delete("minPrice");
    }

    if (priceRange[1] < 200) {
      params.set("maxPrice", priceRange[1]);
    } else {
      params.delete("maxPrice");
    }

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
    setIsOpen(false);
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
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button className="flex items-center gap-2 text-sm font-bold uppercase">
          <Filter className="w-4 h-4" /> Filter
        </button>
      </SheetTrigger>
      {/* Mobile drawer: taking up most of the screen but acting as a bottom drawer */}
      <SheetContent side="bottom" className="!h-[85vh] flex flex-col gap-0 p-0">
        <SheetHeader className="px-6 py-4 border-b border-border text-left">
          <SheetTitle className="font-bold text-lg">Filters</SheetTitle>
        </SheetHeader>

        {/* Scrollable body with padding so the content isn't cut off by sticky footer */}
        <div className="flex-1 overflow-y-auto min-h-0 px-6 py-4 flex flex-col gap-6">
            
            {/* Categories */}
            <div className="flex flex-col gap-4 pb-6 border-b border-border">
              {/* Note: Preserved accordion header for Categories based on instructions */}
              <div 
                className="flex items-center justify-between cursor-pointer"
                onClick={() => toggleSection('type')}
              >
                <h3 className="font-bold text-foreground text-sm">Categories</h3>
                <ChevronUp className={`w-4 h-4 text-foreground transition-transform duration-200 ${expanded.type ? '' : 'rotate-180'}`} />
              </div>
              {expanded.type && (
                <div className="flex flex-col gap-4 pt-2">
                  {categories.map((cat) => {
                    const isSelected = selectedTypes.includes(cat);
                    return (
                      <button
                        key={cat}
                        onClick={() => toggleType(cat)}
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
                <h3 className="font-bold text-foreground text-sm">Price</h3>
                <ChevronUp className={`w-4 h-4 text-foreground transition-transform duration-200 ${expanded.price ? '' : 'rotate-180'}`} />
              </div>
              {expanded.price && (
                <div className="pt-2">
                  <Slider 
                    defaultValue={[0, 200]} 
                    max={200} 
                    step={5} 
                    value={priceRange} 
                    onValueChange={setPriceRange} 
                    className="my-6" 
                  />
                  <div className="flex justify-between items-center mt-4 text-sm text-foreground">
                    <span>${priceRange[0]}</span>
                    <span>$<span className="font-bold">{priceRange[1]}</span></span>
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
                <h3 className="font-bold text-foreground text-sm">Colors</h3>
                <ChevronUp className={`w-4 h-4 text-foreground transition-transform duration-200 ${expanded.colors ? '' : 'rotate-180'}`} />
              </div>
              {expanded.colors && (
                <div className="grid grid-cols-6 gap-3 pt-2">
                  {colors.map((color) => {
                    const isSelected = selectedColors.includes(color.name);
                    const isWhite = color.name === "White";
                    return (
                      <button
                        key={color.name}
                        onClick={() => toggleColor(color.name)}
                        className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 ${color.class} ${
                          isWhite ? "border border-border" : ""
                        } ${isSelected ? "ring-2 ring-foreground ring-offset-2" : ""}`}
                        aria-label={`Select ${color.name} color`}
                      >
                        {isSelected && (
                          <Check
                            className={`w-4 h-4 ${isWhite ? "text-black" : "text-white"}`}
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
                <h3 className="font-bold text-foreground text-sm">Size</h3>
                <ChevronUp className={`w-4 h-4 text-foreground transition-transform duration-200 ${expanded.size ? '' : 'rotate-180'}`} />
              </div>
              {expanded.size && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {sizes.map((size) => {
                    const isSelected = selectedSizes.includes(size);
                    return (
                      <button
                        key={size}
                        onClick={() => toggleSize(size)}
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
            <div className="flex flex-col gap-4 pb-4">
              <div 
                className="flex items-center justify-between cursor-pointer"
                onClick={() => toggleSection('style')}
              >
                <h3 className="font-bold text-foreground text-sm">Dress Style</h3>
                <ChevronUp className={`w-4 h-4 text-foreground transition-transform duration-200 ${expanded.style ? '' : 'rotate-180'}`} />
              </div>
              {expanded.style && (
                <div className="flex flex-col gap-3 pt-2">
                  {dressStyles.map((style) => {
                    const isSelected = selectedStyles.includes(style);
                    return (
                      <button
                        key={style}
                        onClick={() => toggleStyle(style)}
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
            
        </div>

        {/* Sticky Footer */}
        <div className="p-4 border-t border-border bg-background shrink-0">
          <button
            onClick={handleApply}
            className="w-full bg-foreground text-background font-bold py-3.5 rounded-full hover:opacity-90 transition-opacity"
          >
            Apply Filter
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
