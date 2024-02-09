import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChevronDownIcon, PaintBucketIcon } from "lucide-react";
import React from "react";

const COLORS_TEXT = ["#eb4034", "#34eb95", "#34e1eb", "#ebae34", "#7434eb", "#db34eb", "#211b6e"];

function BgColor({ bgColor, onBgColorSelect }: { bgColor: string; onBgColorSelect: (value: string, skipHistoryStack: boolean) => void }) {
  console.log(bgColor);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="p-1 flex gap-1 items-center border border-border rounded">
          <div className="border-b-4" style={{ borderColor: bgColor }}>
            <PaintBucketIcon className="w-5 h-5" />
          </div>
          <ChevronDownIcon className="w-4 h-4" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-28">
        <div className="grid grid-cols-4 gap-2">
          <div
            onClick={() => {
              onBgColorSelect("#00000000", true);
            }}
            className="w-4 h-4 border-border border rounded-full cursor-pointer hover:border hover:border-foreground"
            style={{ backgroundColor: "#00000000" }}
          ></div>
          {COLORS_TEXT.map((color) => (
            <div
              key={color}
              onClick={() => {
                onBgColorSelect(color, true);
              }}
              className="w-4 h-4 rounded-full cursor-pointer hover:border border-foreground"
              style={{ backgroundColor: color }}
            ></div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default BgColor;
