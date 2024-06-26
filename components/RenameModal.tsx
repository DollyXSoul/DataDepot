import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { db } from "@/config/firebase";
import { useAppStore } from "@/store/store";
import { useUser } from "@clerk/nextjs";
import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import toast from "react-hot-toast";

export function RenameModal() {
  const [fileId, fileName, isRenameModalOpen, setIsRenameModalOpen] =
    useAppStore((state) => [
      state.fileId,
      state.filename,
      state.isRenameModalOpen,
      state.setIsRenameModalOpen,
    ]);
  const { user } = useUser();

  const [input, setInput] = useState<string>("");

  const renameFile = async () => {
    const toastId = toast.loading("Renaming...");

    if (!user || !fileId) {
      toast.error("An error occured! Try again", {
        id: toastId,
      });
      return;
    }

    try {
      await updateDoc(doc(db, "users", user.id, "files", fileId), {
        fileName: input,
      });

      toast.success("Renamed successfully", {
        id: toastId,
        duration: 1500,
      });
    } catch (err) {
      toast.error("An error occured! Try again", {
        id: toastId,
      });
    }

    setInput("");
    setIsRenameModalOpen(false);
  };

  return (
    <Dialog
      open={isRenameModalOpen}
      onOpenChange={(isOpen) => setIsRenameModalOpen(isOpen)}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="pb-2">Rename File</DialogTitle>

          <Input
            id="name"
            defaultValue={fileName}
            onChange={(e) => setInput(e.target.value)}
            onKeyDownCapture={(e) => {
              if (e.key === "Enter") {
                renameFile();
              }
            }}
          />

          <div className="flex space-x-2 py-3">
            <Button
              size="sm"
              className="px-3 flex-1"
              variant="ghost"
              onClick={() => setIsRenameModalOpen(false)}
            >
              <span className="sr-only">Cancel</span>
              <span>Cancel</span>
            </Button>

            <Button
              type="submit"
              size="sm"
              className="px-3 flex-1"
              onClick={() => renameFile()}
            >
              <span className="sr-only">Rename</span>
              <span>Rename</span>
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
