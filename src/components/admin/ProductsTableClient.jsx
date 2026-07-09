"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Search, ChevronDown, ChevronLeft, ChevronRight, Trash } from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/utils/supabase/client";
import ProductActions from "./ProductActions";
import DeleteProductDialog from "./DeleteProductDialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formatTableText = (text, maxWords = 5, stripHtml = false) => {
  if (!text) return '-';
  let cleanText = text;
  if (stripHtml) {
    cleanText = cleanText.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&'); 
  }
  const words = cleanText.trim().split(/\s+/);
  if (words.length > maxWords) return words.slice(0, maxWords).join(' ') + '...';
  return cleanText;
};

export default function ProductsTableClient({ processedProducts, allCount, draftCount, publishedCount }) {
  const router = useRouter();
  const supabase = createClient();
  const [isDeleting, setIsDeleting] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  
  // 1. Define State Variables
  const [selectedIds, setSelectedIds] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [stockFilter, setStockFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const ITEMS_PER_PAGE = 7;

  const uniqueCategories = useMemo(() => {
    const categories = processedProducts.map(p => p.category).filter(Boolean);
    return ["all", ...Array.from(new Set(categories))];
  }, [processedProducts]);

  // 2. Create the Derived Data Pipeline
  const { paginatedProducts, totalPages, totalFilteredItems } = useMemo(() => {
    let filtered = processedProducts;

    // Filter by Tab
    if (activeTab === 'draft') {
      filtered = filtered.filter(p => (p.status || '').toLowerCase() === 'draft');
    } else if (activeTab === 'published') {
      filtered = filtered.filter(p => (p.status || '').toLowerCase() === 'published');
    }

    // Filter by Search
    if (searchQuery.trim() !== '') {
      const lowerQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(p => (p.title || '').toLowerCase().includes(lowerQuery));
    }

    // 3. Category Filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(p => (p.category || '').toLowerCase() === categoryFilter.toLowerCase());
    }

    // 4. Stock Filter
    if (stockFilter === 'in-stock') {
      filtered = filtered.filter(p => p.totalStock > 0);
    } else if (stockFilter === 'out-of-stock') {
      filtered = filtered.filter(p => p.totalStock === 0);
    }

    // 5. Sorting Engine
    filtered.sort((a, b) => {
      if (sortBy === 'name-asc') return (a.title || '').localeCompare(b.title || '');
      if (sortBy === 'name-desc') return (b.title || '').localeCompare(a.title || '');
      if (sortBy === 'price-desc') return (b.price || 0) - (a.price || 0);
      if (sortBy === 'price-asc') return (a.price || 0) - (b.price || 0);
      if (sortBy === 'stock-desc') return (b.totalStock || 0) - (a.totalStock || 0);
      if (sortBy === 'stock-asc') return (a.totalStock || 0) - (b.totalStock || 0);
      return 0; // default / newest
    });

    const totalFilteredItems = filtered.length;
    const totalPages = Math.ceil(totalFilteredItems / ITEMS_PER_PAGE) || 1;

    // Pagination
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedProducts = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    return { paginatedProducts, totalPages, totalFilteredItems };
  }, [processedProducts, activeTab, searchQuery, currentPage, categoryFilter, stockFilter, sortBy]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const startItem = (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const endItem = Math.min(currentPage * ITEMS_PER_PAGE, totalFilteredItems);

  // Check if all currently visible rows are selected
  const currentIds = paginatedProducts.map(p => p.id);
  const isAllCurrentSelected = currentIds.length > 0 && currentIds.every(id => selectedIds.includes(id));

  const toggleRow = (id) => {
      setSelectedIds(prev => 
          prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
      );
  };

  const toggleAll = () => {
      if (isAllCurrentSelected) {
          // Deselect current page
          setSelectedIds(prev => prev.filter(id => !currentIds.includes(id)));
      } else {
          // Select current page (merging with any already selected on other pages)
          const newIds = new Set([...selectedIds, ...currentIds]);
          setSelectedIds(Array.from(newIds));
      }
  };

  const handleBulkDelete = async () => {
      if (selectedIds.length === 0) return;
      
      setIsDeleting(true);
      const toastId = toast.loading("Deleting selected products...");
      
      try {
          const { error } = await supabase.from('products').delete().in('id', selectedIds);
          if (error) throw error;
          
          toast.success("Products deleted successfully", { id: toastId });
          setSelectedIds([]);
          router.refresh();
      } catch (error) {
          console.error("Bulk delete error:", error);
          toast.error("Failed to delete products.", { id: toastId });
      } finally {
          setIsDeleting(false);
      }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm flex flex-col relative">
      {/* Filter Tabs */}
      <div className="flex items-center gap-6 px-6 pt-4 border-b border-border text-sm">
          <div 
            onClick={() => handleTabClick('all')}
            className={`pb-3 cursor-pointer ${activeTab === 'all' ? 'border-b-2 border-violet-600 text-slate-900 font-semibold' : 'text-muted-foreground hover:text-foreground font-medium transition-colors'}`}
          >
              All <span className={`ml-1 ${activeTab === 'all' ? 'text-slate-500 font-normal' : ''}`}>{allCount}</span>
          </div>
          <div 
            onClick={() => handleTabClick('draft')}
            className={`pb-3 cursor-pointer ${activeTab === 'draft' ? 'border-b-2 border-violet-600 text-slate-900 font-semibold' : 'text-muted-foreground hover:text-foreground font-medium transition-colors'}`}
          >
              Draft <span className={`ml-1 ${activeTab === 'draft' ? 'text-slate-500 font-normal' : ''}`}>{draftCount}</span>
          </div>
          <div 
            onClick={() => handleTabClick('published')}
            className={`pb-3 cursor-pointer ${activeTab === 'published' ? 'border-b-2 border-violet-600 text-slate-900 font-semibold' : 'text-muted-foreground hover:text-foreground font-medium transition-colors'}`}
          >
              Published <span className={`ml-1 ${activeTab === 'published' ? 'text-slate-500 font-normal' : ''}`}>{publishedCount}</span>
          </div>
      </div>

      {/* Toolbar */}
      {selectedIds.length > 0 ? (
          <div className="p-4 flex items-center justify-between border-b border-violet-200 bg-violet-50/50">
              <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-violet-900">
                      {selectedIds.length} product{selectedIds.length > 1 ? 's' : ''} selected
                  </span>
              </div>
              <div className="flex items-center gap-3">
                  <button 
                      onClick={() => setSelectedIds([])}
                      className="text-sm font-medium text-violet-700 hover:bg-violet-100 px-3 py-1.5 rounded-lg transition-colors"
                  >
                      Cancel
                  </button>
                  <button 
                      onClick={handleBulkDelete}
                      disabled={isDeleting}
                      className="flex items-center gap-2 bg-destructive text-white hover:bg-destructive/90 px-4 py-1.5 rounded-lg text-sm font-medium transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                      <Trash className="w-4 h-4" /> {isDeleting ? "Deleting..." : "Delete Selected"}
                  </button>
              </div>
          </div>
      ) : (
      <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between border-b border-border bg-admin-sidebar gap-4">
          <div className="flex flex-wrap items-center gap-3">
            {/* Category Select */}
            <Select 
              value={categoryFilter} 
              onValueChange={(value) => { setCategoryFilter(value); setCurrentPage(1); }}
            >
              <SelectTrigger className="w-auto gap-2 h-9 border-border rounded-xl bg-admin-sidebar text-sm font-medium hover:bg-muted transition-colors capitalize focus:ring-0 focus:ring-offset-0">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="border-b border-border last:border-0 rounded-none">All Categories</SelectItem>
                {uniqueCategories.filter(c => c !== 'all').map(cat => (
                  <SelectItem key={cat} value={cat} className="capitalize border-b border-border last:border-0 rounded-none">{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Stock Select */}
            <Select 
              value={stockFilter} 
              onValueChange={(value) => { setStockFilter(value); setCurrentPage(1); }}
            >
              <SelectTrigger className="w-auto gap-2 h-9 border-border rounded-xl bg-admin-sidebar text-sm font-medium hover:bg-muted transition-colors focus:ring-0 focus:ring-offset-0">
                <SelectValue placeholder="All Stock" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="border-b border-border last:border-0 rounded-none">All Stock</SelectItem>
                <SelectItem value="in-stock" className="border-b border-border last:border-0 rounded-none">In Stock</SelectItem>
                <SelectItem value="out-of-stock" className="border-b border-border last:border-0 rounded-none">Out of Stock</SelectItem>
              </SelectContent>
            </Select>

            {/* Sort Select */}
            <Select 
              value={sortBy} 
              onValueChange={(value) => { setSortBy(value); setCurrentPage(1); }}
            >
              <SelectTrigger className="w-auto gap-2 h-9 border-border rounded-xl bg-admin-sidebar text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors focus:ring-0 focus:ring-offset-0 data-[state=open]:text-foreground">
                <SelectValue placeholder="Sort by: Newest" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest" className="border-b border-border last:border-0 rounded-none">Sort by: Newest</SelectItem>
                <SelectItem value="name-asc" className="border-b border-border last:border-0 rounded-none">Name (A - Z)</SelectItem>
                <SelectItem value="name-desc" className="border-b border-border last:border-0 rounded-none">Name (Z - A)</SelectItem>
                <SelectItem value="price-desc" className="border-b border-border last:border-0 rounded-none">Price (High - Low)</SelectItem>
                <SelectItem value="price-asc" className="border-b border-border last:border-0 rounded-none">Price (Low - High)</SelectItem>
                <SelectItem value="stock-desc" className="border-b border-border last:border-0 rounded-none">Stock (Highest)</SelectItem>
                <SelectItem value="stock-asc" className="border-b border-border last:border-0 rounded-none">Stock (Lowest)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center bg-admin-background border border-border rounded-xl px-3 py-2 w-full sm:w-64">
              <Search className="w-4 h-4 text-muted-foreground mr-2" />
              <input 
                type="text" 
                placeholder="Search" 
                value={searchQuery}
                onChange={handleSearchChange}
                className="bg-transparent border-none outline-none w-full text-sm placeholder:text-muted-foreground" 
              />
          </div>
      </div>
      )}

      {/* Data Table */}
      <div className="overflow-x-auto">
          <table className="admin-table">
              <thead className="admin-table-thead">
                  <tr>
                      <th className="admin-table-th w-12 text-center">
                          <input 
                              type="checkbox" 
                              checked={isAllCurrentSelected}
                              onChange={toggleAll}
                              className="rounded border-slate-300 text-violet-600 focus:ring-violet-600 cursor-pointer" 
                          />
                      </th>
                      <th className="admin-table-th">Product</th>
                      <th className="admin-table-th">Price</th>
                      <th className="admin-table-th">Category</th>
                      <th className="admin-table-th">Total Stock</th>
                      <th className="admin-table-th text-center">Status</th>
                      <th className="admin-table-th text-right w-[100px]">ACTION</th>
                  </tr>
              </thead>
              <tbody className="divide-y divide-border bg-admin-sidebar">
                  {paginatedProducts.length === 0 ? (
                      <tr><td colSpan="7" className="px-6 py-12 text-center text-muted-foreground">No products found.</td></tr>
                  ) : (
                      paginatedProducts.map((product) => {
                          const isSelected = selectedIds.includes(product.id);
                          
                          return (
                              <tr 
                                  key={product.id} 
                                  onClick={() => toggleRow(product.id)}
                                  className={`admin-table-row cursor-pointer transition-all duration-200 ${
                                      isSelected 
                                      ? 'bg-violet-50/80 shadow-[0_1px_3px_rgba(139,92,246,0.1)] border-2 border-violet-400/40 z-10 rounded-xl' 
                                      : 'hover:bg-slate-50/60 border-2 border-transparent z-0'
                                  }`}
                              >
                                  <td 
                                      className="admin-table-td text-center align-middle"
                                      onClick={(e) => e.stopPropagation()}
                                  >
                                      <input 
                                          type="checkbox" 
                                          checked={isSelected}
                                          onChange={() => toggleRow(product.id)}
                                          className="rounded border-slate-300 text-violet-600 focus:ring-violet-600 cursor-pointer w-[18px] h-[18px] transition-transform hover:scale-105" 
                                      />
                                  </td>
                                  <td className="admin-table-td">
                                      <div className="flex items-center gap-3">
                                      <div className="w-10 h-12 bg-muted rounded-md overflow-hidden flex-shrink-0 border border-border flex items-center justify-center">
                                          {product.images && product.images.length > 0 ? (
                                              <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover" />
                                          ) : (
                                              <span className="text-[10px] text-muted-foreground">No img</span>
                                          )}
                                      </div>
                                      <span className="font-semibold text-slate-900">{formatTableText(product.title, 4, false) || 'No Title'}</span>
                                  </div>
                              </td>
                              <td className="admin-table-td text-slate-600">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(product.price || 0)}</td>
                              <td className="admin-table-td text-slate-600 capitalize">{product.category || '-'}</td>
                              <td className="admin-table-td">
                                  <div className="flex items-center gap-2">
                                      <span className={`font-medium ${product.totalStock > 0 ? 'text-foreground' : 'text-destructive'}`}>{product.totalStock}</span>
                                      <span className="text-muted-foreground text-xs">in stock</span>
                                  </div>
                              </td>
                              <td className="admin-table-td text-center">
                                  <span className={`text-sm ${(product.status || '').toLowerCase() === 'published' ? 'text-emerald-600 font-semibold' : 'text-blue-600 font-semibold'}`}>
                                      {product.status ? product.status.charAt(0).toUpperCase() + product.status.slice(1) : 'Draft'}
                                  </span>
                              </td>
                              <td 
                                  className="admin-table-td text-right"
                                  onClick={(e) => e.stopPropagation()}
                              >
                                  <ProductActions product={product} onDeleteClick={setProductToDelete} />
                              </td>
                          </tr>
                          );
                      })
                  )}
              </tbody>
          </table>
      </div>

      {/* Bottom Pagination Bar */}
      <div className="p-4 flex items-center justify-between text-sm text-muted-foreground bg-admin-sidebar rounded-b-xl">
          <div>
            {totalFilteredItems > 0 
              ? `showing ${startItem} - ${endItem} of ${totalFilteredItems}`
              : "showing 0 of 0"}
          </div>
          <div className="flex items-center gap-2">
              <button 
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="w-8 h-8 flex items-center justify-center rounded-md border border-border hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              {Array.from({ length: totalPages }).map((_, idx) => {
                const pageNum = idx + 1;
                if (
                  totalPages <= 7 || 
                  pageNum === 1 || 
                  pageNum === totalPages || 
                  (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                ) {
                  return (
                    <button 
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-8 h-8 flex items-center justify-center rounded-full font-medium ${currentPage === pageNum ? 'bg-foreground text-background' : 'hover:bg-muted'}`}
                    >
                      {pageNum}
                    </button>
                  );
                } else if (
                  pageNum === currentPage - 2 || 
                  pageNum === currentPage + 2
                ) {
                  return <span key={pageNum}>...</span>;
                }
                return null;
              })}

              <button 
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages || totalPages === 0}
                className="w-8 h-8 flex items-center justify-center rounded-md border border-border hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
          </div>
      </div>

      {/* STRATEGY C FIX: Modal lives entirely outside the overflow-x-auto constraint */}
      <DeleteProductDialog 
        product={productToDelete} 
        isOpen={!!productToDelete} 
        onClose={() => setProductToDelete(null)} 
      />
    </div>
  );
}
