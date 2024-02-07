import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  CodeIcon,
  Heading1Icon,
  ItalicIcon,
  ListIcon,
  ListOrderedIcon,
  QuoteIcon,
  Redo2Icon,
  TypeIcon,
  UnderlineIcon,
  Undo2Icon,
} from "lucide-react";

export const eventTypes = {
  paragraph: "paragraph",
  h1: "h1",
  h2: "h2",
  ul: "ul",
  ol: "ol",
  quote: "quote",
  formatCode: "formatCode",
  formatUndo: "formatUndo",
  formatRedo: "formatRedo",
  formatBold: "formatBold",
  formatItalic: "formatItalic",
  formatUnderline: "formatUnderline",
  formatStrike: "formatStrike",
  formatInsertLink: "formatInsertLink",
  formatAlignLeft: "formatAlignLeft",
  formatAlignCenter: "formatAlignCenter",
  formatAlignRight: "formatAlignRight",
  formatAlignJustify: "formatAlignJustify",
  insertImage: "insertImage",
};

const pluginsList = [
  {
    id: 10,
    Icon: <BoldIcon className="w-3 h-3" />,
    event: eventTypes.formatBold,
  },
  {
    id: 11,
    Icon: <ItalicIcon className="w-3 h-3" />,
    event: eventTypes.formatItalic,
  },
  {
    id: 12,
    Icon: <UnderlineIcon className="w-3 h-3" />,
    event: eventTypes.formatUnderline,
  },
  {
    id: 1,
    Icon: <TypeIcon className="w-3 h-3" />,
    event: eventTypes.paragraph,
  },
  {
    id: 15,
    Icon: <AlignLeftIcon className="w-3 h-3" />,
    event: eventTypes.formatAlignLeft,
  },
  {
    id: 17,
    Icon: <AlignRightIcon className="w-3 h-3" />,
    event: eventTypes.formatAlignRight,
  },
  {
    id: 18,
    Icon: <AlignCenterIcon className="w-3 h-3" />,
    event: eventTypes.formatAlignCenter,
  },
  {
    id: 16,
    Icon: <AlignJustifyIcon className="w-3 h-3" />,
    event: eventTypes.formatAlignJustify,
  },
  {
    id: 2,
    Icon: <Heading1Icon className="w-3 h-3" />,
    event: eventTypes.h1,
  },
  {
    id: 4,
    Icon: <ListIcon className="w-3 h-3" />,
    event: eventTypes.ul,
  },

  {
    id: 5,
    Icon: <ListOrderedIcon className="w-3 h-3" />,
    event: eventTypes.ol,
  },
  {
    id: 6,
    Icon: <QuoteIcon className="w-3 h-3" />,
    event: eventTypes.quote,
  },

  {
    id: 7,
    Icon: <CodeIcon className="w-3 h-3" />,
    event: eventTypes.formatCode,
  },
  {
    id: 8,
    Icon: <Undo2Icon className="w-3 h-3" />,
    event: eventTypes.formatUndo,
  },
  {
    id: 9,
    Icon: <Redo2Icon className="w-3 h-3" />,
    event: eventTypes.formatRedo,
  },
  {
    id: 13,
    Icon: <BoldIcon className="w-3 h-3" />,
    event: eventTypes.insertImage,
  },
  {
    id: 14,
    Icon: <BoldIcon className="w-3 h-3" />,
    event: eventTypes.formatInsertLink,
  },
];

export default pluginsList;
