// Энэ файл app/ (root) түвшинд байсан тул Header/TableContainer-г
// БҮХ route (үүнд /login ч орно) дээр render хийж байсан. Одоо зөвхөн
// (main) route group-д хамаарах болгож app/(main)/template.tsx руу
// шилжүүлэв — /login цэвэрхэн харагдана.
import { ReactNode } from "react";

export default function Template({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
