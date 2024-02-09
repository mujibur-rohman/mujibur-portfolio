import { useEffect } from "react";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { TabIndentationPlugin } from "@lexical/react/LexicalTabIndentationPlugin";
import LexicalClickableLinkPlugin from "@lexical/react/LexicalClickableLinkPlugin";
import { CheckListPlugin } from "@lexical/react/LexicalCheckListPlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import Toolbar from "./toolbar/toolbar";
import lexicalEditorTheme from "./theme";
import { ResizablePanel, ResizablePanelGroup } from "../ui/resizable";
import EditorNodes from "./node";
import CodeHighlightPlugin from "./plugin/code-highlight-plugin";
import LinkPlugin from "./plugin/link-plugin";

function MyCustomAutoFocusPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    editor.focus();
  }, [editor]);

  return null;
}

function onError(error: any) {
  console.error(error);
}

function EditorWrapper() {
  const initialConfig = {
    namespace: "MyEditor",
    theme: lexicalEditorTheme,
    nodes: [...EditorNodes],
    onError,
  };
  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="wrapper-editor">
        <div className="pr-5 basis-0 grow-[80]">
          <RichTextPlugin
            contentEditable={<ContentEditable className="w-full outline-none" />}
            placeholder={<div className="placeholder-editor">Enter some text...</div>}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <ListPlugin />
          <CodeHighlightPlugin />
          <CheckListPlugin />
          <TabIndentationPlugin />
          <HistoryPlugin />
          <LinkPlugin />
          <LexicalClickableLinkPlugin />
          <MyCustomAutoFocusPlugin />
        </div>
        <div className="basis-0 grow-[20]">
          <Toolbar />
        </div>
      </div>
    </LexicalComposer>
  );
}
export default EditorWrapper;
