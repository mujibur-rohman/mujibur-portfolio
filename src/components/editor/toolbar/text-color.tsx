import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CaseSensitiveIcon, ChevronDownIcon } from "lucide-react";
import { useTheme } from "next-themes";
import React from "react";

const COLORS_TEXT = ["#eb4034", "#34eb95", "#34e1eb", "#ebae34", "#7434eb", "#db34eb", "#211b6e"];

function TextColor({ fontColor, onFontColorSelect }: { fontColor: string; onFontColorSelect: (value: string, skipHistoryStack: boolean) => void }) {
  const { theme } = useTheme();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="p-1 flex gap-1 items-center border border-border rounded">
          <div className="border-b-4" style={{ borderColor: fontColor }}>
            <CaseSensitiveIcon className="w-5 h-5" />
          </div>
          <ChevronDownIcon className="w-4 h-4" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-28">
        <div className="grid grid-cols-4 gap-2">
          {theme === "dark" ? (
            <div
              onClick={() => {
                onFontColorSelect("#b8cce0", true);
              }}
              className="w-4 h-4 rounded-full cursor-pointer hover:border"
              style={{ backgroundColor: "#b8cce0" }}
            ></div>
          ) : (
            <div
              onClick={() => {
                onFontColorSelect("#0e0217", true);
              }}
              className="w-4 h-4 rounded-full cursor-pointer hover:border"
              style={{ backgroundColor: "#0e0217" }}
            ></div>
          )}
          {COLORS_TEXT.map((color) => (
            <div
              key={color}
              onClick={() => {
                onFontColorSelect(color, true);
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

export default TextColor;
