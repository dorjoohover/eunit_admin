import { FunctionComponent, ReactNode } from "react";
import NextAuthProvider from "@/providers/NextAuthProvider";

import { getCookie } from "@/app/actions/cookies";
import { getSupplier } from "@/services";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: FunctionComponent<MainLayoutProps> = async ({ children }) => {
  let supplier;

  const supplierId = (await getCookie("supplierId"))?.value || "";

  if (supplierId) {
    // global
    supplier = await getSupplier<any>(supplierId);
  }

  return (
    <NextAuthProvider>
      {/* <NavContainer supplier={supplier}> */}
      {children}
      {/* </NavContainer> */}
    </NextAuthProvider>
  );
};

export default MainLayout;
