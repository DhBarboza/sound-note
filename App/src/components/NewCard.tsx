import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

export function NewCard() {
    return (
        <Dialog.Root>
            <Dialog.Trigger className="flex flex-col text-left rounded-md bg-slate-50 shadow-md gap-3 overflow-hidden p-5 hover:ring-2 hover:ring-blue-600 focus-visible:ring-2 focus-visible:ring-orange-600 outline-none">
                <span className="text-sm font-medium text-blue-600">
                    Add Note +
                </span>
                <p className="text-sm leading-6 text-slate-400">
                    Record audio to convert in text
                </p>
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Overlay className="inset-0 fixed bg-black/60" />
                <Dialog.Content className="fixed overflow-hidden left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] w-full h-[60vh] bg-white rounded-md flex flex-col outline-none shadow-lg">
                    <Dialog.Close className="absolute right-0 top-0 p-1.5 text-red-600">
                        <X />
                    </Dialog.Close>
                    <div className="flex flex-1 flex-col gap-3 p-5">
                        <span className="text-sm font-semibold text-orange-600">
                            Add note
                        </span>
                        <p className="text-sm leading-6 text-slate-400">
                            Start by{" "}
                            <button className="text-blue-600 hover:underline font-medium">
                                recording an audio
                            </button>{" "}
                            note or if you prefer, just{" "}
                            <button className="text-blue-600 hover:underline font-medium">
                                use text
                            </button>
                        </p>
                    </div>
                    <button
                        type="button"
                        className="w-full bg-green-600 py-4 text-center text-sm text-white outline-none font-medium hover:bg-green-700"
                    >
                        Save
                    </button>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
