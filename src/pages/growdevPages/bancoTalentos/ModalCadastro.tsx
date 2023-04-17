import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Autocomplete,
  Button,
  FormControl,
  InputLabel,
  Modal,
  OutlinedInput,
  TextField,
} from "@mui/material";
// import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  KeywordDTO,
  keywordGetAll,
  selectAll,
} from "../../../store/modules/keyword/KeywordSlice";
import { talentBankPost } from "../../../store/modules/talentBank/TalentBankSlice";
import { userLogin } from "../../../store/modules/userLogin/UserLoginSlice";

interface IModalInfosEventCalendaryProps {
  open: boolean;
  handleClose?: () => void;
  isEdit: boolean;
  aluno?: boolean;
  setRender: Dispatch<SetStateAction<boolean>>;
  render: boolean;
}

export const ModalCadastrar = ({
  handleClose,
  open,
  aluno,
  isEdit,
  setRender,
  render,
}: IModalInfosEventCalendaryProps) => {
  const [dadosAluno, setDadosAluno] = useState<boolean>(true);
  const [curriculo, setCurriculo] = useState<boolean>(false);

  const [id, setId] = useState<number>(0);
  const [error, setError] = useState<boolean>(false);
  const [response, setResponse] = useState<string>("");
  const [edition, setEdition] = useState<boolean>();
  const dispatch = useAppDispatch();
  const [edicao, setEdicao] = useState<boolean>(false);

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [birthDate, setBirthDate] = useState<string>("");
  const [cpf, setCpf] = useState<string>("");
  const [street, setStreet] = useState<string>("");
  const [number, setNumber] = useState<number>();
  const [ddd, setDdd] = useState<string>("");
  const [neighborhood, setNeighborhood] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [pcd, setPcd] = useState<boolean>(false);
  const [growdev, setGrowdev] = useState<boolean>(false);

  const [seniority, setSeniority] = useState<string>("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [linkedin, setLinkedin] = useState<string>("");
  const [github, setGithub] = useState<string>("");
  const [otherLinks, setOtherLinks] = useState<string>("");

  const userLogin = Object.values(
    useAppSelector((store) => store.userLogin.entities)
  );

  useEffect(() => {
    dispatch(keywordGetAll());
    const dateToday = Date().split(" ");
    setBirthDate(dateToday[3] + "-02-" + dateToday[2]);
    setEmail(userLogin[0]?.userDTO ? userLogin[0]?.userDTO.email : "");
  }, []);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setCurriculo(true);
    setDadosAluno(false);
  };

  const handleSubmit2 = async () => {
    const talentBank = await dispatch(
      talentBankPost({
        token: userLogin[0] ? userLogin[0]?.token : "",
        createTalentBankDTO: {
          userUid: userLogin[0]?.userDTO ? userLogin[0]?.userDTO.userUid : "",
          candidateName: name,
          email: userLogin[0]?.userDTO ? userLogin[0]?.userDTO.email : "",
          phoneNumber: phoneNumber,
          birthDate: birthDate,
          cpf: cpf,
          addressStreet: street,
          addressNumber: number,
          addressNeighborhood: neighborhood,
          addressZipCode: ddd,
          cityName: city,
          stateName: state,
          pcd: pcd,
          growdever: growdev,
          status: "Disponível",
          stateInitials: "",
          countryName: "Brasil",
          countryInitials: "BR",
          seniority: seniority,
          keywordsName: keywords,
          linkedin: linkedin,
          github: github,
          otherLinks: otherLinks,
        },
      })
    );
    if ((talentBank.payload.name = "AxiosError")) {
      setError(true);
      setResponse(talentBank.payload.response.message);
    } else {
      if (handleClose) {
        // setRender(!render);
        // handleClose();
      }
    }
  };

  const listKeywords = useAppSelector(selectAll);

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        className="flex justify-center items-center"
      >
        <div className="bg-white w-[100vw] md:w-[90vw] lg:w-[85vw] xl:w-[75vw] h-[650px] overflow-x-scroll">
          <div className="justify-between flex border-b-[2px] md:w-[100%] ">
            <div className="flex">
              {dadosAluno ? (
                <div className="h-[60px] w-[163px] border-b-[3px] border-[#E16E0E] flex justify-center items-center">
                  Dados do aluno
                </div>
              ) : (
                <div
                  onClick={() => {
                    setCurriculo(false);
                    setDadosAluno(true);
                  }}
                  className="cursor-pointer h-[60px] w-[163px] flex justify-center items-center"
                >
                  Dados do aluno
                </div>
              )}
              {curriculo ? (
                <div className="h-[60px] w-[163px] border-b-[3px] border-[#E16E0E] flex justify-center items-center">
                  Currículo
                </div>
              ) : (
                <div
                  onClick={() => {
                    setCurriculo(true);
                    setDadosAluno(false);
                  }}
                  className="cursor-pointer h-[60px] w-[163px] flex justify-center items-center"
                >
                  Currículo
                </div>
              )}
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
          {dadosAluno && (
            <form onSubmit={handleSubmit}>
              <div className="w-[100%] pl-[30px] lg:pl-[40px] pt-[30px]">
                <div className="flex items-center mb-[30px]">
                  <div className="flex items-center justify-center w-[50px] h-[50px] rounded-full border-[2px] mr-[15px]">
                    Foto
                  </div>
                  <div className="text-[18px]">
                    {aluno ? "Aluno" : "Candidato"}
                  </div>
                </div>
                <div className="flex flex-wrap w-[100%]">
                  <div className="w-[25vw] lg:w-[20vw] min-w-[200px] mr-[15px] lg:mr-[26px] mb-[20px]">
                    <TextField
                      required
                      fullWidth
                      label="Nome"
                      placeholder="Escrever"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className=" w-[25vw] lg:w-[20vw] min-w-[200px] mr-[15px] lg:mr-[26px] mb-[20px]">
                    <TextField
                      disabled
                      fullWidth
                      label="Email"
                      placeholder="Escrever"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="w-[25vw] lg:w-[20vw] min-w-[200px] mr-[15px] lg:mr-[26px] mb-[20px]">
                    <TextField
                      required
                      fullWidth
                      label="Celular"
                      placeholder="Escrever"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                  <div className="w-[25vw] lg:w-[20vw] min-w-[200px] mr-[15px] lg:mr-[26px] mb-[20px]">
                    <TextField
                      required
                      fullWidth
                      label="Data de Nascimento"
                      type="date"
                      placeholder="Escrever"
                      value={birthDate}
                      onChange={(e) => setBirthDate(e.target.value)}
                    />
                  </div>
                  <div className="w-[25vw] lg:w-[20vw] min-w-[200px] mr-[15px] lg:mr-[26px] mb-[20px]">
                    <TextField
                      required
                      fullWidth
                      label="CPF"
                      placeholder="Escrever"
                      value={cpf}
                      onChange={(e) => setCpf(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap w-[100%]">
                  <div className="w-[25vw] lg:w-[20vw] min-w-[200px] mr-[15px] lg:mr-[26px] mb-[20px]">
                    <TextField
                      required
                      fullWidth
                      label="Rua"
                      placeholder="Escrever"
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                    />
                  </div>
                  <div className="w-[25vw] lg:w-[20vw] min-w-[200px] mr-[15px] lg:mr-[26px] mb-[20px]">
                    <TextField
                      required
                      fullWidth
                      label="Número"
                      placeholder="Escrever"
                      value={number}
                      onChange={(e) => setNumber(Number(e.target.value))}
                    />
                  </div>
                  <div className="w-[25vw] lg:w-[20vw] min-w-[200px] mr-[15px] lg:mr-[26px] mb-[20px]">
                    <TextField
                      required
                      fullWidth
                      label="DDD"
                      placeholder="Escrever"
                      type="number"
                      value={ddd}
                      onChange={(e) => setDdd(e.target.value)}
                    />
                  </div>
                  <div className="w-[25vw] lg:w-[20vw] min-w-[200px] mr-[15px] lg:mr-[26px] mb-[20px]">
                    <TextField
                      required
                      fullWidth
                      label="Bairro"
                      placeholder="Escrever"
                      value={neighborhood}
                      onChange={(e) => setNeighborhood(e.target.value)}
                    />
                  </div>
                  <div className="w-[25vw] lg:w-[20vw] min-w-[200px] mr-[15px] lg:mr-[26px] mb-[20px]">
                    <TextField
                      required
                      fullWidth
                      label="Cidade"
                      placeholder="Escrever"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                  <div className="w-[25vw] lg:w-[20vw] min-w-[200px] mr-[15px] lg:mr-[26px] mb-[20px]">
                    <TextField
                      required
                      fullWidth
                      label="Estado"
                      placeholder="Escrever"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                    />
                  </div>
                  <div className="w-[25vw] lg:w-[20vw] min-w-[200px] mr-[15px] lg:mr-[26px] mb-[20px]">
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">PCD</InputLabel>
                      <Select
                        required
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="PCD"
                        value={pcd}
                        onChange={(e) =>
                          setPcd(e.target.value == "true" ? true : false)
                        }
                      >
                        <MenuItem value="true">Sim</MenuItem>
                        <MenuItem value="false">Não</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <div className="w-[25vw] lg:w-[20vw] min-w-[200px] mr-[15px] lg:mr-[26px] mb-[40px]">
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Aluno Growdev
                      </InputLabel>
                      <Select
                        required
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Aluno Growdev"
                        value={growdev}
                        onChange={(e) =>
                          setGrowdev(e.target.value == "true" ? true : false)
                        }
                      >
                        <MenuItem value="true">Sim</MenuItem>
                        <MenuItem value="false">Não</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </div>
                <div className="flex justify-end w-[78vw] lg:w-[75vw] xl:w-[69vw]">
                  <Button
                    type="submit"
                    variant="contained"
                    color="warning"
                    sx={{ borderRadius: 100 }}
                    // onClick={(e) => {
                    //   handleSubmit();
                    // }}
                  >
                    <div className="normal-case font-bold text-[14px] px-[10px]">
                      Continuar
                    </div>
                  </Button>
                </div>
              </div>
            </form>
          )}
          {curriculo && (
            <form onSubmit={handleSubmit2}>
              <div className="px-[3vw] pt-[30px] text-[#5B5B5B]">
                <div className="mb-[20px] text-[20px]">Competências</div>
                <div className="w-[25vw] sm:w-[30vw] lg:w-[23vw] xl:w-[20vw] min-w-[200px] mb-[30px]">
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Senioridade
                    </InputLabel>
                    <Select
                      required
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Senioridade"
                      value={seniority}
                      onChange={(e) => setSeniority(e.target.value)}
                    >
                      <MenuItem value="Júnior">Júnior</MenuItem>
                      <MenuItem value="Pleno">Pleno</MenuItem>
                      <MenuItem value="Senior">Senior</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="w-[40vw] sm:w-[40vw] lg:w-[35vw] xl:w-[30vw] min-w-[400px] mb-[30px]">
                  <FormControl fullWidth>
                    <Autocomplete
                      multiple
                      fullWidth
                      limitTags={3}
                      id="multiple-limit-tags"
                      value={keywords}
                      onChange={(e, value) => setKeywords(value)}
                      options={listKeywords
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map((keyword: KeywordDTO) => keyword.name)}
                      renderInput={(params) => (
                        <TextField {...params} label="Tecnologias" />
                      )}
                    />
                  </FormControl>
                </div>
                <div className="text-[20px] mb-[20px]">Links relacionados</div>
                <div className="flex flex-wrap">
                  <div className="mb-[20px] w-[25vw] sm:w-[30vw] lg:w-[23vw] xl:w-[20vw] min-w-[200px] mr-[15px] lg:mr-[30px]">
                    <TextField
                      fullWidth
                      label="Linkedin"
                      value={linkedin}
                      onChange={(e) => setLinkedin(e.target.value)}
                    />
                  </div>
                  <div className="mb-[20px] w-[25vw] sm:w-[30vw] lg:w-[23vw] xl:w-[20vw] min-w-[200px] mr-[15px] lg:mr-[30px]">
                    <TextField
                      required
                      fullWidth
                      label="Github"
                      value={github}
                      onChange={(e) => setGithub(e.target.value)}
                    />
                  </div>
                  <div className="mb-[20px] w-[25vw] sm:w-[30vw] lg:w-[23vw] xl:w-[20vw] min-w-[200px] mr-[15px] lg:mr-[30px]">
                    <TextField
                      fullWidth
                      label="Outro"
                      value={otherLinks}
                      onChange={(e) => setOtherLinks(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-[40px] lg:mt-[130px]">
                  <Button
                    type="submit"
                    variant="contained"
                    color="warning"
                    sx={{ borderRadius: 100, mr: "20px" }}
                    onClick={(e) => {
                      e.preventDefault();
                      handleSubmit2();
                    }}
                  >
                    <div className="normal-case text-[14px] font-bold px-[15px]">
                      Salvar
                    </div>
                  </Button>
                </div>
              </div>
            </form>
          )}
        </div>
      </Modal>
    </>
  );
};
