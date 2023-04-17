import {
  createEntityAdapter,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { api } from "../../../service/api/api";
import { RootState } from "../../index";
import { AxiosResponse } from "axios";
import { CreateTalentBankDTO, TalentBankDTO, TalentBankFilter } from "../../../types/TalentBank";

export interface talentBankGetAllProps {
  token: string | undefined;
  page: number;
  size: number;
}

export const talentBankGetAll = createAsyncThunk(
  "talentBank/get/pageable",
  async (input: talentBankGetAllProps) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${input.token}`,
      },
    };
    const response = await api
      .get(`/api/talent-bank/get?page=${input.page}&size=${input.size}`, config)
      .then((users: AxiosResponse) => {
        return users.data;
      })
      .catch((erro: AxiosResponse) => {
        return erro;
      });
    return response;
  }
);

export interface talentBankGetByJobUidProps {
  uid: string | undefined;
  token: string | undefined;
  page: number;
  size: number;
}

export const talentBankGetByJobUid = createAsyncThunk(
  "talentBank/get/byjob",
  async (input: talentBankGetByJobUidProps) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${input.token}`,
      },
    };
    const response = await api
      .get(
        `/api/talent-bank/find/byjob?uid=${input.uid}&page=${input.page}&size=${input.size}`,
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

interface talentBankFindByEmailProps {
  token: string | undefined;
  email: string | undefined;
}

export const talentBankFindByEmail = createAsyncThunk(
  "talentBank/find/email",
  async (input: talentBankFindByEmailProps) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${input.token}`,
      },
    };
    const response = await api
      .get(`/api/talent-bank?email=${input.email}`, config)
      .then((users: AxiosResponse) => {
        return users.data;
      })
      .catch((erro: AxiosResponse) => {
        return erro;
      });
    return response;
  }
);

export interface talentBankFilterProps {
  talentBankFilter: TalentBankFilter;
  page: number;
  size: number;
}

export const talentBankFilter = createAsyncThunk(
  "talentBank/filter",
  async (input: talentBankFilterProps) => {
    const { talentBankFilter, page, size } = input;
    const response = await api
      .post(
        `/api/talent-bank/filter?cityName=${talentBankFilter.cityName}&&page=${page}&size=${size}`,
        input
      )
      .then((user: AxiosResponse) => user.data)
      .catch((erro: AxiosResponse) => erro);
    return response;
  }
);

export interface jobFindBySearchTitleProps {
  token: string | undefined;
  name: string | undefined;
  page: number;
  size: number;
}

export const talentBankFindBySearchName = createAsyncThunk(
  "talent-bank/get/search",
  async (input: jobFindBySearchTitleProps) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${input.token}`,
      },
    };
    const response = await api
      .get(
        `/api/talent-bank/get/search?name=${input.name}&page=${input.page}&size=${input.size}`,
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

interface talentBankPostProps {
  token: string;
  createTalentBankDTO: CreateTalentBankDTO;
}

export const talentBankPost = createAsyncThunk(
  "talentBank/post",
  async (input: talentBankPostProps) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${input.token}`,
      },
    };
    const response = await api
      .post(`/api/talent-bank/post`, input.createTalentBankDTO, config)
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

export const talentBankLogout = createAsyncThunk(
  "talentBank/logout",
  async () => {
    const response = console.log("Logout success.");
    return response;
  }
);

const adapter = createEntityAdapter<TalentBankDTO>({
  selectId: (item) => item.uid,
});

export const { selectAll, selectById, selectEntities, selectIds } =
  adapter.getSelectors((state: RootState) => state.talentBank);

const TalentBankSlice = createSlice({
  name: "talentBank",
  initialState: adapter.getInitialState({ loading: false, error: false }),
  reducers: {},
  extraReducers(builder) {
    builder.addCase(talentBankGetAll.fulfilled, (state, action) => {
      adapter.setAll(state, action.payload.content);
    });
    builder.addCase(talentBankFindBySearchName.fulfilled, (state, action) => {
      adapter.setAll(state, action.payload.content);
    });
    builder.addCase(talentBankGetByJobUid.fulfilled, (state, action) => {
      adapter.setAll(state, action.payload.content);
    });
    builder.addCase(talentBankFindByEmail.fulfilled, (state, action) => {
      if (action.payload.uid) {
        if (state.ids.length == 0) {
          adapter.addOne(state, action.payload); // post, create + addOne na store
        } else {
          adapter.removeAll(state);
          adapter.addOne(state, action.payload);
        }
      }
    });
    builder.addCase(talentBankFilter.fulfilled, (state, action) => {
      adapter.setAll(state, action.payload.content);
    });
    builder.addCase(talentBankPost.fulfilled, (state, action) => {
      adapter.addOne(state, action.payload);
    });
    // builder.addCase(userPacienteUpdate.fulfilled, (state, action) => {
    //   adapter.updateOne(state, {
    //     id: action.meta.arg.id,
    //     changes: action.meta.arg,
    //   }); // put, update + update na store
    // });
    builder.addCase(talentBankLogout.fulfilled, (state) => {
      adapter.removeAll(state);
    });
  },
});

export default TalentBankSlice.reducer;
