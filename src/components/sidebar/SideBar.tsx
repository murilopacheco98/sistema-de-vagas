import React from "react";
import { useNavigate } from "react-router-dom";
import { BsPersonCircle, BsClipboardCheck } from "react-icons/bs";
import { TbReportSearch } from "react-icons/tb";

import { MdBusinessCenter } from "react-icons/md";
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

  return (
    <>
      {filter ? (
        <div className="relative w-[90px] bg-slate-100 h-[100vh] text-center border-r-[3px] flex-col ">
          <div className="mt-[20px] mb-[60px] px-[5px]">
            <img src={require("../../assets/growdev.png")} />
          </div>
          <div className="mb-[20px] text-center">
            {vagasAbertas ? (
              <div className="mb-[20px] text-center font-bold text-[#E16E0E]">
                <div className="flex justify-center text-[30px]">
                  <TbReportSearch />
                </div>
                <div className="text-[12px]">Vagas</div>
                <div className="text-[12px]">abertas</div>
              </div>
            ) : (
              <div className="mb-[20px] text-center font-bold text-[#2B385B]">
                <div className="flex justify-center text-[30px]">
                  <TbReportSearch />
                </div>
                <div className="text-[12px]">Vagas</div>
                <div className="text-[12px]">abertas</div>
              </div>
            )}
            {bancoTalentos ? (
              <div className="mb-[20px] text-center font-bold text-[#E16E0E]">
                <div className="flex justify-center mb-[-5px] text-[13px]">
                  <AiFillStar />
                </div>
                <div className="flex justify-center text-[30px]">
                  <IoIosPeople />
                </div>
                <div className="text-[12px]">Banco de</div>
                <div className="text-[12px]">Talentos</div>
              </div>
            ) : (
              <div className="mb-[20px] text-center font-bold text-[#2B385B]">
                <div className="flex justify-center mb-[-5px] text-[13px]">
                  <AiFillStar />
                </div>
                <div className="flex justify-center text-[30px]">
                  <IoIosPeople />
                </div>
                <div className="text-[12px]">Banco de</div>
                <div className="text-[12px]">Talentos</div>
              </div>
            )}
            {parceiros ? (
              <div className="mb-[20px] text-center font-bold text-[#E16E0E]">
                <div className="flex justify-center text-[30px]">
                  <IoIosBusiness />
                </div>
                <div className="text-[12px]">Empresas</div>
                <div className="text-[12px]">Parceiras</div>
              </div>
            ) : (
              <div className="mb-[20px] cursor-pointer text-center font-bold text-[#2B385B]">
                <div className="flex justify-center text-[30px]">
                  <IoIosBusiness />
                </div>
                <div className="text-[12px]">Empresas</div>
                <div className="text-[12px]">Parceiras</div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className=" w-[90px] h-[100vh] text-center border-r-[3px] flex-col ">
          <div className="mt-[20px] mb-[60px] px-[5px]">
            <img src={require("../../assets/growdev.png")} />
          </div>
          {vagasAbertas ? (
            <div className="mb-[20px] text-center font-bold text-[#E16E0E]">
              <div className="flex justify-center text-[30px]">
                <TbReportSearch />
              </div>
              <div className="text-[12px]">Vagas</div>
              <div className="text-[12px]">abertas</div>
            </div>
          ) : (
            <div
              onClick={() => navigate("/growdever")}
              className="mb-[20px] cursor-pointer text-center font-bold text-[#2B385B]"
            >
              <div className="flex justify-center text-[30px]">
                <TbReportSearch />
              </div>
              <div className="text-[12px]">Vagas</div>
              <div className="text-[12px]">abertas</div>
            </div>
          )}
          {bancoTalentos ? (
            <div className="mb-[20px] text-center font-bold text-[#E16E0E]">
              <div className="flex justify-center mb-[-5px] text-[13px]">
                <AiFillStar />
              </div>
              <div className="flex justify-center text-[30px]">
                <IoIosPeople />
              </div>
              <div className="text-[12px]">Banco de</div>
              <div className="text-[12px]">Talentos</div>
            </div>
          ) : (
            <div
              onClick={() => navigate("/growdever/banco-de-talentos")}
              className="mb-[20px] cursor-pointer text-center font-bold text-[#2B385B]"
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
          )}
          {parceiros ? (
            <div className="mb-[20px] text-center font-bold text-[#E16E0E]">
              <div className="flex justify-center text-[30px]">
                <IoIosBusiness />
              </div>
              <div className="text-[12px]">Empresas</div>
              <div className="text-[12px]">Parceiras</div>
            </div>
          ) : (
            <div
              onClick={() => navigate("/growdever/parceiros")}
              className="mb-[20px] cursor-pointer text-center font-bold text-[#2B385B]"
            >
              <div className="flex justify-center text-[30px]">
                <IoIosBusiness />
              </div>
              <div className="text-[12px]">Empresas</div>
              <div className="text-[12px]">Parceiras</div>
            </div>
          )}
        </div>
      )}
    </>
  );
};
