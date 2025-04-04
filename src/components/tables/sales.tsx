import { SaleType } from "@/types";
import { FunctionComponent, ReactNode } from "react";
import { CustomTable } from ".";
import { dateFormatter } from "@/lib/utils";
import { money, PAYMENT, SERVICE } from "@/lib/constant";
import { IoFolderOpen } from "react-icons/io5";

interface SalesTableProps {
  services: SaleType[];
  totalPage: number;
  currentPage: string;
  total: number;
}

function giveNameToRow(type: string) {
  let name = "";
  switch (type) {
    case "lastname":
      name = "Овог:";
      break;
    case "firstname":
      name = "Нэр:";
      break;
    case "email":
      name = "Цахим хаяг:";
      break;
    case "phone":
      name = "Утас:";
      break;
    case "total":
      name = "Үнийн дүн:";
      break;
  }
  return name;
}

function bg(payment: number) {
  switch (payment) {
    case PAYMENT.QPAY:
      return "green";
    case PAYMENT.LOYALTY:
      return "blue";
    case SERVICE.REVIEW:
      return "green";
    case SERVICE.DATA:
      return "blue";
  }
}
function text(payment: number) {
  switch (payment) {
    case PAYMENT.QPAY:
      return "Qpay";
    case PAYMENT.LOYALTY:
      return "Loyalty";
    case SERVICE.REVIEW:
      return "Лавлагаа авсан";
    case SERVICE.DATA:
      return "Дата мэдээлэл";
  }
}

function serviceFormatter(service: SaleType): {
  data: {
    texts?: {
      text?: string;
      item?: ReactNode;
      title?: string;
    }[];
    children?: ReactNode;
  }[];
  title?: string[];
  w?: number[];
} {
  const titles = [
    "lastname",
    "firstname",
    "email",
    "phone",
    "point",
    "method",
    "createdAt",
  ].map((t) => giveNameToRow(t));
  return {
    data: [
      {
        texts: [
          {
            text: service?.user?.lastname ?? "Байхгүй",
            title: giveNameToRow("lastname"),
          },
          {
            text: service?.user?.firstname ?? service?.user?.name ?? "Байхгүй",
            title: giveNameToRow("firstname"),
          },
        ],
      },
      {
        texts: [
          {
            text: service?.user?.email ?? "Байхгүй",
            title: giveNameToRow("email"),
          },
          {
            text: service?.user?.phone?.replace("+976", ""),
            title: giveNameToRow("phone"),
          },
        ],
      },

      {
        texts: [
          {
            text: `${money(`${Math.abs(service.point)}`)}₮`,
            title: giveNameToRow("total"),
            item: (
              <a
                className={`w-[60px] text-center rounded-xl ${
                  service.request?.status == 10 && "text-white"
                } py-1 ${
                  service.request?.status == 10 &&
                  `bg-${bg(service.paymentType)}`
                }`}
                target="_blank"
                href={`https://www.eunit.mn/report/result?id=${service.request?.id}`}
              >
                {text(service.paymentType)}
              </a>
            ),
          },
        ],
      },
      {
        texts: [{ title: dateFormatter(service?.createdAt ?? "") }],
      },
      {
        children: (
          <div
            className={`bg-${bg(
              service?.request?.service
            )} font-semibold flex text-sm text-white rounded-[50px] px-4 py-2`}
          >
            <IoFolderOpen size={20} />
            <p className="text-nowrap ml-2">
              {text(service?.request?.service)}
            </p>
          </div>
        ),
      },
    ],
    title: titles,
    w: [300, 300, 250, 250, 200],
  };
}

export const SalesTable: FunctionComponent<SalesTableProps> = ({
  services,
  totalPage,
  currentPage,
  total,
}) => {
  const headers = [
    "Хэрэглэгч",
    "Холбогдох мэдээлэл",
    "Төлбөр төлөлт",
    "Огноо",
    "Үйлчилгээ",
  ];
  return (
    <CustomTable
      headers={headers}
      rows={services.map((service) => {
        return serviceFormatter(service);
      })}
      currentPage={currentPage}
      total={total}
      totalPage={totalPage}
    />
  );
};
