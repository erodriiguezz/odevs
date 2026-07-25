import type { ReactNode } from "react";

interface EmptyStateProps {
  title: string;
  description?: ReactNode;
  action?: { label: string; onClick: () => void };
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
      {action && (
        <button
          type="button"
          onClick={action.onClick}
          className="inline-flex cursor-pointer items-center justify-center self-start rounded-full border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground sm:self-auto"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
