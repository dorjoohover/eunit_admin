"use client";
import { FunctionComponent, ReactNode } from "react";
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableFooter,
} from "../ui/table";
import { Button } from "../ui/button";
import { IoFolderOpen } from "react-icons/io5";
import { UserType } from "@/types";
import { useSidebar } from "../ui/sidebar";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];
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
  currentPage: number;
  total: number;
}
export const CustomTable: FunctionComponent<CustomTableProps> = ({
  headers,
  rows,
  totalPage,
  currentPage,
  total,
}) => {
  const { open } = useSidebar();
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
                      text: `${i + 1}`,
                    },
                  ]}
                />
                {row.data.map((r, k) => {
                  return (
                    <CustomTableCell
                      texts={r.texts}
                      children={r.children}
                      key={k}
                      w={row.w?.[k]}
                    />
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
