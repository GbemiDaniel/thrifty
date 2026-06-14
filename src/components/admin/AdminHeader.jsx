import { Search } from "lucide-react";

export default function AdminHeader() {
  return (
    <header className="sticky top-0 z-10 h-20 bg-admin-sidebar flex items-center px-8 border-b border-border">
      <div className="flex items-center bg-muted rounded-xl px-4 py-2 w-full max-w-md">
        <Search className="w-5 h-5 text-muted-foreground mr-2" />
        <input
          type="text"
          placeholder="Search for products..."
          className="bg-transparent border-none outline-none w-full text-sm placeholder:text-muted-foreground"
        />
      </div>
    </header>
  );
}
