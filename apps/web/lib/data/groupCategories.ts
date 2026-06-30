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

export const colors = [
  { background: "bg-[#5B4FE9]"},
  { background: "bg-[#EA580C]"},
  { background: "bg-[#0D9488]"},
  { background: "bg-[#E11D48]"},
  { background: "bg-[#0284C7]"},
  { background: "bg-[#D97706]"},
  { background: "bg-[#7C3AED]"},
  { background: "bg-[#059669]"},
  { background: "bg-[#DB2777]"},
  { background: "bg-[#0891B2]"},
  { background: "bg-[#DC2626]"},
  { background: "bg-[#65A30D]"},
  { background: "bg-[#C026D3]"},
  { background: "bg-[#2563EB]"},
  { background: "bg-[#475569]"},
]

export default groupCategories;