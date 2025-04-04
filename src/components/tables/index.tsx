"use client";
import { FunctionComponent, ReactNode, useCallback } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../ui/table";
import { useSidebar } from "../ui/sidebar";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ChevronsLeft, ChevronsRight } from "lucide-react";

interface CustomTableProps {
  headers: string[];
  rows: {
    data: {
      texts?: { text?: string; item?: ReactNode; title?: string }[];
      children?: ReactNode;
    }[];
    title?: string[];
    w?: number[];
  }[];
  totalPage: number;
  currentPage: string;
  total: number;
}
function generateRange(n: number, totalPage: number) {
  let page = n;
  if (totalPage == 1) return [1];
  if (n == totalPage) page--;
  let res = Array.from(
    { length: Math.min(3, totalPage) },
    (_, i) => page - 1 + i
  );

  if (res.includes(0)) {
    res = res.map((r) => r + 1);
  }
  return res;
}
export const CustomTable: FunctionComponent<CustomTableProps> = ({
  headers,
  rows,
  totalPage,
  currentPage,
  // total,
}) => {
  const { open } = useSidebar();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );
  return (
    <div
      className="px-8 pb-8"
      style={{
        width: `calc(100vw - ${open ? "256px" : "50px"} - 64px)`,
      }}
    >
      <Table className="overscroll-x-scroll ">
        <TableHeader>
          <TableRow>
            <TableHead className="text-grey font-semibold">#</TableHead>
            {headers.map((header, i) => {
              return (
                <TableHead
                  className={`text-left text-sm text-grey font-semibold `}
                  key={i}
                >
                  {header}
                </TableHead>
              );
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, i) => {
            return (
              <TableRow key={i}>
                {/* convert hiideg ym hiine */}
                <CustomTableCell
                  texts={[
                    {
                      text: `${
                        (+currentPage - 1) *
                          +(searchParams.get("limit") ?? "10") +
                        i +
                        1
                      }`,
                    },
                  ]}
                />
                {row.data.map((r, k) => {
                  return (
                    <CustomTableCell texts={r.texts} key={k} w={row.w?.[k]}>
                      {r.children}
                    </CustomTableCell>
                  );
                })}

                {/* <CustomTableCell
                  texts={[
                    {
                      title: "Хэрэглэгчийн овог:",
                      text: "Алтангэрэл",
                      item: (
                        <div className="bg-green text-white rounded-xl w-12 text-center font-semibold text-xs py-1">
                          qpay
                        </div>
                      ),
                    },
                  ]}
                /> */}

                {/* <CustomTableCell
                  children={
                    <Button className="bg-green hover:bg-green/70 rounded-xl text-sm">
                      <IoFolderOpen size={20} />
                      Лавлагаа авсан
                    </Button>
                  }
                /> */}
              </TableRow>
            );
          })}
        </TableBody>
        {/* <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter> */}
      </Table>
      <div className="flex space-between items-center">
        <span></span>
        <Pagination>
          <PaginationContent>
            {+currentPage > 1 && (
              <PaginationItem>
                <PaginationLink
                  href={pathname + "?" + createQueryString("page", `1`)}
                  // isActive={ }
                >
                  <ChevronsLeft className="h-4 w-4" />
                </PaginationLink>
              </PaginationItem>
            )}
            {+currentPage > 1 && (
              <PaginationItem>
                <PaginationPrevious
                  href={
                    pathname +
                    "?" +
                    createQueryString("page", `${+currentPage - 1}`)
                  }
                />
              </PaginationItem>
            )}
            {generateRange(+currentPage, totalPage).map((page) => {
              return (
                <PaginationItem key={page}>
                  <PaginationLink
                    href={pathname + "?" + createQueryString("page", `${page}`)}
                    isActive={page == +currentPage}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              );
            })}

            {totalPage - +currentPage > 3 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            {totalPage != +currentPage && totalPage != 0 && (
              <PaginationItem>
                <PaginationNext
                  href={
                    pathname +
                    "?" +
                    createQueryString("page", `${+currentPage + 1}`)
                  }
                />
              </PaginationItem>
            )}
            {totalPage != +currentPage && totalPage != 0 && (
              <PaginationItem>
                <PaginationLink
                  href={
                    pathname + "?" + createQueryString("page", `${totalPage}`)
                  }
                  // isActive={ }
                >
                  <ChevronsRight className="h-4 w-4" />
                </PaginationLink>
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
        <Select
          onValueChange={(e) => {
            router.push(pathname + "?" + createQueryString("limit", `${+e}`));
          }}
        >
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder={searchParams.get("limit") ?? 10} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {[5, 10, 25, 50, 100].map((r, i) => {
                return (
                  <SelectItem value={`${r}`} key={i}>
                    {r}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export const CustomTableCell = ({
  texts,
  w,
  children,
}: {
  texts?: { title?: string; text?: string; item?: ReactNode }[];
  w?: number;
  children?: ReactNode;
}) => {
  return (
    <TableCell className={`w-${w && "["}${w ?? "full"}${w && "px]"}`}>
      {children ?? (
        <div
          className={`font-medium flex flex-col gap-2 w-${w && "["}${
            w ?? "full"
          }${w && "px]"}`}
        >
          {texts?.map((text, i) => {
            return (
              <div
                key={i}
                className={`flex w-full ${
                  text?.title && "gap-5"
                } justify-center items-center`}
              >
                {text?.title && (
                  <span
                    className={`flex-1 text-grey text-${
                      text?.text ? "right" : "left"
                    } text-xs `}
                  >
                    {text?.title}
                  </span>
                )}
                {text?.text && (
                  <span
                    className={`flex-1 text-primary items-center text-left flex gap-1.5 font-bold text-xs`}
                  >
                    {text?.text}
                    {text?.item}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </TableCell>
  );
};
