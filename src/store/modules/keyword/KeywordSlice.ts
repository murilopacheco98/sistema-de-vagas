import {
  createEntityAdapter,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { api } from "../../../service/api/api";
import { RootState } from "../../index";
import { AxiosResponse } from "axios";

export interface KeywordDTO {
  uid: string;
  name: string;
}

export const keywordGetAll = createAsyncThunk(
  "keyword/get/all",
  async () => {
    const response = await api
      .get(`/api/keyword/get/all`)
      .then((users: AxiosResponse) => {
        return users.data;
      })
      .catch((erro: AxiosResponse) => {
        return erro;
      });
    return response;
  }
);

export interface keywordGetAllPagedProps {
  // token: string;
  page: number;
  size: number;
}

export const keywordGetAllPaged = createAsyncThunk(
  "keyword/get/pageable",
  async (input: keywordGetAllPagedProps) => {
    const response = await api
      .get(`/api/keyword/get/paged?page=${input.page}&size=${input.size}`)
      .then((users: AxiosResponse) => {
        return users.data;
      })
      .catch((erro: AxiosResponse) => {
        return erro;
      });
    return response;
  }
);

interface keywordPostProps {
  token: string;
  keyword: KeywordDTO;
}

export const keywordPost = createAsyncThunk(
  "keyword/post",
  async (input: keywordPostProps) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${input.token}`,
      },
    };
    const response = await api
      .post(`/api/keyword/post`, input, config)
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

export const keywordLogout = createAsyncThunk("company/logout", async () => {
  const response = console.log("Logout success.");
  return response;
});

const adapter = createEntityAdapter<KeywordDTO>({
  selectId: (item) => item.uid,
});

export const { selectAll, selectById, selectEntities, selectIds } =
  adapter.getSelectors((state: RootState) => state.keyword);

const KeywordSlice = createSlice({
  name: "keyword",
  initialState: adapter.getInitialState({ loading: false, error: false }),
  reducers: {},
  extraReducers(builder) {
    builder.addCase(keywordGetAll.fulfilled, (state, action) => {
      adapter.setAll(state, action.payload);
    });
    builder.addCase(keywordGetAllPaged.fulfilled, (state, action) => {
      adapter.setAll(state, action.payload.content);
    });
    builder.addCase(keywordPost.fulfilled, (state, action) => {
      adapter.addOne(state, action.payload);
    });
    // builder.addCase(userPacienteUpdate.fulfilled, (state, action) => {
    //   adapter.updateOne(state, {
    //     id: action.meta.arg.id,
    //     changes: action.meta.arg,
    //   }); // put, update + update na store
    // });
    builder.addCase(keywordLogout.fulfilled, (state) => {
      adapter.removeAll(state);
    });
  },
});

export default KeywordSlice.reducer;
