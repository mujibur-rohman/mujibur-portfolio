"use client";
import { BlockNoteEditor } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/react/style.css";
import { useTheme } from "next-themes";
import "./styles.css";

export default function Editor() {
  const editor: BlockNoteEditor | null = useBlockNote({});
  const theme = useTheme();

  return <BlockNoteView editor={editor} theme={theme.theme as "light" | "dark"} />;
}
