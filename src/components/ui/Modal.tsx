import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { LuFileText } from "react-icons/lu";

// Forwarding the ref using React.forwardRef
const Modal = () => {
  // alert("hello");

  return (
    <>
      <Dialog>
        <DialogTrigger className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 rounded-full text-white py-2 px-4">
          <LuFileText /> Tafsir
        </DialogTrigger>
        <DialogContent className="w-[40%]">
          <DialogHeader>
            <DialogTitle>Tafsir Al-Baqarah Ayat 1</DialogTitle>
            <hr className="border-t-1 border-slate-300 shadow-md" />
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

Modal.displayName = "Modal"; // Set displayName for better debugging

export default Modal;
