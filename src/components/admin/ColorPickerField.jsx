import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export default function ColorPickerField({ value = [], onChange }) {
  const [colorName, setColorName] = useState("");
  const [colorHex, setColorHex] = useState("#000000");

  const handleAdd = () => {
    if (!colorName.trim()) return;
    const newColor = { name: colorName.trim(), hex: colorHex };
    onChange([...value, newColor]);
    setColorName("");
  };

  const handleRemove = (indexToRemove) => {
    onChange(value.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Input 
          placeholder="Color Name" 
          value={colorName} 
          onChange={(e) => setColorName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleAdd();
            }
          }}
          className="flex-1"
        />
        <input 
          type="color" 
          value={colorHex}
          onChange={(e) => setColorHex(e.target.value)}
          className="w-10 h-10 p-1 rounded-md cursor-pointer border border-border" 
        />
        <Button type="button" variant="secondary" onClick={handleAdd}>
          Add
        </Button>
      </div>

      {value.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {value.map((color, index) => (
            <div 
              key={index} 
              className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-full text-sm"
            >
              <div 
                className="w-4 h-4 rounded-full border border-slate-300" 
                style={{ backgroundColor: color.hex }}
              />
              <span className="font-medium text-slate-700">{color.name}</span>
              <button 
                type="button" 
                onClick={() => handleRemove(index)}
                className="text-slate-400 hover:text-red-500 transition-colors ml-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
