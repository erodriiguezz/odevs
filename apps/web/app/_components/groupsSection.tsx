import GroupsSectionClient from "./groupsSectionClient";
import { Suspense } from "react";

export default () => {
  return  <Suspense fallback={<div className="text-center py-10 text-zinc-500">Loading groups...</div>}>
            <GroupsSectionClient />
          </Suspense>
}