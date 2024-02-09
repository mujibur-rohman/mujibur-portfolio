/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { BoldIcon, CodeIcon, ItalicIcon, LinkIcon, StrikethroughIcon, Trash2Icon, UnderlineIcon } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getNodeByKey,
  $getSelection,
  $isRangeSelection,
  $isRootOrShadowRoot,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  COMMAND_PRIORITY_CRITICAL,
  FORMAT_TEXT_COMMAND,
  NodeKey,
  SELECTION_CHANGE_COMMAND,
} from "lexical";
import { $patchStyleText, $getSelectionStyleValueForProperty } from "@lexical/selection";
import { $isLinkNode } from "@lexical/link";
import { $isCodeNode, CODE_LANGUAGE_MAP } from "@lexical/code";
import { cn } from "@/lib/utils";
import { $isListNode, ListNode } from "@lexical/list";
import { $isHeadingNode } from "@lexical/rich-text";
import { $findMatchingParent, $getNearestNodeOfType, mergeRegister } from "@lexical/utils";
import { blockTypeToBlockName } from "./types";
import DropdownText from "./dropdown-text";
import DropdownCode from "./dropdown-code";

import DialogLink from "./dialog-link";
import { getSelectedNode } from "../utils/get-selected-node";
import TextColor from "./text-color";
import { useTheme } from "next-themes";
import BgColor from "./bg-color";

function Toolbar() {
  const [editor] = useLexicalComposerContext();
  const { theme } = useTheme();

  const [openLink, setOpenLink] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isCode, setIsCode] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [isLink, setIsLink] = useState(false);
  const [defaultLink, setDefaultLink] = useState("");
  const [activeEditor, setActiveEditor] = useState(editor);
  const [selectedElementKey, setSelectedElementKey] = useState<NodeKey | null>(null);
  const [blockType, setBlockType] = useState<keyof typeof blockTypeToBlockName>("paragraph");
  const [codeLanguage, setCodeLanguage] = useState<string>("");
  const [fontColor, setFontColor] = useState<string>("");
  const [bgColor, setBgColor] = useState<string>("");
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
      setIsCode(selection.hasFormat("code"));
      setIsStrikethrough(selection.hasFormat("strikethrough"));

      // update links
      const node = getSelectedNode(selection);
      const parent = node.getParent();
      if ($isLinkNode(parent) || $isLinkNode(node)) {
        setIsLink(true);
      } else {
        setIsLink(false);
      }

      // update value parent
      const linkParent = $findMatchingParent(node, $isLinkNode);

      if (linkParent) {
        setDefaultLink(linkParent.getURL());
      } else if ($isLinkNode(node)) {
        setDefaultLink(node.getURL());
      } else {
        setDefaultLink("");
      }

      if (theme === "dark") {
        setFontColor($getSelectionStyleValueForProperty(selection, "color", "#b8cce0"));
      } else {
        setFontColor($getSelectionStyleValueForProperty(selection, "color", "#0e0217"));
      }
      setBgColor($getSelectionStyleValueForProperty(selection, "background-color", "#00000000"));
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
      element = anchorNode?.getTopLevelElementOrThrow();
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
        const type = $isHeadingNode(element) ? element.getTag() : element?.getType();
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

  const onCodeLanguageSelect = useCallback(
    (value: string) => {
      activeEditor.update(() => {
        if (selectedElementKey !== null) {
          const node = $getNodeByKey(selectedElementKey);
          if ($isCodeNode(node)) {
            console.log(value);
            node.setLanguage(value);
          }
        }
      });
      setCodeLanguage(value);
      console.log(value);
    },
    [activeEditor, selectedElementKey]
  );

  const applyStyleText = useCallback(
    (styles: Record<string, string>, skipHistoryStack?: boolean) => {
      activeEditor.update(
        () => {
          const selection = $getSelection();
          if (selection !== null) {
            $patchStyleText(selection, styles);
          }
        },
        skipHistoryStack ? { tag: "historic" } : {}
      );
    },
    [activeEditor]
  );

  const onFontColorSelect = (value: string, skipHistoryStack: boolean) => {
    applyStyleText({ color: value }, skipHistoryStack);
  };

  const onBgColorSelect = (value: string, skipHistoryStack: boolean) => {
    applyStyleText({ "background-color": value }, skipHistoryStack);
  };

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
      {blockType === "code" ? (
        <div className="flex flex-col gap-2 border-b pb-3 mb-3">
          <span className="text-sm font-medium">Language</span>
          <DropdownCode onCodeChange={onCodeLanguageSelect} codeLanguage={codeLanguage} />
        </div>
      ) : null}
      <div className="flex flex-col gap-2 border-b pb-3 mb-3">
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
          <div
            className={cn("p-1 transition-all border border-foreground rounded cursor-pointer hover:bg-secondary-foreground/30", {
              "bg-primary text-background hover:bg-primary/80": isCode,
            })}
            onClick={() => {
              activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "code");
            }}
          >
            <CodeIcon className="w-3 h-3" />
          </div>

          <div
            className={cn("p-1 transition-all border border-foreground rounded cursor-pointer hover:bg-secondary-foreground/30", {
              "bg-primary text-background hover:bg-primary/80": isStrikethrough,
            })}
            onClick={() => {
              activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough");
            }}
          >
            <StrikethroughIcon className="w-3 h-3" />
          </div>
          <DialogLink setDefaultUrl={setDefaultLink} defaultUrl={defaultLink} editor={editor} isLink={isLink} isOpen={openLink} setOpen={setOpenLink} />
        </div>
      </div>
      <div className="flex flex-col gap-2 border-b pb-3">
        <span className="text-sm font-medium">Text</span>
        <DropdownText editor={editor} blockType={blockType} />
      </div>
      <div className="flex flex-col items-start gap-2 border-b pb-3 mt-3">
        <span className="text-sm font-medium">Color</span>
        <div className="flex gap-2 items-center">
          <div className={cn("px-1 transition-all rounded cursor-pointer")} onClick={() => {}}>
            <TextColor fontColor={fontColor} onFontColorSelect={onFontColorSelect} />
          </div>
          <div className={cn("px-1 transition-all rounded cursor-pointer")} onClick={() => {}}>
            <BgColor bgColor={bgColor} onBgColorSelect={onBgColorSelect} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Toolbar;
