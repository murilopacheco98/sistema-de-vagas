import { Button, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SideBarAluno } from "../../../components/sidebar/SideBarAluno";
import { TopBar } from "../../../components/topBar/TopBar";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { talentBankFindByEmail } from "../../../store/modules/talentBank/TalentBankSlice";
import { ModalCadastrar } from "../../growdevPages/bancoTalentos/ModalCadastro";

export const AlunoHome = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const [perfil, setPerfil] = useState<boolean>(false);
  const [dadosProfissional, setDadosProfissional] = useState<boolean>(true);
  const [curriculo, setCurriculo] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
  const [render, setRender] = useState<boolean>(false);
  const [edicao, setEdicao] = useState<boolean>(false);

  const [nome, setNome] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [celular, setCelular] = useState<string>("");
  const [dataNascimento, setDataNascimento] = useState<string>("");
  const [cpf, setCpf] = useState<string | undefined>("");
  const [rua, setRua] = useState<string>("");
  const [numero, setNumero] = useState<number>();
  const [interior, setInterior] = useState<string>("");
  const [bairro, setBairro] = useState<string>("");
  const [cidade, setCidade] = useState<string>("");
  const [estado, setEstado] = useState<string>("");
  const [pcd, setPcd] = useState<string>("");
  const [growdev, setGrowdev] = useState<string>("");
  const [senioridade, setSenioridade] = useState<string>("");
  const [tecnologia, setTecnologia] = useState<string[]>([]);
  const [linkedin, setLinkedin] = useState<string>("");
  const [github, setGithub] = useState<string>("");
  const [otherLinks, setOtherLinks] = useState<string>("");

  const userLogin = Object.values(
    useAppSelector((store) => store.userLogin.entities)
  );

  const openModal = () => {
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
    setEdicao(false);
  };

  useEffect(() => {
    // if (state !== null) {
    //   const { url } = state;
    //   setPreviousNavigation(url);
    // }
    if (userLogin[0]) {
      if (userLogin[0].token) {
        if (userLogin[0].userDTO.roleName == "PARCEIRO") {
          // setError(false);
          navigate("/parceiro");
        } else if (userLogin[0].userDTO.roleName == "GROWDEV") {
          // setError(false);
          navigate("/growdever");
        }
      }
    } else {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    setPerfil(false);
    const talent = async () => {
      const talentGet = await dispatch(
        talentBankFindByEmail({
          token: userLogin[0]?.token,
          email: userLogin[0]?.userDTO.email,
        })
      );
      if (talentGet.payload.name !== "AxiosError") {
        setPerfil(true);
      }
    };
    talent();
  }, [render]);

  const talentBank = Object.values(
    useAppSelector((store) => store.talentBank.entities)
  );

  useEffect(() => {
    if (talentBank[0]) {
      setNome(talentBank[0]?.name);
      setEmail(talentBank[0]?.email);
      setCelular(talentBank[0]?.phoneNumber);
      setDataNascimento(talentBank[0]?.birthDate);
      setCpf(userLogin[0]?.userDTO.document);
      setRua(talentBank[0].addressDTO ? talentBank[0]?.addressDTO.street : "");
      setNumero(talentBank[0].addressDTO ? talentBank[0]?.addressDTO.number : 0);
      setInterior(talentBank[0].addressDTO ? talentBank[0]?.addressDTO.zipCode : "");
      setBairro(talentBank[0].addressDTO ? talentBank[0]?.addressDTO.neighborhood : "");
      setCidade(talentBank[0].addressDTO ? talentBank[0]?.addressDTO.cityName : "");
      setEstado(talentBank[0].addressDTO ? talentBank[0]?.addressDTO.stateName : "");
      setPcd(talentBank[0]?.pcd ? "Sim" : "Não");
      setGrowdev(talentBank[0]?.isGrowdever ? "Sim" : "Não");
      setSenioridade(talentBank[0]?.curriculumDTO ? talentBank[0]?.curriculumDTO.seniority : "");
      setTecnologia(talentBank[0]?.curriculumDTO && talentBank[0]?.curriculumDTO.tecnologyName);
      setLinkedin(talentBank[0]?.curriculumDTO && talentBank[0]?.curriculumDTO.linkedin);
      setGithub(talentBank[0]?.curriculumDTO && talentBank[0]?.curriculumDTO.github);
      setOtherLinks(talentBank[0]?.curriculumDTO && talentBank[0]?.curriculumDTO.otherLinks);
    }
  }, [perfil]);

  return (
    <>
      <ModalCadastrar
        open={modal}
        handleClose={closeModal}
        isEdit={edicao}
        render={render}
        setRender={setRender}
      />
      <div className="flex">
        <SideBarAluno perfil />
        <div className="w-[100%] h-[930px] bg-[#E5E5E5]">
          <TopBar />
          {/* <div className="h-[70px] w-[100%] bg-blue-900 justify-end flex items-center">
            <div className="mr-[55px] text-[25px] text-white">icon usuário</div>
          </div> */}
          <div className="h-[150px] w-[100%] justify-start bg-gray-900 text-white flex">
            <div className="flex-col ml-[95px] ">
              <div className="font-bold text-[30px] mt-[20px]">Meu Perfil</div>
            </div>
          </div>
          <div className="w-[82.5vw] sm:w-[86.5vw] lg:w-[94%] h-[490px] absolute">
            {/* <div className="overflow-hidden bg-blue-200 flex items-center justify-start border-b-[2px]"> */}
            {!perfil && (
              <div className="flex-col text-center w-[100%]">
                <div className="mt-[40px] font-bold text-[24px] md:text-[30px] text-[#2B385B]">
                  Você ainda não possui registro
                </div>
                <div className="mt-[30px]">
                  <Button
                    variant="contained"
                    color="warning"
                    sx={{ borderRadius: 100 }}
                    onClick={openModal}
                  >
                    <div className="text-[18px] md:text-[25px] normal-case px-[30px]">
                      Cadastrar Perfil
                    </div>
                  </Button>
                </div>
              </div>
            )}
            {perfil && (
              <div className="bg-[#E5E5E5] sm:w-[85vw] md:w-[87vw] lg:w-[92.3vw] absolute">
                <div className="w-[80vw] overflow-x-scroll h-[650px] mt-[-62px] sm:ml-[3vw] md:ml-[3vw] lg:ml-[6vw] bg-white border-[3px] rounded-2xl">
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
                            setCurriculo(false);
                          }}
                        >
                          Dados do profissional
                        </div>
                      )}
                      {curriculo ? (
                        <div className="w-[200px] h-[60px] items-center flex justify-center border-b-[2px] border-orange-600">
                          Currículo
                        </div>
                      ) : (
                        <div
                          className="cursor-pointer w-[200px] h-[60px] items-center flex justify-center"
                          onClick={() => {
                            setDadosProfissional(false);
                            setCurriculo(true);
                          }}
                        >
                          Currículo
                        </div>
                      )}
                      <div className="flex justify-end w-[820px]">
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
                          <div className="normal-case font-bold">Editar</div>
                        </Button>
                      </div>
                    </div>
                  </div>
                  {dadosProfissional && (
                    <div className="px-[20px] md:px-[50px] pt-[30px]">
                      <div className="flex w-[90%] items-center mb-[30px]">
                        <div className="flex items-center justify-center w-[50px] h-[50px] rounded-full border-[2px] mr-[15px]">
                          Foto
                        </div>
                        <div className="text-[18px]">Nome do Aluno</div>
                      </div>
                      <div className="flex flex-wrap w-[80vw] lg:w-[75vw] xl:w-[70vw]">
                        <div className="w-[25vw] lg:w-[20vw] min-w-[200px] mr-[20px] md:mr-[26px] mb-[20px]">
                          <TextField
                            required
                            fullWidth
                            label="Nome"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            placeholder="Escrever"
                          />
                        </div>
                        <div className=" w-[25vw] lg:w-[20vw] min-w-[200px] mr-[15px] md:mr-[26px] mb-[20px]">
                          <TextField
                            required
                            fullWidth
                            label="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Escrever"
                          />
                        </div>
                        <div className="w-[25vw] lg:w-[20vw] min-w-[200px] mr-[15px] md:mr-[26px] mb-[20px]">
                          <TextField
                            required
                            fullWidth
                            label="Celular"
                            value={celular}
                            onChange={(e) => setCelular(e.target.value)}
                            placeholder="Escrever"
                          />
                        </div>
                        <div className="w-[25vw] lg:w-[20vw] min-w-[200px] mr-[15px] md:mr-[26px] mb-[20px]">
                          <TextField
                            required
                            fullWidth
                            label="Data de Nascimento"
                            value={dataNascimento}
                            onChange={(e) => setDataNascimento(e.target.value)}
                            placeholder="Escrever"
                          />
                        </div>
                        <div className="w-[25vw] lg:w-[20vw] min-w-[200px] mr-[15px] md:mr-[26px] mb-[20px]">
                          <TextField
                            required
                            fullWidth
                            label="CPF"
                            value={cpf}
                            onChange={(e) => setCpf(e.target.value)}
                            placeholder="Escrever"
                          />
                        </div>
                      </div>
                      <div className="flex flex-wrap w-[80vw] lg:w-[75vw] xl:w-[70vw]">
                        <div className="w-[25vw] lg:w-[20vw] min-w-[200px] mr-[15px] md:mr-[26px] mb-[20px]">
                          <TextField
                            required
                            fullWidth
                            label="Rua"
                            value={rua}
                            onChange={(e) => setRua(e.target.value)}
                            placeholder="Escrever"
                          />
                        </div>
                        <div className="w-[25vw] lg:w-[20vw] min-w-[200px] mr-[15px] md:mr-[26px] mb-[20px]">
                          <TextField
                            required
                            fullWidth
                            label="Número"
                            value={numero}
                            onChange={(e) => setNumero(Number(e.target.value))}
                            placeholder="Escrever"
                          />
                        </div>
                        <div className="w-[25vw] lg:w-[20vw] min-w-[200px] mr-[15px] md:mr-[26px] mb-[20px]">
                          <TextField
                            required
                            fullWidth
                            label="Interior"
                            value={interior}
                            onChange={(e) => setInterior(e.target.value)}
                            placeholder="Escrever"
                          />
                        </div>
                        <div className="w-[25vw] lg:w-[20vw] min-w-[200px] mr-[15px] md:mr-[26px] mb-[20px]">
                          <TextField
                            required
                            fullWidth
                            label="Bairro"
                            value={bairro}
                            onChange={(e) => setBairro(e.target.value)}
                            placeholder="Escrever"
                          />
                        </div>
                        <div className="w-[25vw] lg:w-[20vw] min-w-[200px] mr-[15px] md:mr-[26px] mb-[20px]">
                          <TextField
                            required
                            fullWidth
                            label="Cidade"
                            value={cidade}
                            onChange={(e) => setCidade(e.target.value)}
                            placeholder="Escrever"
                          />
                        </div>
                        <div className="w-[25vw] lg:w-[20vw] min-w-[200px] mr-[15px] md:mr-[26px] mb-[20px]">
                          <TextField
                            required
                            fullWidth
                            label="Estado"
                            value={estado}
                            onChange={(e) => setEstado(e.target.value)}
                            placeholder="Escrever"
                          />
                        </div>
                        <div className="w-[25vw] lg:w-[20vw] min-w-[200px] mr-[15px] md:mr-[26px] mb-[20px]">
                          <TextField
                            label="PCD"
                            fullWidth
                            value={pcd}
                            onChange={(e) => setPcd(e.target.value)}
                          />
                        </div>
                        <div className="w-[25vw] lg:w-[20vw] min-w-[200px] mr-[15px] md:mr-[26px] mb-[40px]">
                          <TextField
                            label="Aluno Growdev"
                            fullWidth
                            value={growdev}
                            onChange={(e) => setGrowdev(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  {curriculo && (
                    <div className="px-[3vw] pt-[40px] text-[#5B5B5B]">
                      <div className="mb-[20px] text-[20px]">Competências</div>
                      <div className="w-[25vw] sm:w-[30vw] lg:w-[23vw] xl:w-[20vw] min-w-[200px] mb-[30px]">
                        <TextField
                          label="Senioridade"
                          fullWidth
                          value={growdev}
                          onChange={(e) => setGrowdev(e.target.value)}
                        />
                      </div>
                      <div className="w-[40vw] sm:w-[40vw] lg:w-[35vw] xl:w-[30vw] min-w-[300px] mb-[30px]">
                        <TextField
                          label="Tecnologia"
                          fullWidth
                          value={tecnologia}
                          // onChange={(e) => setTecnologia(e.target.value)}
                        />
                      </div>
                      <div className="text-[20px] mb-[20px]">
                        Links relacionados
                      </div>
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
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
