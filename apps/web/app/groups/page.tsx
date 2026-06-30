import GroupsClientPage from "./clientPage";

export default async function GroupsPage({ searchParams }: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const search: { [key: string]: string | string[] | undefined } = await searchParams;

  return  <GroupsClientPage search={search}></GroupsClientPage>;
}