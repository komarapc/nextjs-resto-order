import { GetServerSideProps, GetServerSidePropsContext } from "next";

import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function NotFound() {
  const router = useRouter();
  useEffect(() => {
    console.log(router);
  });
  return (
    <>
      <Head>
        <title>Not Found</title>
      </Head>
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <h1 className="text-8xl font-light">4😭4</h1>
        <h1 className="text-4xl font-light my-5">Page Not Found</h1>
      </div>
    </>
  );
}
