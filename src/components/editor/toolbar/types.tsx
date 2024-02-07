import { CheckSquareIcon, Code2Icon, HeadingIcon, ListIcon, ListOrderedIcon, QuoteIcon, TextIcon } from "lucide-react";

export const blockTypeToBlockName = {
  paragraph: {
    label: "Normal",
    icon: <TextIcon className="w-3 h-3" />,
  },
  h1: {
    label: "Heading",
    icon: <HeadingIcon className="w-3 h-3" />,
  },
  bullet: {
    label: "Bulleted List",
    icon: <ListIcon className="w-3 h-3" />,
  },
  number: {
    label: "Numbered List",
    icon: <ListOrderedIcon className="w-3 h-3" />,
  },
  check: {
    label: "Check List",
    icon: <CheckSquareIcon className="w-3 h-3" />,
  },
  code: {
    label: "Code Block",
    icon: <Code2Icon className="w-3 h-3" />,
  },
  quote: {
    label: "Quote",
    icon: <QuoteIcon className="w-3 h-3" />,
  },
};

export const rootTypeToRootName = {
  root: "Root",
  table: "Table",
};
