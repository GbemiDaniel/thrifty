"use client";

import Link from "next/link";
import { MoreHorizontal } from "lucide-react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ProductActions({ product, onDeleteClick }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none flex items-center justify-center w-8 h-8 rounded-md hover:bg-muted transition-colors ml-auto">
        <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={`/admin/products/${product.id}`} className="cursor-pointer w-full">
            Edit Product
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="cursor-pointer"
          onClick={() => {
            navigator.clipboard.writeText(product.id);
            toast.success("Product ID copied to clipboard");
          }}
        >
          Copy Product ID
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          className="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10"
          onSelect={() => onDeleteClick(product)}
        >
          Delete Product
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
