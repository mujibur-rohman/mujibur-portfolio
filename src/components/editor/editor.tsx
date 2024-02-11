"use client";
import { BlockNoteEditor } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/react/style.css";
import { useTheme } from "next-themes";
import "./styles.css";
import PostService from "@/services/post/post.service";

export default function Editor({ onChange }: { onChange: (value: string) => Promise<void> }) {
  const theme = useTheme();
  const editor: BlockNoteEditor | null = useBlockNote({
    onEditorContentChange: async (editor) => {
      await onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
    },
    async uploadFile(file: File) {
      const formData = new FormData();
      formData.append("image", file);
      const res = await PostService.contentImage(formData);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return res.data.url;
    },
  });
  return <BlockNoteView editor={editor} theme={theme.theme as "light" | "dark"} />;
}
