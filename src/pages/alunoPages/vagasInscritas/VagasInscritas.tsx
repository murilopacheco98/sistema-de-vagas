import React, { useState, useEffect } from "react";
import { Button, Input, Pagination, PaginationItem } from "@mui/material";
import { SideBarAluno } from "../../../components/sidebar/SideBarAluno";
import { Link, useNavigate } from "react-router-dom";
import {
  jobFindByTalentBank,
  jobLogout,
} from "../../../store/modules/job/JobSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { TopBar } from "../../../components/topBar/TopBar";
import { BsClipboardCheck } from "react-icons/bs";
import { ClipLoader } from "react-spinners";

export const VagasInscritas = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [filterOn, setFilterOn] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  // const [totalElements, setTotalElements] = useState<number>(1);
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [pesquisar, setPesquisar] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const userLogin = Object.values(
    useAppSelector((store) => store.userLogin.entities)
  );

  const talentBank = Object.values(
    useAppSelector((store) => store.talentBank.entities)
  );

  useEffect(() => {
    setLoading(true);
    dispatch(jobLogout());
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
        // setTotalElements(response.payload.totalElements);
      }
    };
    getJobs().catch(console.error);
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  const listJobs = Object.values(useAppSelector((store) => store.job.entities));
  const bgFilter = filterOn && "brightness-50";

  return (
    <div>
      {loading && (
        <div className="absolute w-[100%] h-[100%] flex justify-center items-center z-10">
          <ClipLoader color={"#000001"} size={60} />
        </div>
      )}
      <div
        className={`flex ${bgFilter}`}
        onClick={() => {
          filterOn && setFilterOn(false);
          openMenu && setOpenMenu(false);
        }}
      >
        <SideBarAluno filter={filterOn} vagasInscritas openMenu={openMenu} />
        <div className="w-[100%] md:w-[calc(100%-90px)] bg-[#E5E5E5]">
          <TopBar setOpenMenu={setOpenMenu} />
          <div className="flex flex-col sm:flex-row items-center h-[140px] w-[100%] justify-around bg-gray-900 text-white ">
            <div className="flex items-center">
              <div className="text-[34px]">
                <BsClipboardCheck />
              </div>
              <div className="font-bold text-[20px] ml-[10px]">
                Vagas Inscritas
              </div>
            </div>
            {userLogin[0] !== undefined && (
              <div className="bg-white rounded-md min-w-[300px]">
                <Input
                  placeholder="Pesquisar"
                  value={pesquisar}
                  fullWidth
                  className="px-[20px] pt-[6px] pb-[3px]"
                  onChange={(e) => setPesquisar(e.target.value)}
                />
              </div>
            )}
          </div>
          {userLogin[0] !== undefined ? (
            <div className="pt-[30px] pb-[40px]">
              <div className="flex justify-center">
                <div className="bg-white w-[100%] md:w-[95%] max-w-[1150px] overflow-x-scroll min-h-[680px] rounded-2xl">
                  <div className="w-[1150px] flex-block justify-center">
                    <div className="flex items-center justify-center bg-blue-100 pt-[20px] pl-[2.5vw] h-[80px] border-b-[2px]">
                      <div className="w-[200px]">Nome da vaga</div>
                      <div className="w-[150px]">Situação</div>
                      <div className="w-[150px]">Empresa</div>
                      <div className="w-[100px]">Modelo</div>
                      <div className="w-[200px]">E-mail da vaga</div>
                      <div className="w-[150px]">Cidade</div>
                      <div className="w-[150px]">Estado</div>
                    </div>
                    {listJobs[0] !== undefined &&
                      listJobs.map((job) => (
                        <div
                          onClick={() =>
                            navigate(
                              `/vagas-abertas/informacoes-da-vaga/${job?.uid}`
                            )
                          }
                          key={job?.uid}
                          className="cursor-pointer flex h-[60px] items-center pl-[2.5vw] justify-center"
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
                      ))}
                    {listJobs[0] === undefined && !loading && (
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
          ) : (
            <div className="text-center ml-[10%] h-[480px] w-[80%] mt-[30px]">
              <div className="mt-[40px] font-bold text-[20px] md:text-[24px] text-[#2B385B]">
                Você não está logado, para ver quais vagas você está inscrito
                faça o login.
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
        </div>
      </div>
      {/* {filterOn && <Filter filterOn={filterOn} setFilterOn={setFilterOn} />} */}
    </div>
  );
};
