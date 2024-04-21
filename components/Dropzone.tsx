"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import DropzoneComponent from "react-dropzone";
import { useUser } from "@clerk/nextjs";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "@/config/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import toast from "react-hot-toast";

function Dropzone() {
  // max file size 20 MB

  const [loading, setLoading] = useState(false);
  const { user, isSignedIn, isLoaded } = useUser();

  const onDrop = (acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");

      reader.onload = async () => {
        await uploadFile(file);
      };

      reader.readAsArrayBuffer(file);
    });
  };

  const uploadFile = async (selectedFile: File) => {
    if (loading) return;

    if (!user) {
      toast.error("An error occured!!");
      return;
    }

    setLoading(true);

    const toastId = toast.loading("Uploading file");

    try {
      const docRef = await addDoc(collection(db, "users", user.id, "files"), {
        userId: user.id,
        fileName: selectedFile.name,
        fullName: user.fullName,
        profileImg: user.imageUrl,
        timeStamp: serverTimestamp(),
        type: selectedFile.type,
        size: selectedFile.size,
      });

      const fileRef = ref(storage, `users/${user.id}/files/${docRef.id}`);

      uploadBytes(fileRef, selectedFile).then(async () => {
        const downloadURL = await getDownloadURL(fileRef);

        await updateDoc(doc(db, "users", user.id, "files", docRef.id), {
          downloadURL: downloadURL,
        });
      });

      toast.success("Uploaded Successfully", {
        id: toastId,
        duration: 1500,
      });
    } catch (error) {
      toast.error("An error occurred ! Try again", {
        id: toastId,
        duration: 1500,
      });
    }

    setLoading(false);
  };
  const maxSize = 20971520;
  return (
    <DropzoneComponent maxSize={maxSize} minSize={0} onDrop={onDrop}>
      {({
        getRootProps,
        getInputProps,
        isDragActive,
        isDragReject,
        fileRejections,
      }) => {
        const isFileTooLarge =
          fileRejections.length > 0 && fileRejections[0].file.size > maxSize;

        return (
          <section className="m-4">
            <div
              {...getRootProps()}
              className={cn(
                "w-full h-52 flex justify-center items-center p-5 border border-dashed rounded-lg text-center",
                isDragActive
                  ? "bg-[#035FFE] text-white animate-pulse"
                  : "bg-slate-100/50 dark:bg-slate-800/80 text-slate-400"
              )}
            >
              <input {...getInputProps()} />
              {!isDragActive && "Click here or drop a file to upload!"}
              {isDragActive && !isDragReject && "Drop this file to upload!"}
              {isDragReject && "File type not accepted, sorry!"}
              {isFileTooLarge && (
                <div className="text-danger mt-2">File is too large</div>
              )}
            </div>
          </section>
        );
      }}
    </DropzoneComponent>
  );
}

export default Dropzone;
