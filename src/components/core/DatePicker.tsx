import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import React from "react";
import { format } from "date-fns";
export const DatePicker = ({
  setDate,
  date,
}: {
  setDate: (e: Date | undefined) => void;
  date?: Date;
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[200px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto z-50 p-0 bg-primary text-white"
        align="start"
      >
        <Calendar
          mode="single"
          selected={date ? new Date(date) : date}
          onSelect={(e) => setDate(e)}
          // initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};
