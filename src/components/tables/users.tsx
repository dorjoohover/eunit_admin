import { UserType } from "@/types";
import { FunctionComponent, ReactNode } from "react";
import { CustomTable } from ".";
import { dateFormatter } from "@/lib/utils";

interface UserTableProps {
  users: UserType[];
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

function userFormatter(user: UserType): {
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
  const titles = ["lastname", "firstname", "email", "phone", "total"].map((t) =>
    giveNameToRow(t)
  );
  return {
    data: [
      {
        texts: [
          {
            text: user.lastname ?? "Байхгүй",
            title: giveNameToRow("lastname"),
          },
          {
            text: user.firstname ?? user.name ?? "Байхгүй",
            title: giveNameToRow("firstname"),
          },
        ],
      },
      {
        texts: [
          { text: user.email ?? "Байхгүй", title: giveNameToRow("email") },
        ],
      },
      {
        texts: [
          {
            text: user.phone?.replace("+976", ""),
            title: giveNameToRow("phone"),
          },
        ],
      },
      {
        texts: [{ text: "2,000.00 ₮", title: giveNameToRow("total") }],
      },
      {
        texts: [{ title: dateFormatter(user.createdAt) }],
      },
    ],
    title: titles,
    w: [300, 250, 150, 200, 250],
  };
}

export const UserTable: FunctionComponent<UserTableProps> = ({
  users,
  totalPage,
  currentPage,
  total,
}) => {
  const headers = [
    "Овог, нэр",

    "Цахим хаяг",
    "Утасны дугаар",
    "Нийт худалдан авалт",

    "Бүртгүүлсэн огноо",
  ];
  return (
    <CustomTable
      headers={headers}
      rows={users.map((user) => {
        return userFormatter(user);
      })}
      currentPage={currentPage}
      total={total}
      totalPage={totalPage}
    />
  );
};
