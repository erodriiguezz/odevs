import { ReactNode, Suspense } from "react";

export default ({ children }: { children: ReactNode }) => {
  return  <Suspense fallback={<div className="text-center py-10 text-zinc-500 dark:text-zinc-200">Loading groups...</div>}>
            {children}
          </Suspense>
}