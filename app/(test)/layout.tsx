import Layout from "@/components/layout/sidebar";
import { SiteFooter } from "@/components/layout/site-footer";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";

export default async function GenrateLayout({ children }) {
  return (
    <div>
      <main className="flex-1 ">
        {/* <MaxWidthWrapper className="flex h-full max-w-7xl flex-col gap-4 px-0 lg:gap-6"> */}
        <Layout>{children}</Layout>
        {/* <SiteFooter /> */}
        {/* </MaxWidthWrapper> */}
      </main>
    </div>
  );
}
