import React, { useState, useEffect } from "react";
import { Button, Pagination, PaginationItem, TextField } from "@mui/material";
import { CardVaga } from "../../../components/card/CardVaga";
import { SideBar } from "../../../components/sidebar/SideBar";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { Link, useNavigate } from "react-router-dom";
import {
  jobFindBySearchTitle,
  jobGetAll,
} from "../../../store/modules/job/JobSlice";
import { JobDTO } from "../../../types/Job";
import { TopBar } from "../../../components/topBar/TopBar";
import { ModalAddVaga } from "./ModalAddVaga";
import { TbReportSearch } from "react-icons/tb";

export const GrowdeverPrincipal = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [filterOn, setFilterOn] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalElements, setTotalElements] = useState<number>(1);
  const [inputValue, setInputValue] = useState<string>("");
  const [render, setRender] = useState<boolean>(false);

  const [vaga, setVaga] = useState<string>("");
  const [empresa, setEmpresa] = useState<string>("");
  const [workFormat, setWorkFormat] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [maxSalary, setMaxSalary] = useState<string>("");
  const [seniority, setSeniority] = useState<string>("");
  const [keywords, setKeywords] = useState<string>("");
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
        if (userLogin[0].userDTO.roleName != "GROWDEV") {
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
        jobGetAll({
          page: currentPage - 1,
          size: 9,
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
          jobFindBySearchTitle({
            token: userLogin[0]?.token,
            title: inputValue,
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

  const listJobs = Object.values(useAppSelector((store) => store.job.entities));

  return (
    <div>
      <div
        className="w-[calc(100%-77px)] ml-[77px] sm:w-[calc(100%-81px)]
        sm:ml-[81px] lg:w-[calc(100%-84px)] lg:ml-[84px] xl:w-[calc(100%-87px)]
        xl:ml-[87px] mt-[170px] h-[790px] bg-slate-100 absolute"
      />
      <ModalAddVaga open={modal} handleClose={closeModal} isEdit={edicao} />
      {filterOn ? (
        <div className="flex brightness-50" onClick={() => setFilterOn(false)}>
          <SideBar filter={filterOn} vagasAbertas />
          <div className="w-[92.9vw]">
            <TopBar />
            <div className="h-[100px] w-[100%] justify-around bg-gray-900 text-white flex items-center">
              <div className="md:flex items-center">
                <div className="flex justify-center text-[30px] md:text-[40px] lg:text-[50px]">
                  <TbReportSearch />
                </div>
                <div className="font-bold text-[20px] ml-[10px]">
                  Vagas Abertas
                </div>
              </div>
              <div className="hidden sm:flex">
                <TextField
                  color="info"
                  placeholder="Pesquisar vaga"
                  onChange={(e) => setInputValue(e.target.value)}
                  value={inputValue}
                  className="bg-white rounded-2xl font-bold w-[20vw] sm:w-[30vw] lg:w-[25vw]"
                />
              </div>
              <Button variant="contained" color="warning">
                <div className="normal-case">Filtrar</div>
              </Button>
            </div>
            {listJobs[0] !== undefined ? (
              <div className="flex flex-wrap bg-slate-100">
                {listJobs.map((job) => (
                  <div key={job?.uid} className="h-[540px] pl-[26px]">
                    <CardVaga
                      growdev
                      title={job?.title}
                      description={job?.description}
                      status={job?.status}
                      workFormat={job?.workFormat}
                      seniority={job?.seniority}
                      name={job?.dataProfileDTO.name}
                      budget={job?.budget}
                      numberSubscribes={job?.numberParticipants}
                      uid={job?.uid}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div>Nenhuma vaga foi encontrada.</div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex">
          <SideBar filter={filterOn} vagasAbertas />
          <div className="w-[94.1vw]">
            <TopBar />
            <div className="h-[100px] w-[100%] justify-around bg-gray-900 text-white flex items-center">
              <div className="md:flex items-center">
                <div className="flex justify-center text-[30px] md:text-[40px] lg:text-[50px]">
                  <TbReportSearch />
                </div>
                <div className="font-bold text-[18px] ml-[10px]">
                  Vagas Abertas
                </div>
              </div>
              <div className="hidden sm:flex">
                <TextField
                  color="info"
                  placeholder="Pesquisar vaga"
                  onChange={(e) => setInputValue(e.target.value)}
                  value={inputValue}
                  className="bg-white rounded-2xl font-bold w-[20vw] sm:w-[30vw] lg:w-[25vw]"
                />
              </div>
              <div className="flex-block items-center md:flex pl-[20px]">
                <div className="mb-[10px] md:mb-[0px]">
                  <Button
                    variant="contained"
                    color="warning"
                    onClick={openModal}
                    sx={{ mr: "15px" }}
                  >
                    <div className="normal-case">Adicionar vaga</div>
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
            <div className="bg-slate-200 absolute">
              {listJobs[0] !== undefined ? (
                <div className="flex flex-wrap justify-center relative ml-[-20px]">
                  {listJobs.map((job) => (
                    <div key={job?.uid} className="h-[240px] pl-[0px]">
                      <CardVaga
                        growdev
                        title={job?.title}
                        description={job?.description}
                        status={job?.status}
                        workFormat={job?.workFormat}
                        seniority={job?.seniority}
                        name={
                          job?.dataProfileDTO ? job.dataProfileDTO.name : ""
                        }
                        budget={job?.budget}
                        numberSubscribes={job?.numberParticipants}
                        uid={job?.uid}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-[20px] mt-[3vh] ml-[6vw]">
                  Nenhuma vaga foi encontrada.
                </div>
              )}
              {listJobs[0] !== undefined && (
                <div className="flex justify-center mb-[30px] mt-[20px]">
                  <Pagination
                    onChange={handleChangePage}
                    page={currentPage}
                    count={totalPages}
                    size="large"
                    variant="outlined"
                    renderItem={(item) => (
                      <PaginationItem
                        component={Link}
                        to={`/growdever`}
                        {...item}
                      />
                    )}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {filterOn && (
        <div className="w-[368px] h-[100vh] right-0 top-0 absolute z-10 bg-white">
          <div className="text-orange-500 text-[25px] justify-end flex mr-[25px] mt-[15px]">
            <div className="cursor-pointer" onClick={() => setFilterOn(false)}>
              X
            </div>
          </div>
          <div className="text-blue-800 ml-[41px] text-[30px] mb-[20px]">
            Filtros
          </div>
          <form>
            <div className="mb-[15px] mx-[40px]">
              <TextField
                label="Vaga"
                size="small"
                value={vaga}
                onChange={(e) => setVaga(e.target.value)}
                fullWidth
              />
            </div>
            <div className="mb-[15px] mx-[40px]">
              <TextField
                label="Empresa"
                size="small"
                value={empresa}
                onChange={(e) => setEmpresa(e.target.value)}
                fullWidth
              />
            </div>
            <div className="mb-[15px] mx-[40px]">
              <TextField
                label="Formato de trabalho"
                size="small"
                value={workFormat}
                onChange={(e) => setWorkFormat(e.target.value)}
                fullWidth
              />
            </div>
            <div className="mb-[15px] mx-[40px]">
              <TextField
                label="Cidade"
                size="small"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                fullWidth
              />
            </div>
            <div className="mb-[15px] mx-[40px]">
              <TextField
                label="Teto da vaga"
                size="small"
                value={maxSalary}
                onChange={(e) => setMaxSalary(e.target.value)}
                fullWidth
              />
            </div>
            <div className="text-[14px] font-bold text-gray-500 ml-[40px] mb-[10px]">
              Senioridade
            </div>
            <div className="flex ml-[40px] mb-[10px] justify-around mr-[40px]">
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
            <div className="flex ml-[40px] mb-[40px] justify-around mr-[40px]">
              <div className="cursor-pointer text-blue-700 border-[1.5px] border-blue-700 rounded-2xl py-[1px] px-[10px]">
                Ux
              </div>
              <div className="cursor-pointer text-blue-700 border-[1.5px] border-blue-700 rounded-2xl py-[1px] px-[10px]">
                Ui
              </div>
              <div className="cursor-pointer text-blue-700 border-[1.5px] border-blue-700 rounded-2xl py-[1px] px-[10px]">
                Java
              </div>
              <div className="cursor-pointer text-blue-700 border-[1.5px] border-blue-700 rounded-2xl py-[1px] px-[10px]">
                C#
              </div>
              <div className="cursor-pointer text-blue-700 border-[1.5px] border-blue-700 rounded-2xl py-[1px] px-[10px]">
                Python
              </div>
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
  );
};
