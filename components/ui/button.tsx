import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";
export function Button({
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "min-h-11 rounded-[var(--radius-control)] bg-[var(--primary)] px-5 py-3 text-[15px] font-medium text-white shadow-sm transition duration-200 hover:bg-[var(--primary-hover)] hover:shadow-[0_4px_12px_rgb(23_33_43_/_0.12)] disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}
