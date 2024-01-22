import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import React from "react";

function SelectFilter() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Filter" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="Published">Published</SelectItem>
          <SelectItem value="Draft">Draft</SelectItem>
          <SelectItem value="Archive">Archive</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default SelectFilter;
