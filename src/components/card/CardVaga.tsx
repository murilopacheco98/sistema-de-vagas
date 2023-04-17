import { Button } from "@mui/material";
import React from "react";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";

interface CardVagaProps {
  modal?: boolean;
  growdev?: boolean;
  aluno?: boolean;
  openModal?: () => void;
  title?: string;
  description?: string;
  status?: string;
  workFormat?: string;
  seniority?: string;
  name?: string;
  budget?: number;
  numberSubscribes?: number;
  uid?: string;
}

export const CardVaga = (props: CardVagaProps) => {
  const {
    modal,
    growdev,
    aluno,
    openModal,
    title,
    description,
    status,
    workFormat,
    seniority,
    name,
    budget,
    numberSubscribes,
    uid
  } = props;
  const navigate = useNavigate();

  return (
    <div className="pt-[24px] ml-[24px]">
      <div className="py-[10px] px-[15px] w-[390px] h-[210px] rounded-2xl border-[2px] bg-white">
        <div className="flex mb-[5px]">
          <div className="bg-green-400 text-white font-bold px-[10px] rounded-2xl mr-[10px]">
            {status}
          </div>
          <div className="bg-orange-100 text-orange-700 font-bold px-[10px] rounded-2xl mr-[10px]">
            {workFormat}
          </div>
          <div className="bg-orange-100 text-orange-700 font-bold px-[10px] rounded-2xl mr-[10px]">
            {seniority}
          </div>
        </div>
        <div className="font-bold text-[14px] mb-[5px] ">{title}</div>
        {/* <div className="text-[11px] ">Criado por: {name}</div> */}
        <ReactMarkdown className="text-[11px] h-[80px] ml-[5px] mb-[10px] overflow-hidden">
          {description ? description : "" }
        </ReactMarkdown>
        <div className="flex justify-start">
          <div>
            <div className="text-[10px]">ICON {numberSubscribes} participantes inscritos</div>
            <div className="text-[10px]">ICON R$ {budget}</div>
          </div>
        </div>
        <div className="flex justify-end mt-[-20px]">
          {modal && (
            <Button
              size="small"
              color="warning"
              variant="contained"
              sx={{ borderRadius: 100 }}
              onClick={openModal}
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
              onClick={() => navigate(`/vagas-abertas/informacoes-da-vaga/${uid}`)}
            >
              <div className="font-bold text-[12px]">Ver Detalhes</div>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
