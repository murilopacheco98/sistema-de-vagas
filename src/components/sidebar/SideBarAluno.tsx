import React from "react";
import { useNavigate } from "react-router-dom";
import { BsPersonCircle, BsClipboardCheck } from "react-icons/bs";
import { TbReportSearch } from "react-icons/tb";

interface SideBarProps {
  filter?: boolean;
  perfil?: boolean;
  vagasAbertas?: boolean;
  vagasInscritas?: boolean;
  openMenu?: boolean;
}

export const SideBarAluno = (props: SideBarProps) => {
  const { filter, perfil, vagasAbertas, vagasInscritas, openMenu } = props;
  const navigate = useNavigate();

  const textVagasAbertas = vagasAbertas ? "text-[#E16E0E]" : "[#2B385B]";
  const textPerfil = perfil ? "text-[#E16E0E]" : "[#2B385B]";
  const textVagasInscritas = vagasInscritas ? "text-[#E16E0E]" : "[#2B385B]";
  const bgFilter = filter && "bg-slate-100";

  return (
    <>
      {openMenu && (
        <div
          className={`flex md:hidden ${bgFilter} bg-white z-20 absolute w-[90px] h-[100vh] text-center border-r-[3px] flex-col`}
        >
          <div className="pt-[20px] mb-[60px] px-[5px]">
            <img src={require("../../assets/growdev.png")} alt="meu perfil" />
          </div>
          <div
            onClick={() => !perfil && navigate("/meu-perfil")}
            className={`cursor-pointer mb-[20px] text-center font-bold ${textPerfil}`}
          >
            <div className="flex justify-center">
              <BsPersonCircle className="text-[30px]" />
            </div>
            <div className="text-[12px]">Perfil</div>
          </div>
          <div
            onClick={() => !vagasAbertas && navigate("/")}
            className={`cursor-pointer mb-[20px] text-center font-bold ${textVagasAbertas}`}
          >
            <div className="flex justify-center">
              <TbReportSearch className="text-[30px]" />
            </div>
            <div className="text-[12px]">Vagas</div>
            <div className="text-[12px]">abertas</div>
          </div>
          <div
            onClick={() => !vagasInscritas && navigate("/vagas-inscritas")}
            className={`cursor-pointer mb-[20px] text-center font-bold ${textVagasInscritas}`}
          >
            <div className="flex justify-center">
              <BsClipboardCheck className="text-[30px]" />
            </div>
            <div className="text-[12px]">Vagas</div>
            <div className="text-[12px]">Inscritas</div>
          </div>
        </div>
      )}
      <div className="hidden md:flex">
        <div
          className={`${bgFilter} relative w-[90px] h-[100vh] text-center border-r-[3px] flex-col`}
        >
          <div className="pt-[20px] mb-[60px] px-[5px]">
            <img src={require("../../assets/growdev.png")} alt="meu perfil" />
          </div>
          <div
            onClick={() => !perfil && navigate("/meu-perfil")}
            className={`cursor-pointer mb-[20px] text-center font-bold ${textPerfil}`}
          >
            <div className="flex justify-center">
              <BsPersonCircle className="text-[30px]" />
            </div>
            <div className="text-[12px]">Perfil</div>
          </div>
          <div
            onClick={() => !vagasAbertas && navigate("/")}
            className={`cursor-pointer mb-[20px] text-center font-bold ${textVagasAbertas}`}
          >
            <div className="flex justify-center">
              <TbReportSearch className="text-[30px]" />
            </div>
            <div className="text-[12px]">Vagas</div>
            <div className="text-[12px]">abertas</div>
          </div>
          <div
            onClick={() => !vagasInscritas && navigate("/vagas-inscritas")}
            className={`cursor-pointer mb-[20px] text-center font-bold ${textVagasInscritas}`}
          >
            <div className="flex justify-center">
              <BsClipboardCheck className="text-[30px]" />
            </div>
            <div className="text-[12px]">Vagas</div>
            <div className="text-[12px]">Inscritas</div>
          </div>
        </div>
      </div>
    </>
  );
};
