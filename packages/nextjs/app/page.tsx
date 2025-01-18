"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { GrUserAdmin } from "react-icons/gr";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { PiCertificate } from "react-icons/pi";
// import { useAccount } from "wagmi";
// import { Address } from "~~/components/scaffold-eth";
import { Card, CardContent } from "~~/components/ui/card";

const Home: NextPage = () => {
  // const { address: connectedAddress } = useAccount();

  const outerCardStyle =
    "w-full sm:w-1/3 md:w-1/5 hover:transform hover:scale-105 hover:shadow-xl transition duration-100 ease-in-out cursor-pointer min-w-[180px]";

  const innerCardStyle = "hover:bg-muted/80 transition duration-100 ease-in-out";

  return (
    <>
      <div className="flex flex-col items-center flex-grow pt-20">
        <div className="px-5 mt-6 sm:mt-0">
          <h1 className="text-center">
            <span className="block mb-2 text-5xl font-bold">Certificados</span>
            <span className="block text-3xl font-extralight">ETHEREUM ARAGUA</span>
          </h1>
        </div>

        <div className="flex-grow w-full px-8 py-12 mt-4">
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16">
            <Card className={outerCardStyle} innerClassName={innerCardStyle}>
              <Link href="/usuario">
                <CardContent className="flex flex-col items-center p-10 text-center">
                  <PiCertificate className="w-12 h-12 mt-2" />
                  <p>
                    Ver tus <br />
                    Certificaciones
                  </p>
                </CardContent>
              </Link>
            </Card>

            <Card className={outerCardStyle} innerClassName={innerCardStyle}>
              <Link href="/certificador">
                <CardContent className="flex flex-col items-center p-10 text-center">
                  <AiOutlineSafetyCertificate className="w-12 h-12 mt-2" />
                  <p>
                    Accede como <br />
                    Certificador
                  </p>
                </CardContent>
              </Link>
            </Card>

            <Card className={outerCardStyle} innerClassName={innerCardStyle}>
              <Link href="/administrador">
                <CardContent className="flex flex-col items-center p-10 text-center">
                  <MdOutlineAdminPanelSettings className="w-12 h-12 mt-2" />
                  <p>
                    Accede como <br />
                    Administrador
                  </p>
                </CardContent>
              </Link>
            </Card>

            <Card className={outerCardStyle} innerClassName={innerCardStyle}>
              <Link href="/superadmin">
                <CardContent className="flex flex-col items-center p-10 text-center">
                  <GrUserAdmin className="w-12 h-12 mt-2" />
                  <p>
                    Accede como <br />
                    Super Admin
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
