/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Button, Pagination, PaginationItem, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { SideBarParceiro } from "../../components/sidebar/SideBarParceiro";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { jobFindByResponsible } from "../../store/modules/job/JobSlice";
import { TopBar } from "../../components/topBar/TopBar";
import { ModalAddVaga } from "../growdevPages/growdeverPrincipal/ModalAddVaga";
import { TbReportSearch } from "react-icons/tb";
import { ClipLoader } from "react-spinners";

export const ParceiroHome = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [filterOn, setFilterOn] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [render, setRender] = useState<boolean>(false);
  const [id, setId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [vaga, setVaga] = useState<string>("");
  const [empresa, setEmpresa] = useState<string>("");
  const [workFormat, setWorkFormat] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [maxSalary, setMaxSalary] = useState<string>("");
  const [edicao, setEdicao] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);

  const openModal = (selectedId?: string) => {
    setModal(true);
    selectedId && setId(selectedId);
    selectedId && setEdicao(true);
  };

  const closeModal = () => {
    setModal(false);
    setEdicao(false);
  };

  const userLogin = Object.values(
    useAppSelector((store) => store.userLogin.entities)
  );

  if (userLogin[0]) {
    if (userLogin[0].userDTO.roleName !== "PARCEIRO") {
      navigate("/login");
    }
  }

  useEffect(() => {
    setLoading(true);
    const getJobs = async () => {
      const findJobs = await dispatch(
        jobFindByResponsible({
          email: userLogin[0]?.userDTO.email,
          token: userLogin[0]?.token,
          page: 0,
          size: 10,
        })
      );
      if (findJobs.payload.name === "AxiosError") {
        setLoading(false);
      } else {
        setLoading(false);
        setTotalPages(findJobs.payload.totalPages)
      }
    };
    getJobs();
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
      <ModalAddVaga
        open={modal}
        handleClose={closeModal}
        isEdit={edicao}
        id={id}
        render={render}
        setRender={setRender}
        setLoading={setLoading}
      />
      {filterOn ? (
        <div className="flex brightness-50" onClick={() => setFilterOn(false)}>
          <SideBarParceiro filter={filterOn} minhasVagas />
          <div className="w-[93.3vw] bg-[#E5E5E5]">
            {loading && (
              <div className="absolute z-10">
                <ClipLoader color={"#000001"} size={60} />
              </div>
            )}
            <TopBar />
            <div className="h-[140px] w-[100%] justify-around bg-gray-900 text-white flex items-center">
              <div className="md:flex items-center">
                <div className="flex justify-center text-[44px]">
                  <TbReportSearch />
                </div>
                <div className="font-bold text-[20px] ml-[10px]">
                  Vagas Abertas
                </div>
              </div>
              <div className="hidden sm:flex">
                <TextField
                  color="info"
                  label="Pesquisar"
                  className="bg-white rounded-2xl font-bold w-[20vw] sm:w-[30vw] lg:w-[25vw]"
                />
              </div>
              <div className="flex-block md:flex">
                <div>
                  <Button
                    variant="contained"
                    color="warning"
                    onClick={() => setFilterOn(true)}
                    sx={{
                      marginLeft: "20px",
                      marginRight: "10px",
                      marginBottom: "10px",
                    }}
                  >
                    <div className="normal-case">Filtrar</div>
                  </Button>
                </div>
                <div>
                  <Button
                    variant="contained"
                    color="warning"
                    sx={{ marginRight: "10px", marginBottom: "10px" }}
                    onClick={() => openModal()}
                  >
                    <div className="normal-case">Adicionar Vaga</div>
                  </Button>
                </div>
              </div>
            </div>
            <div className="pt-[30px] pb-[40px] lg:w-[92.5vw]">
              <div className="flex justify-center">
                <div className="bg-white w-[85vw] overflow-x-scroll min-h-[680px] rounded-2xl">
                  <div className="min-w-[1170px]">
                    <div className="flex items-center justify-center w-[100%] pt-[20px] pl-[2.5vw] h-[80px] border-b-[2px]">
                      <div className="w-[250px]">Vagas</div>
                      <div className="w-[150px]">Situação</div>
                      <div className="w-[150px]">Empresa</div>
                      <div className="w-[100px]">Modelo</div>
                      <div className="w-[250px]">E-mail da vaga</div>
                      <div className="w-[150px]">Cidade</div>
                      <div className="w-[120px]">Senioridade</div>
                    </div>
                  </div>
                  {listJobs[0] !== undefined ? (
                    listJobs.map((job) => (
                      <div
                        key={job?.uid}
                        onClick={() =>
                          navigate(
                            `/empresa-parceira/informacoes-da-vaga/${job?.uid}`
                          )
                        }
                        className="cursor-pointer flex h-[60px] justify-center items-center pl-[2.5vw]"
                      >
                        <div className="w-[250px] text-[13px]">
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
                        <div className="w-[250px] text-[13px]">
                          {job?.dataProfileDTO.email}
                        </div>
                        {/* <div className="w-[150px] text-[13px]">
                          65 99660-1675{job?.dataProfileDTO.}
                        </div> */}
                        <div className="w-[150px] text-[13px]">
                          {job?.cityName}
                        </div>
                        <div className="w-[120px] text-[13px]">
                          {job?.seniority}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="mt-[3vw] ml-[6vw] text-[18px]">
                      Você ainda não adicionou nenhuma vaga.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex">
          <SideBarParceiro filter={filterOn} minhasVagas />
          <div className="w-[93.3vw] bg-[#E5E5E5]">
            <TopBar />
            <div className="h-[140px] w-[100%] justify-around bg-gray-900 text-white flex items-center">
              <div className="sm:flex items-center">
                <div className="flex justify-center text-[44px]">
                  <TbReportSearch />
                </div>
                <div className="font-bold text-[20px] ml-[10px]">
                  Vagas Abertas
                </div>
              </div>
              <div className="hidden sm:flex">
                <TextField
                  color="info"
                  label="Pesquisar"
                  className="bg-white rounded-2xl font-bold w-[20vw] sm:w-[30vw] lg:w-[25vw]"
                />
              </div>
              <div className="flex-block md:flex">
                <div>
                  <Button
                    variant="contained"
                    color="warning"
                    onClick={() => setFilterOn(true)}
                    sx={{
                      marginLeft: "20px",
                      marginRight: "10px",
                      marginBottom: "10px",
                    }}
                  >
                    <div className="normal-case">Filtrar</div>
                  </Button>
                </div>
                <div>
                  <Button
                    variant="contained"
                    color="warning"
                    sx={{ marginRight: "10px", marginBottom: "10px" }}
                    onClick={() => openModal()}
                  >
                    <div className="normal-case">Adicionar Vaga</div>
                  </Button>
                </div>
              </div>
            </div>
            <div className="pt-[30px] pb-[40px] lg:w-[92.5vw]">
              <div className="flex justify-center">
                <div className="bg-white w-[85vw] overflow-x-scroll min-h-[680px] rounded-2xl">
                  <div className="min-w-[1170px]">
                    <div className="flex items-center justify-center w-[100%] pt-[20px] pl-[2.5vw] h-[80px] border-b-[2px]">
                      <div className="w-[250px]">Vaga</div>
                      <div className="w-[150px]">Situação</div>
                      <div className="w-[150px]">Empresa</div>
                      <div className="w-[100px]">Modelo</div>
                      <div className="w-[250px]">E-mail da vaga</div>
                      {/* <div className="w-[150px]">Celular</div> */}
                      <div className="w-[150px]">Cidade</div>
                      <div className="w-[120px]">Senioridade</div>
                    </div>
                    {listJobs[0] !== undefined ? (
                      listJobs.map((job) => (
                        <div
                          key={job?.uid}
                          onClick={() =>
                            navigate(
                              `/empresa-parceira/informacoes-da-vaga/${job?.uid}`
                            )
                          }
                          className="cursor-pointer flex h-[60px] justify-center items-center pl-[2.5vw]"
                        >
                          <div className="w-[250px] text-[13px]">
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
                          <div className="w-[250px] text-[13px]">
                            {job?.dataProfileDTO.email}
                          </div>
                          {/* <div className="w-[150px] text-[13px]">
                          65 99660-1675{job?.dataProfileDTO.}
                        </div> */}
                          <div className="w-[150px] text-[13px]">
                            {job?.cityName}
                          </div>
                          <div className="w-[120px] text-[13px]">
                            {job?.seniority}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="mt-[3vw] ml-[6vw] text-[18px]">
                        Você ainda não adicionou nenhuma vaga.
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
