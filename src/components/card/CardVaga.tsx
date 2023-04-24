import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BsFillPersonFill } from "react-icons/bs";
import { GrMoney } from "react-icons/gr";
import { useAppSelector } from "../../store/hooks";
import { selectById } from "../../store/modules/job/JobSlice";

interface CardVagaProps {
  modal: boolean;
  growdev?: boolean;
  aluno?: boolean;
  openModal: (selectedId: string) => void;
  uid: string;
}

export const CardVaga = (props: CardVagaProps) => {
  const { modal, growdev, aluno, openModal, uid } = props;
  const navigate = useNavigate();

  const job = useAppSelector((state) => selectById(state, uid));

  return (
    <div className="pt-[15px] mx-[7.5px]">
      <div className="py-[10px] px-[15px] border-[1px] border-black w-[330px] h-[210px] rounded-2xl bg-white">
        <div className="flex mb-[5px] text-[14px]">
          {/* <div className="bg-green-400 text-white font-bold px-[10px] rounded-2xl mr-[10px]">
            {job?.status}
          </div> */}
          <div className="bg-green-400 text-white font-bold px-[10px] rounded-2xl mr-[10px]">
            {job?.workFormat}
          </div>
          <div className="bg-green-400 text-white font-bold px-[10px] rounded-2xl mr-[10px]">
            {job?.seniority}
          </div>
        </div>
        <div className="font-bold text-[14px]">{job?.title}</div>
        <div
          className="text-[11px] h-[100px] ml-[5px] mb-[5px] overflow-hidden"
          dangerouslySetInnerHTML={{ __html: job ? job?.description : "" }}
        />
        <div className="flex flex-col justify-start font-bold">
          <div className="text-[12px] flex">
            <BsFillPersonFill className="mr-[5px] text-[16px]" />
            {job?.numberParticipants}&nbsp;Participantes Inscritos
          </div>
          <div className="text-[12px] flex">
            <GrMoney className="mr-[7px] text-[15px]" /> R$ {job?.budget}
          </div>
        </div>
        <div className="flex justify-end mt-[-30px]">
          {modal && (
            <Button
              size="small"
              color="warning"
              variant="contained"
              sx={{ borderRadius: 100 }}
              onClick={() => openModal(job ? job?.uid : "")}
            >
              <div className="font-bold text-[12px]">Ver Detalhes</div>
            </Button>
          )}
          {growdev && (
            <Button
              size="small"
              color="warning"
              variant="contained"
              sx={{ borderRadius: 100 }}
              onClick={() => navigate(`/growdever/consulta-vaga/${uid}`)}
            >
              <div className="font-bold text-[12px]">Ver Detalhes</div>
            </Button>
          )}
          {aluno && (
            <Button
              size="small"
              color="warning"
              variant="contained"
              sx={{ borderRadius: 100 }}
              onClick={() =>
                navigate(`/vagas-abertas/informacoes-da-vaga/${uid}`)
              }
            >
              <div className="font-bold text-[12px]">Ver Detalhes</div>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
