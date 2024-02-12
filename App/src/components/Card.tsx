import * as Dialog from "@radix-ui/react-dialog";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { X } from "lucide-react";

interface ICard {
    note: {
        date: Date;
        description: string;
    };
}

export function Card({ note }: ICard) {
    return (
        <Dialog.Root>
            <Dialog.Trigger className="p-5 outline-none text-left flex flex-col rounded-md bg-slate-50 shadow-md gap-3 overflow-hidden relative hover:ring-2 hover:ring-offset-blue-600 focus-visible:ring-2 focus-visible:ring-orange-600">
                <span className="text-sm font-medium text-orange-600">
                    {formatDistanceToNow(note.date, {
                        locale: ptBR,
                        addSuffix: true,
                    })}
                </span>
                <p className="text-sm leading-6 text-slate-400">
                    {note.description}
                </p>
                <div className="absolute bottom-0 right-0 left-0 h-1/2 bg-gradient-to-t from-slate-400/20 to-black/0 pointer-events-none" />
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Overlay className="inset-0 fixed bg-black/60" />
                <Dialog.Content className="fixed overflow-hidden left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] w-full h-[60vh] bg-white rounded-md flex flex-col outline-none shadow-lg">
                    <Dialog.Close className="absolute right-0 top-0 p-1.5 text-red-600">
                        <X />
                    </Dialog.Close>
                    <div className="flex flex-1 flex-col gap-3 p-5">
                        <span className="text-sm font-semibold text-orange-600">
                            {formatDistanceToNow(note.date, {
                                locale: ptBR,
                                addSuffix: true,
                            })}
                        </span>
                        <p className="text-sm leading-6 text-slate-400">
                            {note.description}
                        </p>
                    </div>
                    <button
                        type="button"
                        className="w-full bg-slate-300 py-4 text-center text-sm text-slate-900 outline-none font-medium group"
                    >
                        Do you want to
                        <span className="text-red-600 group-hover:underline">
                            delete this note
                        </span>
                        ?
                    </button>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
