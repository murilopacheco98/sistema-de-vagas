import React from "react";
import { useNavigate } from "react-router-dom";
import { BsClipboardCheck } from "react-icons/bs";
import { TbReportSearch } from "react-icons/tb";

interface SideBarProps {
  filter?: boolean;
  vagasAbertas?: boolean;
  minhasVagas?: boolean;
}
export const SideBarParceiro = (props: SideBarProps) => {
  const { filter, vagasAbertas, minhasVagas } = props;
  const navigate = useNavigate();

  const textVagasAbertas = vagasAbertas ? "text-[#E16E0E]" : "[#2B385B]";
  const textMinhasVagas = minhasVagas ? "text-[#E16E0E]" : "[#2B385B]";
  const bgFilter = filter && "bg-slate-100";

  return (
    <>
      <div
        className={`${bgFilter} relative w-[90px] bg-white h-[100vh] text-center border-r-[3px] flex-col`}
      >
        <div className="mt-[20px] mb-[60px] px-[5px]">
          <img src={require("../../assets/growdev.png")} alt="growdev" />
        </div>

        <div
          onClick={() => !minhasVagas && navigate("/empresa-parceira")}
          className={`cursor-pointer mb-[20px] text-center font-bold ${textMinhasVagas}`}
        >
          <div className="flex justify-center">
            <BsClipboardCheck className="text-[30px]" />
          </div>
          <div className="text-[12px]">Vagas</div>
          <div className="text-[12px]">Inscritas</div>
        </div>
        <div
          onClick={() =>
            !vagasAbertas && navigate("/empresa-parceira/vagas-abertas")
          }
          className={`cursor-pointer mb-[20px] text-center font-bold ${textVagasAbertas}`}
        >
          <div className="flex justify-center">
            <TbReportSearch className="text-[38px]" />
          </div>
          <div className="text-[12px]">Vagas</div>
          <div className="text-[12px]">abertas</div>
        </div>
      </div>
    </>
  );
};
