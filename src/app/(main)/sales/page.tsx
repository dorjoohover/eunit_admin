import { SalesTable } from "@/components/tables/sales";
import { getSales } from "@/services/sales.service";
import { SearchParamsType } from "@/types";
import { FunctionComponent } from "react";
interface UserPageProps {
  searchParams: SearchParamsType;
}
const Page: FunctionComponent<UserPageProps> = async ({ searchParams }) => {
  const filter = await searchParams;

  const data = await getSales(filter);
  console.log(data);
  return (
    <>
      <SalesTable
        services={data.data}
        totalPage={data.totalPage ?? 0}
        currentPage={data.currentPage ?? 0}
        total={data.total ?? 0}
      />
    </>
  );
};

export default Page;
