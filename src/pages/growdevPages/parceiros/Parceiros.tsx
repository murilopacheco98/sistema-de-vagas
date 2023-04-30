/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Button, Pagination, PaginationItem, TextField } from "@mui/material";
import { SideBar } from "../../../components/sidebar/SideBar";
import { Link } from "react-router-dom";
import { ModalParceiros } from "./ModalParceiros";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { companyGetAllPaged } from "../../../store/modules/company/CompanySlice";
import { userGetAllPartners } from "../../../store/modules/user/UserSlice";
import { TopBar } from "../../../components/topBar/TopBar";
import { IoIosBusiness } from "react-icons/io";

interface DetalhesVagaProps {
  inscrever?: boolean;
  parceiro?: boolean;
}

export const Parceiros = (props: DetalhesVagaProps) => {
  // const { inscrever, parceiro } = props;
  // const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalElements, setTotalElements] = useState<number>(1);
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [currentPage2, setCurrentPage2] = useState<number>(1);
  const [totalPages2, setTotalPages2] = useState<number>(1);
  // const [totalElements2, setTotalElements2] = useState<number>(1);

  const [parceiros, setParceiros] = useState<boolean>(true);
  const [empresasParceiras, setEmpresasParceiras] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
  const [edicao, setEdicao] = useState<boolean>(false);

  const userLogin = Object.values(
    useAppSelector((store) => store.userLogin.entities)
  );

  const openModalParceiro = () => {
    setModal(true);
    setParceiros(true);
  };

  const openModalEmpresa = () => {
    setModal(true);
    setParceiros(false);
  };

  const closeModal = () => {
    setModal(false);
    setEdicao(false);
  };

  useEffect(() => {
    const getPartners = async () => {
      const response = await dispatch(
        userGetAllPartners({
          token: userLogin[0] ? userLogin[0]?.token : "",
          page: currentPage - 1,
          size: 9,
        })
      );
      if (response.payload.totalPages) {
        setTotalPages(response.payload.totalPages);
        setTotalElements(response.payload.totalElements);
      }
    };
    getPartners().catch(console.error);
  }, [currentPage]);

  useEffect(() => {
    const getCompanys = async () => {
      const response = await dispatch(
        companyGetAllPaged({
          page: currentPage2 - 1,
          size: 9,
        })
      );
      if (response.payload.totalPages2) {
        setTotalPages(response.payload.totalPages2);
        setTotalElements(response.payload.totalElements2);
      }
    };
    getCompanys().catch(console.error);
  }, [currentPage2]);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  const handleChangePage2 = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage2(value);
  };

  const listCompany = Object.values(
    useAppSelector((store) => store.company.entities)
  );
  const listPartners = Object.values(
    useAppSelector((store) => store.user.entities)
  );

  return (
    <div>
      <ModalParceiros
        open={modal}
        handleClose={closeModal}
        isEdit={edicao}
        parceiros={parceiros}
      />
      <div className="flex">
        <SideBar parceiros openMenu={openMenu} />
        <div className="w-[100%] h-[920px] bg-slate-100">
          <TopBar setOpenMenu={setOpenMenu} />
          <div className="h-[185px] w-[100%] flex bg-gray-900 text-white">
            <div className="flex items-center w-[100%] justify-around h-[60px] mt-[40px]">
              <div className="w-[160px] flex items-center text-center">
                <div className="flex justify-center text-[36px] mr-[5px]">
                  <IoIosBusiness />
                </div>
                <div className="text-[24px] lg:text-[28px] font-bold">
                  Parceiros
                </div>
              </div>
              <TextField
                color="info"
                label="Pesquisar"
                className="bg-white h-[55px] rounded-2xl font-bold w-[30vw] sm:w-[30vw] lg:w-[25vw]"
              />
            </div>
          </div>
          <div className="bg-slate-100 w-[100%] md:w-[calc(100%-90px)] absolute">
            <div className="w-[100%] md:w-[90%] md:ml-[5%] lg:w-[80%] lg:ml-[10%] overflow-scroll min-h-[750px] mt-[-62px] bg-white border-[3px] rounded-2xl">
              <div className="w-[100%] min-w-[700px] border-b-[2px] h-[60px] flex items-center justify-between">
                <div className="flex">
                  {parceiros ? (
                    <div className="min-w-[110px] h-[60px] items-center flex justify-center border-b-[2px] border-orange-600">
                      Parceiros
                    </div>
                  ) : (
                    <div
                      className="cursor-pointer min-w-[110px] h-[60px] items-center flex justify-center"
                      onClick={() => {
                        setParceiros(true);
                        setEmpresasParceiras(false);
                      }}
                    >
                      Parceiros
                    </div>
                  )}
                  {empresasParceiras ? (
                    <div className="min-w-[200px] h-[60px] items-center flex justify-center border-b-[2px] border-orange-600">
                      Empresas parceiras
                    </div>
                  ) : (
                    <div
                      className="cursor-pointer min-w-[200px] h-[60px] items-center flex justify-center"
                      onClick={() => {
                        setParceiros(false);
                        setEmpresasParceiras(true);
                      }}
                    >
                      Empresas parceiras
                    </div>
                  )}
                </div>
                <div>
                  <Button
                    variant="contained"
                    color="warning"
                    sx={{
                      borderRadius: 100,
                      mr: "40px",
                      width: "200px",
                    }}
                    onClick={parceiros ? openModalParceiro : openModalEmpresa}
                  >
                    <div className="normal-case font-bold">
                      {parceiros ? "Adicionar parceiro" : "Adicionar empresa"}
                    </div>
                  </Button>
                </div>
              </div>
              {parceiros && (
                <div className="pt-[30px] text-[#5B5B5B]">
                  <div className="w-[100%] items-center mb-[30px]">
                    <div className="text-[18px] pl-[4vw] font-bold">
                      Usuários parceiros
                    </div>
                    <div>
                      <div className="w-[100%] pl-[3vw] justify-center flex text-[12px] h-[40px] border-b-[2px] mt-[30px]">
                        <div className="ml-[5%] md:ml-[5%] w-[200px] text-start font-bold">
                          Nome
                        </div>
                        <div className="w-[250px] text-start font-bold">
                          Email
                        </div>
                        <div className="w-[150px] text-start font-bold">
                          Contato
                        </div>
                        <div className="w-[200px] text-start font-bold">
                          Empresa
                        </div>
                      </div>
                      {listPartners[0] !== undefined ? (
                        listPartners.map((partner) => (
                          <div
                            key={partner?.userUid}
                            // onClick={() => navigate("/growdever/consulta-alunos")}
                            className="cursor-pointer pl-[3vw] flex w-[100%] justify-center items-center h-[60px] text-[12px] border-b-[2px]"
                          >
                            <div className="ml-[5%] md:ml-[5%] w-[200px] text-start">
                              {partner?.name}
                            </div>
                            <div className="w-[250px] text-start">
                              {partner?.email}
                            </div>
                            {/* <div className="w-[200px] justify-start flex ">
                              <div className="mr-[10px]">Linkedin{partner.</div>
                              <div className="mr-[10px]">Wpp</div>
                              <div className="">Email</div>
                            </div> */}
                            <div className="w-[150px] text-start">
                              {partner?.phoneNumber}
                            </div>
                            <div className="w-[200px] flex justify-start">
                              {partner?.companyDTO
                                ? partner?.companyDTO.name
                                : ""}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="ml-[7vw] mt-[4vh]">
                          Nenhum parceiro foi encontrado no sistema.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
              {empresasParceiras && (
                <div className="pt-[30px] text-[#5B5B5B]">
                  <div className="w-[100%] items-center mb-[30px]">
                    <div className="text-[18px] pl-[4vw] font-bold">
                      Empreas parceiras
                    </div>
                    <div>
                      <div className="w-[100%] justify-center flex text-[12px] h-[40px] border-b-[2px] mt-[30px]">
                        <div className="w-[200px] text-center font-bold">
                          Nome da Empresa
                        </div>
                      </div>
                      <div
                        // onClick={() => navigate("/growdever/consulta-alunos")}
                        className="flex-block w-[100%] justify-center items-center h-[70px] text-[12px]"
                      >
                        {listCompany[0] !== undefined ? (
                          listCompany.map((company) => (
                            <div
                              key={company?.uid}
                              className="w-[100%] text-[14px] flex justify-center items-center h-[60px]"
                            >
                              {company?.name}
                            </div>
                          ))
                        ) : (
                          <div className="ml-[7vw] mt-[4vh]">
                            Nenhuma empresa foi encontrada.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {listPartners[0] !== undefined && parceiros && (
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
                      to={`/growdever/parceiros`}
                      {...item}
                    />
                  )}
                />
              </div>
            )}
            {listCompany[0] !== undefined && empresasParceiras && (
              <div className="flex justify-center mb-[30px] mt-[20px]">
                <Pagination
                  onChange={handleChangePage2}
                  page={currentPage2}
                  count={totalPages2}
                  size="large"
                  variant="outlined"
                  renderItem={(item) => (
                    <PaginationItem
                      component={Link}
                      to={`/growdever/parceiros`}
                      {...item}
                    />
                  )}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
