import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { eventTypes } from "./utils/toolbar-list";
import { FORMAT_ELEMENT_COMMAND, FORMAT_TEXT_COMMAND } from "lexical";

const useOnClickToolbar = () => {
  const [editor] = useLexicalComposerContext();
  const onClick = (event: string) => {
    switch (event) {
      case eventTypes.formatBold:
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
        break;
      case eventTypes.formatItalic:
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
        break;
      case eventTypes.formatUnderline:
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
        break;
      case eventTypes.formatAlignLeft:
        editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left");
        break;
      case eventTypes.formatAlignRight:
        editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right");
        break;
      case eventTypes.formatAlignCenter:
        editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center");
        break;
      case eventTypes.formatAlignJustify:
        editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "justify");
        break;
    }
  };

  return { onClick };
};

export default useOnClickToolbar;
