/* eslint-disable @typescript-eslint/no-explicit-any */
import Play from "@/assets/Icons/Play";
import { Button } from "../ui/button";
import { LuPause } from "react-icons/lu";
import { SuratType } from "./Content";
import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// import Modal from "../ui/Modal";

type PropsType = {
  surat: SuratType | undefined;
  qary: string;
};

function CardSurat({ surat, qary }: PropsType) {
  const [playing, setPlaying] = useState(false); // State untuk mengontrol apakah audio sedang diputar
  const [selectedAyatIndex, setSelectedAyatIndex] = useState<number | null>(
    null
  ); // Index ayat yang sedang diputar
  const audioRef = useRef<HTMLAudioElement | null>(null); // Ref untuk elemen audio
  const ayatRefs = useRef<(HTMLDivElement | null)[]>([]);
  const ayat: any = surat?.ayat;
  const navigate = useNavigate();
  const pathname = useLocation().pathname;
  const cardAyatRef = useRef<HTMLDivElement>(null);

  const handlePlayAudio = (index: number) => {
    if (audioRef.current && ayat) {
      const audioUrl = ayat[index].audio[qary];
      setSelectedAyatIndex(index); // Setel index ayat yang diputar
      audioRef.current.src = audioUrl; // Atur sumber audio ke URL yang dipilih
      audioRef.current.play(); // Putar audio
      setPlaying(true); // Setel state 'playing' menjadi true

      // Scroll otomatis ke ayat yang dipilih
      if (ayatRefs.current[index]) {
        ayatRefs.current[index]?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  };

  const handlePauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause(); // Menjeda audio
      setPlaying(false); // Setel state 'playing' menjadi false
    }
  };

  const handleAudioEnded = () => {
    if (
      ayat &&
      selectedAyatIndex !== null &&
      selectedAyatIndex < ayat.length - 1
    ) {
      // Jika ada ayat berikutnya, putar ayat berikutnya
      handlePlayAudio(selectedAyatIndex + 1);
      navigate(pathname + "#" + ayat[selectedAyatIndex + 1].nomorAyat);
    } else {
      setPlaying(false); // Setel state 'playing' menjadi false
    }
  };

  // const getTafsir = async () => {
  //   const { data } = await axios.get(
  //     "https://equran.id/api/v2/tafsir/" + surat?.nomor
  //   );
  //   setTafsir(data.data);
  //   console.log(tafsir);
  // };

  // getTafsir();

  return (
    <div
      className="w-full max-h-[48vh] overflow-y-auto scrollbar-none mt-4"
      id="scrollableDiv"
      ref={cardAyatRef}
    >
      {ayat?.length &&
        ayat.map((item: any, index: number) => {
          const isPlayingCurrentAyat = selectedAyatIndex === index && playing;
          return (
            <div
              key={index}
              id={item.nomorAyat}
              ref={(el) => (ayatRefs.current[index] = el)}
              className={`p-4 rounded-md mt-3 ${
                isPlayingCurrentAyat ? "bg-purple-100" : "bg-slate-100"
              }`}
            >
              <div className="font-primarySemibold flex justify-between text-2xl">
                <p>
                  {surat?.nomor}:{item.nomorAyat}
                </p>
                <p className="text-right">{item.teksArab}</p>
              </div>
              <div className="mt-10 flex flex-col gap-6">
                <div>
                  <p className="text-purple-500">{item.teksLatin}</p>
                  <p className="font-primarySemibold text-sm">
                    {item.teksIndonesia}
                  </p>
                </div>
                <div className="tombol flex items-center gap-3">
                  <Button
                    className="bg-pink-500 hover:bg-pink-700 rounded-full h-11 w-11"
                    onClick={() =>
                      playing && selectedAyatIndex === index
                        ? handlePauseAudio()
                        : handlePlayAudio(index)
                    }
                  >
                    {isPlayingCurrentAyat ? <LuPause /> : <Play />}
                  </Button>
                  {/* <Button className="bg-purple-500 hover:bg-purple-700 rounded-full h-11 w-11">
                    <LuBookmark />
                  </Button> */}

                  {/* <Modal /> */}
                </div>
              </div>
            </div>
          );
        })}

      {/* Elemen audio yang di-control dengan ref */}
      <audio ref={audioRef} onClick={handleAudioEnded} />
    </div>
  );
}

export default CardSurat;
