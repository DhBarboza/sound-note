import logo from "./assets/Logo.svg";
import { Card } from "./components/Card";
import { NewCard } from "./components/NewCard";

const notes = {
    date: new Date(),
    description: "Notes",
};

export function App() {
    return (
        <div className="max-w-6xl mx-auto my-12 space-y-6">
            <img src={logo} alt="NLW Expert" />
            <form className="w-full">
                <input
                    className="w-full bg-transparent text-3xl font-semibold tracking-tight placeholder:text-slate-500 outline-none"
                    type="text"
                    placeholder="Search in your Notes..."
                />
            </form>
            <hr className="h-0.5 bg-slate-700" />
            <div className="grid grid-cols-3 auto-rows-[250px] gap-6">
                <NewCard />
                <Card note={notes} />
            </div>
        </div>
    );
}
