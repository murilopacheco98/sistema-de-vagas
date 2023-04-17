import {
  createEntityAdapter,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { api } from "../../../service/api/api";
import { RootState } from "../../index";
import { AxiosResponse } from "axios";
import { CreateUserDTO, Login, UserDTO } from "../../../types/User";

export interface userGetAllProps {
  token: string;
  page: number;
  size: number;
}

export const userGetAll = createAsyncThunk(
  "user/get/pageable",
  async (input: userGetAllProps) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${input.token}`,
      },
    };
    const response = await api
      .get(`/api/users/get?page=${input.page}&size=${input.size}`, config)
      .then((users: AxiosResponse) => {
        return users.data;
      })
      .catch((erro: AxiosResponse) => {
        return erro;
      });
    return response;
  }
);

export const userGetAllPartners = createAsyncThunk(
  "user/get/partners",
  async (input: userGetAllProps) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${input.token}`,
      },
    };
    const response = await api
      .get(
        `/api/users/get/partners?page=${input.page}&size=${input.size}`,
        config
      )
      .then((users: AxiosResponse) => {
        return users.data;
      })
      .catch((erro: AxiosResponse) => {
        return erro;
      });
    return response;
  }
);

export const userCreate = createAsyncThunk(
  "user/post",
  async (input: CreateUserDTO) => {
    const response = await api
      .post(`/api/users/post`, input)
      .then((user: AxiosResponse) => user.data)
      .catch((erro: AxiosResponse) => erro);
    return response;
  }
);

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

export const userLogout = createAsyncThunk("user/logout", async () => {
  const response = console.log("Logout success.");
  return response;
});

const adapter = createEntityAdapter<UserDTO>({
  selectId: (item) => item.userUid,
});

export const { selectAll, selectById, selectEntities, selectIds } =
  adapter.getSelectors((state: RootState) => state.user);

const UserSlice = createSlice({
  name: "user",
  initialState: adapter.getInitialState({ loading: false, error: false }),
  reducers: {},
  extraReducers(builder) {
    builder.addCase(userGetAll.fulfilled, (state, action) => {
      adapter.setAll(state, action.payload.content);
    });
    builder.addCase(userGetAllPartners.fulfilled, (state, action) => {
      adapter.setAll(state, action.payload.content);
    });
    builder.addCase(userLogout.fulfilled, (state) => {
      adapter.removeAll(state);
    });
  },
});

export default UserSlice.reducer;
