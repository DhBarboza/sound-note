import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "sonner";

interface INewCard {
    onNoteCreated: (description: string) => void;
}

let speechRecognition: SpeechRecognition | null = null;

export function NewCard({ onNoteCreated }: INewCard) {
    const [isRecording, setIsRecordig] = useState(false);

    const [shouldShowOnboarding, setShouldShowOnboarding] = useState(true);

    const [inputContent, setInputContent] = useState("");

    function handleStartEditor() {
        setShouldShowOnboarding(false);
    }

    function handleContentChange(event: ChangeEvent<HTMLTextAreaElement>) {
        setInputContent(event.target.value);
        if (event.target.value === "") {
            setShouldShowOnboarding(true);
        }
    }

    function hundleSaveNote(event: FormEvent) {
        event.preventDefault();

        if (inputContent === "") {
            return;
        }

        onNoteCreated(inputContent);
        setInputContent("");
        setShouldShowOnboarding(true);
        toast.success("Note saved");
    }

    function handleStartRecord() {
        const isSpeechRecognitionAPIAvaible =
            "SpeechRecognition" in window ||
            "webkitSpeechRecognition" in window;

        if (!isSpeechRecognitionAPIAvaible) {
            return alert("Your browser does not support recording");
        }

        setIsRecordig(true);
        setShouldShowOnboarding(false);

        const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;

        speechRecognition = new SpeechRecognition();

        speechRecognition.lang = "pt-BR";
        speechRecognition.continuous = true;
        speechRecognition.maxAlternatives = 1;
        speechRecognition.interimResults = true;

        speechRecognition.onresult = (event) => {
            const transcription = Array.from(event.results).reduce(
                (text, result) => {
                    return text.concat(result[0].transcript);
                },
                ""
            );
            setInputContent(transcription);
        };

        speechRecognition.onerror = (event) => {
            console.error(event);
        };

        speechRecognition.start();
    }

    function handleStopRecord() {
        setIsRecordig(false);

        if (speechRecognition !== null) {
            speechRecognition.stop();
        }
    }

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
                <Dialog.Content className="fixed overflow-hidden inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] w-full md:h-[60vh] bg-white rounded-md flex flex-col outline-none shadow-lg">
                    <Dialog.Close className="absolute right-0 top-0 p-1.5 text-red-600">
                        <X />
                    </Dialog.Close>

                    <form className="flex flex-1 flex-col">
                        <div className="flex flex-1 flex-col gap-3 p-5">
                            <span className="text-sm font-semibold text-orange-600">
                                Add note
                            </span>

                            {shouldShowOnboarding == true ? (
                                <p className="text-sm leading-6 text-slate-400">
                                    Start by{" "}
                                    <button
                                        type="button"
                                        onClick={handleStartRecord}
                                        className="text-blue-600 hover:underline font-medium"
                                    >
                                        recording an audio
                                    </button>{" "}
                                    note or if you prefer, just{" "}
                                    <button
                                        type="button"
                                        className="text-blue-600 hover:underline font-medium"
                                        onClick={handleStartEditor}
                                    >
                                        use text
                                    </button>
                                </p>
                            ) : (
                                <textarea
                                    title="Text"
                                    autoFocus
                                    className="text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none"
                                    onChange={handleContentChange}
                                    value={inputContent}
                                />
                            )}
                        </div>

                        {isRecording ? (
                            <button
                                type="button"
                                onClick={handleStopRecord}
                                className="w-full flex items-center justify-center gap-2  bg-blue-600 py-4 text-center text-sm text-white outline-none font-medium hover:bg-green-700"
                            >
                                <div className="size-3 rounded-full bg-red-500 animate-pulse" />
                                Recording! (click to stop)
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={hundleSaveNote}
                                className="w-full bg-green-600 py-4 text-center text-sm text-white outline-none font-medium hover:bg-green-700"
                            >
                                Save
                            </button>
                        )}
                    </form>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
