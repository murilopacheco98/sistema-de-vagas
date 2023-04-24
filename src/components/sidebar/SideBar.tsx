import React from "react";
import { useNavigate } from "react-router-dom";
import { TbReportSearch } from "react-icons/tb";
import { IoIosPeople, IoIosBusiness } from "react-icons/io";
import { AiFillStar } from "react-icons/ai";

interface SideBarProps {
  filter?: boolean;
  vagasAbertas?: boolean;
  bancoTalentos?: boolean;
  parceiros?: boolean;
}

export const SideBar = (props: SideBarProps) => {
  const { filter, vagasAbertas, bancoTalentos, parceiros } = props;
  const navigate = useNavigate();

  const textVagasAbertas = vagasAbertas ? "text-[#E16E0E]" : "[#2B385B]";
  const textBancoTalentos = bancoTalentos ? "text-[#E16E0E]" : "[#2B385B]";
  const textParceiros = parceiros ? "text-[#E16E0E]" : "[#2B385B]";
  const bgFilter = filter && "bg-slate-100";

  return (
    <div className="">
      <div
        className={`${bgFilter} w-[90px] h-[100vh] text-center border-r-[3px] flex-col`}
      >
        <div className="mt-[20px] mb-[60px] px-[5px]">
          <img src={require("../../assets/growdev.png")} alt="foto" />
        </div>
        <div
          onClick={() => !vagasAbertas && navigate("/growdever")}
          className={`mb-[20px] cursor-pointer text-center font-bold ${textVagasAbertas}`}
        >
          <div className="flex justify-center text-[30px]">
            <TbReportSearch />
          </div>
          <div className="text-[12px]">Vagas</div>
          <div className="text-[12px]">abertas</div>
        </div>
        <div
          onClick={() =>
            !bancoTalentos && navigate("/growdever/banco-de-talentos")
          }
          className={`mb-[20px] cursor-pointer text-center font-bold ${textBancoTalentos}`}
        >
          <div className="flex justify-center mb-[-5px] text-[13px]">
            <AiFillStar />
          </div>
          <div className="flex justify-center text-[34px]">
            <IoIosPeople />
          </div>
          <div className="text-[12px]">Banco de</div>
          <div className="text-[12px]">Talentos</div>
        </div>
        <div
          onClick={() => !parceiros && navigate("/growdever/parceiros")}
          className={`mb-[20px] cursor-pointer text-center font-bold ${textParceiros}`}
        >
          <div className="flex justify-center text-[30px]">
            <IoIosBusiness />
          </div>
          <div className="text-[12px]">Empresas</div>
          <div className="text-[12px]">Parceiras</div>
        </div>
      </div>
    </div>
  );
};
