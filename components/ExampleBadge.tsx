export function ExampleBadge({ children = "範例" }: { children?: string }) {
  return (
    <span className="ml-1.5 inline-block align-middle rounded border border-[#FBBF24] px-[5px] text-[11px] leading-[1.45] text-[#FBBF24]">
      {children}
    </span>
  );
}
