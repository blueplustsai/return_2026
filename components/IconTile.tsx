import type { ReactNode } from "react";

export function IconTile({
  children,
  className = "size-[46px]",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`grid place-items-center rounded-xl bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] text-white ${className}`}
    >
      {children}
    </div>
  );
}
