export function NewCard() {
    return (
        <div className="rounded-md bg-slate-50 shadow-md space-y-3 overflow-hidden relative p-5">
            <span className="text-sm font-medium text-blue-600">
                Add Note +
            </span>
            <p className="text-sm leading-6 text-slate-400">
                Record audio to convert in text
            </p>
        </div>
    );
}
