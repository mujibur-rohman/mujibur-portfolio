import React from "react";
import { $getSelection, LexicalEditor, $isRangeSelection, $createParagraphNode } from "lexical";
import { $createHeadingNode } from "@lexical/rich-text";
import { INSERT_CHECK_LIST_COMMAND, INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND, REMOVE_LIST_COMMAND } from "@lexical/list";
import { $setBlocksType } from "@lexical/selection";
import { blockTypeToBlockName } from "./types";
import { $createCodeNode } from "@lexical/code";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

function DropdownText({ editor, blockType }: { blockType: keyof typeof blockTypeToBlockName; editor: LexicalEditor }) {
  const formatText = (value: typeof blockType) => {
    switch (value) {
      case "paragraph":
        editor.update(() => {
          const selection = $getSelection();
          $setBlocksType(selection, () => $createParagraphNode());
        });
        break;
      case "h1":
        editor.update(() => {
          const selection = $getSelection();
          $setBlocksType(selection, () => $createHeadingNode("h1"));
        });
        break;
      case "bullet":
        if (blockType !== "bullet") {
          editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
        } else {
          editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
        }
        break;
      case "number":
        if (blockType !== "number") {
          editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
        } else {
          editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
        }
        break;
      case "check":
        if (blockType !== "check") {
          editor.dispatchCommand(INSERT_CHECK_LIST_COMMAND, undefined);
        } else {
          editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
        }
        break;
      case "code":
        if (blockType !== "code") {
          editor.update(() => {
            let selection = $getSelection();

            if (selection !== null) {
              if (selection.isCollapsed()) {
                $setBlocksType(selection, () => $createCodeNode());
              } else {
                const textContent = selection.getTextContent();
                const codeNode = $createCodeNode();
                selection.insertNodes([codeNode]);
                selection = $getSelection();
                if ($isRangeSelection(selection)) selection.insertRawText(textContent);
              }
            }
          });
        }
        break;
    }
  };

  const blockTypeArray = Object.entries(blockTypeToBlockName).map(([key, value]) => {
    return {
      ...value,
      key,
    };
  });

  return (
    <Select value={blockType} onValueChange={formatText}>
      <SelectTrigger className="h-8 text-[12px] rounded-sm min-w-32 max-w-44">
        <SelectValue placeholder="Select Layout" />
      </SelectTrigger>
      <SelectContent>
        {blockTypeArray.map((item) => (
          <SelectItem key={item.key} value={item.key} className="h-8 text-[12px]">
            <div className="flex items-center gap-2">
              {item.icon} <span>{item.label}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default DropdownText;
