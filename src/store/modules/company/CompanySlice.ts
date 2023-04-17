import {
  createEntityAdapter,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { api } from "../../../service/api/api";
import { RootState } from "../../index";
import { AxiosResponse } from "axios";
import { CompanyDTO } from "../../../types/Company";

export const companyGetAll = createAsyncThunk(
  "company/get/all",
  async () => {
    const response = await api
      .get(`/api/company/get/all`)
      .then((users: AxiosResponse) => {
        return users.data;
      })
      .catch((erro: AxiosResponse) => {
        return erro;
      });
    return response;
  }
);

export interface companyGetAllPagedProps {
  page: number;
  size: number;
}

export const companyGetAllPaged = createAsyncThunk(
  "company/get/pageable",
  async (input: companyGetAllPagedProps) => {
    const response = await api
      .get(`/api/company/get/paged?page=${input.page}&size=${input.size}`)
      .then((users: AxiosResponse) => {
        return users.data;
      })
      .catch((erro: AxiosResponse) => {
        return erro;
      });
    return response;
  }
);

interface companyCreateProps {
  companyDTO: CompanyDTO;
  token: string;
}

export const companyCreate = createAsyncThunk(
  "company/post",
  async (input: companyCreateProps) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${input.token}`,
      },
    };
    const response = await api
      .post(`/api/company/post`, input.companyDTO, config)
      .then((user: AxiosResponse) => user.data)
      .catch((erro: AxiosResponse) => erro);
    return response;
  }
);

interface userDeleteProps {
  id: number;
  token: string;
}

// export const userDelete = createAsyncThunk(
//   "user/delete",
//   async (dado: userDeleteProps) => {
//     const response = await api
//       .post(`/user/delete/${dado.id}`)
//       .then((user: AxiosResponse) => user.data)
//       .catch((erro: AxiosResponse) => erro);
//     return response;
//   }
// );

export const companyLogout = createAsyncThunk("company/logout", async () => {
  const response = console.log("Logout success.");
  return response;
});

const adapter = createEntityAdapter<CompanyDTO>({
  selectId: (item) => item.uid,
});

export const { selectAll, selectById, selectEntities, selectIds } =
  adapter.getSelectors((state: RootState) => state.company);

const CompanySlice = createSlice({
  name: "company",
  initialState: adapter.getInitialState({ loading: false, error: false }),
  reducers: {},
  extraReducers(builder) {
    builder.addCase(companyGetAll.fulfilled, (state, action) => {
      adapter.setAll(state, action.payload);
    });
    builder.addCase(companyGetAllPaged.fulfilled, (state, action) => {
      adapter.setAll(state, action.payload.content);
    });
    builder.addCase(companyCreate.fulfilled, (state, action) => {
      adapter.addOne(state, action.payload);
    });
    builder.addCase(companyLogout.fulfilled, (state) => {
      adapter.removeAll(state);
    });
  },
});

// export const { addOne, updateOne, removeOne } = UserSlice.actions;
export default CompanySlice.reducer;
