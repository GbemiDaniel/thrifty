"use client";

import { useForm, useWatch, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { UploadCloud, Trash2, Image as ImageIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";
import imageCompression from 'browser-image-compression';
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import Breadcrumb from "@/components/ui/Breadcrumb";
import RichTextEditor from "@/components/admin/RichTextEditor";
import { Controller } from "react-hook-form";
import ColorPickerField from "@/components/admin/ColorPickerField";

const buildVariantMatrix = (title, category, colors, sizes, existingVariants = []) => {
  let combinations = [];

  if (colors?.length > 0 && sizes?.length > 0) {
    colors.forEach(c => sizes.forEach(s => combinations.push({ name: `${c.name} / ${s}`, color: c, size: s })));
  } else if (colors?.length > 0) {
    colors.forEach(c => combinations.push({ name: c.name, color: c, size: null }));
  } else if (sizes?.length > 0) {
    sizes.forEach(s => combinations.push({ name: s, color: null, size: s }));
  } else {
    combinations.push({ name: "Default", color: null, size: null });
  }

  return combinations.map(combo => {
    const existing = existingVariants.find(v => v.variant_name === combo.name);
    if (existing) return existing; // Preserves typed stock, SKUs, and assigned images

    const catPart = (category || '').substring(0, 3).toUpperCase();
    const titlePart = (title || '').replace(/\s+/g, '').substring(0, 4).toUpperCase();
    const colorPart = combo.color ? combo.color.name.replace(/\s+/g, '').substring(0, 3).toUpperCase() : '';
    const sizePart = combo.size ? combo.size.toUpperCase() : '';
    
    return {
      variant_name: combo.name,
      sku: [catPart, titlePart, colorPart, sizePart].filter(Boolean).join('-'),
      stock: 0,
      image: null // Default empty state
    };
  });
};

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  description: z.string().optional(),
  category: z.string().min(1, "Please select a category."),
  price: z.coerce.number().min(0, "Price must be a positive number."),
  salePrice: z.coerce.number().optional(),
  status: z.string(),
  style: z.string().optional(),
  allowBackorder: z.boolean().default(false),
  weight: z.coerce.number().min(0).optional(),
  colors: z.array(
    z.object({
      name: z.string().min(1, "Color name is required"),
      hex: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Must be a valid hex code")
    })
  ).default([]),
  sizes: z.array(z.string()).default([]),
  variants: z.array(
    z.object({
      variant_name: z.string(),
      sku: z.string().min(1, "SKU required"),
      stock: z.coerce.number().min(0, "Invalid stock"),
      image: z.any().nullable().optional() // Will hold the local file/URL
    })
  ).default([])
});

