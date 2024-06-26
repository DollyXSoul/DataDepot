"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { storage, db } from "@/config/firebase";
import { useAppStore } from "@/store/store";
import { useUser } from "@clerk/nextjs";
import { doc, deleteDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import toast from "react-hot-toast";

export function DeleteModal() {
  const [fileId, isDeleteModalOpen, setIsDeleteModalOpen] = useAppStore(
    (state) => [
      state.fileId,
      state.isDeleteModalOpen,
      state.setIsDeleteModalOpen,
    ]
  );

  const { user } = useUser();

  async function deleteFile() {
    const toastId = toast.loading("Deleting...");
    if (!user || !fileId) {
      toast.error("An error occured! Try again", {
        id: toastId,
      });
      return;
    }

    const fileRef = ref(storage, `users/${user.id}/files/${fileId}`);

    try {
      deleteObject(fileRef)
        .then(async () => {
          deleteDoc(doc(db, "users", user.id, "files", fileId)).then(() => {
            console.log("Success deletion");
            toast.success("Deleted successfully", {
              id: toastId,
              duration: 1500,
            });
          });
        })
        .finally(() => {
          setIsDeleteModalOpen(false);
        });
    } catch (error) {
      toast.error("An error occured! Try again", {
        id: toastId,
      });
      console.error("error", error);
      setIsDeleteModalOpen(false);
    }
  }

  return (
    <Dialog
      open={isDeleteModalOpen}
      onOpenChange={(isOpen) => setIsDeleteModalOpen(isOpen)}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete file ? </DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your file
            from our servers!
          </DialogDescription>
        </DialogHeader>

        <div className="flex space-x-2 py-3">
          <Button
            size="sm"
            className="px-3 flex-1"
            variant="ghost"
            onClick={() => setIsDeleteModalOpen(false)}
          >
            <span className="sr-only">Cancel</span>
            <span>Cancel</span>
          </Button>

          <Button
            type="submit"
            size="sm"
            variant="destructive"
            className="px-3 flex-1"
            onClick={() => deleteFile()}
          >
            <span className="sr-only">Delete</span>
            <span>Delete</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
