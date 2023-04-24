import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Button,
  Modal,
  TextField,
} from "@mui/material";
// import { useAppDispatch, useAppSelector } from "../../../store/hooks";

interface IModalInfosEventCalendaryProps {
  open: boolean;
  handleClose?: () => void;
  setRender?: Dispatch<SetStateAction<boolean>>;
  render?: boolean;
}

export const ModalDetalhe = ({
  handleClose,
  open,
  setRender,
  render,
}: IModalInfosEventCalendaryProps) => {
  // const [id, setId] = useState<number>(0);
  // const [error, setError] = useState<string>("");
  // const [modalTwo, setModalTwo] = useState<boolean>(false);
  // const [edition, setEdition] = useState<boolean>();
  const [tituloVaga, setTituloVaga] = useState<boolean>(true);
  const [pessoasInscritas, setPessoasInscritas] = useState<boolean>(false);
  // const dispatch = useAppDispatch();

  // const openModal = () => {
    // setModalTwo(true);
  // };

  // const closeModal = () => {
  //   setModalTwo(false);
  //   handleClose;
  //   setEdition(false);
  // };

  // const handleAddEvent = async () => {
    // setError("");
    // const agendamento = await dispatch(
    // agendamentoPost({
    // })
    // );
    // if (agendamento.payload.name === "AxiosError") {
    // const message = agendamento.payload.message.split(" ");
    // setError(message[5]);
    //   const message = agendamento.payload.response.data.message;
    //   setError(message);
    // } else {
    //   setRender(!render);
    //   handleClose();
    // }
    // }
  // };

  // const handleUpdateEvent = async () => {
  //   setError("");
  // };

  // const handleDeleteEvent = async () => {};

  return (
    <Modal
      open={open}
      onClose={handleClose}
      className="flex justify-center items-center"
    >
      <div className="bg-white w-[100vw] xl:w-[85vw] h-[600px] overflow-x-scroll">
        <div className="h-[600px] w-[1000px] xl:w-[1304px] bg-white border-[3px] rounded-2xl">
          <div className="h-[40px] flex justify-end items-center bg-[#292A2D]">
            <div
              onClick={handleClose}
              className=" cursor-pointer text-[26px] font-bold mr-[25px] text-[#E16E0E]"
            >
              X
            </div>
          </div>
          <div className="flex items-center justify-start border-b-[2px]">
            <div className="w-[1304px] h-[60px] flex items-center justify-start border-b-[2px]">
              {tituloVaga ? (
                <div className="w-[163px] h-[60px] items-center flex justify-center border-b-[2px] border-orange-600">
                  Título da vaga
                </div>
              ) : (
                <div
                  className="cursor-pointer w-[163px] h-[60px] items-center flex justify-center"
                  onClick={() => {
                    setTituloVaga(true);
                    setPessoasInscritas(false);
                  }}
                >
                  Título da vaga
                </div>
              )}
              {pessoasInscritas ? (
                <div className="w-[163px] h-[60px] items-center flex justify-center border-b-[2px] border-orange-600">
                  Pessoas Inscritas
                </div>
              ) : (
                <div
                  className="cursor-pointer w-[163px] h-[60px] items-center flex justify-center"
                  onClick={() => {
                    setTituloVaga(false);
                    setPessoasInscritas(true);
                  }}
                >
                  Pessoas Inscritas
                </div>
              )}
              <div className="w-[163px] flex justify-center">
                <div className="rounded-2xl text-white px-[15px] py-[5px] bg-green-600">
                  Análise
                </div>
              </div>
              <div className="flex justify-end lg:w-[600px] md:w-[500px] w-[400px] xl:w-[700px]">
                <Button
                  variant="contained"
                  color="warning"
                  sx={{ borderRadius: 100, mr: "40px" }}
                >
                  Cadastrar candidato
                </Button>
              </div>
            </div>
          </div>
          {tituloVaga && (
            <div className="mx-[5vw]">
              <div className="my-[20px] text-[#5B5B5B] font-bold">
                Dados do Responsável
              </div>
              <div className="flex">
                <div className="w-[19vw] min-w-[250px] mr-[26px]">
                  <TextField fullWidth label="Nome" size="small" />
                </div>
                <div className="w-[19vw] min-w-[250px] mr-[26px]">
                  <TextField fullWidth label="E-mail" size="small" />
                </div>
                <div className="w-[19vw] min-w-[200px] mr-[26px]">
                  <TextField fullWidth label="Celular" size="small" />
                </div>
              </div>
              <div className="my-[20px] text-[#5B5B5B] font-bold">
                Requisitos principais
              </div>
              <div className="w-[30vw] mb-[30px]">
                <TextField fullWidth label="Palavras-chaves" />
              </div>
              <div className="w-[100%]">
                <TextField fullWidth multiline label="Descrição da Vaga" />
              </div>
              <div className="my-[20px] text-[#5B5B5B] font-bold">
                Informações da vaga
              </div>
              <div className="flex">
                <div className="w-[19vw] min-w-[150px] mr-[26px]">
                  <TextField fullWidth label="Formato" size="small" />
                </div>
                <div className="w-[19vw] min-w-[150px] mr-[26px]">
                  <TextField fullWidth label="Cidade" size="small" />
                </div>
                <div className="w-[19vw] min-w-[150px] mr-[26px]">
                  <TextField fullWidth label="Data de ínicio" size="small" />
                </div>
                <div className="w-[19vw] min-w-[150px] mr-[26px]">
                  <TextField fullWidth label="Teto da vaga" size="small" />
                </div>
              </div>
            </div>
          )}
          {pessoasInscritas && (
            <div className="overflow-scroll">
              <div className=" ml-[3vw] mt-[20px] mb-[30px]">Participantes</div>
              <div className="w-[1100px] pl-[3vw] flex text-[12px] h-[40px] border-b-[2px]">
                <div className="w-[200px] text-start font-bold">Nome</div>
                <div className="w-[200px] text-start font-bold">Contatos</div>
                <div className="w-[200px] text-start font-bold">Cidade</div>
                <div className="w-[200px] text-start font-bold">Status</div>
                <div className="w-[200px] text-start font-bold">
                  Tecnologias
                </div>
              </div>
              <div className="flex w-[1100px] pl-[3vw] items-center h-[70px] text-[12px] border-b-[2px]">
                <div className="w-[200px] text-start">Peter Parker</div>
                <div className="w-[200px] justify-start flex ">
                  <div className="mr-[10px]">Linkedin</div>
                  <div className="mr-[10px]">Wpp</div>
                  <div className="">Email</div>
                </div>
                <div className="w-[200px] text-start">Porto Alegre</div>
                <div className="w-[200px] flex justify-start">
                  <div className="text-white font-bold px-[15px] py-[5px] items-center flex justify-center bg-blue-400 rounded-2xl">
                    Status
                  </div>
                </div>
                <div className="w-[280px] justify-start items-center flex flex-wrap">
                  <div className="flex justify-start ">
                    <div className="mr-[5px] cursor-pointer text-blue-700 border-[1.5px] border-blue-700 rounded-2xl py-[1px] px-[10px]">
                      Ux
                    </div>
                    <div className="mr-[5px] cursor-pointer text-blue-700 border-[1.5px] border-blue-700 rounded-2xl py-[1px] px-[10px]">
                      Ui
                    </div>
                    <div className="mr-[5px] cursor-pointer text-blue-700 border-[1.5px] border-blue-700 rounded-2xl py-[1px] px-[10px]">
                      Java
                    </div>
                    <div className="mr-[5px] cursor-pointer text-blue-700 border-[1.5px] border-blue-700 rounded-2xl py-[1px] px-[10px]">
                      C#
                    </div>
                    <div className="mr-[5px] cursor-pointer text-blue-700 border-[1.5px] border-blue-700 rounded-2xl py-[1px] px-[10px]">
                      Python
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* </div> */}
    </Modal>
  );
};
