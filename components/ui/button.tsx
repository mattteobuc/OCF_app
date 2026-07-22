import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";
export function Button({
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "rounded-[var(--radius-control)] bg-[var(--primary)] px-4 py-3 font-semibold text-white shadow-sm transition duration-200 hover:bg-[var(--primary-hover)] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}
