import { Button, TextField } from "@mui/material";
import React, { useState } from "react";

interface VagasAbertasProps {
  filterOn?: boolean;
  setFilterOn?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Filter = ({ filterOn, setFilterOn }: VagasAbertasProps) => {
  const [vaga, setVaga] = useState<string>("");
  const [empresa, setEmpresa] = useState<string>("");
  const [workFormat, setWorkFormat] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [maxSalary, setMaxSalary] = useState<string>("");

  return (
    <div>
      {filterOn && (
        <div className="w-[368px] h-[100vh] right-0 top-0 absolute z-10 bg-white">
          <div className="text-orange-500 text-[25px] justify-end flex mr-[25px] mt-[15px]">
            <div
              className="cursor-pointer"
              onClick={() => setFilterOn && setFilterOn(false)}
            >
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
                value={vaga}
                onChange={(e) => setVaga(e.target.value)}
                fullWidth
              />
            </div>
            <div className="mb-[15px] mx-[40px]">
              <TextField
                label="Empresa"
                value={empresa}
                onChange={(e) => setEmpresa(e.target.value)}
                fullWidth
              />
            </div>
            <div className="mb-[15px] mx-[40px]">
              <TextField
                label="Formato de trabalho"
                value={workFormat}
                onChange={(e) => setWorkFormat(e.target.value)}
                fullWidth
              />
            </div>
            <div className="mb-[15px] mx-[40px]">
              <TextField
                label="Cidade"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                fullWidth
              />
            </div>
            <div className="mb-[15px] mx-[40px]">
              <TextField
                label="Teto da vaga"
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
            {/*<div className="text-[14px] font-bold text-gray-500 ml-[40px] mb-[10px]">
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
            </div> */}
            <div className="flex justify-center mt-[40px]">
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
