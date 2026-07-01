import { useSearchParams } from "next/navigation";
import GroupsSectionClient from "./groupsSectionClient";

export default async () => {
  const search = await useSearchParams();

  return  <GroupsSectionClient search={search}></GroupsSectionClient>
}