import Head from "next/head";
import dynamic from "next/dynamic";

const DarkModeToggle = dynamic(() => import("../DarkModeToggle"), {
  ssr: false,
});

const BaseLayout = ({ title, description = "", children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DarkModeToggle />
      <div className="root">{children}</div>
    </>
  );
};

export default BaseLayout;
