import { ChangeEvent, useState } from "react";
import logo from "./assets/Logo.svg";
import { Card } from "./components/Card";
import { NewCard } from "./components/NewCard";

interface Note {
    id: string;
    date: Date;
    description: string;
}

export function App() {
    const [search, setSearch] = useState("");

    const [notes, setNotes] = useState<Note[]>(() => {
        const notesOnStorage = localStorage.getItem("notes");

        if (notesOnStorage) {
            return JSON.parse(notesOnStorage);
        }
        return [];
    });

    function onNoteCreated(description: string) {
        const newNote = {
            id: crypto.randomUUID(),
            date: new Date(),
            description,
        };

        const notesArray = [newNote, ...notes];

        setNotes(notesArray);

        localStorage.setItem("notes", JSON.stringify(notesArray));
    }

    function handleSearch(event: ChangeEvent<HTMLInputElement>) {
        const query = event.target.value;

        setSearch(query);
    }

    const filteredNotes =
        search !== ""
            ? notes.filter((note) =>
                  note.description
                      .toLocaleLowerCase()
                      .includes(search.toLocaleLowerCase())
              )
            : notes;

    function onNoteDelete(id: string) {
        const notesArray = notes.filter((note) => {
            return note.id !== id;
        });

        setNotes(notesArray);

        localStorage.setItem("notes", JSON.stringify(notesArray));
    }

    return (
        <div className="max-w-6xl mx-auto my-12 space-y-6 px-5">
            <img src={logo} alt="NLW Expert" />

            <form className="w-full">
                <input
                    className="w-full bg-transparent text-3xl font-semibold tracking-tight placeholder:text-slate-500 outline-none"
                    type="text"
                    placeholder="Search in your Notes..."
                    onChange={handleSearch}
                />
            </form>

            <hr className="h-0.5 bg-slate-700" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[250px] gap-6">
                <NewCard onNoteCreated={onNoteCreated} />

                {filteredNotes.map((note) => {
                    return (
                        <Card
                            key={note.id}
                            note={note}
                            onNoteDelete={onNoteDelete}
                        />
                    );
                })}
            </div>
        </div>
    );
}
