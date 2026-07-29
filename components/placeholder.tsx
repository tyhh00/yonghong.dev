import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * A designed image slot. If `src` resolves to a real asset it renders it;
 * otherwise it shows a tasteful framed placeholder (grid + corner ticks +
 * mono label) so the layout reads as intentional, not broken.
 */
export function ImageSlot({
  src,
  alt,
  label = "Image",
  className,
  imgClassName,
  priority,
}: {
  src?: string;
  alt: string;
  label?: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
}) {
  const isReal = src && !src.endsWith(".svg");

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-line bg-bg-elev",
        className
      )}
    >
      {isReal ? (
        <Image
          src={src!}
          alt={alt}
          fill
          priority={priority}
          className={cn("object-cover", imgClassName)}
          sizes="(max-width: 768px) 100vw, 600px"
        />
      ) : (
        <div className="bg-grid absolute inset-0 flex items-center justify-center">
          {/* corner ticks */}
          <Corner className="left-3 top-3" />
          <Corner className="right-3 top-3 rotate-90" />
          <Corner className="bottom-3 right-3 rotate-180" />
          <Corner className="bottom-3 left-3 -rotate-90" />
          <div className="flex flex-col items-center gap-2 text-center">
            <svg viewBox="0 0 24 24" className="h-7 w-7 text-fg-subtle" fill="none" stroke="currentColor" strokeWidth={1.4}>
              <rect x="3" y="4" width="18" height="16" rx="2.5" />
              <circle cx="8.5" cy="9.5" r="1.8" />
              <path d="M4 17l4.5-4 3.5 3 3-2.5L20 17" />
            </svg>
            <span className="mono-label">{label}</span>
          </div>
        </div>
      )}
    </div>
  );
}

function Corner({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={cn("absolute h-4 w-4 text-fg-subtle/50", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.2}
    >
      <path d="M1 6V1h5" />
    </svg>
  );
}
