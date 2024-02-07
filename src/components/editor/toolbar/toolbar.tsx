/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { AlignJustifyIcon, BoldIcon, ItalicIcon, Redo2Icon, UnderlineIcon, Undo2Icon } from "lucide-react";
import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  $isRootOrShadowRoot,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  COMMAND_PRIORITY_CRITICAL,
  FORMAT_TEXT_COMMAND,
  LexicalEditor,
  NodeKey,
  SELECTION_CHANGE_COMMAND,
} from "lexical";
import { $createCodeNode, $isCodeNode, CODE_LANGUAGE_FRIENDLY_NAME_MAP, CODE_LANGUAGE_MAP, getLanguageFriendlyName } from "@lexical/code";
import { cn } from "@/lib/utils";
import { $setBlocksType } from "@lexical/selection";
import { $isListNode, INSERT_CHECK_LIST_COMMAND, INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND, ListNode, REMOVE_LIST_COMMAND } from "@lexical/list";
import { $createHeadingNode, $createQuoteNode, $isHeadingNode, $isQuoteNode, HeadingTagType } from "@lexical/rich-text";
import { $findMatchingParent, $getNearestBlockElementAncestorOrThrow, $getNearestNodeOfType, mergeRegister } from "@lexical/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { blockTypeToBlockName, rootTypeToRootName } from "./types";

function Toolbar() {
  const [editor] = useLexicalComposerContext();
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [activeEditor, setActiveEditor] = useState(editor);
  const [selectedElementKey, setSelectedElementKey] = useState<NodeKey | null>(null);
  const [blockType, setBlockType] = useState<keyof typeof blockTypeToBlockName>("paragraph");
  const [codeLanguage, setCodeLanguage] = useState<string>("");
  const [isEditable, setIsEditable] = useState(() => editor.isEditable());
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      // Update text format
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
    }
    const anchorNode = selection?.getNodes()[0];

    let element =
      anchorNode?.getKey() === "root" && anchorNode
        ? anchorNode
        : $findMatchingParent(anchorNode!, (e) => {
            const parent = e.getParent();
            return parent !== null && $isRootOrShadowRoot(parent);
          });

    if (element === null) {
      element = anchorNode!.getTopLevelElementOrThrow();
    }

    const elementKey = element?.getKey();
    const elementDOM = activeEditor.getElementByKey(elementKey!);

    if (elementDOM !== null) {
      setSelectedElementKey(elementKey!);
      if ($isListNode(element)) {
        const parentList = $getNearestNodeOfType<ListNode>(anchorNode!, ListNode);
        const type = parentList ? parentList.getListType() : element.getListType();
        setBlockType(type);
      } else {
        const type = $isHeadingNode(element) ? element.getTag() : element!.getType();
        if (type in blockTypeToBlockName) {
          setBlockType(type as keyof typeof blockTypeToBlockName);
        }
        if ($isCodeNode(element)) {
          const language = element.getLanguage() as keyof typeof CODE_LANGUAGE_MAP;
          setCodeLanguage(language ? CODE_LANGUAGE_MAP[language] || language : "");
          return;
        }
      }
    }
  }, [activeEditor]);

  useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      (_payload, newEditor) => {
        $updateToolbar();
        setActiveEditor(newEditor);
        return false;
      },
      COMMAND_PRIORITY_CRITICAL
    );
  }, [editor, $updateToolbar]);

  useEffect(() => {
    return mergeRegister(
      editor.registerEditableListener((editable) => {
        setIsEditable(editable);
      }),
      activeEditor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          $updateToolbar();
        });
      }),
      activeEditor.registerCommand<boolean>(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        COMMAND_PRIORITY_CRITICAL
      ),
      activeEditor.registerCommand<boolean>(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        COMMAND_PRIORITY_CRITICAL
      )
    );
  }, [$updateToolbar, activeEditor, editor]);

  return (
    <div className="p-2">
      <div className="flex flex-wrap gap-2"></div>
      <div className="flex flex-col gap-2 border-b pb-3">
        <span className="text-sm font-medium">Font</span>
        <div className="flex flex-wrap gap-2">
          <div
            className={cn("p-1 transition-all border border-foreground rounded cursor-pointer hover:bg-secondary-foreground/30", {
              "bg-primary text-background hover:bg-primary/80": isBold,
            })}
            onClick={() => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
            }}
          >
            <BoldIcon className="w-3 h-3" />
          </div>
          <div
            className={cn("p-1 transition-all border border-foreground rounded cursor-pointer hover:bg-secondary-foreground/30", {
              "bg-primary text-background hover:bg-primary/80": isItalic,
            })}
            onClick={() => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
            }}
          >
            <ItalicIcon className="w-3 h-3" />
          </div>
          <div
            className={cn("p-1 transition-all border border-foreground rounded cursor-pointer hover:bg-secondary-foreground/30", {
              "bg-primary text-background hover:bg-primary/80": isUnderline,
            })}
            onClick={() => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
            }}
          >
            <UnderlineIcon className="w-3 h-3" />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 border-b pb-3">
        <span className="text-sm font-medium">Text</span>
        <LayoutSelect editor={editor} blockType={blockType} setBlockType={setBlockType} />
      </div>
    </div>
  );
}

function LayoutSelect({
  editor,
  blockType,
  setBlockType,
}: {
  blockType: keyof typeof blockTypeToBlockName;
  editor: LexicalEditor;
  setBlockType: Dispatch<SetStateAction<keyof typeof blockTypeToBlockName>>;
}) {
  console.log(blockType);
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
    setBlockType(value);
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

export default Toolbar;
