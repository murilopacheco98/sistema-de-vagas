import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {
  Autocomplete,
  Button,
  FormControl,
  FormGroup,
  FormLabel,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
// import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import { draftToMarkdown } from "markdown-draft-js";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  KeywordDTO,
  keywordGetAll,
  selectAll as selectAllKeyword,
} from "../../../store/modules/keyword/KeywordSlice";
import { jobPost } from "../../../store/modules/job/JobSlice";
import { selectAll as selectUser } from "../../../store/modules/userLogin/UserLoginSlice";
import {
  companyGetAll,
  selectAll as selectAllCompany,
} from "../../../store/modules/company/CompanySlice";
import draftToHtml from "draftjs-to-html";

interface IModalInfosEventCalendaryProps {
  open: boolean;
  handleClose?: () => void;
  isEdit: boolean;
  aluno?: boolean;
  setRender?: Dispatch<SetStateAction<boolean>>;
  render?: boolean;
}

export const ModalAddVaga = ({
  handleClose,
  open,
  isEdit,
}: IModalInfosEventCalendaryProps) => {
  const dispatch = useAppDispatch();

  const [editorState, setEditorState] = useState<EditorState | undefined>();
  const [content, setContent] = useState<any>();

  const [id, setId] = useState<number>(0);
  const [error, setError] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [edition, setEdition] = useState<boolean>();

  const [name, setName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

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

  const userLogin = Object.values(useAppSelector(selectUser));

  useEffect(() => {
    dispatch(keywordGetAll());
    dispatch(companyGetAll());
    if (userLogin[0]) {
      setName(userLogin[0].userDTO.name);
      setPhoneNumber(userLogin[0].userDTO.phoneNumber);
      setEmail(userLogin[0].userDTO.email);
      const dateToday = Date().split(" ");
      setExpectedStartDate(dateToday[3] + "-02-" + dateToday[2]);
    }
  }, []);

  const handleSubmit = async () => {
    if (isEdit) {
      console.log("edição");
    } else {
      const job = await dispatch(
        jobPost({
          token: userLogin[0].token,
          jobDTO: {
            uid: "",
            title: title,
            description: content,
            mainRequirements: "",
            differentials: differentials,
            seniority: seniority,
            keywordsName: keywords,
            budget: budget,
            workFormat: workFormat,
            expectedStartDate: expectedStartDate,
            status: "Disponível",
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
        // const message = job.payload.message.split(" ");
        // setMessage(message[5]);
        const message = job.payload.response.data.message;
        setMessage(message);
      } else {
        if (handleClose) {
          // handleClose();
        }
      }
    }
  };

  const handleAddEvent = async () => {
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
  };

  const handleUpdateEvent = async () => {
    // setError("");
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
            <div className="flex">
              <div className="cursor-pointer text-[#E16E0E] text-[20px] w-[250px] lg:w-[300px] min-h-[60px] items-center flex justify-center">
                Cadastro Vaga
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
                  />
                </div>
              </div>
              <div className="mb-[20px] text-[18px] text-[#5B5B5B]">
                Requisitos Principais
              </div>
              <div className="w-[100%] flex flex-wrap">
                <div className="w-[67%] mr-[3%] min-w-[300px] mb-[20px]">
                  <Autocomplete
                    multiple
                    fullWidth
                    limitTags={3}
                    id="multiple-limit-tags"
                    value={keywords}
                    onChange={(e, value) => setKeywords(value)}
                    options={listKeyword
                      .sort((a, b) => a.name.localeCompare(b.name))
                      .map((keyword: KeywordDTO) => keyword.name)}
                    renderInput={(params) => (
                      <TextField {...params} label="Tecnologias" />
                    )}
                  />
                </div>
                <div className="w-[30%] min-w-[100px] mb-[20px]">
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Senioridade
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={seniority}
                      label="Senioridade"
                      onChange={(e) => setSeniority(e.target.value)}
                    >
                      <MenuItem value="Júnior">Júnior</MenuItem>
                      <MenuItem value="Pleno">Pleno</MenuItem>
                      <MenuItem value="Senior">Senior</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div className="border-[1px] p-[10px] border-[#c1c0c0] rounded-md w-[100%] mr-[20px] md:mr-[26px] mb-[20px]">
                <Editor
                  editorStyle={{ marginInline: "10px", color: "black" }}
                  toolbarStyle={{ borderRadius: 5 }}
                  // editorState={editorState}
                  editorState={editorState}
                  placeholder="Descrição da Vaga"
                  onEditorStateChange={(e) => {
                    setEditorState(e);
                    setContent(
                      draftToHtml(convertToRaw(e.getCurrentContent()))
                    );
                  }}
                  toolbar={{
                    options: [
                      "inline",
                      "blockType",
                      "fontSize",
                      "list",
                      "textAlign",
                      "colorPicker",
                      "link",
                      "emoji",
                    ],
                  }}
                />
              </div>
              <div className=" w-[100%] mr-[15px] md:mr-[26px] mb-[20px]">
                <TextField
                  multiline
                  required
                  fullWidth
                  label="Diferenciais"
                  placeholder="Escrever"
                  value={differentials}
                  onChange={(e) => setDifferentials(e.target.value)}
                />
              </div>
              <div className="mb-[20px] text-[18px] text-[#5B5B5B]">
                Informações da Vaga
              </div>
              <div className="w-[50%] min-w-[350px] mr-[15px] md:mr-[26px] mb-[20px]">
                <TextField
                  required
                  fullWidth
                  label="Titulo da Vaga"
                  placeholder="Escrever"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="flex flex-wrap w-[100%]">
                <div className="w-[calc(100%/3-15px)] lg:w-[calc(100%/3-26px)] min-w-[200px] mr-[15px] lg:mr-[26px] mb-[20px]">
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Modelo de trabalho
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={workFormat}
                      label="Modelo de trabalho"
                      onChange={(e) => setWorkFormat(e.target.value)}
                    >
                      <MenuItem value="Remoto">Remoto</MenuItem>
                      <MenuItem value="Presencil">Presencial</MenuItem>
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
                      value={companyName}
                      label="Nome da Empresa"
                      onChange={(e) => setCompanyName(e.target.value)}
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
                    required
                    fullWidth
                    label="Data de início"
                    placeholder="Escrever"
                    type="date"
                    value={expectedStartDate}
                    onChange={(e) => setExpectedStartDate(e.target.value)}
                  />
                </div>
                <div className="w-[calc(100%/3-15px)] lg:w-[calc(100%/3-26px)] min-w-[200px] mr-[15px] lg:mr-[26px] mb-[20px]">
                  <TextField
                    required
                    fullWidth
                    label="Orçamento"
                    placeholder="Escrever"
                    value={budget}
                    type="number"
                    onChange={(e) => setBudget(Number(e.target.value))}
                  />
                </div>
                <div className="w-[calc(100%/3-15px)] lg:w-[calc(100%/3-26px)] min-w-[200px] mr-[15px] lg:mr-[26px] mb-[20px]">
                  <TextField
                    required
                    fullWidth
                    label="Cidade"
                    placeholder="Escrever"
                    value={cityName}
                    onChange={(e) => setCityName(e.target.value)}
                  />
                </div>
                <div className="w-[calc(100%/3-15px)] lg:w-[calc(100%/3-26px)] min-w-[200px] mr-[15px] lg:mr-[26px] mb-[20px]">
                  <TextField
                    required
                    fullWidth
                    label="Estado"
                    placeholder="Escrever"
                    value={stateName}
                    onChange={(e) => setStateName(e.target.value)}
                  />
                </div>
              </div>
              {/* </div> */}
              <div className="flex justify-end mb-[30px] w-[100%]">
                <Button
                  type="submit"
                  variant="contained"
                  color="warning"
                  sx={{ borderRadius: 100 }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleSubmit();
                  }}
                >
                  <div className="normal-case font-bold text-[16px] px-[10px]">
                    Adicionar
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
