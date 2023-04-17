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

  return (
    <>
      {filter ? (
        <div className="relative w-[90px] bg-slate-100 h-[134vh] text-center border-r-[3px] flex-col ">
          <div className="mt-[20px] mb-[60px] px-[5px]">
            <img src={require("../../assets/growdev.png")} />
          </div>
          <div className="mb-[20px] text-center">
            {minhasVagas ? (
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
            {vagasAbertas ? (
              <div className="mb-[20px] text-center font-bold text-[#E16E0E]">
                <div className="flex justify-center">
                  <TbReportSearch className="text-[38px]" />
                </div>
                <div className="text-[12px]">Vagas</div>
                <div className="text-[12px]">abertas</div>
              </div>
            ) : (
              <div className="mb-[20px] text-center font-bold text-[#2B385B]">
                <div className="flex justify-center">
                  <TbReportSearch className="text-[38px]" />
                </div>
                <div className="text-[12px]">Vagas</div>
                <div className="text-[12px]">abertas</div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="relative w-[90px] bg-white h-[100vh] text-center border-r-[3px] flex-col">
          <div className="mt-[20px] mb-[60px] px-[5px]">
            <img src={require("../../assets/growdev.png")} />
          </div>
          {minhasVagas ? (
            <div className="mb-[20px] text-center font-bold text-[#E16E0E]">
              <div className="flex justify-center">
                <BsClipboardCheck className="text-[30px]" />
              </div>
              <div className="text-[12px]">Vagas</div>
              <div className="text-[12px]">Inscritas</div>
            </div>
          ) : (
            <div
              onClick={() => navigate("/empresa-parceira")}
              className="cursor-pointer mb-[20px] text-center font-bold text-[#2B385B]"
            >
              <div className="flex justify-center">
                <BsClipboardCheck className="text-[30px]" />
              </div>
              <div className="text-[12px]">Vagas</div>
              <div className="text-[12px]">Inscritas</div>
            </div>
          )}
          {vagasAbertas ? (
            <div className="mb-[20px] text-center font-bold text-[#E16E0E]">
              <div className="flex justify-center">
                <TbReportSearch className="text-[38px]" />
              </div>
              <div className="text-[12px]">Vagas</div>
              <div className="text-[12px]">abertas</div>
            </div>
          ) : (
            <div
              onClick={() => navigate("/empresa-parceira/vagas-abertas")}
              className="cursor-pointer mb-[20px] text-center font-bold text-[#2B385B]"
            >
              <div className="flex justify-center">
                <TbReportSearch className="text-[38px]" />
              </div>
              <div className="text-[12px]">Vagas</div>
              <div className="text-[12px]">abertas</div>
            </div>
          )}
        </div>
      )}
    </>
  );
};
