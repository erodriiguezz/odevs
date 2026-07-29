import type { ReactNode } from "react";

interface EmptyStateProps {
  title: string;
  description?: ReactNode;
  action?: ReactNode;
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div
      role="status"
      className="card-elev flex flex-col items-start gap-4 rounded-2xl px-5 py-6 sm:flex-row sm:items-center sm:justify-between"
    >
      <div>
        <p className="font-display text-base font-semibold text-foreground">
          {title}
        </p>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {action && <div className="self-start sm:self-auto">{action}</div>}
    </div>
  );
}
