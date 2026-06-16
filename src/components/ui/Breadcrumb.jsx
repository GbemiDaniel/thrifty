import Link from "next/link";

export default function Breadcrumb({ items, className = "" }) {
  return (
    <div className={`flex items-center text-sm text-muted-foreground ${className}`}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div key={item.label} className="flex items-center">
            {isLast || !item.href ? (
              <span className={isLast ? "text-foreground font-medium" : ""}>
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="hover:text-foreground hover:underline transition-colors"
              >
                {item.label}
              </Link>
            )}

            {!isLast && (
              <span className="mx-2 text-muted-foreground/50">&gt;</span>
            )}
          </div>
        );
      })}
    </div>
  );
}
