import { GroupCategory } from "../types/group";
import propFromKeys from "./propFromKeys";

const groupCategories: Record<string, GroupCategory> = propFromKeys("name", {
  "General": { background: "bg-blue-600" },
  "Community": { background: "bg-purple-600" },
  "Innovation": { background: "bg-orange-600" },
  "Language": { background: "bg-red-600" },
  "Projects": { background: "bg-indigo-600" },
  "Civic Tech": { background: "bg-green-600" },
  "DevOps": { background: "bg-teal-600" },
  "Mobile": { background: "bg-pink-600" },
  "Frontend": { background: "bg-cyan-600" },
  "Cloud": { background: "bg-sky-600" },
  "Startup": { background: "bg-yellow-600" },
});

// note: maybe use a tool like medialab.github.io/iwanthue? This is the best I could do with tailwind
export const colors = [
  { background: "bg-red-600" },
  { background: "bg-red-800" },
  { background: "bg-orange-600" },
  { background: "bg-orange-800" },
  { background: "bg-amber-600" },
  { background: "bg-amber-800" },
  { background: "bg-yellow-600" },
  { background: "bg-lime-600" },
  { background: "bg-green-600" },
  { background: "bg-green-800" },
  { background: "bg-emerald-600" },
  { background: "bg-teal-600" },
  { background: "bg-teal-800" },
  { background: "bg-cyan-600" },
  { background: "bg-cyan-800" },
  { background: "bg-sky-600" },
  { background: "bg-blue-600" },
  { background: "bg-blue-800" },
  { background: "bg-indigo-600" },
  { background: "bg-indigo-800" },
  { background: "bg-violet-600" },
  { background: "bg-purple-600" },
  { background: "bg-purple-800" },
  { background: "bg-fuchsia-600" },
  { background: "bg-pink-600" },
  { background: "bg-pink-800" },
  { background: "bg-rose-600" },
  { background: "bg-slate-600" },
  { background: "bg-stone-600" },
  { background: "bg-zinc-700" },
  { background: "bg-slate-800" },
]

export default groupCategories;