"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { UploadCloud } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
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

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  description: z.string().optional(),
  category: z.string().min(1, "Please select a category."),
  sku: z.string().min(1, "SKU is required."),
  price: z.coerce.number().min(0, "Price must be a positive number."),
  salePrice: z.coerce.number().optional(),
  status: z.string(),
  style: z.string().optional(),
  inventory: z.coerce.number().min(0),
  allowBackorder: z.boolean().default(false),
  weight: z.coerce.number().min(0).optional(),
  colors: z.string().optional(),
  sizes: z.array(z.string()).default([]),
});

export default function AddProductPage() {
  const router = useRouter();
  const supabase = createClient();
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      sku: "",
      price: 0,
      salePrice: 0,
      status: "Draft",
      style: "",
      inventory: 0,
      allowBackorder: false,
      weight: 0,
      colors: "",
      sizes: [],
    },
  });

  async function onSubmit(data) {
    setIsSubmitting(true);
    try {
      let imageUrls = [];

      // Step A: Image Upload
      if (file) {
        const fileName = `${Date.now()}-${file.name}`;
        const { error: uploadError } = await supabase.storage
          .from("product-images")
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from("product-images")
          .getPublicUrl(fileName);

        imageUrls = [publicUrlData.publicUrl];
      }

      // Step B: Database Insert
      const { error: dbError } = await supabase.from("products").insert([
        {
          title: data.name,
          description: data.description,
          category: data.category,
          sub_category: null, 
          sku: data.sku,
          price: Number(data.price),
          sale_price: data.salePrice ? Number(data.salePrice) : null,
          status: data.status,
          dress_style: data.style,
          inventory_count: Number(data.inventory),
          allow_backorder: data.allowBackorder,
          images: imageUrls,
          colors: data.colors ? data.colors.split(",").map((c) => c.trim()) : [],
          sizes: data.sizes,
        },
      ]);

      if (dbError) throw dbError;

      // Step C: User Feedback & Redirect
      toast.success("Product published!");
      router.push("/admin/products");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error(error.message || "An error occurred while publishing.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const SIZES = ["S", "M", "L", "XL"];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-foreground">Add Product</h1>
          <div className="flex items-center gap-4">
            <Button variant="ghost" type="button" className="text-muted-foreground hover:bg-muted/50">
              Cancel
            </Button>
            <Button disabled={isSubmitting} type="submit" className="bg-admin-accent text-admin-accent-foreground hover:bg-admin-accent/90 rounded-xl px-8">
              {isSubmitting ? "Publishing..." : "Publish"}
            </Button>
          </div>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN */}
          <div className="xl:col-span-2 flex flex-col gap-6">
            
            {/* Details */}
            <div className="bg-admin-sidebar rounded-xl shadow-sm p-6 flex flex-col gap-6">
              <h2 className="font-bold text-lg">Details</h2>
              
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
                      <Textarea placeholder="Describe the product..." className="min-h-[120px]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
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
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="sku"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SKU number</FormLabel>
                      <FormControl>
                        <Input placeholder="##########" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Media */}
            <div className="bg-admin-sidebar rounded-xl shadow-sm p-6 flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-lg">Media</h2>
                <span className="text-sm text-admin-accent cursor-pointer">+ Embed media</span>
              </div>
              
              <div className="relative border-2 border-dashed border-border rounded-xl p-12 flex flex-col items-center justify-center text-center hover:bg-muted/50 transition-colors bg-admin-background/50">
                <UploadCloud className="w-10 h-10 text-muted-foreground mb-4" />
                <p className="font-bold mb-1">Drag files here or click to select</p>
                <p className="text-xs text-muted-foreground">Png, Jpeg, Mp4 supported up to 20mb max</p>
                {file && <p className="text-sm font-medium text-admin-accent mt-4 z-10">Selected: {file.name}</p>}
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                />
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-admin-sidebar rounded-xl shadow-sm p-6 flex flex-col gap-6">
              <h2 className="font-bold text-lg">Pricing</h2>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input type="number" placeholder="0.00" {...field} />
                          <span className="absolute right-3 top-2.5 text-sm text-muted-foreground">NGN</span>
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
                      <FormLabel>Sale price</FormLabel>
                      <FormControl>
                         <div className="relative">
                          <Input type="number" placeholder="0.00" {...field} />
                          <span className="absolute right-3 top-2.5 text-sm text-muted-foreground">NGN</span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col gap-6">
            
            {/* Status */}
            <div className="bg-admin-sidebar rounded-xl shadow-sm p-6 flex flex-col gap-4">
              <h2 className="font-bold text-sm">Status</h2>
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

            {/* Style */}
            <div className="bg-admin-sidebar rounded-xl shadow-sm p-6 flex flex-col gap-4">
              <h2 className="font-bold text-sm">Style</h2>
              <FormField
                control={form.control}
                name="style"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="e.g Casual, Suits etc..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Inventory */}
            <div className="bg-admin-sidebar rounded-xl shadow-sm p-6 flex flex-col gap-4">
              <h2 className="font-bold text-sm">Inventory</h2>
              <FormField
                control={form.control}
                name="inventory"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="number" placeholder="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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

            {/* Weight */}
            <div className="bg-admin-sidebar rounded-xl shadow-sm p-6 flex flex-col gap-4">
              <h2 className="font-bold text-sm">Weight</h2>
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

            {/* Variants (CRITICAL ADDITION) */}
            <div className="bg-admin-sidebar rounded-xl shadow-sm p-6 flex flex-col gap-4 border-l-4 border-admin-accent">
              <h2 className="font-bold text-sm text-admin-accent">Variants & Options</h2>
              
              <FormField
                control={form.control}
                name="colors"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Available Colors</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Red, Blue, Black" {...field} />
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
            </div>

          </div>
        </div>
      </form>
    </Form>
  );
}
