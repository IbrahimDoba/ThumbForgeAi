import { SiteFooter } from "@/components/layout/site-footer";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";

export default async function GenrateLayout({ children }) {
  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-50 flex h-14 bg-background px-4 lg:h-[60px] xl:px-8">
          <h1>Sidebar</h1>
        </header>

        <main className="flex-1 p-4 xl:px-8">
          <MaxWidthWrapper className="flex h-full max-w-7xl flex-col gap-4 px-0 lg:gap-6">
            {children}
            <SiteFooter />
          </MaxWidthWrapper>
        </main>
      </div>
    </div>
  );
}
