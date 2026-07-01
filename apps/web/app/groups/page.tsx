import { Suspense } from "react";
import GroupsClientPage from "./clientPage";

export default function GroupsPage() {
  return  <Suspense fallback={<div className="text-center py-10 text-zinc-500">Loading groups...</div>}>
            <GroupsClientPage/>
          </Suspense>;
}