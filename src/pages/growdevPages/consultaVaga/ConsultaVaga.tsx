import { Button, InputAdornment, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SideBar } from "../../../components/sidebar/SideBar";
import { SideBarAluno } from "../../../components/sidebar/SideBarAluno";
import { SideBarParceiro } from "../../../components/sidebar/SideBarParceiro";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { selectById } from "../../../store/modules/job/JobSlice";
import { talentBankGetByJobUid } from "../../../store/modules/talentBank/TalentBankSlice";
import ReactMarkdown from "react-markdown";

interface ConsultaVagaProps {
  parceiro?: boolean;
  aluno?: boolean;
  growdever?: boolean;
}

export const ConsultaVaga = (props: ConsultaVagaProps) => {
  const { parceiro, aluno, growdever } = props;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [uid, setUid] = useState<string>("");
  const [tituloVaga, setTituloVaga] = useState<boolean>(true);
  const [pessoasInscritas, setPessoasInscritas] = useState<boolean>(false);
  const [responsavelVaga, setResponsavelVaga] = useState<boolean>(false);

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [diferenciais, setDiferenciais] = useState<string>("");
  const [workFormat, setWorkFormat] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [salary, setSalary] = useState<number | null>();
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const userLogin = Object.values(
    useAppSelector((store) => store.userLogin.entities)
  );
  const url = window.location.href.split("/");

  useEffect(() => {
    setUid(url[5]);
  }, []);

  const jobByUid = useAppSelector((state) => selectById(state, uid));

  useEffect(() => {
    if (uid !== "") {
      dispatch(
        talentBankGetByJobUid({
          uid: uid,
          token: userLogin[0]?.token,
          page: 0,
          size: 10,
        })
      );
    }
    if (jobByUid) {
      setName(jobByUid?.dataProfileDTO.name);
      setEmail(jobByUid?.dataProfileDTO.email);
      setDiferenciais(jobByUid?.differentials);
      setDescription(jobByUid?.description);
      setWorkFormat(jobByUid?.workFormat);
      setCity(jobByUid?.cityName);
      setStartDate(jobByUid?.expectedStartDate);
      // setPhoneNumber(jobByUid.)
      setState(jobByUid.stateName);
      setSalary(jobByUid?.budget);
    }
  }, [uid]);

  const listTalentBank = Object.values(
    useAppSelector((store) => store.talentBank.entities)
  );

  return (
    <>
      {tituloVaga && (
        <div className="w-[calc(100%-90px)] ml-[90px] lg:w-[calc(100%-97px)] lg:ml-[97px] mt-[255px] h-[790px] bg-[#E5E5E5] absolute" />
      )}
      {responsavelVaga && (
        <div className="w-[calc(100%-90px)] ml-[90px] lg:w-[calc(100%-97px)] lg:ml-[97px] mt-[255px] h-[650px] bg-[#E5E5E5] absolute" />
      )}
      {pessoasInscritas && (
        <div className="w-[calc(100%-90px)] ml-[90px] lg:w-[calc(100%-97px)] lg:ml-[97px] mt-[255px] h-[890px] bg-[#E5E5E5] absolute" />
      )}
      <div className="flex">
        {growdever && <SideBar vagasAbertas />}
        {parceiro && <SideBarParceiro vagasAbertas />}
        {aluno && <SideBarAluno vagasAbertas />}
        {/* h-[1150px] bg-[#E5E5E5] */}
        <div className="w-[94vw]">
          <div className="h-[70px] w-[100%] bg-blue-900 justify-end flex items-center">
            <div className="mr-[55px] text-[25px] text-white">icon usuário</div>
          </div>
          <div className="h-[184px] w-[100%] justify-start bg-gray-900 text-white flex">
            <div className="flex-col ml-[95px] mt-[22px]">
              <div
                className="cursor-pointer text-[12px]"
                onClick={() => {
                  parceiro
                    ? navigate("/empresa-parceira")
                    : navigate("/growdever");
                }}
              >
                ICON Vagas abertas
              </div>
              <div className="font-bold text-[20px]">Vaga Nome IconGrowdev</div>
            </div>
          </div>
          <div className="h-auto flex justify-center absolute pb-[70px] bg-[#E5E5E5]">
            <div className="w-[80vw] sm:ml-[3vw] md:ml-[4vw] lg:ml-[5.5vw] xl:ml-[6.5vw] overflow-scroll h-auto mt-[-80px] bg-white border-[3px] rounded-2xl">
              <div className="flex items-center justify-start">
                <div className="w-[1300px] h-[60px] flex items-center justify-start border-b-[2px]">
                  {tituloVaga ? (
                    <div className="w-[200px] min-h-[60px] items-center flex justify-center border-b-[2px] border-orange-600">
                      Título da vaga
                    </div>
                  ) : (
                    <div
                      className="cursor-pointer w-[200px] min-h-[60px] items-center flex justify-center"
                      onClick={() => {
                        setTituloVaga(true);
                        setPessoasInscritas(false);
                        setResponsavelVaga(false);
                      }}
                    >
                      Título da vaga
                    </div>
                  )}
                  {(parceiro || growdever) &&
                    (pessoasInscritas ? (
                      <div className="w-[163px] h-[60px] items-center flex justify-center border-b-[2px] border-orange-600">
                        Pessoas Inscritas
                      </div>
                    ) : (
                      <div
                        className="cursor-pointer w-[163px] h-[60px] items-center flex justify-center"
                        onClick={() => {
                          setTituloVaga(false);
                          setPessoasInscritas(true);
                          setResponsavelVaga(false);
                        }}
                      >
                        Pessoas Inscritas
                      </div>
                    ))}
                  {(growdever || parceiro) &&
                    (responsavelVaga ? (
                      <div className="w-[190px] h-[60px] items-center flex justify-center border-b-[2px] border-orange-600">
                        Responsável da vaga
                      </div>
                    ) : (
                      <div
                        className="cursor-pointer w-[190px] h-[60px] items-center flex justify-center"
                        onClick={() => {
                          setTituloVaga(false);
                          setPessoasInscritas(false);
                          setResponsavelVaga(true);
                        }}
                      >
                        Responsável da vaga
                      </div>
                    ))}
                  <div className="w-[163px] justify-center flex">
                    <div className="bg-green-600 text-center rounded-full text-white w-[100px]">
                      Análise
                    </div>
                  </div>
                  <div className="flex justify-end w-[400px] xl:w-[35%]">
                    <Button
                      variant="contained"
                      color="warning"
                      sx={{ borderRadius: 100, mr: "16px" }}
                    >
                      Editar Vaga
                    </Button>
                    {!parceiro && (
                      <Button
                        variant="contained"
                        color="warning"
                        sx={{ borderRadius: 100, mr: "40px" }}
                      >
                        Cadastrar candidato
                      </Button>
                    )}
                  </div>
                </div>
              </div>
              {tituloVaga && (
                <div className="mx-[5vw] min-h-[700px]">
                  <div className="my-[20px] text-[#5B5B5B] font-bold">
                    Informações da vaga
                  </div>
                  <div className="flex flex-wrap mb-[100px]">
                    <div className="w-[19vw] min-w-[200px] mb-[20px] mr-[26px]">
                      <TextField
                        disabled
                        fullWidth
                        // size="small"
                        label="Modelo"
                        InputLabelProps={{ shrink: true }}
                        sx={{
                          "& .MuiInputBase-input.Mui-disabled": {
                            WebkitTextFillColor: "#000000",
                          },
                          "& .MuiFormLabel-root.Mui-disabled": {
                            color: "#000000",
                          },
                        }}
                        value={workFormat}
                        onChange={(e) => setWorkFormat(e.target.value)}
                      />
                    </div>
                    <div className="w-[19vw] min-w-[200px] mb-[20px] mr-[26px]">
                      <TextField
                        disabled
                        fullWidth
                        label="Data de início"
                        // size="small"
                        InputLabelProps={{ shrink: true }}
                        sx={{
                          "& .MuiInputBase-input.Mui-disabled": {
                            WebkitTextFillColor: "#000000",
                          },
                          "& .MuiFormLabel-root.Mui-disabled": {
                            color: "#000000",
                          },
                        }}
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                      />
                    </div>
                    <div className="w-[19vw] min-w-[200px] mb-[20px] mr-[26px]">
                      <TextField
                        disabled
                        fullWidth
                        label="Orçamento"
                        // size="small"
                        InputLabelProps={{ shrink: true }}
                        sx={{
                          "& .MuiInputBase-input.Mui-disabled": {
                            WebkitTextFillColor: "#000000",
                          },
                          "& .MuiFormLabel-root.Mui-disabled": {
                            color: "#000000",
                          },
                        }}
                        value={salary}
                        onChange={(e) => setSalary(Number(e.target.value))}
                      />
                    </div>
                    <div className="w-[19vw] min-w-[200px] mb-[20px] mr-[26px]">
                      <TextField
                        disabled
                        fullWidth
                        label="Cidade"
                        // size="small"
                        value={city ? city : ""}
                        InputLabelProps={{ shrink: true }}
                        sx={{
                          "& .MuiInputBase-input.Mui-disabled": {
                            WebkitTextFillColor: "#000000",
                          },
                          "& .MuiFormLabel-root.Mui-disabled": {
                            color: "#000000",
                          },
                        }}
                        onChange={(e) => setCity(e.target.value)}
                      />
                    </div>
                    <div className="w-[19vw] min-w-[200px] mb-[20px] mr-[26px]">
                      <TextField
                        disabled
                        fullWidth
                        label="Estado"
                        // size="small"
                        value={state ? state : ""}
                        InputLabelProps={{ shrink: true }}
                        sx={{
                          "& .MuiInputBase-input.Mui-disabled": {
                            WebkitTextFillColor: "#000000",
                          },
                          "& .MuiFormLabel-root.Mui-disabled": {
                            color: "#000000",
                          },
                        }}
                        onChange={(e) => setState(e.target.value)}
                      />
                    </div>
                    <div className="w-[100%] mb-[30px]">
                      <TextField
                        multiline
                        fullWidth
                        label="Descrição da vaga"
                        InputProps={{
                          startAdornment: (
                            <div
                              className="min-w-[500px] w-[9000%] flex-col justify-center"
                              dangerouslySetInnerHTML={{ __html: description }}
                            ></div>
                          ),
                        }}
                        sx={{
                          "& .MuiInputBase-input.Mui-disabled": {
                            WebkitTextFillColor: "#000000",
                          },
                          "& .MuiFormLabel-root.Mui-disabled": {
                            color: "#000000",
                          },
                        }}
                      />
                    </div>
                    <div className="w-[100%] mb-[30px]">
                      <TextField
                        disabled
                        fullWidth
                        multiline
                        label="Diferenciais"
                        InputLabelProps={{ shrink: true }}
                        sx={{
                          "& .MuiInputBase-input.Mui-disabled": {
                            WebkitTextFillColor: "#000000",
                          },
                          "& .MuiFormLabel-root.Mui-disabled": {
                            color: "#000000",
                          },
                        }}
                        value={diferenciais}
                        onChange={(e) => setDiferenciais(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}
              {pessoasInscritas && (
                <div className="min-h-[800px] ">
                  <div className=" ml-[3vw] mt-[20px] mb-[20px]">
                    Participantes
                  </div>
                  <div className="w-[100%] items-center min-w-[830px] flex-block justify-center flex text-[12px] h-[40px] border-b-[2px]">
                    <div className="ml-[3vw] w-[150px] text-start font-bold">
                      Nome
                    </div>
                    <div className="w-[200px] text-start font-bold">
                      Contatos
                    </div>
                    <div className="w-[150px] text-start font-bold">Cidade</div>
                    <div className="w-[150px] text-start font-bold">Status</div>
                    <div className="w-[250px] text-start font-bold">
                      Tecnologias
                    </div>
                  </div>
                  {listTalentBank[0] !== undefined ? (
                    listTalentBank.map((talentBank) => (
                      <div
                        key={talentBank?.uid}
                        onClick={() => {
                          parceiro
                            ? navigate(
                                `/empresa-parceira/informacoes-da-vaga/candidato/${talentBank?.uid}`
                              )
                            : navigate("/growdever/consulta-alunos/editar");
                        }}
                        className="cursor-pointer w-[100%] min-w-[830px] flex justify-center pl-[3vw] items-center h-[70px] text-[12px] border-b-[2px]"
                      >
                        <div className="w-[150px] text-start">
                          {talentBank?.name}
                        </div>
                        <div className="w-[200px] justify-start flex ">
                          <div className="mr-[10px]">Linkedin</div>
                          <div className="mr-[10px]">Wpp</div>
                          <div className="">Email</div>
                        </div>
                        <div className="w-[150px] text-start">
                          {talentBank?.addressDTO.cityName}
                        </div>
                        <div className="w-[150px] flex justify-start">
                          <div className="text-white font-bold px-[15px] py-[5px] items-center flex justify-center bg-blue-400 rounded-2xl">
                            {talentBank?.status}
                          </div>
                        </div>
                        <div className="w-[250px] justify-start items-center flex flex-wrap">
                          <div className="flex justify-start ">
                            {talentBank?.curriculumDTO.tecnologyName.map(
                              (tecnology) => (
                                <div
                                  key={tecnology}
                                  className="mr-[5px] cursor-pointer text-blue-700 border-[1.5px] border-blue-700 rounded-2xl py-[1px] px-[10px]"
                                >
                                  {tecnology}
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="mt-[3vh] ml-[6vw]">
                      Nenhuma pessoa inscrita nesta vaga no momento.
                    </div>
                  )}
                </div>
              )}
              {responsavelVaga && (
                <div className="min-h-[500px] pt-[3vh] pl-[4vw]">
                  <div className="my-[20px] text-[#5B5B5B] font-bold">
                    Dados do Responsável
                  </div>
                  <div className="flex">
                    <div className="w-[19vw] min-w-[200px] mr-[26px]">
                      <TextField
                        disabled
                        fullWidth
                        // size="small"
                        label="Nome"
                        InputLabelProps={{ shrink: true }}
                        sx={{
                          "& .MuiInputBase-input.Mui-disabled": {
                            WebkitTextFillColor: "#000000",
                          },
                          "& .MuiFormLabel-root.Mui-disabled": {
                            color: "#000000",
                          },
                        }}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="w-[19vw] min-w-[250px] mr-[26px]">
                      <TextField
                        disabled
                        fullWidth
                        // size="small"
                        label="E-mail"
                        InputLabelProps={{ shrink: true }}
                        sx={{
                          "& .MuiInputBase-input.Mui-disabled": {
                            WebkitTextFillColor: "#000000",
                          },
                          "& .MuiFormLabel-root.Mui-disabled": {
                            color: "#000000",
                          },
                        }}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="w-[19vw] min-w-[250px] mr-[26px]">
                      <TextField
                        disabled
                        fullWidth
                        // size="small"
                        label="Celular"
                        InputLabelProps={{ shrink: true }}
                        sx={{
                          "& .MuiInputBase-input.Mui-disabled": {
                            WebkitTextFillColor: "#000000",
                          },
                          "& .MuiFormLabel-root.Mui-disabled": {
                            color: "#000000",
                          },
                        }}
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
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
