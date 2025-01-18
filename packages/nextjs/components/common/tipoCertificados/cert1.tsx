import Image from 'next/image';
import React from 'react';
import QRCode from "react-qr-code";
import { Address } from '~~/components/scaffold-eth';

interface DiplomaProps {
  address: string;
  pais: string;
  id: number;
  nombre: string;
  curso: string;
  institucion: string;
  duracion: string;
  certificador: string;
  fecha: string;
  nombreCertificador: string;
}

const Cert1: React.FC<DiplomaProps> = ({
  address,
  pais,
  id,
  nombre,
  curso,
  institucion,
  duracion,
  certificador,
  fecha,
  nombreCertificador
}) => {
    
  const [location, setLocation] = React.useState("");

  React.useEffect(() => {
    setTimeout(function() {
      setLocation(window.location.href);
    }, 1000)
  }, []);

    return (
        <div className="!container mx-auto p-0 m-0 border-[14px] border-[#D2B48C] min-w-[560px] bg-white text-black">
          <div className="flex flex-row justify-between mx-10 mt-8 mb-2">
            <span className='h-[70px]'>
              <img src="/uptaragua.png" alt="Logoupt" style={{ height: '100%', width: 'auto' }}/>
            </span>
            <span className='h-[70px] mt-4'>
              <img src="/seal.png" alt="Logocert" style={{ height: '100%', width: 'auto' }}/>
              {/* <Image src="/seal.png" alt="Logocert"  height={0} width={0} style={{ height: '100%', width: 'auto' }} objectFit="contain" sizes="100vw"/> */}
            </span>
            <span className='h-[70px]'>
              <img src="/etharagua.png" alt="Logoeth" style={{ height: '100%', width: 'auto' }}/>
              {/* <Image src="/etharagua.png" alt="Logo" height={0} width={0} objectFit="contain" style={{ height: '100%', width: 'auto' }} sizes="100vw"/> */}
            </span>
          </div>
    
          <div className="text-[#D2B48C] text-center text-3xl mb-4">
            Certificado de Aprobación
          </div>
    
          <div className="mb-4 text-center">
            {institucion}, certifican por la presente que
          </div>
    
          <div className="w-3/5 mx-auto pb-2 mb-2 text-2xl italic text-center border-b-2 border-[#D2B48C]">
            <span className='font-bold'>{nombre}</span>
            <br/>
            <span className='flex justify-center text-lg not-italic'>{address !== "" ? <Address address={address} format="long" onlyEnsOrAddress size="lg" blockie={false}/>: (pais !== "" && (pais + " ID " + id))}</span>
          </div>

          <div className="mb-4 text-center">
            ha aprobado con éxito el curso de
            <br /><span className='text-lg font-bold'>{curso}</span>
            <br /> de {duracion} horas de duración.
          </div>

          <div className="flex flex-row justify-center w-full mb-5 ">
            <div className='flex flex-col items-center w-1/3 mt-1'>
              <div>{nombreCertificador}</div>
              <div className='w-[180px] border-b-2 border-[#D2B48C] mt-3' />
              <div>Certificador</div>
              <div className='text-[8px] h-2'>{certificador}</div>
            </div>
            <div className='flex justify-center w-1/3'>
              <div className='w-[80px] h-[80px] border-2 rounded-md p-2 border-[#D2B48C]'>
                {location !=="" ? 
                  <QRCode value={location} className='' style={{ height: "auto", maxWidth: "100%", width: "100%" }}/>
                :
                  <div className='w-[80px] h-[60px]'></div>
                }
              </div>
            </div>
            <div className='flex flex-col items-center w-1/3 mt-1'>
              <div>{fecha}</div>
              <div className='w-[180px] border-b-2 border-[#D2B48C] mt-3' />
              <div>La Victoria</div>
            </div>
          </div>
        </div>
      );
    };

export default Cert1;