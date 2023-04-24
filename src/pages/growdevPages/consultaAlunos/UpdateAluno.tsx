import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SideBar } from "../../../components/sidebar/SideBar";
import { ModalVagas } from "./ModalVagas";

export const UpdateAluno = () => {
  const navigate = useNavigate();
  const [dadosProfissional, setDadosProfissional] = useState<boolean>(true);
  const [vagasInscritas, setVagasInscritas] = useState<boolean>(false);
  const [modalOne, setModalOne] = useState<boolean>(false);
  const [edicao, setEdicao] = useState<boolean>(false);

  // const openModal = () => {
  //   setModalOne(true);
  // };

  const closeModal = () => {
    setModalOne(false);
    setEdicao(false);
  };

  return (
    <>
      <ModalVagas
        open={modalOne}
        handleClose={closeModal}
        isEdit={edicao}
        // user={user[0]}
        // currentPage={currentPage}
        // size={size}
      />
      <div className="flex">
        <SideBar bancoTalentos />
        <div className="w-[92.9vw]">
          <div className="h-[70px] w-[100%] bg-blue-900 justify-end flex items-center">
            <div className="mr-[55px] text-[25px] text-white">icon usuário</div>
          </div>
          <div className="h-[160px] w-[100%] justify-start bg-gray-900 text-white flex">
            <div className="flex-col ml-[95px] mt-[22px]">
              <div
                className="cursor-pointer text-[12px]"
                onClick={() => navigate("/banco-de-talentos")}
              >
                ICON Alunos
              </div>
              <div className="font-bold text-[20px]">Nome aluno</div>
            </div>
          </div>
          <div className="bg-[#E5E5E5] sm:w-[85vw] md:w-[87vw] lg:w-[92.3vw] h-[700px] absolute">
            <div className="w-[80vw] overflow-x-scroll h-[700px] mt-[-62px] sm:ml-[3vw] md:ml-[3vw] lg:ml-[6vw] bg-white border-[3px] rounded-2xl">
              <div className="flex items-center justify-start ">
                <div className="w-[1220px] border-b-[2px] h-[60px] flex items-center justify-start">
                  {dadosProfissional ? (
                    <div className="w-[200px] h-[60px] items-center flex justify-center border-b-[2px] border-orange-600">
                      Dados do profissional
                    </div>
                  ) : (
                    <div
                      className="cursor-pointer w-[200px] h-[60px] items-center flex justify-center"
                      onClick={() => {
                        setDadosProfissional(true);
                        setVagasInscritas(false);
                      }}
                    >
                      Dados do profissional
                    </div>
                  )}
                  {vagasInscritas ? (
                    <div className="w-[200px] h-[60px] items-center flex justify-center border-b-[2px] border-orange-600">
                      Vagas Inscritas
                    </div>
                  ) : (
                    <div
                      className="cursor-pointer w-[200px] h-[60px] items-center flex justify-center"
                      onClick={() => {
                        setDadosProfissional(false);
                        setVagasInscritas(true);
                      }}
                    >
                      Vagas Inscritas
                    </div>
                  )}
                </div>
              </div>
              {dadosProfissional && (
                <div className="mx-[5vw] min-w-[1050px]">
                  <div className="flex items-center">
                    <div className="my-[30px] mr-[30px] text-[#5B5B5B] font-bold">
                      Informações do candidato
                    </div>
                    <div className="text-white bg-[#5B5B5B] h-[30px] py-[5px] px-[15px] text-[12px] rounded-2xl">
                      Indisponível
                    </div>
                  </div>
                  <div className="flex flex-wrap">
                    <div className="w-[19vw] min-w-[250px] mr-[40px] mb-[26px]">
                      <TextField fullWidth label="Nome" />
                    </div>
                    <div className="w-[19vw] min-w-[250px] mr-[40px] mb-[26px]">
                      <TextField fullWidth label="E-mail" />
                    </div>
                    <div className="w-[19vw] min-w-[250px] mr-[40px] mb-[26px]">
                      <TextField fullWidth label="Celular" />
                    </div>
                    <div className="w-[19vw] min-w-[250px] mr-[40px] mb-[26px]">
                      <TextField fullWidth label="Cidade" />
                    </div>
                    <div className="w-[19vw] min-w-[250px] mr-[40px] mb-[26px] hover:border-black rounded-md border-[#b5b2b2] border-[1.5px]">
                      <div className="text-[#5B5B5B] flex justify-center items-center w-[100%] h-[55px] text-[15px] font-bold">
                        Acessar currículo
                      </div>
                      <div className="opacity-0 mt-[-60px]">
                        <TextField
                          type={"file"}
                          placeholder="teste"
                          className="cursor-pointer"
                        />
                      </div>
                    </div>
                    <div className="flex-col items-center h-[60px] text-[16px] text-[#5B5B5B]">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="aluno"
                          name="aluno"
                          className="mr-[10px]"
                        />
                        <label htmlFor="aluno">Aluno Growdev</label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="pcd"
                          name="pcd"
                          className="mr-[10px]"
                        />
                        <label htmlFor="pcd">PCD</label>
                      </div>
                    </div>
                  </div>
                  <div className="my-[20px] text-[#5B5B5B] font-bold">
                    Competências
                  </div>
                  <div className="flex mb-[40px]">
                    <div className="w-[19vw] min-w-[250px] mr-[40px]">
                      <TextField fullWidth label="Senioridade" />
                    </div>
                    <div className="w-[27vw] min-w-[350px]">
                      <TextField fullWidth multiline label="Tecnologias" />
                    </div>
                  </div>
                  <div className="mb-[20px] text-[#5B5B5B] font-bold">
                    Links relacionados
                  </div>
                  <div className="flex mb-[50px]">
                    <div className="w-[19vw] min-w-[250px] mr-[40px]">
                      <TextField fullWidth label="Linkedin" />
                    </div>
                    <div className="w-[19vw] min-w-[250px] mr-[40px]">
                      <TextField fullWidth label="Github" />
                    </div>
                    <div className="w-[19vw] min-w-[250px]">
                      <TextField fullWidth label="Outro" />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button
                      variant="contained"
                      color="warning"
                      sx={{ borderRadius: 100, mr: "40px", width: "150px" }}
                    >
                      <div className="normal-case font-bold">Salvar</div>
                    </Button>
                  </div>
                </div>
              )}
              {vagasInscritas && (
                <div className="overflow-scroll w-[1220px]">
                  <div className="mt-[40px] w-[1200px] pl-[3vw] flex text-[12px] h-[40px] border-b-[2px]">
                    <div className="w-[200px] text-start font-bold">Vagas</div>
                    <div className="w-[200px] text-start font-bold">
                      Situação
                    </div>
                    <div className="w-[200px] text-start font-bold">
                      Empresa
                    </div>
                    <div className="w-[200px] text-start font-bold">
                      Formato
                    </div>
                    <div className="w-[200px] text-start font-bold">
                      Senioridade
                    </div>
                    <div className="w-[200px] text-start font-bold">Cidade</div>
                  </div>
                  <div className="flex w-[1200px] pl-[3vw] items-center h-[70px] text-[12px] border-b-[2px]">
                    <div className="w-[200px] text-start">Nome da vaga</div>
                    <div className="w-[200px] flex justify-start">
                      <div className="text-white font-bold px-[15px] py-[5px] items-center flex justify-center bg-blue-400 rounded-2xl">
                        Status
                      </div>
                    </div>
                    <div className="w-[200px] justify-start flex ">Growdev</div>
                    <div className="w-[200px] text-start">Híbrido</div>
                    <div className="w-[200px] justify-start items-center flex flex-wrap">
                      Junior
                    </div>
                    <div className="w-[200px] justify-start items-center flex flex-wrap">
                      Porto Alegre
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
