import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Autocomplete,
  Button,
  FormControl,
  InputLabel,
  Modal,
  OutlinedInput,
  TextField,
} from "@mui/material";
// import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { CardVaga } from "../../../components/card/CardVaga";
import {
  companyCreate,
  companyGetAll,
  selectAll,
} from "../../../store/modules/company/CompanySlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { CompanyDTO } from "../../../types/Company";
import { userCreate } from "../../../store/modules/user/UserSlice";
import { userLogin } from "../../../store/modules/userLogin/UserLoginSlice";

interface IModalInfosEventCalendaryProps {
  open: boolean;
  handleClose?: () => void;
  isEdit: boolean;
  parceiros?: boolean;
  setRender?: Dispatch<SetStateAction<boolean>>;
  render?: boolean;
}

export const ModalParceiros = ({
  handleClose,
  open,
  parceiros,
  isEdit,
  setRender,
  render,
}: IModalInfosEventCalendaryProps) => {
  const dispatch = useAppDispatch();
  const [dadosAluno, setDadosAluno] = useState<boolean>(true);
  const [curriculo, setCurriculo] = useState<boolean>(false);
  const [error, setError] = useState<boolean>();
  const [response, setResponse] = useState<string>("");

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  // const [companyName, setCompanyName] = useState<string>("");

  const userLogin = Object.values(
    useAppSelector((store) => store.userLogin.entities)
  );

  useEffect(() => {
    dispatch(companyGetAll());
  }, []);

  const handleSubmit = async () => {
    setError(false);
    const userNovo = await dispatch(
      userCreate({
        name: name,
        email: email,
        password: "senhapadrao",
        phoneNumber: phoneNumber,
        roleName: "PARCEIRO",
        companyUid: company,
      })
    );
    if (userNovo.payload.response) {
      setError(true);
      setResponse(userNovo.payload.response.data.message);
    } else {
      setError(false);
      setResponse("");
      console.log("deu certo");
    }
  };

  const handleEdit = async () => {
    // setError("");
  };

  const handleSubmitCompany = async () => {
    setError(false);
    const userNovo = await dispatch(
      companyCreate({
        companyDTO: {
          uid: "",
          name: company,
        },
        token: userLogin[0] ? userLogin[0]?.token : "",
      })
    );
    if (userNovo.payload.response) {
      setError(true);
      setResponse(userNovo.payload.response.data.message);
    } else {
      setError(false);
      setResponse("");
      if (handleClose) {
        handleClose();
      }
    }
  };

  const listCompany = useAppSelector(selectAll);

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        className="flex justify-center items-center"
      >
        <div className="bg-white w-[100vw] sm:w-[80vw] md:w-[70vw] lg:w-[60vw] xl:w-[55vw] overflow-x-scroll">
          <div className="flex justify-end md:w-[100%] ">
            <div className="h-[40px]">
              <div
                onClick={handleClose}
                className=" cursor-pointer text-[26px] font-bold mt-[10px] mr-[25px] text-[#E16E0E]"
              >
                X
              </div>
            </div>
          </div>
          {parceiros && (
            <div className="px-[20px] sm:px-[40px] pt-[10px]">
              <div className="flex w-[90%] ml-[30px] items-center mb-[30px]">
                <div className="flex items-center justify-center w-[50px] h-[50px] rounded-full border-[2px] mr-[15px]">
                  Foto
                </div>
                <div className="text-[16px]">Parceiro</div>
              </div>
              <form onSubmit={isEdit ? handleEdit : handleSubmit}>
                <div className="flex justify-center flex-wrap w-[100%] md:w-[105%] md:ml-[0vw] ml-[0vw]">
                  <div className="w-[25vw] md:w-[20vw] min-w-[250px] mr-[20px] md:mr-[26px] mb-[20px]">
                    <TextField
                      required
                      fullWidth
                      label="Nome"
                      placeholder="Escrever"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className=" w-[25vw] md:w-[20vw] min-w-[250px] mr-[15px] md:mr-[26px] mb-[20px]">
                    <TextField
                      required
                      fullWidth
                      label="Email"
                      placeholder="Escrever"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="w-[25vw] md:w-[20vw] min-w-[250px] mr-[20px] md:mr-[26px] mb-[20px]">
                    <TextField
                      required
                      fullWidth
                      label="Celular"
                      placeholder="Escrever"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                  <div className="w-[25vw] md:w-[20vw] min-w-[250px] mr-[15px] md:mr-[26px] mb-[20px]">
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Empresa
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        label="Empresa"
                      >
                        {listCompany[0] !== undefined &&
                          listCompany.map((company) => (
                            <MenuItem value={company.uid} key={company.uid}>
                              {company.name}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </div>
                </div>
                <div className="flex justify-end mt-[40px] mb-[30px]">
                  <Button
                    type="submit"
                    variant="contained"
                    color="warning"
                    sx={{ borderRadius: 100 }}
                    onClick={(e) => {
                      e.preventDefault();
                      if (isEdit) {
                        handleEdit();
                      } else {
                        handleSubmit();
                      }
                    }}
                  >
                    <div className="normal-case font-bold text-[14px] px-[10px]">
                      Adicionar Parceiro
                    </div>
                  </Button>
                </div>
              </form>
            </div>
          )}
          {!parceiros && (
            <div className="px-[20px] sm:px-[40px] pt-[30px]">
              <div className="flex w-[90%] ml-[30px] items-center mb-[30px]">
                <div className="flex items-center justify-center w-[50px] h-[50px] rounded-full border-[2px] mr-[15px]">
                  Logo
                </div>
                <div className="text-[16px]">Empresa parceira</div>
              </div>
              <form onSubmit={handleSubmitCompany}>
                <div className="flex justify-center flex-wrap w-[100%] md:w-[105%] md:ml-[0vw] ml-[0vw]">
                  <div className="w-[25vw] md:w-[20vw] min-w-[250px] mr-[20px] md:mr-[26px] mb-[20px]">
                    <TextField
                      required
                      fullWidth
                      label="Nome da Empresa"
                      placeholder="Escrever"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-[70px] mb-[50px]">
                  <Button
                    type="submit"
                    variant="contained"
                    color="warning"
                    sx={{ borderRadius: 100 }}
                    onClick={(e) => {
                      e.preventDefault();
                      // if (isEdit) {
                      // handleEdit();
                      // } else {
                      handleSubmitCompany();
                      // }
                    }}
                  >
                    <div className="normal-case font-bold text-[14px] px-[10px]">
                      Adicionar Empresa
                    </div>
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};
