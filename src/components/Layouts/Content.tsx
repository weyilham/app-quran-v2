/* eslint-disable @typescript-eslint/no-explicit-any */
import CardSurat from "./CardSurat";
import Hero from "./Hero";
import Select from "@/components/ui/Select";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

export interface SuratType {
  nomor: number;
  nama: string;
  namaLatin: string;
  jumlahAyat: string;
  arti: string;
  tempatTurun: string;
  deskripsi: string;
  audioFull: string;
  ayat: string[];
  audio: any;
}

const Qary: any = [
  {
    "01": "Abdullah Al Juhany",
    "02": "Abdul Muhsin Al Qasim",
    "03": "Abdurrahman As-Sudais",
    "04": "Ibrahim Al Dossary",
    "05": "Misyari Rasyid Al Afasi",
  },
];

function Content() {
  const { pathname } = useLocation();
  const ayatRef = useRef<HTMLSelectElement>(null);
  const qaryRef = useRef<HTMLSelectElement>(null);

  const navigate = useNavigate();
  const [surat, setSurat] = useState<SuratType>();
  // const [tafsir, setTafsir] = useState<any>();
  const [selectQary, setSelectQary] = useState<string>("01");

  const [scroll, setScroll] = useState<number>(0);
  const scrollableDiv = document.getElementById("scrollableDiv");
  const scrollHeight = scrollableDiv?.scrollHeight || 0;
  const clientHeight = scrollableDiv?.clientHeight || 0;

  useEffect(() => {
    if (scrollableDiv) {
      scrollableDiv.addEventListener("scroll", () => {
        const persen =
          (scrollableDiv.scrollTop / (scrollHeight - clientHeight)) * 100;
        setScroll(persen);
      });
    }
  }, [scrollableDiv, scrollHeight, clientHeight]);
  // console.log(Math.round(scroll));

  const handleChange = () => {
    const selected = ayatRef.current?.value; // Dapatkan nilai yang dipilih
    if (selected) {
      // Navigasi ke hash baru di URL
      navigate(pathname + "#" + selected);

      // Scroll ke elemen dengan ID yang sesuai
      const element = document.getElementById(selected);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
    // removeEventListener("hashchange", handleChange);
  };

  const handleQaryChange = () => {
    const selected = qaryRef.current?.value; // Dapatkan nilai yang dipilih
    if (selected) {
      // Navigasi ke hash baru di URL
      setSelectQary(selected);
    }
    // removeEventListener("hashchange", handleQaryChange);
  };

  useEffect(() => {
    const getSurat = async () => {
      const { data } = await axios.get("https://equran.id/api/v2" + pathname);
      setSurat(data.data);
    };

    getSurat();
  }, [pathname]);

  return (
    <div className="lg:w-3/4 w-full bg-white rounded-md p-4 max-h-[90vh] ">
      <Hero surat={surat} scroll={scroll} />

      <div className="mt-8 grid grid-cols-2 gap-2">
        <div className="ayat">
          <Select label="Ayat" ref={ayatRef} onChange={handleChange}>
            {surat?.ayat &&
              surat.ayat.map((item: any, index) => {
                return (
                  <option key={index} value={item.nomorAyat}>
                    {item.nomorAyat}
                  </option>
                );
              })}
          </Select>
        </div>

        <div className="qary">
          {Qary.map((item: any, index: number) => {
            return (
              <Select
                key={index}
                label="Qary"
                ref={qaryRef}
                onChange={handleQaryChange}
              >
                {Object.keys(item).map((key, index) => {
                  return (
                    <option key={index} value={key}>
                      {item[key]}
                    </option>
                  );
                })}
              </Select>
            );
          })}
          {/* <Select label="Qary" ref={ref} onChange={handleChange}></Select> */}
        </div>
      </div>

      <div className="main">
        <CardSurat surat={surat} qary={selectQary} />
      </div>
    </div>
  );
}

export default Content;
