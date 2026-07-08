import { ReactNode, Suspense } from "react";

export default ({ children }: { children: ReactNode }) => {
  return  <Suspense fallback={<div className="text-center py-10 text-muted-foreground theme-trans">Loading groups...</div>}>
            {children}
          </Suspense>
}