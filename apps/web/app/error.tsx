"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-lg flex-col items-center justify-center gap-4 px-4 py-16 text-center">
      <h2 className="font-display text-2xl font-semibold text-foreground">
        Something went wrong
      </h2>
      <p className="text-sm text-muted-foreground">
        We couldn&apos;t load the latest community data. Please try again.
      </p>
      <button
        type="button"
        onClick={reset}
        className="inline-flex cursor-pointer items-center justify-center rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-border-strong"
      >
        Try again
      </button>
    </div>
  );
}
