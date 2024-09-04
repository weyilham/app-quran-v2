/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Card } from "@/components/ui/card";
import NoAyat from "../ui/NoAyat";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { SuratType } from "./Content";

type PropsType = {
  active?: boolean;
};

function Sidebar(props: PropsType) {
  const { active } = props;
  const [surat, setSurat] = useState<SuratType[]>([]);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const noSurat = pathname.split("/")[2];
  const select: any = document.getElementById("ayat");

  useEffect(() => {
    const getAllSurat = async () => {
      const { data: surat } = await axios.get("https://equran.id/api/v2/surat");
      setSurat(surat.data);
    };
    getAllSurat();
  }, []);

  const handleClick = async (nomor: number) => {
    document.getElementById("scrollableDiv")?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    navigate(`/surat/${nomor}`);

    if (select) {
      select.value = 1;
    }
  };

  return (
    <div
      className={`lg:w-1/4 relative lg:block ${active ? "block" : "hidden"}`}
      id="sidebar"
    >
      <div className="bg-white rounded-md p-4 max-h-[90vh] overflow-y-auto hover:scrollbar-none">
        {surat &&
          surat.map((dataSurat, index) => {
            return (
              <div
                className="card-item mb-4"
                key={index}
                onClick={() => {
                  handleClick(dataSurat.nomor);
                }}
              >
                <Card
                  className={`w-full ${
                    dataSurat.nomor == parseInt(noSurat)
                      ? "bg-purple-100"
                      : "bg-slate-100"
                  } border-none py-2 xl:px-6 px-4 flex gap-4 xl:gap-8 items-center cursor-pointer group hover:bg-purple-100`}
                >
                  <NoAyat
                    no_ayat={dataSurat.nomor}
                    className="text-fuchsia-600 w-6 h-6 lg:w-8 lg:h-8"
                  />
                  <div className="w-full group-hover:text-purple-400">
                    <h4
                      className={`text-lg xl:text-xl mb-1 xl:mb-3 font-primaryBold ${
                        dataSurat.nomor == parseInt(noSurat)
                          ? "text-pink-500"
                          : ""
                      }`}
                    >
                      {dataSurat.namaLatin}
                    </h4>
                    <p
                      className={`text-[12px] xl:text-sm font-primarySemibold  ${
                        dataSurat.nomor == parseInt(noSurat)
                          ? "text-purple-400"
                          : "text-slate-500"
                      }`}
                    >
                      {dataSurat.arti} - {dataSurat.jumlahAyat} Ayat
                    </p>
                  </div>
                </Card>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Sidebar;