export default function ProductForm({ initialData = null }) {
  const isEditing = !!initialData;
  const pageTitle = isEditing ? "Edit Product" : "Add Product";
  const router = useRouter();
  const supabase = createClient();

  // Initialize media files from existing images (edit mode) or empty (create mode)
  const [mediaFiles, setMediaFiles] = useState(() => {
    if (initialData?.images?.length) {
      return initialData.images.map((url, idx) => ({
        id: `existing-${idx}`,
        file: null,
        previewUrl: url,
        isExisting: true,
        isOptimized: true
      }));
    }
    return [];
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompressing, setIsCompressing] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.title || "",
      description: initialData?.description || "",
      category: initialData?.category || "",
      price: initialData?.price || 0,
      salePrice: initialData?.sale_price || 0,
      status: initialData?.status || "Draft",
      style: initialData?.dress_style || "",
      allowBackorder: initialData?.allow_backorder || false,
      weight: initialData?.weight || 0,
      colors: initialData?.colors || [],
      sizes: initialData?.sizes || [],
      variants: initialData?.variants || [],
    },
  });

  const watchedColors = useWatch({ control: form.control, name: 'colors' });
  const watchedSizes = useWatch({ control: form.control, name: 'sizes' });
  const watchedTitle = useWatch({ control: form.control, name: 'name' });
  const watchedCategory = useWatch({ control: form.control, name: 'category' });

  const { fields, replace, remove, update } = useFieldArray({ control: form.control, name: "variants" });

  useEffect(() => {
    const currentVariants = form.getValues('variants');
    const newMatrix = buildVariantMatrix(watchedTitle, watchedCategory, watchedColors, watchedSizes, currentVariants);
    replace(newMatrix);
  }, [watchedColors, watchedSizes, watchedTitle, watchedCategory, replace, form]);

  async function onSubmit(data) {
    setIsSubmitting(true);
    const tStart = performance.now();
    try {
      // Separate existing (already-uploaded) images from new file uploads
      const existingUrls = mediaFiles.filter(m => m.isExisting).map(m => m.previewUrl);
      const newMediaFiles = mediaFiles.filter(m => !m.isExisting);

      let newUploadedUrls = [];
      const fileToUrlMap = new Map(); // Tracks local File -> Supabase URL

      // Step A: Upload any NEW compressed images (Parallel)
      if (newMediaFiles.length > 0) {
        const uploadPromises = newMediaFiles.map(async (mediaItem) => {
          const f = mediaItem.file; // Extract raw file for Supabase
          const cleanName = f.name.replace(/[^a-zA-Z0-9.-]/g, '');
          const fileName = `${Date.now()}-opt-${cleanName}`;
          
          const tUploadStart = performance.now();
          const { error: uploadError } = await supabase.storage
            .from("product-images")
            .upload(fileName, f);

          if (uploadError) throw uploadError;

          const { data: publicUrlData } = supabase.storage
            .from("product-images")
            .getPublicUrl(fileName);

          const finalUrl = publicUrlData.publicUrl;
          const tUploadEnd = performance.now();
          console.log(`[Diagnostic] Supabase Upload for ${fileName} took ${(tUploadEnd - tUploadStart).toFixed(2)}ms.`);
          
          return { originalFile: f, finalUrl };
        });

        const tAllUploadsStart = performance.now();
        console.log(`[Diagnostic] Firing Promise.all for ${uploadPromises.length} optimized files...`);
        const results = await Promise.all(uploadPromises);
        const tAllUploadsEnd = performance.now();
        console.log(`[Diagnostic] Promise.all completed in ${(tAllUploadsEnd - tAllUploadsStart).toFixed(2)}ms.`);

        results.forEach(({ originalFile, finalUrl }) => {
          newUploadedUrls.push(finalUrl);
          fileToUrlMap.set(originalFile, finalUrl);
        });
      }

      // Combine existing URLs with newly uploaded URLs
      const allImageUrls = [...existingUrls, ...newUploadedUrls];

      // Step B: Swap Local Variant Images for Remote URLs
      const processedVariants = data.variants.map((variant) => ({
        variant_name: variant.variant_name,
        sku: variant.sku,
        stock: Number(variant.stock),
        // Handle both existing URL strings (edit mode) and File objects (new uploads)
        image: typeof variant.image === 'string'
          ? variant.image
          : variant.image
            ? fileToUrlMap.get(variant.image) || null
            : null,
      }));

      // Step C: Build the product payload
      const productPayload = {
        title: data.name,
        description: data.description,
        category: data.category,
        sub_category: null, 
        price: Number(data.price),
        sale_price: data.salePrice ? Number(data.salePrice) : null,
        status: data.status,
        dress_style: data.style,
        allow_backorder: data.allowBackorder,
        weight: data.weight ? Number(data.weight) : 0,
        images: allImageUrls,
        variants: processedVariants,
        colors: data.colors, 
        sizes: data.sizes,
      };

      // Step D: INSERT or UPDATE based on mode
      const tDbStart = performance.now();
      let dbError;

      if (isEditing) {
        const { error } = await supabase
          .from('products')
          .update(productPayload)
          .eq('id', initialData.id);
        dbError = error;
      } else {
        const { error } = await supabase
          .from("products")
          .insert([productPayload]);
        dbError = error;
      }

      const tDbEnd = performance.now();
      console.log(`[Diagnostic] Database ${isEditing ? 'Update' : 'Insert'} took ${(tDbEnd - tDbStart).toFixed(2)}ms.`);

      if (dbError) throw dbError;

      const tEnd = performance.now();
      console.log(`[Diagnostic] Total onSubmit execution took ${(tEnd - tStart).toFixed(2)}ms.`);

      toast.success(isEditing ? "Product updated successfully!" : "Product published successfully!");
      router.push("/admin/products");
      router.refresh();
    } catch (error) {
      console.error("Publishing Error:", error);
      toast.error(error.message || "An error occurred while saving.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleSubmit = form.handleSubmit(onSubmit);

  // Helper to get image preview URL for a variant (handles both File objects and URL strings)
  function getVariantImagePreview(image) {
    if (!image) return null;
    if (typeof image === 'string') return image; // Already a URL from edit mode
    try {
      return URL.createObjectURL(image); // File object from new upload
    } catch {
      return null;
    }
  }

  const SIZES = ["S", "M", "L", "XL"];

  return (
    <Form {...form}>
      <form 
        onSubmit={handleSubmit} 
        className="w-full"
        onKeyDown={(e) => {
          if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA' && e.target.tagName !== 'BUTTON') {
            e.preventDefault();
          }
        }}
      >
        <div className="flex flex-col gap-6 max-w-6xl mx-auto">
          {/* Unified Header Flexbox */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                {isEditing ? "Edit Product" : "Add Product"}
              </h1>
            </div>
            
            {/* High-Contrast Action Buttons */}
            <div className="flex items-center gap-3">
              <Link 
                href="/admin/products"
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
              >
                Cancel
              </Link>
              <button 
                type="submit"
                onClick={handleSubmit}
                disabled={isSubmitting || isCompressing}
                className="bg-black text-white hover:bg-black/90 px-8 py-2.5 rounded-full font-medium transition-all shadow-sm disabled:opacity-50"
              >
                {isSubmitting ? "Saving..." : isCompressing ? "Optimizing Media..." : isEditing ? "Save Changes" : "Publish"}
              </button>
            </div>
          </div>

          {/* 3. The Form Cards (Keep your existing grid structure below this) */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN */}
          <div className="xl:col-span-2 flex flex-col gap-6">
            
            {/* Details */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col gap-6">
              <h2 className="text-lg font-semibold text-slate-900">Details</h2>
              
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product description</FormLabel>
                    <FormControl>
                      <RichTextEditor value={field.value} onChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

            </div>

            {/* Media */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-900">Media</h2>
                <span className="text-sm text-admin-accent cursor-pointer">+ Embed media</span>
              </div>
              
              <div className="relative border-2 border-dashed border-border rounded-xl p-12 flex flex-col items-center justify-center text-center hover:bg-muted/50 transition-colors bg-admin-background/50">
                <UploadCloud className="w-10 h-10 text-muted-foreground mb-4" />
                <p className="font-bold mb-1">Drag files here or click to select</p>
                <p className="text-xs text-muted-foreground">Png, Jpeg, Mp4 supported up to 20mb max</p>
                <input 
                  type="file" 
                  accept="image/*"
                  multiple
                  onChange={(e) => {
                    const target = e.target;
                    const rawFiles = Array.from(target.files || []);
                    if (rawFiles.length === 0) return;

                    setIsCompressing(true);

                    // 1. Optimistic UI: Instantly generate previews from RAW files
                    const optimisticFiles = rawFiles.map(file => ({
                      id: crypto.randomUUID(), // Unique ID for swapping
                      file: file, // Temporary heavy file
                      previewUrl: URL.createObjectURL(file),
                      isExisting: false,
                      isOptimized: false
                    }));

                    // Instantly paint the UI
                    setMediaFiles(prev => [...prev, ...optimisticFiles]);

                    // 2. Background Processing (Do NOT await this)
                    const options = { maxSizeMB: 0.8, maxWidthOrHeight: 1920, useWebWorker: true };

                    Promise.all(
                      optimisticFiles.map(async (item) => {
                        try {
                          const compressedFile = await imageCompression(item.file, options);
                          
                          // 3. Silent Swap: Replace the heavy file with the optimized one
                          setMediaFiles(current => current.map(stateItem => 
                            stateItem.id === item.id 
                              ? { ...stateItem, file: compressedFile, isOptimized: true }
                              : stateItem
                          ));
                        } catch (error) {
                          console.error("Failed to compress image:", item.file.name);
                        }
                      })
                    ).finally(() => {
                      setIsCompressing(false);
                    });

                    target.value = ''; // Reset input
                  }}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                />
              </div>

              {mediaFiles.length > 0 && (
                <div className="grid grid-cols-4 gap-4 mt-6">
                  {mediaFiles.map((mediaItem, idx) => (
                    <div key={mediaItem.id || idx} className="relative group aspect-square rounded-lg border border-border overflow-hidden bg-muted">
                      <img 
                        src={mediaItem.previewUrl} 
                        alt="Preview" 
                        className={`w-full h-full object-cover transition-opacity ${mediaItem.isOptimized ? 'opacity-100' : 'opacity-50 animate-pulse'}`}
                      />
                      <button
                        type="button"
                        onClick={() => setMediaFiles(prev => prev.filter((_, i) => i !== idx))}
                        className="absolute top-2 right-2 bg-background/80 hover:bg-destructive hover:text-destructive-foreground backdrop-blur-sm p-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>



            {/* Variants (CRITICAL ADDITION) */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col gap-4">
              <h2 className="text-lg font-semibold text-slate-900">Variants & Options</h2>
              
              <FormField
                control={form.control}
                name="colors"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Available Colors</FormLabel>
                    <FormControl>
                      <ColorPickerField value={field.value} onChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="sizes"
                render={() => (
                  <FormItem>
                    <div className="mb-3">
                      <FormLabel className="text-xs">Available Sizes</FormLabel>
                    </div>
                    <div className="flex flex-wrap gap-4">
                      {SIZES.map((item) => (
                        <FormField
                          key={item}
                          control={form.control}
                          name="sizes"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={item}
                                className="flex flex-row items-center space-x-2 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(item)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, item])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== item
                                            )
                                          )
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal text-sm cursor-pointer">
                                  {item}
                                </FormLabel>
                              </FormItem>
                            )
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="mt-8 border-t border-border pt-6">
                <h3 className="font-bold text-sm mb-4">Inventory Matrix</h3>
                <div className="bg-background rounded-xl border border-border overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-muted text-muted-foreground">
                      <tr>
                        <th className="px-4 py-3 font-medium w-14">Img</th>
                        <th className="px-4 py-3 font-medium">Variant</th>
                        <th className="px-4 py-3 font-medium">SKU</th>
                        <th className="px-4 py-3 font-medium w-32">Stock</th>
                        <th className="px-4 py-3 font-medium w-10"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {fields.map((field, index) => (
                        <tr key={field.id} className="border-t border-border">
                          <td className="px-4 py-3">
                            <Popover>
                              <PopoverTrigger asChild>
                                <button
                                  type="button"
                                  className="w-10 h-10 rounded-md border border-dashed border-border flex items-center justify-center bg-muted hover:bg-muted/80 overflow-hidden transition-colors"
                                >
                                  {field.image ? (
                                    <img src={getVariantImagePreview(field.image)} alt="variant" className="w-full h-full object-cover" />
                                  ) : (
                                    <ImageIcon className="w-4 h-4 text-muted-foreground opacity-50" />
                                  )}
                                </button>
                              </PopoverTrigger>
                              <PopoverContent className="w-64 p-3" align="start">
                                <div className="space-y-2">
                                  <h4 className="font-medium text-sm leading-none">Assign Image</h4>
                                  {mediaFiles.length === 0 ? (
                                    <p className="text-xs text-muted-foreground mt-2">Upload images to the main Media section first.</p>
                                  ) : (
                                    <div className="grid grid-cols-3 gap-2 mt-2">
                                      {mediaFiles.map((mediaItem, fileIdx) => (
                                        <button
                                          key={mediaItem.id || fileIdx}
                                          type="button"
                                          onClick={() => {
                                            // Assign the file (for new uploads) or the URL (for existing images)
                                            const imageRef = mediaItem.isExisting ? mediaItem.previewUrl : mediaItem.file;
                                            update(index, { ...field, image: imageRef });
                                          }}
                                          className="aspect-square rounded-md overflow-hidden border-2 border-transparent hover:border-admin-accent focus:border-admin-accent transition-all"
                                        >
                                          <img src={mediaItem.previewUrl} alt="Staged media" className="w-full h-full object-cover" />
                                        </button>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </PopoverContent>
                            </Popover>
                          </td>
                          <td className="px-4 py-3 font-medium whitespace-nowrap">{field.variant_name}</td>
                          <td className="px-4 py-3">
                            <Input {...form.register(`variants.${index}.sku`)} className="h-8 min-w-[150px]" />
                          </td>
                          <td className="px-4 py-3">
                            <Input type="number" {...form.register(`variants.${index}.stock`)} className="h-8 min-w-[80px]" />
                          </td>
                          <td className="px-4 py-3 text-right">
                            <Button 
                              type="button" 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 text-muted-foreground hover:text-destructive"
                              onClick={() => remove(index)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-border">
                <FormField
                  control={form.control}
                  name="allowBackorder"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-xs font-normal text-muted-foreground">
                          Continue selling product when out of stock
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </div>

            </div>

          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col gap-6">
            
            {/* Status */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col gap-4">
              <h2 className="text-base font-semibold text-slate-900">Status</h2>
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Draft">Draft</SelectItem>
                        <SelectItem value="Published">Published</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Organization */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col gap-4">
              <h2 className="text-base font-semibold text-slate-900">Organization</h2>
              
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="men">Men</SelectItem>
                        <SelectItem value="women">Women</SelectItem>
                        <SelectItem value="unisex">Unisex</SelectItem>
                        <SelectItem value="accessories">Accessories</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="style"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Style</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g Casual, Suits etc..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Pricing */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col gap-6">
              <h2 className="text-base font-semibold text-slate-900">Pricing</h2>
              <div className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">Price</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input type="number" placeholder="0.00" {...field} />
                          <span className="absolute right-3 top-2.5 text-sm text-muted-foreground">USD</span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="salePrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">Sale price</FormLabel>
                      <FormControl>
                         <div className="relative">
                          <Input type="number" placeholder="0.00" {...field} />
                          <span className="absolute right-3 top-2.5 text-sm text-muted-foreground">USD</span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Weight */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col gap-4">
              <h2 className="text-base font-semibold text-slate-900">Weight</h2>
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex">
                        <Input type="number" placeholder="0" className="rounded-r-none" {...field} />
                        <select className="bg-muted border border-l-0 border-border px-3 text-sm text-muted-foreground outline-none rounded-r-md">
                          <option>g</option>
                          <option>kg</option>
                        </select>
                      </div>
                    </FormControl>
                    <FormDescription className="text-xs mt-2">
                      Used to calculate shipping rates at checkout.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>



          </div>
        </div>
        </div>
      </form>
    </Form>
  );
}
