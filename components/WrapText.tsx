const classes = {
  title: "wrap-title",
  copy: "wrap-copy",
} as const;

export function WrapText({ text, variant }: { text: string; variant: keyof typeof classes }) {
  const parts = text.split("|");
  return (
    <span className={classes[variant]}>
      {parts.map((part, index) =>
        parts.length === 1 ? (
          <span key={index}>{part}</span>
        ) : (
          <span key={index} className="whitespace-nowrap">
            {index > 0 ? <wbr /> : null}
            {part}
          </span>
        ),
      )}
    </span>
  );
}
