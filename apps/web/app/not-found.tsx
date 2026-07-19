import Logo from "@/components/logo";

export default function NotFound() {
  return (
    <div className="fixed inset-x-0 bottom-20 top-16 flex flex-col justify-center gap-10 bg-background text-foreground">
      <Logo sad={true} className="h-36" />
      <div className="flex flex-row items-center justify-center">
        <h1 className="mr-6 inline-block h-16 border-r border-foreground/30 pr-6 text-3xl leading-none">
          <span className="inline-flex h-full items-center">404</span>
        </h1>
        <div className="inline-block">
          <h2 className="text-lg">This page could not be found.</h2>
        </div>
      </div>
    </div>
  );
}
