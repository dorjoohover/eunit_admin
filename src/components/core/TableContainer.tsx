"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Dispatch, ReactNode, useState } from "react";
import { usePathname } from "next/navigation";
import { InputType } from "@/lib/constant";
import { DatePicker } from "./DatePicker";
function values(p: string) {
  let path = p.substring(1);
  let value = {
    title: "",
  };
  if (path == "users")
    value = {
      title: "Хэрэглэгчдийн жагсаалт",
    };
  if (path == "sales")
    value = {
      title: "Борлуулалтын жагсаалт",
    };
  return value;
}
function tableFilters(path: string, onChange: Dispatch<any>) {
  let filters: {
    pl: string;
    l: string;
    onChange: (e: string | Date) => void;
    type: number;
  }[] = [];
  switch (path) {
    case "users":
      filters = [
        {
          pl: "Овог",
          l: "Овог",
          onChange: (e) => {
            onChange((prev: any) => ({ ...prev, lastname: e }));
          },
          type: InputType.text,
        },
        {
          pl: "Нэр",
          l: "Нэр",
          onChange: (e) => {
            onChange((prev: any) => ({ ...prev, firstname: e }));
          },
          type: InputType.text,
        },
        {
          pl: "Цахим хаяг",
          l: "Цахим хаяг",
          onChange: (e) => {
            onChange((prev: any) => ({ ...prev, email: e }));
          },
          type: InputType.email,
        },
        {
          pl: "Утасны дугаар",
          l: "Утасны дугаар",
          onChange: (e) => {
            onChange((prev: any) => ({ ...prev, phone: e }));
          },
          type: InputType.number,
        },
        {
          pl: "Огноо",
          l: "Огноо",
          onChange: (e) => {
            onChange((prev: any) => ({ ...prev, date: e }));
          },
          type: InputType.date,
        },
      ];
  }
  return filters;
}

function tableFiltersComponents(p: string, onChange: Dispatch<any>) {
  const path = p.substring(1);
  const filters = tableFilters(path, onChange);
  return filters.map((f) => {
    let type = "text";

    return (
      <div>
        <Label htmlFor={`${f.type}`}>{f.l}</Label>

        {f.type == InputType.text && (
          <Input
            type={"text"}
            id={`${f.type}`}
            placeholder={f.pl}
            onChange={(e) => {
              f.onChange(e.target.value);
            }}
          />
        )}
        {f.type == InputType.number && (
          <Input
            type={"number"}
            min={0}
            id={`${f.type}`}
            pattern="[0-9]"
            placeholder={f.pl}
            onChange={(e) => {
              f.onChange(e.target.value);
            }}
          />
        )}
        {f.type == InputType.email && (
          <Input
            type={"email"}
            id={`${f.type}`}
            placeholder={f.pl}
            onChange={(e) => {
              f.onChange(e.target.value);
            }}
          />
        )}
        {f.type == InputType.date && (
          <DatePicker
            setDate={(e) => {
              if (e) f.onChange(e);
            }}
          />
        )}
      </div>
    );
  });
}

export const TableContainer = ({ children }: { children: ReactNode }) => {
  let pathname = usePathname();
  const [filters, setFilters] = useState<any>();
  const value = values(pathname);
  return (
    <div className="mx-6 my-5 rounded-md bg-white  ">
      <div className="px-8 py-6 mb-3  border-b">
        <h1 className="font-semibold text-primary text-lg">{value.title}</h1>
      </div>
      {JSON.stringify(filters)}
      <div>
        <div className="flex items-end gap-4 mx-6 mb-8">
          {tableFiltersComponents(pathname, setFilters)}
          <Button
            size={"lg"}
            className="bg-blue hover:bg-blue/70 hover:text-white/70"
          >
            <Image
              src={"icons/search.svg"}
              alt="search"
              width={20}
              height={20}
            />
            Хайх
          </Button>
          <Button
            size={"lg"}
            className="bg-green hover:bg-green/70 hover:text-white/70"
          >
            <Image
              src={"icons/download.svg"}
              alt="download"
              width={20}
              height={20}
            />
            Татах
          </Button>
        </div>
        {children}
      </div>
    </div>
  );
};
