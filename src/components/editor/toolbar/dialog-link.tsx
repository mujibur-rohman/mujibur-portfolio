import { TOGGLE_LINK_COMMAND } from "@lexical/link";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LinkIcon, Trash2Icon } from "lucide-react";
import { cn } from "@/lib/utils";
import { sanitizeUrl } from "../utils/url";
import { toast } from "sonner";
import { LexicalEditor } from "lexical";

function DialogLink({
  defaultUrl,
  setOpen,
  isOpen,
  isLink,
  editor,
  setDefaultUrl,
}: {
  defaultUrl: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setDefaultUrl: React.Dispatch<React.SetStateAction<string>>;
  isOpen: boolean;
  isLink: boolean;
  editor: LexicalEditor;
}) {
  const openChangeWrapper = (value: boolean) => {
    setOpen(value);
    if (!isLink) {
      setDefaultUrl("");
    }
  };

  const onSubmit = () => {
    try {
      if (defaultUrl) {
        editor.dispatchCommand(TOGGLE_LINK_COMMAND, sanitizeUrl(sanitizeUrl(defaultUrl.trim())));
      }
      setOpen(false);
    } catch (error) {
      toast.error("Invalid Url");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={openChangeWrapper}>
      <DialogTrigger
        className={cn("p-1 transition-all border border-foreground rounded cursor-pointer hover:bg-secondary-foreground/30", {
          "bg-primary text-background hover:bg-primary/80": isLink,
        })}
      >
        <LinkIcon className="w-3 h-3" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>URL</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col w-full gap-2">
          <Input
            value={defaultUrl}
            onChange={(e) => {
              setDefaultUrl(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onSubmit();
              }
            }}
            className="flex-grow"
            placeholder="https://"
          />
          <div className="flex justify-end gap-2">
            {isLink ? (
              <Button
                onClick={() => {
                  editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
                  setOpen(false);
                }}
                size="sm"
                variant="destructive"
              >
                <Trash2Icon className="w-4 h-4" />
              </Button>
            ) : null}
            <Button onClick={() => setOpen(false)} size="sm" variant="secondary">
              Cancel
            </Button>
            <Button size="sm" onClick={onSubmit}>
              Insert
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default DialogLink;
