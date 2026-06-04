type Props = {
    title: string;
    value: string;
    desc: string;
    dark?: boolean;
  };
  
  export default function GroupCard({ title, value, desc, dark = false }: Props) {
    return (
      <div
        className={`rounded-3xl border p-4 shadow-sm sm:p-6 ${
          dark
            ? "border-slate-800 bg-slate-900"
            : "border-slate-200 bg-white"
        }`}
      >
        <p className={`text-sm ${dark ? "text-slate-400" : "text-slate-500"}`}>
          {title}
        </p>
        <h4 className={`mt-2 text-2xl font-bold sm:mt-3 sm:text-3xl ${dark ? "text-white" : "text-slate-900"}`}>
          {value}
        </h4>
        <p className={`mt-4 text-sm ${dark ? "text-cyan-400" : "text-slate-500"}`}>
          {desc}
        </p>
      </div>
    );
  }