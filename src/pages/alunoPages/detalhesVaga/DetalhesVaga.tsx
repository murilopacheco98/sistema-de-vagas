import React, { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import { CardVaga } from "../../../components/card/CardVaga";
import { SideBar } from "../../../components/sidebar/SideBar";
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

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [differentials, setDifferentials] = useState<string>("");
  const [workFormat, setWorkFormat] = useState<string>("");
  const [expectedStartDate, setExpectedStartDate] = useState<string>("");
  const [budget, setBudget] = useState<number | string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const url = window.location.href.split("/");

  useEffect(() => {
    parceiro ? setUid(url[6]) : setUid(url[5]);
  }, []);

  const jobByUid = useAppSelector((state) => selectById(state, uid));

  useEffect(() => {
    if (jobByUid) {
      setTitle(jobByUid.title);
      setDescription(jobByUid.description);
      setDifferentials(jobByUid.differentials);
      setWorkFormat(jobByUid.workFormat);
      setExpectedStartDate(jobByUid.expectedStartDate);
      setBudget(jobByUid.budget ? jobByUid.budget : "Á combinar.");
      setCity(jobByUid.cityName);
      setState(jobByUid.stateName);

      setName(jobByUid.dataProfileDTO.name);
      setEmail(jobByUid.dataProfileDTO.email);
    }
  }, [uid]);

  return (
    <div>
      <div className="flex">
        {parceiro ? (
          <SideBarParceiro vagasAbertas />
        ) : (
          <SideBarAluno vagasAbertas />
        )}
        <div className="w-[93.3vw] h-[920px] bg-[#E5E5E5]">
          <TopBar />
          <div className="h-[165px] w-[100%] justify-start bg-gray-900 text-white flex-col">
            <div className="pt-[35px] ml-[65px] lg:ml-[95px] text-[22px] font-bold">
              {jobByUid?.title}
            </div>
          </div>
          <div className="bg-[#E5E5E5] sm:w-[85vw] md:w-[87vw] lg:w-[92.3vw] absolute">
            <div className="w-[80vw] overflow-scroll h-[650px] mt-[-62px] sm:ml-[3vw] md:ml-[3vw] lg:ml-[6vw] bg-white border-[3px] rounded-2xl">
              <div className="flex items-center justify-start ">
                <div className="w-[1220px] border-b-[2px] h-[60px] flex items-center justify-start">
                  {tituloVaga ? (
                    <div className="w-[200px] h-[60px] items-center flex justify-center border-b-[2px] border-orange-600">
                      Informaçoes da Vaga
                    </div>
                  ) : (
                    <div
                      className="cursor-pointer w-[200px] h-[60px] items-center flex justify-center"
                      onClick={() => {
                        setTituloVaga(true);
                        setResponsavelVaga(false);
                      }}
                    >
                      Informações da vaga
                    </div>
                  )}
                  {responsavelVaga ? (
                    <div className="w-[200px] h-[60px] items-center flex justify-center border-b-[2px] border-orange-600">
                      Responsável da vaga
                    </div>
                  ) : (
                    <div
                      className="cursor-pointer w-[200px] h-[60px] items-center flex justify-center"
                      onClick={() => {
                        setTituloVaga(false);
                        setResponsavelVaga(true);
                      }}
                    >
                      Responsável da vaga
                    </div>
                  )}
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
                        <div className="normal-case font-bold">
                          Inscrever-se
                        </div>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              {tituloVaga && (
                <div className="px-[20px] md:px-[50px] pt-[35px] text-[#5B5B5B]">
                  <div className="flex w-[90%] items-center mb-[30px]">
                    <div className="mr-[10px] mb-[5px] text-[30px] flex">
                      <MdBusinessCenter />
                    </div>
                    <div className="text-[18px] flex font-bold">{title}</div>
                  </div>
                  <div className="min-w-[500px] mb-[30px]">
                    <TextField
                      multiline
                      // required
                      fullWidth
                      label="Descrição da vaga"
                      placeholder="Escrever"
                      value={description}
                    />
                  </div>
                  <div className="min-w-[500px] mb-[30px]">
                    <TextField
                      multiline
                      // required
                      fullWidth
                      label="Diferenciais"
                      placeholder="Escrever"
                      value={differentials}
                    />
                  </div>
                  <div className="flex flex-wrap min-w-[500px] w-[80vw] lg:w-[75vw] xl:w-[70vw]">
                    <div className="w-[200px] lg:w-[20vw] min-w-[250px] mr-[20px] md:mr-[26px] mb-[20px]">
                      <TextField
                        required
                        fullWidth
                        label="Modelo"
                        placeholder="Escrever"
                        value={workFormat}
                      />
                    </div>
                    <div className=" w-[25vw] lg:w-[20vw] min-w-[250px] mr-[15px] md:mr-[26px] mb-[20px]">
                      <TextField
                        required
                        fullWidth
                        label="Data de ínicio"
                        placeholder="Escrever"
                        value={expectedStartDate}
                      />
                    </div>
                    <div className="w-[25vw] lg:w-[20vw] min-w-[250px] mr-[15px] md:mr-[26px] mb-[20px]">
                      <TextField
                        // disabled
                        required
                        fullWidth
                        label="Orçamento"
                        placeholder="Escrever"
                        // value={jobByUid?.budget}
                        value={budget}
                        // onChange={(e) => e.target.value}
                      />
                    </div>
                    <div className="w-[25vw] lg:w-[20vw] min-w-[250px] mr-[15px] md:mr-[26px] mb-[20px]">
                      <TextField
                        required
                        fullWidth
                        label="Cidade"
                        placeholder="Escrever"
                        value={city}
                      />
                    </div>
                    <div className="w-[25vw] lg:w-[20vw] min-w-[250px] mr-[15px] md:mr-[26px] mb-[20px]">
                      <TextField
                        required
                        fullWidth
                        label="Estado"
                        placeholder="Escrever"
                        value={state}
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
                      <TextField fullWidth label="Nome" value={name} />
                    </div>
                    <div className="mb-[20px] w-[80vw] md:w-[30vw] lg:w-[30vw] xl:w-[22vw] min-w-[250px] mr-[15px] lg:mr-[30px]">
                      <TextField fullWidth label="Email" value={email} />
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
    </div>
  );
};
