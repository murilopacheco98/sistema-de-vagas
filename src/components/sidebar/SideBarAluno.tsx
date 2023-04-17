import React from "react";
import { useNavigate } from "react-router-dom";
import { BsPersonCircle, BsClipboardCheck } from "react-icons/bs";
import { TbReportSearch } from "react-icons/tb";

import { MdBusinessCenter } from "react-icons/md";
import { IoIosPeople } from "react-icons/io";
import { AiFillStar } from "react-icons/ai";

interface SideBarProps {
  filter?: boolean;
  perfil?: boolean;
  vagasAbertas?: boolean;
  vagasInscritas?: boolean;
}
export const SideBarAluno = (props: SideBarProps) => {
  const { filter, perfil, vagasAbertas, vagasInscritas } = props;
  const navigate = useNavigate();

  return (
    <>
      {filter ? (
        <div className="relative w-[90px] bg-slate-100 h-[100vh] text-center border-r-[3px] flex-col ">
          <div className="pt-[20px] mb-[60px] px-[5px]">
            <img src={require("../../assets/growdev.png")} />
          </div>
          <div className="mb-[20px] text-center">
            {perfil ? (
              <div className="mb-[20px] text-center font-bold text-[#E16E0E]">
                <div className="flex justify-center">
                  <BsPersonCircle className="text-[30px]" />
                </div>
                <div className="text-[12px]">Perfil</div>
              </div>
            ) : (
              <div className="mb-[20px] text-center font-bold text-[#2B385B]">
                <div className="flex justify-center">
                  <BsPersonCircle className="text-[30px]" />
                </div>
                <div className="text-[12px]">Perfil</div>
              </div>
            )}
            {vagasAbertas ? (
              <div className="mb-[20px] text-center font-bold text-[#E16E0E]">
                <div className="flex justify-center">
                  <TbReportSearch className="text-[30px]" />
                </div>
                <div className="text-[12px]">Vagas</div>
                <div className="text-[12px]">abertas</div>
              </div>
            ) : (
              <div className="mb-[20px] text-center font-bold text-[#2B385B]">
                <div className="flex justify-center">
                  <TbReportSearch className="text-[30px]" />
                </div>
                <div className="text-[12px]">Vagas</div>
                <div className="text-[12px]">abertas</div>
              </div>
            )}
            {vagasInscritas ? (
              <div className="mb-[20px] text-center font-bold text-[#E16E0E]">
                <div className="flex justify-center">
                  <BsClipboardCheck className="text-[30px]" />
                </div>
                <div className="text-[12px]">Vagas</div>
                <div className="text-[12px]">Inscritas</div>
              </div>
            ) : (
              <div className="mb-[20px] text-center font-bold text-[#2B385B]">
                <div className="flex justify-center">
                  <BsClipboardCheck className="text-[30px]" />
                </div>
                <div className="text-[12px]">Vagas</div>
                <div className="text-[12px]">Inscritas</div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="relative w-[90px] h-[100vh] text-center border-r-[3px] flex-col">
          <div className="pt-[20px] mb-[60px] px-[5px]">
            <img src={require("../../assets/growdev.png")} />
          </div>
          {perfil ? (
            <div className="mb-[20px] flex-col justify-center font-bold text-[#E16E0E]">
              <div className="flex justify-center">
                <BsPersonCircle className="text-[30px]" />
              </div>
              <div className="text-[14px]">Perfil</div>
            </div>
          ) : (
            <div
              onClick={() => navigate("/")}
              className="cursor-pointer mb-[20px] text-center font-bold text-[#2B385B]"
            >
              <div className="flex justify-center">
                <BsPersonCircle className="text-[30px]" />
              </div>
              <div className="text-[12px]">Perfil</div>
            </div>
          )}
          {vagasAbertas ? (
            <div className="mb-[20px] text-center font-bold text-[#E16E0E]">
              <div className="flex justify-center">
                <TbReportSearch className="text-[30px]" />
              </div>
              <div className="text-[12px]">Vagas</div>
              <div className="text-[12px]">abertas</div>
            </div>
          ) : (
            <div
              onClick={() => navigate("/vagas-abertas")}
              className="cursor-pointer mb-[20px] text-center font-bold text-[#2B385B]"
            >
              <div className="flex justify-center">
                <TbReportSearch className="text-[30px]" />
              </div>
              <div className="text-[12px]">Vagas</div>
              <div className="text-[12px]">abertas</div>
            </div>
          )}
          {vagasInscritas ? (
            <div className="mb-[20px] text-center font-bold text-[#E16E0E]">
              <div className="flex justify-center">
                <BsClipboardCheck className="text-[30px]" />
              </div>
              <div className="text-[12px]">Vagas</div>
              <div className="text-[12px]">Inscritas</div>
            </div>
          ) : (
            <div
              onClick={() => navigate("/vagas-inscritas")}
              className="cursor-pointer mb-[20px] text-center font-bold text-[#2B385B]"
            >
              <div className="flex justify-center">
                <BsClipboardCheck className="text-[30px]" />
              </div>
              <div className="text-[12px]">Vagas</div>
              <div className="text-[12px]">Inscritas</div>
            </div>
          )}
        </div>
      )}
    </>
  );
};
