import {
  createEntityAdapter,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { api } from "../../../service/api/api";
import { RootState } from "../../index";
import { AxiosResponse } from "axios";
import { Login, TokenResponse } from "../../../types/User";

export const userLogin = createAsyncThunk("oauth/post", async (dado: Login) => {
  const response = await api
    .post(`/api/login?email=${dado.email}&senha=${dado.senha}`)
    .then((user: AxiosResponse) => user.data)
    .catch((erro: AxiosResponse) => erro);
  return response;
});

export const userLoginLogout = createAsyncThunk("user/logout", async () => {
  const response = console.log("Logout success.");
  return response;
});

const adapter = createEntityAdapter<TokenResponse>({
  selectId: (item) => item.uid,
});

export const { selectAll, selectById, selectEntities, selectIds } =
  adapter.getSelectors((state: RootState) => state.userLogin);

const UserLoginSlice = createSlice({
  name: "userLogin",
  initialState: adapter.getInitialState({ loading: false, error: false }),
  reducers: {},
  extraReducers(builder) {
    builder.addCase(userLogin.fulfilled, (state, action) => {
      if (action.payload.userDTO) {
        if (state.ids.length === 0) {
          adapter.addOne(state, action.payload); // post, create + addOne na store
        } else {
          adapter.removeAll(state);
          adapter.addOne(state, action.payload);
        }
      }
    });
    builder.addCase(userLoginLogout.fulfilled, (state) => {
      adapter.removeAll(state);
    });
  },
});

export default UserLoginSlice.reducer;
