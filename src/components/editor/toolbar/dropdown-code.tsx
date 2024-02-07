import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CODE_LANGUAGE_FRIENDLY_NAME_MAP, getLanguageFriendlyName, $isCodeNode } from "@lexical/code";
import React from "react";

function getCodeLanguageOptions(): [string, string][] {
  const options: [string, string][] = [];

  for (const [lang, friendlyName] of Object.entries(CODE_LANGUAGE_FRIENDLY_NAME_MAP)) {
    options.push([lang, friendlyName]);
  }

  return options;
}

const CODE_LANGUAGE_OPTIONS = getCodeLanguageOptions();

function DropdownCode({ onCodeChange, codeLanguage }: { onCodeChange: (value: string) => void; codeLanguage: string }) {
  return (
    <Select value={codeLanguage} onValueChange={onCodeChange}>
      <SelectTrigger className="h-8 text-[12px] rounded-sm min-w-32 max-w-44">
        <SelectValue placeholder="Select Language" />
      </SelectTrigger>
      <SelectContent>
        {CODE_LANGUAGE_OPTIONS.map(([value, name]) => {
          return (
            <SelectItem key={value} value={value} className="h-8 text-[12px]">
              <div className="flex items-center gap-2">
                <span>{name}</span>
              </div>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}

export default DropdownCode;
