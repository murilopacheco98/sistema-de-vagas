/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import { SideBarAluno } from "../../../components/sidebar/SideBarAluno";
import { useNavigate } from "react-router-dom";
import { SideBarParceiro } from "../../../components/sidebar/SideBarParceiro";
import { TopBar } from "../../../components/topBar/TopBar";
import { useAppSelector } from "../../../store/hooks";
import { selectById } from "../../../store/modules/job/JobSlice";
import { MdBusinessCenter } from "react-icons/md";

interface DetalhesVagaProps {
  inscrever?: boolean;
  parceiro?: boolean;
}

export const DetalhesVaga = (props: DetalhesVagaProps) => {
  const { inscrever, parceiro } = props;
  const navigate = useNavigate();
  const [tituloVaga, setTituloVaga] = useState<boolean>(true);
  const [responsavelVaga, setResponsavelVaga] = useState<boolean>(false);
  const [uid, setUid] = useState<string>("");

  const url = window.location.href.split("/");

  useEffect(() => {
    parceiro ? setUid(url[6]) : setUid(url[5]);
  }, []);

  const jobByUid = useAppSelector((state) => selectById(state, uid));

  return (
    <div>
      <div className="flex">
        {parceiro ? <SideBarParceiro /> : <SideBarAluno />}
        <div className="w-[100%] md:w-[calc(100%-90px)] h-[920px] bg-[#E5E5E5]">
          <TopBar />
          <div className="h-[165px] w-[100%] justify-start bg-gray-900 text-white flex-col">
            <div className="pt-[35px] ml-[65px] lg:ml-[95px] text-[22px] font-bold">
              {jobByUid?.title}
            </div>
          </div>
          <div className="w-[100%] lg:w-[90%] lg:ml-[5%] xl:w-[80%] xl:ml-[10%] overflow-scroll h-[650px] mt-[-62px] bg-white border-[3px] rounded-2xl">
            <div className="flex items-center justify-start ">
              <div className="w-[1220px] border-b-[2px] h-[60px] flex items-center justify-start">
                <div
                  className={
                    tituloVaga
                      ? `w-[200px] h-[60px] items-center flex justify-center border-b-[2px] border-orange-600`
                      : `cursor-pointer w-[200px] h-[60px] items-center flex justify-center`
                  }
                  onClick={() => {
                    !tituloVaga && setTituloVaga(true);
                    !tituloVaga && setResponsavelVaga(false);
                  }}
                >
                  Informações da vaga
                </div>
                <div
                  className={
                    responsavelVaga
                      ? `w-[200px] h-[60px] items-center flex justify-center border-b-[2px] border-orange-600`
                      : `cursor-pointer w-[200px] h-[60px] items-center flex justify-center`
                  }
                  onClick={() => {
                    !responsavelVaga && setTituloVaga(false);
                    !responsavelVaga && setResponsavelVaga(true);
                  }}
                >
                  Responsável da vaga
                </div>
                {inscrever && (
                  <div className="flex justify-end w-[30vw] lg:w-[40vw] xl:w-[50vw]">
                    <Button
                      variant="contained"
                      color="warning"
                      sx={{
                        borderRadius: 100,
                        mr: "40px",
                        width: "150px",
                      }}
                      onClick={() => navigate("/consulta-alunos/editar")}
                    >
                      <div className="normal-case font-bold">Inscrever-se</div>
                    </Button>
                  </div>
                )}
              </div>
            </div>
            {tituloVaga && (
              <div className="px-[20px] md:px-[50px] pt-[35px] text-[#5B5B5B]">
                <div className="flex w-[90%] items-center mb-[10px]">
                  <div className="mr-[10px] mb-[5px] text-[30px] flex">
                    <MdBusinessCenter />
                  </div>
                  <div className="text-[18px] flex font-bold">
                    {jobByUid?.title}
                  </div>
                </div>
                <div
                  className="min-h-[60px] text-black text-[16px] flex flex-col justify-center border-[1.5px] rounded-md px-[15px] py-[5px] mb-[20px] border-[#c3c3c3] text-[11px]"
                  dangerouslySetInnerHTML={{
                    __html: jobByUid ? jobByUid?.description : "",
                  }}
                />
                <div className="min-w-[500px] mb-[30px]">
                  <TextField
                    disabled
                    multiline
                    fullWidth
                    label="Diferenciais"
                    value={jobByUid?.differentials}
                    sx={{
                      "& .MuiInputBase-input.Mui-disabled": {
                        WebkitTextFillColor: "#000000",
                      },
                    }}
                  />
                </div>
                <div className="flex flex-wrap min-w-[500px] w-[80vw] lg:w-[75vw] xl:w-[70vw]">
                  <div className="w-[200px] lg:w-[20vw] min-w-[250px] mr-[20px] md:mr-[26px] mb-[20px]">
                    <TextField
                      required
                      fullWidth
                      label="Modelo"
                      value={jobByUid?.workFormat}
                      sx={{
                        "& .MuiInputBase-input.Mui-disabled": {
                          WebkitTextFillColor: "#000000",
                        },
                      }}
                    />
                  </div>
                  <div className=" w-[25vw] lg:w-[20vw] min-w-[250px] mr-[15px] md:mr-[26px] mb-[20px]">
                    <TextField
                      fullWidth
                      label="Data de ínicio"
                      disabled
                      value={jobByUid?.expectedStartDate}
                      sx={{
                        "& .MuiInputBase-input.Mui-disabled": {
                          WebkitTextFillColor: "#000000",
                        },
                      }}
                    />
                  </div>
                  <div className="w-[25vw] lg:w-[20vw] min-w-[250px] mr-[15px] md:mr-[26px] mb-[20px]">
                    <TextField
                      fullWidth
                      label="Orçamento"
                      disabled
                      value={jobByUid?.budget}
                      sx={{
                        "& .MuiInputBase-input.Mui-disabled": {
                          WebkitTextFillColor: "#000000",
                        },
                      }}
                    />
                  </div>
                  <div className="w-[25vw] lg:w-[20vw] min-w-[250px] mr-[15px] md:mr-[26px] mb-[20px]">
                    <TextField
                      sx={{
                        "& .MuiInputBase-input.Mui-disabled": {
                          WebkitTextFillColor: "#000000",
                        },
                      }}
                      fullWidth
                      label="Cidade"
                      disabled
                      value={jobByUid?.cityName}
                    />
                  </div>
                  <div className="w-[25vw] lg:w-[20vw] min-w-[250px] mr-[15px] md:mr-[26px] mb-[20px]">
                    <TextField
                      fullWidth
                      label="Estado"
                      disabled
                      value={jobByUid?.stateName}
                      sx={{
                        "& .MuiInputBase-input.Mui-disabled": {
                          WebkitTextFillColor: "#000000",
                        },
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
            {responsavelVaga && (
              <div className="px-[3vw] pt-[40px] text-[#5B5B5B]">
                <div className="flex w-[90%] items-center mb-[30px]">
                  <div className="mr-[10px] mb-[5px] text-[30px] flex">
                    <MdBusinessCenter />
                  </div>
                  <div className="text-[18px] flex font-bold">
                    Dados do Responsável
                  </div>
                </div>
                <div className="flex flex-wrap">
                  <div className="mb-[20px] w-[80vw] md:w-[30vw] lg:w-[30vw] xl:w-[22vw] min-w-[250px] mr-[15px] lg:mr-[30px]">
                    <TextField
                      sx={{
                        "& .MuiInputBase-input.Mui-disabled": {
                          WebkitTextFillColor: "#000000",
                        },
                      }}
                      disabled
                      fullWidth
                      label="Nome"
                      value={jobByUid?.dataProfileDTO.name}
                    />
                  </div>
                  <div className="mb-[20px] w-[80vw] md:w-[30vw] lg:w-[30vw] xl:w-[22vw] min-w-[250px] mr-[15px] lg:mr-[30px]">
                    <TextField
                      sx={{
                        "& .MuiInputBase-input.Mui-disabled": {
                          WebkitTextFillColor: "#000000",
                        },
                      }}
                      disabled
                      fullWidth
                      label="Email"
                      value={jobByUid?.dataProfileDTO.email}
                    />
                  </div>
                  {/* <div className="mb-[20px] w-[80vw] md:w-[30vw] lg:w-[30vw] xl:w-[22vw] min-w-[250px] mr-[15px] lg:mr-[30px]"> */}
                  {/* <TextField fullWidth label="Celular" /> */}
                  {/* </div> */}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
};
