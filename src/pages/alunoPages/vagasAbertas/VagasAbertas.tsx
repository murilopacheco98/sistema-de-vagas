import React, { useState, useEffect } from "react";
import { Button, Pagination, PaginationItem, TextField } from "@mui/material";
import { SideBarAluno } from "../../../components/sidebar/SideBarAluno";
import { Link, useNavigate } from "react-router-dom";
import { SideBarParceiro } from "../../../components/sidebar/SideBarParceiro";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  talentBankFindBySearchName,
  talentBankGetAll,
} from "../../../store/modules/talentBank/TalentBankSlice";
import {
  jobFindBySearchTitle,
  jobGetAll,
} from "../../../store/modules/job/JobSlice";
import { TopBar } from "../../../components/topBar/TopBar";
import { TbReportSearch } from "react-icons/tb";
import { CardVaga } from "../../../components/card/CardVaga";

interface VagasAbertasProps {
  parceiro?: boolean;
}

export const VagasAbertas = (props: VagasAbertasProps) => {
  const { parceiro } = props;
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

  const userLogin = Object.values(
    useAppSelector((store) => store.userLogin.entities)
  );

  useEffect(() => {
    // if (userLogin[0]) {
    //   if (userLogin[0].token) {
    //     if (userLogin[0].userDTO.roleName !== "CANDIDATO") {
    //       navigate("/login");
    //     }
    //   }
    // } else {
    //   navigate("/login");
    // }

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
          talentBankFindBySearchName({
            token: userLogin[0]?.token,
            name: inputValue,
            page: currentPage - 1,
            size: 9,
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
      {filterOn ? (
        <div className="flex brightness-50" onClick={() => setFilterOn(false)}>
          {parceiro ? (
            <SideBarParceiro filter={filterOn} vagasAbertas />
          ) : (
            <SideBarAluno filter={filterOn} vagasAbertas />
          )}
          <div className="w-[93.3vw] bg-[#E5E5E5]">
            <div className="h-[70px] w-[100%] bg-blue-900 justify-end flex items-center">
              <div className="mr-[55px] text-[25px] text-white">
                icon usuário
              </div>
            </div>
            <div className="h-[140px] w-[100%] justify-around bg-gray-900 text-white flex items-center">
              <div className="flex items-center">
                <div className="text-[44px]">
                  <TbReportSearch />
                </div>
                <div className="font-bold text-[20px] ml-[10px]">
                  Vagas Abertas
                </div>
              </div>
              <TextField
                color="info"
                placeholder="Pesquisar vaga"
                onChange={(e) => setInputValue(e.target.value)}
                value={inputValue}
                className="bg-white rounded-2xl font-bold w-[20vw] sm:w-[30vw] lg:w-[25vw]"
              />
              <Button variant="contained" color="warning">
                <div className="normal-case font-bold text-[16px]">Filtrar</div>
              </Button>
            </div>
            <div className="bg-slate-200 absolute">
              {listJobs[0] !== undefined ? (
                <div className="flex flex-wrap justify-center relative">
                  {listJobs.map((job) => (
                    <div key={job?.uid} className="h-[240px]">
                      <CardVaga
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
              {listJobs[0] !== undefined && (
                <div className="flex justify-center mt-[20px] mb-[30px]">
                  <Pagination
                    onChange={handleChangePage}
                    page={currentPage}
                    count={totalPages}
                    size="large"
                    variant="outlined"
                    renderItem={(item) => (
                      <PaginationItem
                        component={Link}
                        to={`/vagas-abertas`}
                        {...item}
                      />
                    )}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex">
          {parceiro ? (
            <SideBarParceiro filter={filterOn} vagasAbertas />
          ) : (
            <SideBarAluno filter={filterOn} vagasAbertas />
          )}
          <div className="w-[93.3vw] bg-[#E5E5E5]">
            <TopBar />
            <div className="h-[140px] w-[100%] justify-around bg-gray-900 text-white flex items-center">
              <div className="flex items-center">
                <div className="text-[44px]">
                  <TbReportSearch />
                </div>
                <div className="font-bold text-[20px] ml-[10px]">
                  Vagas Abertas
                </div>
              </div>
              <TextField
                color="info"
                placeholder="Pesquisar vaga"
                onChange={(e) => setInputValue(e.target.value)}
                value={inputValue}
                className="bg-white rounded-2xl font-bold w-[20vw] sm:w-[30vw] lg:w-[25vw]"
              />
              <Button
                variant="contained"
                color="warning"
                onClick={() => setFilterOn(true)}
              >
                <div className="normal-case font-bold text-[16px]">Filtrar</div>
              </Button>
            </div>
            <div className="bg-slate-200 absolute">
              {listJobs[0] !== undefined ? (
                <div className="flex flex-wrap justify-center relative">
                  {listJobs.map((job) => (
                    <div key={job?.uid} className="h-[240px]">
                      <CardVaga
                        aluno={true}
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
              {listJobs[0] !== undefined && (
                <div className="flex justify-center mt-[20px] mb-[30px]">
                  <Pagination
                    onChange={handleChangePage}
                    page={currentPage}
                    count={totalPages}
                    size="large"
                    variant="outlined"
                    renderItem={(item) => (
                      <PaginationItem
                        component={Link}
                        to={`/vagas-abertas`}
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
