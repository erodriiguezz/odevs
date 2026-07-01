import { GroupCategory } from "../types/group";
import propFromKeys from "./propFromKeys";

const groupCategories: Record<string, GroupCategory> = propFromKeys("name", {
  "General": { background: "bg-blue-600", darkBackground: "bg-blue-700" },
  "Community": { background: "bg-purple-600", darkBackground: "bg-purple-700" },
  "Innovation": { background: "bg-orange-600", darkBackground: "bg-orange-700" },
  "Language": { background: "bg-red-600", darkBackground: "bg-red-700" },
  "Projects": { background: "bg-indigo-600", darkBackground: "bg-indigo-700" },
  "Civic Tech": { background: "bg-green-600", darkBackground: "bg-green-700" },
  "DevOps": { background: "bg-teal-600", darkBackground: "bg-teal-700" },
  "Mobile": { background: "bg-pink-600", darkBackground: "bg-pink-700" },
  "Frontend": { background: "bg-cyan-600", darkBackground: "bg-cyan-700" },
  "Cloud": { background: "bg-sky-600", darkBackground: "bg-sky-700" },
  "Startup": { background: "bg-yellow-600", darkBackground: "bg-yellow-700" },
});

export default groupCategories;