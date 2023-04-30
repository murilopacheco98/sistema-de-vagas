/* eslint-disable react-hooks/exhaustive-deps */
import { Button, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SideBarAluno } from "../../../components/sidebar/SideBarAluno";
import { TopBar } from "../../../components/topBar/TopBar";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { talentBankFindByEmail } from "../../../store/modules/talentBank/TalentBankSlice";
import { ModalCadastrar } from "../../growdevPages/bancoTalentos/ModalCadastro";
import { ClipLoader } from "react-spinners";

export const AlunoHome = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [perfil, setPerfil] = useState<boolean>(false);
  const [dadosProfissional, setDadosProfissional] = useState<boolean>(true);
  const [curriculo, setCurriculo] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
  const [render, setRender] = useState<boolean>(false);
  const [edicao, setEdicao] = useState<boolean>(false);
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

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
    setLoading(true);
    setPerfil(false);
    if (userLogin[0] !== undefined) {
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
      setLoading(false);
    } else {
    setLoading(false);
    }
  }, [render]);

  const talentBank = Object.values(
    useAppSelector((store) => store.talentBank.entities)
  );

  const height = userLogin[0] !== undefined ? "h-[820px]" : "h-[710px]";
  const marginPerfil = perfil ? "mt-[30px]" : "mt-[50px]";

  return (
    <>
      <ModalCadastrar
        open={modal}
        handleClose={closeModal}
        isEdit={edicao}
        render={render}
        setRender={setRender}
      />
      <div
        onClick={() => {
          openMenu && setOpenMenu(false);
        }}
        className="flex"
      >
        {loading && (
          <div className="absolute w-[100%] h-[100%] flex justify-center items-center z-10">
            <ClipLoader color={"#000001"} size={60} />
          </div>
        )}
        <SideBarAluno perfil openMenu={openMenu} />
        <div className={`w-[100%] ${height} bg-[#E5E5E5]`}>
          <TopBar setOpenMenu={setOpenMenu} />
          <div className="h-[150px] w-[100%] justify-start bg-gray-900 text-white flex">
            <div className="ml-[7%]">
              <div
                className={`font-bold text-[30px] ${marginPerfil}`}
              >
                Meu Perfil
              </div>
            </div>
          </div>
          <div className="w-[100%]">
            {userLogin[0] === undefined && !loading && (
              <div className="text-center w-[100%]">
                <div className="mt-[40px] font-bold text-[24px] md:text-[30px] text-[#2B385B]">
                  Você não está logado, para ver seu perfil faça o login.
                </div>
                <div className="mt-[30px]">
                  <Button
                    variant="contained"
                    color="warning"
                    sx={{ borderRadius: 100 }}
                    onClick={() => navigate("/login")}
                  >
                    <div className="text-[18px] md:text-[25px] normal-case px-[20px]">
                      Login
                    </div>
                  </Button>
                </div>
              </div>
            )}
            {!loading && !perfil && userLogin[0] !== undefined && (
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
              // <div className="bg-[#E5E5E5 bsolute">
              <div className="w-[100%] lg:w-[90%] lg:ml-[5%] xl:w-[80%] xl:ml-[10%] overflow-x-scroll mt-[-62px] bg-white border-[3px] rounded-2xl">
                <div className="flex items-center justify-start ">
                  <div className="min-w-[520px] w-[100%] border-b-[2px] h-[60px] flex items-center justify-start">
                    {dadosProfissional ? (
                      <div className="min-w-[200px] h-[60px] items-center flex justify-center border-b-[2px] border-orange-600">
                        Dados do profissional
                      </div>
                    ) : (
                      <div
                        className="cursor-pointer min-w-[200px] h-[60px] items-center flex justify-center"
                        onClick={() => {
                          setDadosProfissional(true);
                          setCurriculo(false);
                        }}
                      >
                        Dados do profissional
                      </div>
                    )}
                    {curriculo ? (
                      <div className="min-w-[100px] h-[60px] items-center flex justify-center border-b-[2px] border-orange-600">
                        Currículo
                      </div>
                    ) : (
                      <div
                        className="cursor-pointer min-w-[100px] h-[60px] items-center flex justify-center"
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
                  <div className="pl-[20px]  lg:px-[50px] pt-[30px]">
                    <div className="flex w-[100%] items-center mb-[30px]">
                      <div className="flex items-center justify-center w-[50px] h-[50px] rounded-full border-[2px] mr-[15px]">
                        Foto
                      </div>
                      <div className="text-[18px]">Nome do Aluno</div>
                    </div>
                    <div className="flex flex-wrap">
                      <div className="w-[25vw] lg:w-[20vw] min-w-[200px] mr-[15px] md:mr-[26px] mb-[20px]">
                        <TextField
                          fullWidth
                          label="Nome"
                          value={talentBank[0]?.name}
                        />
                      </div>
                      <div className=" w-[25vw] lg:w-[20vw] min-w-[200px] mr-[15px] md:mr-[26px] mb-[20px]">
                        <TextField
                          fullWidth
                          label="Email"
                          value={talentBank[0]?.email}
                        />
                      </div>
                      <div className="w-[25vw] lg:w-[20vw] min-w-[200px] mr-[15px] md:mr-[26px] mb-[20px]">
                        <TextField
                          fullWidth
                          label="Celular"
                          value={talentBank[0]?.phoneNumber}
                        />
                      </div>
                      <div className="w-[25vw] lg:w-[20vw] min-w-[200px] mr-[15px] md:mr-[26px] mb-[20px]">
                        <TextField
                          fullWidth
                          label="Data de Nascimento"
                          value={talentBank[0]?.birthDate}
                        />
                      </div>
                      {/* <div className="w-[25vw] lg:w-[20vw] min-w-[200px] mr-[15px] md:mr-[26px] mb-[20px]">
                          <TextField
                            required
                            fullWidth
                            label="CPF"
                            value={talentBank[0]?.}
                            onChange={(e) => setCpf(e.target.value)}
                            placeholder="Escrever"
                          />
                        </div> */}
                    </div>
                    <div className="flex flex-wrap">
                      <div className="w-[25vw] lg:w-[20vw] min-w-[200px] mr-[15px] md:mr-[26px] mb-[20px]">
                        <TextField
                          fullWidth
                          label="Rua"
                          value={talentBank[0]?.addressDTO.street}
                        />
                      </div>
                      <div className="w-[25vw] lg:w-[20vw] min-w-[200px] mr-[15px] md:mr-[26px] mb-[20px]">
                        <TextField
                          fullWidth
                          label="Número"
                          value={talentBank[0]?.addressDTO.number}
                        />
                      </div>
                      <div className="w-[25vw] lg:w-[20vw] min-w-[200px] mr-[15px] md:mr-[26px] mb-[20px]">
                        <TextField
                          fullWidth
                          label="Bairro"
                          value={talentBank[0]?.addressDTO.neighborhood}
                          placeholder="Escrever"
                        />
                      </div>
                      <div className="w-[25vw] lg:w-[20vw] min-w-[200px] mr-[15px] md:mr-[26px] mb-[20px]">
                        <TextField
                          fullWidth
                          label="Cidade"
                          value={talentBank[0]?.addressDTO.cityName}
                        />
                      </div>
                      <div className="w-[25vw] lg:w-[20vw] min-w-[200px] mr-[15px] md:mr-[26px] mb-[20px]">
                        <TextField
                          fullWidth
                          label="Estado"
                          value={talentBank[0]?.addressDTO.stateName}
                        />
                      </div>
                      <div className="w-[25vw] lg:w-[20vw] min-w-[200px] mr-[15px] md:mr-[26px] mb-[20px]">
                        <TextField
                          label="PCD"
                          fullWidth
                          value={talentBank[0]?.pcd}
                        />
                      </div>
                      <div className="w-[25vw] lg:w-[20vw] min-w-[200px] mr-[15px] md:mr-[26px] mb-[40px]">
                        <TextField
                          label="Aluno Growdev"
                          fullWidth
                          value={talentBank[0]?.isGrowdever}
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
                        value={talentBank[0]?.curriculumDTO.seniority}
                        // onChange={(e) => setGrowdev(e.target.value)}
                      />
                    </div>
                    <div className="w-[40vw] sm:w-[40vw] lg:w-[35vw] xl:w-[30vw] min-w-[300px] mb-[30px]">
                      <TextField
                        label="Tecnologia"
                        fullWidth
                        value={talentBank[0]?.curriculumDTO.tecnologyName}
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
                          value={talentBank[0]?.curriculumDTO.linkedin}
                          // onChange={(e) => setLinkedin(e.target.value)}
                        />
                      </div>
                      <div className="mb-[20px] w-[25vw] sm:w-[30vw] lg:w-[23vw] xl:w-[20vw] min-w-[200px] mr-[15px] lg:mr-[30px]">
                        <TextField
                          fullWidth
                          label="Github"
                          value={talentBank[0]?.curriculumDTO.github}
                          // onChange={(e) => setGithub(e.target.value)}
                        />
                      </div>
                      <div className="mb-[20px] w-[25vw] sm:w-[30vw] lg:w-[23vw] xl:w-[20vw] min-w-[200px] mr-[15px] lg:mr-[30px]">
                        <TextField
                          fullWidth
                          label="Outro"
                          value={talentBank[0]?.curriculumDTO.otherLinks}
                          // onChange={(e) => setOtherLinks(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              // </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
