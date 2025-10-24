import type { ReactNode } from "react";
import Sidebar from "./Sidebar";

interface AppLayoutProps {
  children: ReactNode;
  className?: string;
}

export default function AppLayout({
  children,
  className = "",
}: AppLayoutProps) {
  return (
    <Sidebar>
      <div className={`px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
    </Sidebar>
  );
}
