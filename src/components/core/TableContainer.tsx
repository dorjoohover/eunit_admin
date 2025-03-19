"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { usePathname } from "next/navigation";
import { InputType, SERVICE } from "@/lib/constant";
import { DatePicker } from "./DatePicker";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { changePathAction } from "@/app/actions/main";

function values(p: string) {
  const path = p.substring(1);
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
function tableFilters(
  path: string,
  onChange: Dispatch<
    SetStateAction<
      | {
          [key: string]: string;
        }
      | undefined
    >
  >,
  data?: { value: string | number; name: string }[]
) {
  let filters: {
    pl: string;
    l: string;
    onChange: (e: string | Date) => void;
    type: number;
    key: string;
    data?: { value: string | number; name: string }[];
  }[] = [];
  switch (path) {
    case "users":
      filters = [
        {
          pl: "Овог",
          l: "Овог",
          onChange: (e) => {
            onChange((prev) => ({ ...prev, lastname: e as string }));
          },
          key: "lastname",
          type: InputType.text,
        },
        {
          pl: "Нэр",
          l: "Нэр",
          onChange: (e) => {
            onChange((prev) => ({ ...prev, firstname: e as string }));
          },
          type: InputType.text,
          key: "firstname",
        },
        {
          pl: "Цахим хаяг",
          l: "Цахим хаяг",
          key: "email",
          onChange: (e) => {
            onChange((prev) => ({ ...prev, email: e as string }));
          },
          type: InputType.email,
        },
        {
          key: "phone",
          pl: "Утасны дугаар",
          l: "Утасны дугаар",
          onChange: (e) => {
            onChange((prev) => ({ ...prev, phone: e as string }));
          },
          type: InputType.number,
        },
        {
          pl: "Огноо",
          key: "date",
          l: "Огноо",
          onChange: (e) => {
            onChange((prev) => ({ ...prev, date: e as string }));
          },
          type: InputType.date,
        },
      ];
      break;
    case "sales":
      filters = [
        {
          pl: "Хэрэглэгч",
          l: "Хэрэглэгч",
          key: "user",
          onChange: (e) => {
            onChange((prev) => ({ ...prev, user: e as string }));
          },
          type: InputType.combobox,
          data: data,
        },
        {
          pl: "Цахим хаяг",
          key: "email",
          l: "Цахим хаяг",
          onChange: (e) => {
            onChange((prev) => ({ ...prev, email: e as string }));
          },
          type: InputType.email,
        },
        {
          pl: "Утасны дугаар",
          key: "phone",
          l: "Утасны дугаар",
          onChange: (e) => {
            onChange((prev) => ({ ...prev, phone: e as string }));
          },
          type: InputType.number,
        },
        {
          pl: "Үйлчилгээ",
          l: "Үйлчилгээ",
          key: "service",
          onChange: (e) => {
            onChange((prev) => ({ ...prev, service: e as string }));
          },
          data: [
            {
              name: "Лавлагаа",
              value: SERVICE.REVIEW,
            },
            {
              name: "Дата",
              value: SERVICE.DATA,
            },
          ],
          type: InputType.select,
        },
        {
          pl: "Огноо",
          l: "Огноо",
          key: "date",
          onChange: (e) => {
            onChange((prev) => ({ ...prev, date: e as string }));
          },
          type: InputType.date,
        },
      ];
      break;
  }
  return filters;
}

function TableFiltersComponents(
  p: string,
  filter:
    | {
        [key: string]: string;
      }
    | undefined,
  onChange?: Dispatch<
    SetStateAction<
      | {
          [key: string]: string;
        }
      | undefined
    >
  >,
  data?: { name: string; value: string | number }[]
) {
  const path = p.substring(1);
  const filters = tableFilters(path, onChange!, data);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  return filters.map((f, i) => {
    return (
      <div key={i}>
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
        {f.type == InputType.select && (
          <Select onValueChange={(e) => f.onChange(e)}>
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Сонгоно уу" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {f.data?.map((d, i) => (
                  <SelectItem value={`${d.value}`} key={i}>
                    {d.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
        {f.type == InputType.combobox && (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[150px] justify-between"
              >
                {value
                  ? f.data?.find((d) => d.value === value)?.name
                  : "Сонгоно уу"}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[150px] p-0">
              <Command>
                <CommandInput placeholder="Хайх..." />
                <CommandList>
                  <CommandEmpty>Үр дүн олдсонгүй.</CommandEmpty>
                  <CommandGroup>
                    {f.data?.map((d) => (
                      <CommandItem
                        key={d.value}
                        value={`${d.value}`}
                        onSelect={(e) => {
                          setValue(e === value ? "" : e);
                          f.onChange(e === value ? "" : e);
                          setOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            value === d.value ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {d.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        )}
        {f.type == InputType.date && (
          <DatePicker
            setDate={(e) => {
              if (e) f.onChange(e);
            }}
            date={filter?.[f.key] ? new Date(filter?.[f.key]) : undefined}
          />
        )}
      </div>
    );
  });
}

export const TableContainer = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const [filters, setFilters] = useState<{ [key: string]: string }>();
  const value = values(pathname);
  const path = pathname.substring(1).split("/")[0].split("?")[0];
  const data: { name: string; value: string | number }[] = [];
  return (
    <div className="mx-6 my-5 rounded-md bg-white  ">
      <div className="px-8 py-6 mb-3  border-b">
        <h1 className="font-semibold text-primary text-lg">{value.title}</h1>
      </div>
      <div>
        <form action={`/${path}`}>
          <div className="flex items-end gap-4 mx-6 mb-8">
            {TableFiltersComponents(pathname, filters, setFilters, data)}
            <Button
              size={"lg"}
              onClick={() => changePathAction(`/${path}`, filters)}
              type="reset"
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
        </form>

        {children}
      </div>
    </div>
  );
};
