/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Button, Pagination, PaginationItem, TextField } from "@mui/material";
import { SideBarAluno } from "../../../components/sidebar/SideBarAluno";
import { Link } from "react-router-dom";
import { SideBarParceiro } from "../../../components/sidebar/SideBarParceiro";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  jobFilter,
  jobFindBySearchTitle,
  jobGetAll,
  jobLogout,
} from "../../../store/modules/job/JobSlice";
import { TopBar } from "../../../components/topBar/TopBar";
import { TbReportSearch } from "react-icons/tb";
import { CardVaga } from "../../../components/card/CardVaga";
import { ClipLoader } from "react-spinners";
import { ModalVaga } from "./ModalVaga";
import { Filter } from "../../../components/filter/Filter";

interface VagasAbertasProps {
  parceiro?: boolean;
}

export const VagasAbertas = (props: VagasAbertasProps) => {
  const { parceiro } = props;
  const dispatch = useAppDispatch();

  const [filterOn, setFilterOn] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [inputValue, setInputValue] = useState<string>("");
  const [render, setRender] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
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

  const userLogin = Object.values(
    useAppSelector((store) => store.userLogin.entities)
  );

  const openModal = (selectedId: string) => {
    setModal(true);
    setId(selectedId);
  };

  const closeModal = () => {
    setModal(false);
  };

  useEffect(() => {
    setLoading(true);
    dispatch(jobLogout());
    if (!filterSearch) {
      const getJobs = async () => {
        const response = await dispatch(
          jobGetAll({
            page: currentPage - 1,
            size: 8,
          })
        );
        if (response.payload.totalPages) {
          setTotalPages(response.payload.totalPages);
          // setTotalElements(response.payload.totalElements);
        }
        setLoading(false);
      };
      getJobs().catch(console.error);
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
            size: 8,
          })
        );
        if (response.payload.totalPages) {
          setTotalPages(response.payload.totalPages);
          // setTotalElements(response.payload.totalElements);
        }
      };
      getFilter();
      // setLoading(false);
    }
  }, [currentPage, render]);

  useEffect(() => {
    if (inputValue.length > 2) {
      setLoading(true);
      setFilterSearch(false);
      const getTalentBanks = async () => {
        const response = await dispatch(
          jobFindBySearchTitle({
            token: userLogin[0]?.token,
            title: inputValue,
            page: currentPage - 1,
            size: 8,
          })
        );
        if (response.payload.totalPages) {
          setTotalPages(response.payload.totalPages);
          // setTotalElements(response.payload.totalElements);
        }
        setLoading(false);
      };
      getTalentBanks().catch(console.error);
    }
    if (inputValue === "") {
      // setCurrentPage(Number(urlCurrentPage[1]));
      setFilterSearch(false);
      setRender(!render);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  const listJobs = Object.values(useAppSelector((store) => store.job.entities));

  return (
    <>
      <div>
        {loading && (
          <div className="absolute w-[100%] h-[100%] flex justify-center items-center z-10">
            <ClipLoader color={"#000001"} size={60} />
          </div>
        )}
        <div
          className={`flex ${filterOn && "brightness-50"}`}
          onClick={() => {
            filterOn && setFilterOn(false);
            openMenu && setOpenMenu(false);
          }}
        >
          {parceiro ? (
            <SideBarParceiro filter={filterOn} vagasAbertas />
          ) : (
            <SideBarAluno filter={filterOn} vagasAbertas openMenu={openMenu} />
          )}
          <div className="w-[100%] md:w-[calc(100vw-90px)] bg-[#E5E5E5]">
            <TopBar setOpenMenu={setOpenMenu} />
            <div className="h-[130px] flex-col sm:flex-row w-[100%] justify-around bg-gray-900 text-white flex items-center">
              <div className="flex items-center">
                <div className="text-[44px]">
                  <TbReportSearch />
                </div>
                <div className="font-bold text-[20px] ml-[10px]">
                  Vagas Abertas
                </div>
              </div>
              <div className="hidden md:flex">
                <TextField
                  color="info"
                  placeholder="Pesquisar vaga"
                  onChange={(e) => setInputValue(e.target.value)}
                  value={inputValue}
                  sx={{ marginRight: "30px" }}
                  className="bg-white rounded-2xl font-bold min-w-200px w-[25vw]"
                />
              </div>
              <div className="flex items-center">
                <div className="md:hidden">
                  <TextField
                    color="info"
                    placeholder="Pesquisar vaga"
                    onChange={(e) => setInputValue(e.target.value)}
                    value={inputValue}
                    sx={{ marginRight: "30px" }}
                    className="bg-white rounded-2xl font-bold min-w-200px"
                  />
                </div>
                <Button
                  variant="contained"
                  color="warning"
                  onClick={() => setFilterOn(true)}
                >
                  <div className="normal-case font-bold text-[16px]">
                    Filtrar
                  </div>
                </Button>
              </div>
            </div>
            <div className="bg-slate-300 min-h-[530px] w-[100%] md:w-[calc(100%-90px)] absolute">
              {listJobs[0] !== undefined && (
                <>
                  <div className="flex min-h-[450px] flex-wrap justify-center relative">
                    {listJobs.map(
                      (job) =>
                        job && (
                          <div key={job.uid}>
                            <CardVaga
                              uid={job.uid}
                              modal
                              openModal={openModal}
                            />
                          </div>
                        )
                    )}
                  </div>
                  <div className="flex justify-center mt-[20px] mb-[20px] 2xl:mb-[0px]">
                    <Pagination
                      onChange={handleChangePage}
                      page={currentPage}
                      count={totalPages}
                      size="large"
                      variant="outlined"
                      renderItem={(item) => (
                        <PaginationItem component={Link} to={`/`} {...item} />
                      )}
                    />
                  </div>
                </>
              )}
              {!loading && listJobs[0] === undefined && (
                <div className="mt-[30px] ml-[5%] text-[22px]">
                  Nenhuma vaga foi encontrada.
                </div>
              )}
            </div>
          </div>
        </div>
        {filterOn && (
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
        )}
      </div>
      <ModalVaga open={modal} handleClose={closeModal} id={id} />
    </>
  );
};
