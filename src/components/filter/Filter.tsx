import { Button, TextField } from "@mui/material";
import React from "react";
import { useAppDispatch } from "../../store/hooks";
import { jobFilter } from "../../store/modules/job/JobSlice";

interface VagasAbertasProps {
  filterOn: boolean;
  setFilterOn: React.Dispatch<React.SetStateAction<boolean>>;
  vaga: string;
  setVaga: React.Dispatch<React.SetStateAction<string>>;
  workFormat: string;
  setWorkFormat: React.Dispatch<React.SetStateAction<string>>;
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
  seniority: string;
  setSeniority: React.Dispatch<React.SetStateAction<string>>;
  minSalary: number;
  setMinSalary: React.Dispatch<React.SetStateAction<number>>;
  junior: boolean;
  setJunior: React.Dispatch<React.SetStateAction<boolean>>;
  pleno: boolean;
  setPleno: React.Dispatch<React.SetStateAction<boolean>>;
  senior: boolean;
  setSenior: React.Dispatch<React.SetStateAction<boolean>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  currentPage: number;
  setTotalPages: React.Dispatch<React.SetStateAction<number>>;
  setFilterSearch: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Filter = ({
  filterOn,
  setFilterOn,
  vaga,
  setVaga,
  workFormat,
  setWorkFormat,
  state,
  setState,
  seniority,
  setSeniority,
  minSalary,
  setMinSalary,
  junior,
  setJunior,
  pleno,
  setPleno,
  senior,
  setSenior,
  setLoading,
  currentPage,
  setTotalPages,
  setFilterSearch,
}: VagasAbertasProps) => {
  const dispatch = useAppDispatch();

  const HandleSubmit = () => {
    setLoading(true);
    setFilterSearch(true);
    const getFilter = async () => {
      const response = await dispatch(
        jobFilter({
          jobFilter: {
            stateName: state,
            minSalary: minSalary,
            seniority: seniority,
            title: vaga,
            workFormat: workFormat,
          },
          page: currentPage - 1,
          size: 8,
        })
      );
      if (response.payload.totalPages) {
        setTotalPages(response.payload.totalPages);
        // setTotalElements(response.payload.totalElements);
      }
    };
    getFilter();
    setFilterOn && setFilterOn(false);
    setLoading(false);
  };

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
                label="Formato de trabalho"
                value={workFormat}
                onChange={(e) => setWorkFormat(e.target.value)}
                fullWidth
              />
            </div>
            <div className="mb-[15px] mx-[40px]">
              <TextField
                label="Estado"
                value={state}
                onChange={(e) => setState(e.target.value)}
                fullWidth
              />
            </div>
            <div className="mb-[15px] mx-[40px]">
              <TextField
                label="Valor mínimo"
                type="number"
                value={minSalary}
                onChange={(e) => setMinSalary(Number(e.target.value))}
                fullWidth
              />
            </div>
            <div className="text-[14px] font-bold text-gray-500 ml-[40px] mb-[10px]">
              Senioridade
            </div>
            <div className="flex ml-[40px] mb-[10px] justify-around mr-[40px]">
              <div
                onClick={() => {
                  !junior && setSeniority("júnior");
                  junior && setSeniority("");
                  setJunior(!junior);
                  setPleno(false);
                  setSenior(false);
                }}
                className={
                  junior
                    ? `cursor-pointer bg-blue-700 text-white border-[1.5px] border-blue-700 rounded-2xl py-[1px] px-[10px]`
                    : "cursor-pointer text-blue-700 border-[1.5px] border-blue-700 rounded-2xl py-[1px] px-[10px]"
                }
              >
                Júnior
              </div>
              <div
                onClick={() => {
                  !pleno && setSeniority("pleno");
                  pleno && setSeniority("");
                  setJunior(false);
                  setPleno(!pleno);
                  setSenior(false);
                }}
                className={
                  pleno
                    ? `cursor-pointer bg-blue-700 text-white border-[1.5px] border-blue-700 rounded-2xl py-[1px] px-[10px]`
                    : "cursor-pointer text-blue-700 border-[1.5px] border-blue-700 rounded-2xl py-[1px] px-[10px]"
                }
              >
                Pleno
              </div>
              <div
                onClick={() => {
                  !senior && setSeniority("senior");
                  senior && setSeniority("");
                  setJunior(false);
                  setPleno(false);
                  setSenior(!senior);
                }}
                className={
                  senior
                    ? `cursor-pointer bg-blue-700 text-white border-[1.5px] border-blue-700 rounded-2xl py-[1px] px-[10px]`
                    : "cursor-pointer text-blue-700 border-[1.5px] border-blue-700 rounded-2xl py-[1px] px-[10px]"
                }
              >
                Senior
              </div>
            </div>
            <div className="flex justify-center mt-[40px]">
              <Button
                variant="contained"
                color="warning"
                sx={{ borderRadius: 100, fontSize: "12px", mr: "25px" }}
                onClick={HandleSubmit}
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
