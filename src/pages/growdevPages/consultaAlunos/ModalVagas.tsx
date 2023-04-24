import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Modal,
  TextField,
} from "@mui/material";
// import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { ModalDetalhe } from "./ModalDetalhe";

interface IModalInfosEventCalendaryProps {
  open: boolean;
  handleClose?: () => void;
  isEdit: boolean;
  setRender?: Dispatch<SetStateAction<boolean>>;
  render?: boolean;
}

export const ModalVagas = ({
  handleClose,
  open,
  isEdit,
  setRender,
  render,
}: IModalInfosEventCalendaryProps) => {
  // const [id, setId] = useState<number>(0);
  // const [error, setError] = useState<string>("");
  const [modalTwo, setModalTwo] = useState<boolean>(false);
  const [edition, setEdition] = useState<boolean>();
  // const dispatch = useAppDispatch();

  // const openModal = () => {
    // setModalTwo(true);
  // };

  const closeModal = () => {
    setModalTwo(false);
    handleClose && handleClose();
    setEdition(false);
  };

  // const handleAddEvent = async () => {
    // setError("");
    // const agendamento = await dispatch(
    // agendamentoPost({
    // })
    // );
    // if (agendamento.payload.name === "AxiosError") {
    // const message = agendamento.payload.message.split(" ");
    // setError(message[5]);
    //   const message = agendamento.payload.response.data.message;
    //   setError(message);
    // } else {
    //   setRender(!render);
    //   handleClose();
    // }
    // }
  // };

  // const handleUpdateEvent = async () => {
    // setError("");
  // };

  // const handleDeleteEvent = async () => {};

  return (
    <>
      <ModalDetalhe open={modalTwo} handleClose={closeModal} />
      <Modal
        open={open}
        onClose={handleClose}
        className="flex justify-center items-center"
      >
        <div className="bg-white w-[1304px] h-[600px]">
          <div className="h-[40px] flex justify-end bg-[#292A2D]">
            <div
              onClick={handleClose}
              className=" cursor-pointer text-[26px] font-bold mt-[10px] mr-[25px] text-[#E16E0E]"
            >
              X
            </div>
          </div>
          <div className="h-[75px] flex justify-center mt-[-20px] bg-[#292A2D]">
            <div className="w-[30vw] min-w-[300px]">
              <TextField
                placeholder="Pesquisar"
                fullWidth
                color="info"
                sx={{ borderRadius: 5, background: "white", height: "55px" }}
              />
            </div>
          </div>
          <div className="overflow-y-scroll">
            {/* <div className="h-[505px] bg-slate-50">
              <CardVaga modal openModal={openModal} uid={} />
            </div> */}
          </div>
        </div>
      </Modal>
    </>
  );
};
