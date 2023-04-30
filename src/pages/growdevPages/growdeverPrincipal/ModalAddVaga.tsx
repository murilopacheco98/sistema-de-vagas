/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {
  Autocomplete,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import { Editor } from "react-draft-wysiwyg";
import { ContentState, EditorState, convertToRaw } from "draft-js";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  KeywordDTO,
  keywordGetAll,
  selectAll as selectAllKeyword,
} from "../../../store/modules/keyword/KeywordSlice";
import {
  jobPost,
  jobUpdate,
  selectById,
} from "../../../store/modules/job/JobSlice";
import { selectAll as selectUser } from "../../../store/modules/userLogin/UserLoginSlice";
import {
  companyGetAll,
  selectAll as selectAllCompany,
} from "../../../store/modules/company/CompanySlice";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import { JobDTO } from "../../../types/Job";
import { TokenResponse } from "../../../types/User";
import { toast } from "react-toastify";

interface IModalInfosEventCalendaryProps {
  open: boolean;
  handleClose?: () => void;
  isEdit: boolean;
  id: string;
  render: boolean;
  setRender: React.Dispatch<React.SetStateAction<boolean>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ModalAddVaga = ({
  handleClose,
  open,
  isEdit,
  id,
  render,
  setRender,
  setLoading,
}: IModalInfosEventCalendaryProps) => {
  const dispatch = useAppDispatch();

  const [editorState, setEditorState] = useState<EditorState | undefined>();
  const [content, setContent] = useState<any>();
  const [name, setName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [editVacancy, setEditVacancy] = useState<boolean>(false);

  const [shortDescription, setShortDescription] = useState<string>("");
  const [differentials, setDifferentials] = useState<string>("");
  const [seniority, setSeniority] = useState<string>("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [budget, setBudget] = useState<number>();
  const [workFormat, setWorkFormat] = useState<string>("");
  const [expectedStartDate, setExpectedStartDate] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  const [cityName, setCityName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [stateName, setStateName] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  const userLogin: TokenResponse[] | undefined = Object.values(
    useAppSelector(selectUser)
  );
  const jobEdit: JobDTO | undefined = useAppSelector((state) =>
    selectById(state, id)
  );

  useEffect(() => {
    const dateToday = Date().split(" ");
    setExpectedStartDate(dateToday[3] + "-02-" + dateToday[2]);
    dispatch(keywordGetAll());
    dispatch(companyGetAll());
    if (userLogin[0]) {
      setName(userLogin[0].userDTO.name);
      setPhoneNumber(userLogin[0].userDTO.phoneNumber);
      setEmail(userLogin[0].userDTO.email);
    }
    setKeywords(jobEdit ? jobEdit.keywordsName : []);
    setSeniority(jobEdit ? jobEdit.seniority : "");
    setDifferentials(jobEdit ? jobEdit.differentials : "");
    setTitle(jobEdit ? jobEdit.title : "");
    setWorkFormat(jobEdit ? jobEdit.workFormat : "");
    setCompanyName(jobEdit ? jobEdit.companyDTO.name : "");
    setExpectedStartDate(jobEdit ? jobEdit.expectedStartDate : "");
    setBudget(jobEdit ? jobEdit.budget : undefined);
    setCityName(jobEdit ? jobEdit.cityName : "");
    setStateName(jobEdit ? jobEdit.stateName : "");
    setShortDescription(jobEdit ? jobEdit.shortDescription : "");
    setStatus(jobEdit ? jobEdit.status : "");
    if (jobEdit?.description) {
      setEditorState(
        EditorState.createWithContent(
          ContentState.createFromBlockArray(
            htmlToDraft(jobEdit.description).contentBlocks
          )
        )
      );
    } else {
      setEditorState(EditorState.createEmpty());
    }
  }, [id]);

  const handleSubmit = async () => {
    setLoading(true);
    if (isEdit) {
      const job = await dispatch(
        jobUpdate({
          token: userLogin[0].token,
          jobDTO: {
            uid: jobEdit ? jobEdit.uid : "",
            title: title,
            description: content,
            shortDescription: shortDescription,
            mainRequirements: "",
            differentials: differentials,
            seniority: seniority,
            keywordsName: keywords,
            budget: budget,
            workFormat: workFormat,
            expectedStartDate: expectedStartDate,
            status: status,
            companyDTO: {
              uid: "",
              name: companyName,
            },
            cityName: cityName,
            dataProfileDTO: {
              uid: "",
              email: email,
              name: "indiferente",
            },
            stateName: stateName,
            numberParticipants: 0,
          },
        })
      );
      if (job.payload.name === "AxiosError") {
        toast.error("Nâao foi possível editar está vaga.");
        toast.error(job.payload.response.data.message);
      } else {
        if (handleClose) {
          setRender(!render);
          setEditVacancy(false);
          toast.success("Vaga adicionada com sucesso.");
          handleClose();
        }
      }
      setLoading(false);
    } else {
      const job = await dispatch(
        jobPost({
          token: userLogin[0].token,
          jobDTO: {
            uid: "",
            title: title,
            description: content,
            shortDescription: shortDescription,
            mainRequirements: "",
            differentials: differentials,
            seniority: seniority,
            keywordsName: keywords,
            budget: budget,
            workFormat: workFormat,
            expectedStartDate: expectedStartDate,
            status: status,
            companyDTO: {
              uid: "",
              name: companyName,
            },
            cityName: cityName,
            dataProfileDTO: {
              uid: "",
              email: email,
              name: "indiferente",
            },
            stateName: stateName,
            numberParticipants: 0,
          },
        })
      );
      if (job.payload.name === "AxiosError") {
        toast.error("Nâao foi possível adicionar está vaga.");
        toast.error(job.payload.response.data.message);
      } else {
        if (handleClose) {
          toast.success("Vaga adicionada com sucesso.");
          setRender(!render);
          handleClose();
        }
      }
      setLoading(false);
    }
  };

  const listKeyword = useAppSelector(selectAllKeyword);
  const listCompany = useAppSelector(selectAllCompany);

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        className="flex justify-center items-center"
      >
        <div className="bg-white w-[100vw] md:w-[90vw] lg:w-[85vw] xl:w-[75vw] h-[650px] overflow-x-scroll">
          <div className="justify-between flex md:w-[100%] border-b-[2px]">
            <div className="text-[#E16E0E] text-[20px] min-h-[60px] items-center flex ml-[5%]">
              Cadastro Vaga
            </div>
            <div className="flex items-center">
              {isEdit && (
                <Button
                  variant="contained"
                  color="warning"
                  sx={{ borderRadius: 100, marginRight: "30px" }}
                  onClick={() => {
                    editVacancy ? setEditVacancy(false) : setEditVacancy(true);
                  }}
                >
                  <div className="normal-case font-bold text-[14px] px-[10px]">
                    {editVacancy ? "Cancelar edição" : "Editar vaga"}
                  </div>
                </Button>
              )}
              <div
                onClick={handleClose}
                className=" cursor-pointer text-[26px] font-bold mr-[25px] text-[#E16E0E] min-h-[60px] items-center flex"
              >
                X
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="px-[20px] md:px-[40px] mt-[20px]">
              <div className="mb-[20px] text-[18px] text-[#5B5B5B]">
                Dados do Responsável
              </div>
              <div className=" flex flex-wrap w-[100%]">
                <div className="w-[calc(100%/3-10px)] lg:w-[calc(100%/3-18px)] min-w-[200px] mr-[15px] lg:mr-[26px] mb-[20px]">
                  <TextField
                    disabled
                    required
                    fullWidth
                    label="Nome"
                    placeholder="Escrever"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    sx={{
                      "& .MuiInputBase-input.Mui-disabled": {
                        WebkitTextFillColor: "#000000",
                      },
                    }}
                  />
                </div>
                <div className="w-[calc(100%/3-10px)] lg:w-[calc(100%/3-18px)] min-w-[200px] mr-[15px] lg:mr-[26px] mb-[20px]">
                  <TextField
                    disabled
                    required
                    fullWidth
                    label="E-mail"
                    placeholder="Escrever"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{
                      "& .MuiInputBase-input.Mui-disabled": {
                        WebkitTextFillColor: "#000000",
                      },
                    }}
                  />
                </div>
                <div className="w-[calc(100%/3-10px)] lg:w-[calc(100%/3-18px)] min-w-[200px] mb-[20px]">
                  <TextField
                    disabled
                    required
                    fullWidth
                    label="Celular"
                    placeholder="Escrever"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    sx={{
                      "& .MuiInputBase-input.Mui-disabled": {
                        WebkitTextFillColor: "#000000",
                      },
                    }}
                  />
                </div>
              </div>
              <div className="mb-[20px] text-[18px] text-[#5B5B5B]">
                Requisitos Principais
              </div>
              <div className="w-[100%] flex flex-wrap">
                <div className="w-[67%] mr-[3%] min-w-[300px] mb-[20px]">
                  {editVacancy ? (
                    <Autocomplete
                      multiple
                      fullWidth
                      limitTags={3}
                      value={keywords}
                      onChange={(e, value) => setKeywords(value)}
                      options={listKeyword
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map((keyword: KeywordDTO) => keyword.name)}
                      renderInput={(params) => (
                        <TextField {...params} label="Tecnologias" />
                      )}
                    />
                  ) : (
                    <TextField
                      disabled
                      fullWidth
                      value={keywords}
                      label="Tecnologias"
                      sx={{
                        "& .MuiInputBase-input.Mui-disabled": {
                          WebkitTextFillColor: "#000000",
                        },
                      }}
                    />
                  )}
                </div>
                <div className="w-[30%] min-w-[100px] mb-[20px]">
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Senioridade
                    </InputLabel>
                    <Select
                      disabled={!editVacancy}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={seniority}
                      label="Senioridade"
                      onChange={(e) => setSeniority(e.target.value)}
                      sx={{
                        "& .MuiInputBase-input.Mui-disabled": {
                          WebkitTextFillColor: "#000000",
                        },
                      }}
                    >
                      <MenuItem value="Júnior">Júnior</MenuItem>
                      <MenuItem value="Pleno">Pleno</MenuItem>
                      <MenuItem value="Senior">Senior</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div className="border-[1px] px-[10px] border-[#c1c0c0] rounded-[4px] w-[100%] mr-[20px] md:mr-[26px] mb-[20px]">
                <Editor
                  toolbarHidden={!editVacancy}
                  readOnly={!editVacancy}
                  wrapperClassName="wrapper-class"
                  editorClassName="editor-class"
                  toolbarClassName="toolbar-class"
                  editorState={editorState}
                  placeholder="Descrição da vaga"
                  onEditorStateChange={(e) => {
                    setEditorState(e);
                    setContent(
                      draftToHtml(convertToRaw(e.getCurrentContent()))
                    );
                  }}
                />
              </div>
              <div className=" w-[100%] mb-[20px]">
                <TextField
                  disabled={!editVacancy}
                  multiline
                  required
                  fullWidth
                  label="Breve descrição"
                  placeholder="Escrever"
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  sx={{
                    "& .MuiInputBase-input.Mui-disabled": {
                      WebkitTextFillColor: "#000000",
                    },
                  }}
                />
              </div>
              <div className=" w-[100%] mr-[15px] md:mr-[26px] mb-[20px]">
                <TextField
                  disabled={!editVacancy}
                  multiline
                  required
                  fullWidth
                  label="Diferenciais"
                  placeholder="Escrever"
                  value={differentials}
                  onChange={(e) => setDifferentials(e.target.value)}
                  sx={{
                    "& .MuiInputBase-input.Mui-disabled": {
                      WebkitTextFillColor: "#000000",
                    },
                  }}
                />
              </div>
              <div className="mb-[20px] text-[18px] text-[#5B5B5B]">
                Informações da Vaga
              </div>
              <div className="w-[50%] min-w-[350px] mr-[15px] md:mr-[26px] mb-[20px]">
                <TextField
                  disabled={!editVacancy}
                  required
                  fullWidth
                  label="Titulo da Vaga"
                  placeholder="Escrever"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  sx={{
                    "& .MuiInputBase-input.Mui-disabled": {
                      WebkitTextFillColor: "#000000",
                    },
                  }}
                />
              </div>
              <div className="flex flex-wrap w-[100%]">
                <div className="w-[calc(100%/3-15px)] lg:w-[calc(100%/3-26px)] min-w-[200px] mr-[15px] lg:mr-[26px] mb-[20px]">
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Modelo de trabalho
                    </InputLabel>
                    <Select
                      disabled={!editVacancy}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={workFormat}
                      label="Modelo de trabalho"
                      onChange={(e) => setWorkFormat(e.target.value)}
                      sx={{
                        "& .MuiInputBase-input.Mui-disabled": {
                          WebkitTextFillColor: "#000000",
                        },
                      }}
                    >
                      <MenuItem value="Remoto">Remoto</MenuItem>
                      <MenuItem value="Presencial">Presencial</MenuItem>
                      <MenuItem value="Híbrido">Híbrido</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="w-[calc(100%/3-15px)] lg:w-[calc(100%/3-26px)] min-w-[200px] mr-[15px] lg:mr-[26px] mb-[20px]">
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Nome da Empresa
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      disabled={!editVacancy}
                      value={companyName}
                      label="Nome da Empresa"
                      onChange={(e) => setCompanyName(e.target.value)}
                      sx={{
                        "& .MuiInputBase-input.Mui-disabled": {
                          WebkitTextFillColor: "#000000",
                        },
                      }}
                    >
                      {listCompany[0] !== undefined &&
                        listCompany.map((company) => (
                          <MenuItem key={company.uid} value={company.name}>
                            {company.name}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </div>
                <div className="w-[calc(100%/3-15px)] lg:w-[calc(100%/3-26px)] min-w-[200px] mr-[15px] lg:mr-[26px] mb-[20px]">
                  <TextField
                    disabled={!editVacancy}
                    required
                    fullWidth
                    label="Data de início"
                    placeholder="Escrever"
                    type="date"
                    value={expectedStartDate}
                    onChange={(e) => setExpectedStartDate(e.target.value)}
                    sx={{
                      "& .MuiInputBase-input.Mui-disabled": {
                        WebkitTextFillColor: "#000000",
                      },
                    }}
                  />
                </div>
                <div className="w-[calc(100%/3-15px)] lg:w-[calc(100%/3-26px)] min-w-[200px] mr-[15px] lg:mr-[26px] mb-[20px]">
                  <TextField
                    disabled={!editVacancy}
                    required
                    fullWidth
                    label="Orçamento"
                    placeholder="Escrever"
                    value={budget}
                    type="number"
                    onChange={(e) => setBudget(Number(e.target.value))}
                    sx={{
                      "& .MuiInputBase-input.Mui-disabled": {
                        WebkitTextFillColor: "#000000",
                      },
                    }}
                  />
                </div>
                <div className="w-[calc(100%/3-15px)] lg:w-[calc(100%/3-26px)] min-w-[200px] mr-[15px] lg:mr-[26px] mb-[20px]">
                  <TextField
                    disabled={!editVacancy}
                    required
                    fullWidth
                    label="Cidade"
                    placeholder="Escrever"
                    value={cityName}
                    onChange={(e) => setCityName(e.target.value)}
                    sx={{
                      "& .MuiInputBase-input.Mui-disabled": {
                        WebkitTextFillColor: "#000000",
                      },
                    }}
                  />
                </div>
                <div className="w-[calc(100%/3-15px)] lg:w-[calc(100%/3-26px)] min-w-[200px] mr-[15px] lg:mr-[26px] mb-[20px]">
                  <TextField
                    disabled={!editVacancy}
                    required
                    fullWidth
                    label="Estado"
                    placeholder="Escrever"
                    value={stateName}
                    onChange={(e) => setStateName(e.target.value)}
                    sx={{
                      "& .MuiInputBase-input.Mui-disabled": {
                        WebkitTextFillColor: "#000000",
                      },
                    }}
                  />
                </div>
                <div className="w-[calc(100%/3-15px)] lg:w-[calc(100%/3-26px)] min-w-[200px] mr-[15px] lg:mr-[26px] mb-[20px]">
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Status
                    </InputLabel>
                    <Select
                      disabled={!editVacancy}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={status}
                      label="Status"
                      onChange={(e) => setStatus(e.target.value)}
                      sx={{
                        "& .MuiInputBase-input.Mui-disabled": {
                          WebkitTextFillColor: "#000000",
                        },
                      }}
                    >
                      <MenuItem value="Disponível">Disponível</MenuItem>
                      <MenuItem value="Em análise">Em análise</MenuItem>
                      <MenuItem value="Encerrada">Encerrada</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div className="flex justify-end mb-[30px] w-[100%]">
                <Button
                  disabled={!editVacancy}
                  variant="contained"
                  color="warning"
                  sx={{ borderRadius: 100 }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleSubmit();
                  }}
                >
                  <div className="normal-case font-bold text-[16px] px-[10px]">
                    {isEdit ? "Editar vaga" : "Adicionar vaga"}
                  </div>
                </Button>
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};
