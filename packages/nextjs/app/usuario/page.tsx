"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { LiaEthereum, LiaIdCard } from "react-icons/lia";
import ReturnButton from "~~/components/common/ReturnButton";
import { Card, CardContent } from "~~/components/ui/card";

const Home: NextPage = () => {
  // const { address: connectedAddress } = useAccount();

  const outerCardStyle =
    "w-full sm:w-1/3 md:w-1/5 hover:transform hover:scale-105 hover:shadow-xl transition duration-100 ease-in-out cursor-pointer min-w-[180px]";

  const innerCardStyle = "hover:bg-muted/80 transition duration-100 ease-in-out";

  return (
    <>
      <div className="pt-10 pl-10">
        <ReturnButton ruta="/" />
      </div>
      <div className="flex flex-col items-center flex-grow mt-6 sm:mt-0">
        <div className="px-5">
          <h1 className="text-center">
            <span className="block mb-2 text-5xl font-bold">Certificados</span>
            <span className="block text-3xl font-extralight">ETHEREUM ARAGUA</span>
          </h1>
        </div>

        <div className="flex-grow w-full px-8 py-12 mt-4">
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16">
            <Card className={outerCardStyle} innerClassName={innerCardStyle}>
              <Link href="usuario/id">
                <CardContent className="flex flex-col items-center p-10 text-center">
                  <LiaIdCard className="w-12 h-12 mt-2" />
                  <p>
                    Ver por <br />
                    ID
                  </p>
                </CardContent>
              </Link>
            </Card>

            <Card className={outerCardStyle} innerClassName={innerCardStyle}>
              <Link href="usuario/address">
                <CardContent className="flex flex-col items-center p-10 text-center">
                  <LiaEthereum className="w-12 h-12 mt-2" />
                  <p>
                    Ver por <br />
                    Address
                  </p>
                </CardContent>
              </Link>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
