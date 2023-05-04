/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Button, Pagination, PaginationItem, TextField } from "@mui/material";
import { SideBar } from "../../../components/sidebar/SideBar";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { Link, useNavigate } from "react-router-dom";
import {
  jobFilter,
  jobFindBySearchTitle,
  jobGetAll,
} from "../../../store/modules/job/JobSlice";
import { TopBar } from "../../../components/topBar/TopBar";
import { ModalAddVaga } from "./ModalAddVaga";
import { TbReportSearch } from "react-icons/tb";
import { Filter } from "../../../components/filter/Filter";
import { ClipLoader } from "react-spinners";
import { JobDTO } from "../../../types/Job";
import { TokenResponse } from "../../../types/User";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export const GrowdeverPrincipal = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [filterOn, setFilterOn] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  // const [totalElements, setTotalElements] = useState<number>(1);
  const [inputValue, setInputValue] = useState<string>("");
  const [render, setRender] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
  const [edicao, setEdicao] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const [id, setId] = useState<string>("");
  const [vaga, setVaga] = useState<string>("");
  const [workFormat, setWorkFormat] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [seniority, setSeniority] = useState<string>("");
  const [minSalary, setMinSalary] = useState<number>(0);
  const [junior, setJunior] = useState<boolean>(false);
  const [pleno, setPleno] = useState<boolean>(false);
  const [senior, setSenior] = useState<boolean>(false);
  const [filterSearch, setFilterSearch] = useState<boolean>(false);

  const openModal = (selectedId: string) => {
    setId(selectedId);
    setEdicao(true);
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
    setEdicao(false);
  };

  const userLogin: (TokenResponse | undefined)[] = Object.values(
    useAppSelector((store) => store.userLogin.entities)
  );

  useEffect(() => {
    setLoading(true);
    if (userLogin[0]) {
      if (userLogin[0].userDTO.roleName !== "GROWDEV") {
        navigate("/login");
      }
    }
    // dispatch(jobLogout());
    if (!filterSearch) {
      const getJobs = async () => {
        const response = await dispatch(
          jobGetAll({
            page: currentPage - 1,
            size: 10,
          })
        );
        if (response.payload.totalPages) {
          setTotalPages(response.payload.totalPages);
          // setTotalElements(response.payload.totalElements);
        }
      };
      getJobs().catch(console.error);
      setLoading(false);
    } else {
      const getFilter = async () => {
        const response = await dispatch(
          jobFilter({
            jobFilter: {
              stateName: state,
              minSalary: minSalary,
              seniority: seniority,
              title: vaga,
              workFormat: workFormat,
            },
            page: currentPage - 1,
            size: 10,
          })
        );
        if (response.payload.totalPages) {
          setTotalPages(response.payload.totalPages);
          // setTotalElements(response.payload.totalElements);
        }
      };
      getFilter();
      setLoading(false);
    }
  }, [currentPage, render]);

  useEffect(() => {
    setLoading(true);
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
          // setTotalElements(response.payload.totalElements);
        }
      };
      getEspecialidades().catch(console.error);
      setLoading(false);
    }

    if (inputValue === "") {
      setRender(!render);
    }
  }, [inputValue]);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  const listJobs: (JobDTO | undefined)[] = Object.values(
    useAppSelector((store) => store.job.entities)
  );

  const bgJob = (status: string) => {
    if (status === "Disponível") return "bg-green-200";
    else if (status === "Em análise") return "bg-yellow-200";
    else if (status === "Encerrada") return "bg-red-200";
    else return;
  };

  return (
    <div>
      <ModalAddVaga
        open={modal}
        handleClose={closeModal}
        isEdit={edicao}
        id={id}
        render={render}
        setRender={setRender}
        setLoading={setLoading}
      />
      {loading && (
        <div className="absolute w-[100%] h-[100%] flex justify-center items-center z-10">
          <ClipLoader color={"#000001"} size={60} />
        </div>
      )}
      <ToastContainer />
      <div
        className={filterOn ? "flex brightness-50" : "flex"}
        onClick={() => {
          filterOn && setFilterOn(false);
          openMenu && setOpenMenu(false);
        }}
      >
        <SideBar filter={filterOn} vagasAbertas openMenu={openMenu} />
        <div className="w-[100%] md:w-[calc(100%-90px)] min-h-[720px] bg-[#E5E5E5]">
          <TopBar setOpenMenu={setOpenMenu} />
          <div className="h-[100px] w-[100%] justify-around bg-gray-900 text-white flex items-center">
            <div className="flex items-center">
              <div className="text-[44px]">
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
            <div className="flex-block items-center md:flex pl-[20px]">
              <div className="mb-[10px] md:mb-[0px]">
                <Button
                  variant="contained"
                  color="warning"
                  onClick={() => {
                    openModal("");
                    setEdicao(false);
                  }}
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
          {/* <div className="bg-slate-200 absolute"> */}
          <div className="w-[100%] pt-[30px] pb-[46px">
            {/* md:w-[90%] md:ml-[5%] lg:w-[80%] lg:ml-[10%] */}
            <div className="w-[100%] md:w-[90%] lg:w-[80%] md:ml-[5%] lg:ml-[10%] bg-white border-[1px] border-black rounded-2xl">
              <div className="overflow-x-scroll ">
                <div className="min-w-[980px] max-w-[1200px] pl-[3vw] lg:pl-[9vw flex text-[12px] h-[40px] border-b-[1px] border-black mt-[30px]">
                  <div className="min-w-[250px] text-start font-bold">Nome</div>
                  <div className="min-w-[120px] text-start font-bold">
                    Data de início
                  </div>
                  <div className="min-w-[120px] text-start font-bold">
                    Cidade
                  </div>
                  <div className="min-w-[120px] text-start font-bold">
                    Senioridade
                  </div>
                  <div className="min-w-[150px] text-start font-bold">
                    Empresa
                  </div>
                  <div className="min-w-[100px] text-start font-bold">
                    Formato
                  </div>
                  <div className="min-w-[80px] text-start font-bold">
                    Budget
                  </div>
                </div>
                {listJobs[0] !== undefined &&
                  listJobs.map(
                    (job: JobDTO | undefined) =>
                      job && (
                        <div
                          key={job.uid}
                          onClick={() => openModal(job.uid)}
                          className={`${bgJob(
                            job?.status
                          )} border-black cursor-pointer flex min-w-[980px] max-w-[1200px] pl-[3vw] items-center h-[60px] text-[12px] border-b-[1px]`}
                        >
                          <div className="min-w-[250px] text-start">
                            {job.title}
                          </div>
                          <div className="min-w-[120px] text-start">
                            {job.expectedStartDate}
                          </div>
                          <div className="min-w-[120px] text-start">
                            {job.cityName}
                          </div>
                          <div className="min-w-[120px] text-start">
                            {job.seniority}
                          </div>
                          <div className="min-w-[150px] text-start">
                            {job.companyDTO.name}
                          </div>
                          <div className="min-w-[100px] text-start">
                            {job.workFormat}
                          </div>
                          <div className="min-w-[80px] text-start">
                            {job.budget}
                          </div>
                        </div>
                      )
                  )}
                {listJobs[0] === undefined && !loading && (
                  <div className="text-[18px] mb-[30px] ml-[6vw] mt-[3vh]">
                    Nenhuma foi vaga encontrada.
                  </div>
                )}
              </div>
            </div>
          </div>
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
      <Filter
        filterOn={filterOn}
        setFilterOn={setFilterOn}
        vaga={vaga}
        setVaga={setVaga}
        workFormat={workFormat}
        setWorkFormat={setWorkFormat}
        state={state}
        setState={setState}
        seniority={seniority}
        setSeniority={setSeniority}
        minSalary={minSalary}
        setMinSalary={setMinSalary}
        junior={junior}
        setJunior={setJunior}
        pleno={pleno}
        setPleno={setPleno}
        senior={senior}
        setSenior={setSenior}
        setLoading={setLoading}
        currentPage={currentPage}
        setTotalPages={setTotalPages}
        setFilterSearch={setFilterSearch}
      />
    </div>
  );
};
