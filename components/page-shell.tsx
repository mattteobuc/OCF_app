import type { ReactNode } from "react";
import { Navbar } from "@/components/navbar";
export function PageShell({ children }: { children: ReactNode }) { return <><Navbar /><main className="mx-auto min-h-screen max-w-2xl px-5 py-7">{children}</main></>; }
