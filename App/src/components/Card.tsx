export function Card() {
    return (
        <button className="outline-none text-left rounded-md bg-slate-50 shadow-md space-y-3 overflow-hidden relative hover:ring-2 hover:ring-offset-blue-600 focus-visible:ring-2 focus-visible:ring-orange-600">
            <span className="text-sm font-medium text-slate-200"></span>
            <p className="text-sm leading-6 text-slate-400"></p>
            <div className="absolute bottom-0 right-0 left-0 h-1/2 bg-gradient-to-t from-slate-400/20 to-black/0 pointer-events-none" />
        </button>
    );
}
