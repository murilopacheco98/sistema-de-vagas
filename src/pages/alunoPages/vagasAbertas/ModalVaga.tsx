/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Button, TextField, Modal } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  jobPostAddTalent,
  selectById,
} from "../../../store/modules/job/JobSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ContentState, EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

interface IModalInfosEventCalendaryProps {
  open: boolean;
  handleClose?: () => void;
  id: string;
}

export const ModalVaga = ({
  handleClose,
  open,
  id,
}: IModalInfosEventCalendaryProps) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty()
  );

  const job = useAppSelector((state) => selectById(state, id));
  const userLogin = Object.values(
    useAppSelector((state) => state.userLogin.entities)
  );
  const talentBank = Object.values(
    useAppSelector((state) => state.talentBank.entities)
  );

  useEffect(() => {
    if (job?.description) {
      setEditorState(
        EditorState.createWithContent(
          ContentState.createFromBlockArray(
            htmlToDraft(job.description).contentBlocks
          )
        )
      );
    } else {
      setEditorState(
        EditorState.createWithContent(
          ContentState.createFromBlockArray(htmlToDraft("").contentBlocks)
        )
      );
    }
  }, [id]);

  const AddTalent = async () => {
    setLoading(true);
    if (userLogin[0]?.uid !== undefined) {
      if (talentBank[0] !== undefined) {
        const success = await dispatch(
          jobPostAddTalent({
            token: userLogin[0] ? userLogin[0]?.token : "",
            jobTalent: {
              jobUid: id,
              talentUid: talentBank[0] ? talentBank[0]?.uid : "",
            },
          })
        );
        if (success.payload.name === "AxiosError") {
          toast.error(success.payload.response.data.message);
        } else {
          toast.success("Usuário candidatado com sucesso.");
        }
      } else {
        toast.error("Cadastre seu perfil para se candidatar");
      }
    } else {
      toast.error("Faça o login para se candidatar");
    }
    setLoading(false);
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        className="flex justify-center items-center"
      >
        <div className="overflow-y-scroll bg-white w-[100vw] md:w-[90vw] lg:w-[85vw] xl:w-[75vw] h-[650px]">
          <ToastContainer />
          <div className="justify-between flex md:w-[100%] border-b-[2px]">
            <div className="flex">
              <div className="cursor-pointer text-[#E16E0E] text-[20px] w-[250px] lg:w-[300px] min-h-[60px] items-center flex justify-center">
                Detalhes da vaga
              </div>
            </div>
            <div className="h-[40px] flex justify-end">
              <div
                onClick={handleClose}
                className=" cursor-pointer text-[26px] font-bold mt-[10px] mr-[25px] text-[#E16E0E]"
              >
                X
              </div>
            </div>
          </div>
          <div className="px-[20px] md:px-[40px] mt-[20px]">
            <div className="mb-[20px] text-[18px] text-[#5B5B5B]">
              Dados do Responsável
            </div>
            <div className=" flex flex-wrap w-[100%]">
              <div className="w-[calc(100%/3-10px)] lg:w-[calc(100%/3-18px)] min-w-[200px] mr-[15px] lg:mr-[26px] mb-[20px]">
                <TextField
                  disabled
                  fullWidth
                  label="Nome"
                  sx={{
                    "& .MuiInputBase-input.Mui-disabled": {
                      WebkitTextFillColor: "#000000",
                    },
                  }}
                  placeholder="Escrever"
                  value={job?.dataProfileDTO.name}
                />
              </div>
              <div className="w-[calc(100%/3-10px)] lg:w-[calc(100%/3-18px)] min-w-[200px] mr-[15px] lg:mr-[26px] mb-[20px]">
                <TextField
                  disabled
                  required
                  fullWidth
                  label="E-mail"
                  sx={{
                    "& .MuiInputBase-input.Mui-disabled": {
                      WebkitTextFillColor: "#000000",
                    },
                  }}
                  placeholder="Escrever"
                  value={job?.dataProfileDTO.email}
                />
              </div>
            </div>
            <div className="mb-[20px] text-[18px] text-[#5B5B5B]">
              Requisitos Principais
            </div>
            <div className="w-[100%] flex flex-wrap">
              <div className="w-[67%] mr-[3%] min-w-[300px] mb-[20px]">
                <TextField
                  disabled
                  fullWidth
                  value={job?.keywordsName}
                  label="Tecnologias"
                  sx={{
                    "& .MuiInputBase-input.Mui-disabled": {
                      WebkitTextFillColor: "#000000",
                    },
                  }}
                />
              </div>
              <div className="w-[30%] min-w-[100px] mb-[20px]">
                <TextField
                  disabled
                  sx={{
                    "& .MuiInputBase-input.Mui-disabled": {
                      WebkitTextFillColor: "#000000",
                    },
                  }}
                  value={job?.seniority}
                  label="Senioridade"
                />
              </div>
            </div>
            <div className="mb-[10px] text-[18px] text-[#5B5B5B]">
              Descrição
            </div>
            <div className="border-[1px] px-[15px] border-[#c1c0c0] rounded-md w-[100%] mr-[20px] md:mr-[26px] mb-[20px]">
              <Editor
                toolbarHidden
                readOnly
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"
                editorState={editorState}
              />
            </div>
            <div className=" w-[100%] mr-[15px] md:mr-[26px] mb-[20px]">
              <TextField
                disabled
                multiline
                fullWidth
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "#000000",
                  },
                }}
                label="Diferenciais"
                value={job?.differentials}
              />
            </div>
            <div className="mb-[20px] text-[18px] text-[#5B5B5B]">
              Informações da Vaga
            </div>
            <div className="w-[50%] min-w-[350px] mr-[15px] md:mr-[26px] mb-[20px]">
              <TextField
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "#000000",
                  },
                }}
                disabled
                fullWidth
                label="Titulo da Vaga"
                value={job?.title}
              />
            </div>
            <div className="flex flex-wrap w-[100%]">
              <div className="w-[calc(100%/3-15px)] lg:w-[calc(100%/3-26px)] min-w-[200px] mr-[15px] lg:mr-[26px] mb-[20px]">
                <TextField
                  fullWidth
                  value={job?.workFormat}
                  label="Modelo de trabalho"
                  disabled
                  sx={{
                    "& .MuiInputBase-input.Mui-disabled": {
                      WebkitTextFillColor: "#000000",
                    },
                  }}
                />
              </div>
              <div className="w-[calc(100%/3-15px)] lg:w-[calc(100%/3-26px)] min-w-[200px] mr-[15px] lg:mr-[26px] mb-[20px]">
                <TextField
                  value={job?.companyDTO.name}
                  fullWidth
                  label="Nome da Empresa"
                  disabled
                  sx={{
                    "& .MuiInputBase-input.Mui-disabled": {
                      WebkitTextFillColor: "#000000",
                    },
                  }}
                />
              </div>
              <div className="w-[calc(100%/3-15px)] lg:w-[calc(100%/3-26px)] min-w-[200px] mr-[15px] lg:mr-[26px] mb-[20px]">
                <TextField
                  fullWidth
                  label="Data de início"
                  type="date"
                  value={job?.expectedStartDate}
                  disabled
                  sx={{
                    "& .MuiInputBase-input.Mui-disabled": {
                      WebkitTextFillColor: "#000000",
                    },
                  }}
                />
              </div>
              <div className="w-[calc(100%/3-15px)] lg:w-[calc(100%/3-26px)] min-w-[200px] mr-[15px] lg:mr-[26px] mb-[20px]">
                <TextField
                  sx={{
                    "& .MuiInputBase-input.Mui-disabled": {
                      WebkitTextFillColor: "#000000",
                    },
                  }}
                  disabled
                  fullWidth
                  label="Orçamento"
                  placeholder="Escrever"
                  value={job?.budget}
                  type="number"
                />
              </div>
              <div className="w-[calc(100%/3-15px)] lg:w-[calc(100%/3-26px)] min-w-[200px] mr-[15px] lg:mr-[26px] mb-[20px]">
                <TextField
                  sx={{
                    "& .MuiInputBase-input.Mui-disabled": {
                      WebkitTextFillColor: "#000000",
                    },
                  }}
                  disabled
                  fullWidth
                  label="Cidade"
                  placeholder="Escrever"
                  value={job?.cityName}
                />
              </div>
              <div className="w-[calc(100%/3-15px)] lg:w-[calc(100%/3-26px)] min-w-[200px] mr-[15px] lg:mr-[26px] mb-[20px]">
                <TextField
                  sx={{
                    "& .MuiInputBase-input.Mui-disabled": {
                      WebkitTextFillColor: "#000000",
                    },
                  }}
                  disabled
                  fullWidth
                  label="Estado"
                  placeholder="Escrever"
                  value={job?.stateName}
                />
              </div>
            </div>
            <div className="flex justify-end mb-[30px] w-[100%]">
              <Button
                type="submit"
                variant="contained"
                color="warning"
                sx={{ borderRadius: 100 }}
                onClick={AddTalent}
                disabled={loading}
              >
                <div className="normal-case font-bold text-[16px] px-[10px]">
                  Candidatar
                </div>
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
