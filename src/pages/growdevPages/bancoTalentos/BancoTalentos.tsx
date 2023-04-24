/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Button, Pagination, PaginationItem, TextField } from "@mui/material";
import { SideBar } from "../../../components/sidebar/SideBar";
import { Link, useNavigate } from "react-router-dom";
import { ModalCadastrar } from "./ModalCadastro";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  talentBankFindBySearchName,
  talentBankGetAll,
} from "../../../store/modules/talentBank/TalentBankSlice";
import { TopBar } from "../../../components/topBar/TopBar";
import { AiFillStar } from "react-icons/ai";
import { IoIosPeople } from "react-icons/io";

export const BancoTalentos = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalElements, setTotalElements] = useState<number>(1);
  const [filterOn, setFilterOn] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [render, setRender] = useState<boolean>(false);

  const [city, setCity] = useState<string>("");
  const [modal, setModal] = useState<boolean>(false);
  const [edicao, setEdicao] = useState<boolean>(false);

  const openModal = () => {
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
    setEdicao(false);
  };

  const userLogin = Object.values(
    useAppSelector((store) => store.userLogin.entities)
  );

  useEffect(() => {
    if (userLogin[0]) {
      if (userLogin[0].token) {
        if (userLogin[0].userDTO.roleName !== "GROWDEV") {
          // setError(false);
          navigate("/login");
        }
      }
    } else {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    const getJobs = async () => {
      const response = await dispatch(
        talentBankGetAll({
          token: userLogin[0]?.token,
          page: currentPage - 1,
          size: 10,
        })
      );
      if (response.payload.totalPages) {
        setTotalPages(response.payload.totalPages);
        setTotalElements(response.payload.totalElements);
      }
    };
    getJobs().catch(console.error);
  }, [currentPage, render]);

  useEffect(() => {
    if (inputValue.length > 2) {
      const getEspecialidades = async () => {
        const response = await dispatch(
          talentBankFindBySearchName({
            token: userLogin[0]?.token,
            name: inputValue,
            page: currentPage - 1,
            size: 10,
          })
        );
        if (response.payload.totalPages) {
          setTotalPages(response.payload.totalPages);
          setTotalElements(response.payload.totalElements);
        }
      };
      getEspecialidades().catch(console.error);
    }

    if (inputValue === "") {
      // setCurrentPage(Number(urlCurrentPage[1]));
      setRender(!render);
    }
  }, [inputValue]);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  const listTalentBanks = Object.values(
    useAppSelector((store) => store.talentBank.entities)
  );

  const bgFilter = filterOn ? "brightness-50" : "";

  return (
    <>
      <ModalCadastrar
        open={modal}
        handleClose={closeModal}
        isEdit={edicao}
        setRender={setRender}
        render={render}
      />
      <div
        className="w-[calc(100%-77px)] ml-[77px] sm:w-[calc(100%-85px)]
        sm:ml-[85px] lg:w-[calc(100%-84px)] lg:ml-[84px] xl:w-[calc(100%-87px)]
        xl:ml-[87px] mt-[170px] h-[790px] bg-slate-100 absolute"
      />
      <div>
        <div className={`flex ${bgFilter}`}>
          <SideBar filter={filterOn} bancoTalentos />
          <div className="w-[92.9vw] relative">
            <TopBar />
            <div className="h-[100px] w-[100%] justify-around bg-gray-900 text-white flex items-center">
              <div className="lg:flex items-center">
                <div>
                  <div className="flex justify-center mb-[-5px] text-[13px] lg:text-[20px]">
                    <AiFillStar />
                  </div>
                  <div className="flex justify-center text-[40px] lg:text-[50px]">
                    <IoIosPeople />
                  </div>
                </div>
                <div className="text-center font-bold text-[20px] ml-[10px]">
                  Banco de Talentos
                </div>
              </div>
              <div className="hidden sm:flex">
                <TextField
                  color="info"
                  placeholder="Pesquisar talento"
                  onChange={(e) => setInputValue(e.target.value)}
                  value={inputValue}
                  className="bg-white rounded-2xl font-bold w-[20vw] sm:w-[30vw] lg:w-[25vw]"
                />
              </div>
              <div className="flex-block lg:flex pl-[20px]">
                <div className="mb-[10px] lg:mb-[0px]">
                  <Button
                    variant="contained"
                    color="warning"
                    onClick={openModal}
                    sx={{ mr: "15px" }}
                  >
                    <div className="normal-case">Cadastrar candidato</div>
                  </Button>
                </div>
                <Button
                  variant="contained"
                  color="warning"
                  onClick={() => setFilterOn(true)}
                >
                  <div className="normal-case">Filtrar</div>
                </Button>
              </div>
            </div>
            <div className="bg-slate-100 w-[81vw] sm:w-[85vw] md:w-[88vw] lg:w-[91vw] xl:w-[92.8vw] pt-[30px] pb-[46px]">
              <div className="mx-[3vw] min-h-[670px] bg-white border-[3px] rounded-2xl">
                <div>
                  <div className="overflow-scroll ">
                    <div className="w-[1210px] pl-[9vw] flex text-[12px] h-[40px] border-b-[2px] mt-[30px]">
                      <div className="w-[200px] text-start font-bold">Nome</div>
                      <div className="w-[200px] text-start font-bold">
                        Contatos
                      </div>
                      <div className="w-[200px] text-start font-bold">
                        Cidade
                      </div>
                      <div className="w-[200px] text-start font-bold">
                        Status
                      </div>
                      <div className="w-[200px] text-start font-bold">
                        Tecnologias
                      </div>
                    </div>
                    {listTalentBanks[0] !== undefined ? (
                      listTalentBanks.map((talentBank) => (
                        <div
                          key={talentBank?.uid}
                          onClick={() => navigate("/growdever/consulta-alunos")}
                          className="cursor-pointer flex w-[1210px] pl-[9vw] items-center h-[60px] text-[12px] border-b-[2px]"
                        >
                          <div className="w-[200px] text-start">
                            {talentBank?.name}
                          </div>
                          <div className="w-[200px] justify-start flex ">
                            <div
                              onClick={() =>
                                navigate(
                                  `${talentBank?.curriculumDTO.linkedin}`
                                )
                              }
                              className="mr-[10px]"
                            >
                              Linkedin
                            </div>
                            <div
                              onClick={() =>
                                navigate(`${talentBank?.phoneNumber}`)
                              }
                              className="mr-[10px]"
                            >
                              Wpp
                            </div>
                            <div
                              onClick={() => navigate(`${talentBank?.email}`)}
                              className=""
                            >
                              Email
                            </div>
                          </div>
                          <div className="w-[200px] text-start">
                            {talentBank?.addressDTO.stateName}
                          </div>
                          <div className="w-[200px] flex justify-start">
                            <div className="text-white font-bold px-[15px] py-[5px] items-center flex justify-center bg-blue-400 rounded-2xl">
                              {talentBank?.status}
                            </div>
                          </div>
                          <div className="w-[280px] justify-start items-center flex flex-wrap">
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
                      <div className="text-[18px] mb-[30px] ml-[6vw] mt-[3vh]">
                        Nenhuma pessoa cadastrada no banco.
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {listTalentBanks[0] !== undefined && (
                <div className="flex justify-center mt-[20px]">
                  <Pagination
                    onChange={handleChangePage}
                    page={currentPage}
                    count={totalPages}
                    size="large"
                    variant="outlined"
                    renderItem={(item) => (
                      <PaginationItem
                        component={Link}
                        to={`/growdever/banco-de-talentos`}
                        {...item}
                      />
                    )}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        {filterOn && (
          <div className="w-[100%] sm:w-[368px] h-[100vh] right-0 top-0 absolute z-10 bg-white">
            <div className="text-orange-500 text-[25px] justify-end flex mr-[25px] mt-[15px]">
              <div
                className="cursor-pointer"
                onClick={() => setFilterOn(false)}
              >
                X
              </div>
            </div>
            <div className="text-blue-800 ml-[41px] text-[30px] mb-[20px]">
              Filtros
            </div>
            <form>
              <div className="mb-[70px] mx-[40px]">
                <TextField
                  label="Cidade"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  fullWidth
                />
              </div>
              <div className="text-[14px] font-bold text-gray-500 ml-[40px] mb-[10px]">
                Senioridade
              </div>
              <div className="flex ml-[40px] mb-[70px] justify-around mr-[40px]">
                <div className="cursor-pointer text-blue-700 border-[1.5px] border-blue-700 rounded-2xl py-[1px] px-[10px]">
                  Júnior
                </div>
                <div className="cursor-pointer text-blue-700 border-[1.5px] border-blue-700 rounded-2xl py-[1px] px-[10px]">
                  Pleno
                </div>
                <div className="cursor-pointer text-blue-700 border-[1.5px] border-blue-700 rounded-2xl py-[1px] px-[10px]">
                  Senior
                </div>
              </div>
              <div className="text-[14px] font-bold text-gray-500 ml-[40px] mb-[10px]">
                Palavras-chaves
              </div>
              <div className="mx-[40px] mb-[15px]">
                <TextField
                  size="small"
                  rows={2}
                  multiline
                  fullWidth
                  name="teste"
                />
              </div>
              <div className="flex justify-center">
                <Button
                  variant="contained"
                  color="warning"
                  sx={{ borderRadius: 100, fontSize: "12px", mr: "25px" }}
                >
                  <div className="font-bold">Aplicar filtros</div>
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    borderRadius: 100,
                    fontSize: "12px",
                    background: "gray",
                  }}
                >
                  <div className="font-bold">Limpar filtros</div>
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
};
