import { Header } from "@/components/core/Header";
import { TableContainer } from "@/components/core/TableContainer";
import { ReactNode } from "react";

export default function Template({ children }: { children: ReactNode }) {
  return (
    <div className="w-full bg-background">
      <Header />
      <TableContainer>{children}</TableContainer>
    </div>
  );
}
