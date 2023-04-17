import React, { useState, useEffect } from "react";
import { Button, Pagination, PaginationItem, TextField } from "@mui/material";
import { CardVaga } from "../../../components/card/CardVaga";
import { SideBar } from "../../../components/sidebar/SideBar";
import { SideBarAluno } from "../../../components/sidebar/SideBarAluno";
import { Link, useNavigate } from "react-router-dom";
import { jobFindByTalentBank } from "../../../store/modules/job/JobSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { TopBar } from "../../../components/topBar/TopBar";
import { BsClipboardCheck } from "react-icons/bs";

export const VagasInscritas = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [filterOn, setFilterOn] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalElements, setTotalElements] = useState<number>(1);

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
  const talentBank = Object.values(
    useAppSelector((store) => store.talentBank.entities)
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
        jobFindByTalentBank({
          uid: talentBank[0]?.uid,
          token: userLogin[0]?.token,
          page: 0,
          size: 10,
        })
      );
      if (response.payload.totalPages) {
        setTotalPages(response.payload.totalPages);
        setTotalElements(response.payload.totalElements);
      }
    };
    getJobs().catch(console.error);
    // }
  }, []);

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
          <SideBarAluno filter={filterOn} vagasInscritas />
          <div className="w-[93.2vw] bg-[#E5E5E5]">
            <div className="h-[70px] w-[100%] bg-blue-900 justify-end flex items-center">
              <div className="mr-[55px] text-[25px] text-white">
                icon usuário
              </div>
            </div>
            <div className="h-[150px] w-[100%] justify-around bg-gray-900 text-white flex items-center">
              <div className="flex items-center">
                <div className="text-[34px]">
                  <BsClipboardCheck />
                </div>
                <div className="font-bold text-[20px] ml-[10px]">
                  Vagas Abertas
                </div>
              </div>
              <TextField
                color="info"
                label="Pesquisar"
                className="bg-white rounded-2xl font-bold w-[20vw] sm:w-[30vw] lg:w-[25vw]"
              />
              <Button variant="contained" color="warning">
                <div className="normal-case">Filtrar</div>
              </Button>
            </div>
            <div className="pt-[30px] pb-[40px] lg:w-[88vw]">
              <div className="flex justify-center">
                <div className="overflow-x-scroll ">
                  <div className="bg-white w-[1244px] h-[651px] rounded-2xl">
                    <div className="flex items-center pt-[20px] pl-[2.5vw] h-[80px] border-b-[2px]">
                      <div className="w-[150px]">Vagas</div>
                      <div className="w-[150px]">Situação</div>
                      <div className="w-[150px]">Empresa</div>
                      <div className="w-[100px]">Modelo</div>
                      <div className="w-[200px]">E-mail da vaga</div>
                      <div className="w-[150px]">Celular</div>
                      <div className="w-[150px]">Cidade</div>
                      <div className="w-[150px]">Estado</div>
                    </div>
                    {listJobs[0] !== undefined ? (
                      listJobs.map((job) => (
                        <div className="flex h-[60px] items-center pl-[2.5vw]">
                          <div className="w-[150px] text-[13px]">
                            {job?.title}
                          </div>
                          <div className="w-[150px]">
                            <div className="bg-blue-400 w-[100px] font-bold py-[3px] text-[13px] justify-center flex rounded-full text-white">
                              {job?.status}
                            </div>
                          </div>
                          <div className="w-[150px] text-[13px]">
                            {job?.companyDTO.name}
                          </div>
                          <div className="w-[100px] text-[13px]">
                            {job?.workFormat}
                          </div>
                          <div className="w-[150px] text-[13px]">
                            {job?.cityName}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-[16px]">
                        Nenhuma vaga listada no momento.
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {listJobs[0] !== undefined && (
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
          <SideBarAluno filter={filterOn} vagasInscritas />
          <div className="w-[93.2vw] bg-[#E5E5E5]">
            <TopBar />
            <div className="h-[140px] w-[100%] justify-around bg-gray-900 text-white flex items-center">
              <div className="flex items-center">
                <div className="text-[34px]">
                  <BsClipboardCheck />
                </div>
                <div className="font-bold text-[20px] ml-[10px]">
                  Vagas Inscritas
                </div>
              </div>
              <TextField
                color="info"
                label="Pesquisar"
                className="bg-white rounded-2xl font-bold w-[20vw] sm:w-[30vw] lg:w-[25vw]"
              />
              <Button
                variant="contained"
                color="warning"
                onClick={() => setFilterOn(true)}
              >
                <div className="normal-case">Filtrar</div>
              </Button>
            </div>
            <div className="pt-[30px] pb-[40px] lg:w-[92.5vw]">
              <div className="flex justify-center">
                <div className="bg-white w-[80vw] overflow-x-scroll min-h-[680px] rounded-2xl">
                  <div className="w-[1260px] flex-block justify-center">
                    <div className="flex items-center justify-center bg-blue-100 pt-[20px] pl-[2.5vw] h-[80px] border-b-[2px]">
                      <div className="w-[200px]">Nome da vaga</div>
                      <div className="w-[150px]">Situação</div>
                      <div className="w-[150px]">Empresa</div>
                      <div className="w-[100px]">Modelo</div>
                      <div className="w-[200px]">E-mail da vaga</div>
                      <div className="w-[150px]">Cidade</div>
                      <div className="w-[150px]">Estado</div>
                    </div>
                    {listJobs[0] !== undefined && talentBank[0] ? (
                      listJobs.map((job) => (
                        <div
                          onClick={() =>
                            navigate("/vagas-abertas/informacoes-da-vaga")
                          }
                          key={job?.uid}
                          className="flex h-[60px] items-center pl-[2.5vw] justify-center"
                        >
                          <div className="w-[200px] text-[13px]">
                            {job?.title}
                          </div>
                          <div className="w-[150px]">
                            <div className="bg-blue-400 w-[100px] font-bold py-[3px] text-[13px] justify-center flex rounded-full text-white">
                              {job?.status}
                            </div>
                          </div>
                          <div className="w-[150px] text-[13px]">
                            {job?.companyDTO.name}
                          </div>
                          <div className="w-[100px] text-[13px]">
                            {job?.workFormat}
                          </div>
                          <div className="w-[200px] text-[13px]">
                            {job?.dataProfileDTO.email}
                          </div>
                          {/* <div className="w-[150px] text-[13px]">{job.}65 99660-1675</div> */}
                          <div className="w-[150px] text-[13px]">
                            {job?.cityName}
                          </div>
                          <div className="w-[150px] text-[13px]">
                            {job?.stateName}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="ml-[5vw] mt-[4vh] text-[18px]">
                        Você não está inscrito em nenhuma vaga no momento.
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {listJobs[0] !== undefined && (
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
