import { FunctionComponent, ReactNode } from "react";

// import { getSupplier } from "@/services";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: FunctionComponent<MainLayoutProps> = async ({ children }) => {
  // let supplier;

  // const supplierId = (await getCookie("supplierId"))?.value || "";

  // if (supplierId) {
  //   // global
  //   supplier = await getSupplier<any>(supplierId);
  // }

  return (
    // <NextAuthProvider>
    <>{children}</>
    // </NextAuthProvider>
  );
};

export default MainLayout;
