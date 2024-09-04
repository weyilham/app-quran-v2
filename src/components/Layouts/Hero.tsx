import { useEffect, useState } from "react";
import NoAyat from "../ui/NoAyat";
import { SuratType } from "./Content";

interface HeroProps {
  surat: SuratType | undefined;
  scroll: number;
}
const Hero: React.FC<HeroProps> = ({ surat, scroll }) => {
  const nilaiScroll = Math.round(scroll);

  const gradasiColor = [
    "from-pink-500 to-pink-600",
    "from-purple-500 to-purple-600",
  ];

  const [currentGradasi, setCurrentGradasi] = useState(gradasiColor[0]);
  let i = 0;

  const changeGradasi = () => {
    i = (i + 1) % gradasiColor.length; // Increment and wrap around
    setCurrentGradasi(gradasiColor[i]);
  };

  useEffect(() => {
    const intervalId = setInterval(changeGradasi, 2000); // Ganti setiap 2 detik

    return () => clearInterval(intervalId); // Bersihkan interval saat komponen di-unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {surat && (
        <div
          className={`container p-4 bg-gradient-to-r ${currentGradasi} rounded-md `}
          style={{ transition: "all 0.3s ease" }}
        >
          <div className="header flex flex-row justify-between items-center">
            <div className="title text-white">
              <h1 className="text-3xl font-primaryBold">
                {surat.namaLatin} - {surat.nama}
              </h1>
              <p className="text-sm font-primarySemibold mt-3">
                {surat.arti} - {surat.jumlahAyat} ayat - {surat.tempatTurun}
              </p>
            </div>
            <NoAyat no_ayat={surat.nomor} className="text-white" />
          </div>
          <div className="slider mt-16">
            <div className="w-full h-2 bg-white rounded-full">
              <div
                style={{ width: `${nilaiScroll > 100 ? 0 : nilaiScroll}%` }}
                className={` h-[100%] bg-slate-900 rounded-full relative`}
              >
                <div className="w-4 h-4 bg-slate-950 rounded-full absolute left-full top-1/2 -translate-x-1/2 -translate-y-1/2"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;
