import Logo from "@/components/logo";

export default () =>
  <div className="fixed right-0 left-0 bottom-20 inset-y-16 flex flex-col justify-center gap-10 bg-background text-foreground theme-trans">
    <Logo sad={true} className="h-36"/>
    <div className="flex flex-row items-center justify-center">
      <h1 className="inline-block border-r-1 border-foreground/30 pr-6 mr-6 text-3xl h-16 leading-16 theme-trans">
        404
      </h1>
      <div className="inline-block">
        <h2 className="text-lg theme-trans">
          This page could not be found.
        </h2>
      </div>
    </div>
  </div>