import {
  createEntityAdapter,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { api } from "../../../service/api/api";
import { RootState } from "../../index";
import { AxiosResponse } from "axios";
import { JobDTO, JobFilter, JobTalent } from "../../../types/Job";

export interface jobGetAllProps {
  // token: string;
  page: number;
  size: number;
}

export const jobGetAll = createAsyncThunk(
  "jobs/get/pageable",
  async (input: jobGetAllProps) => {
    const response = await api
      .get(`/api/jobs/get?page=${input.page}&size=${input.size}`)
      .then((users: AxiosResponse) => {
        return users.data;
      })
      .catch((erro: AxiosResponse) => {
        return erro;
      });
    return response;
  }
);

interface jobFindByTalentBankProps {
  uid: string | undefined;
  token: string | undefined;
  page: number;
  size: number;
}

export const jobFindByTalentBank = createAsyncThunk(
  "jobs/get/talent-bank",
  async (input: jobFindByTalentBankProps) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${input.token}`,
      },
    };
    const response = await api
      .get(
        `/api/jobs/find/talent-bank?uid=${input.uid}&page=${input.page}&size=${input.size}`,
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

export interface jobFindBySearchTitleProps {
  token: string | undefined;
  title: string | undefined;
  page: number;
  size: number;
}

export const jobFindBySearchTitle = createAsyncThunk(
  "jobs/get/search",
  async (input: jobFindBySearchTitleProps) => {
    const response = await api
      .get(
        `/api/jobs/get/search?title=${input.title}&page=${input.page}&size=${input.size}`
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

export interface jobFindByResponsibleProps {
  token: string | undefined;
  email: string | undefined;
  page: number;
  size: number;
}

export const jobFindByResponsible = createAsyncThunk(
  "jobs/get/responsible",
  async (input: jobFindByResponsibleProps) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${input.token}`,
      },
    };
    const response = await api
      .get(
        `/api/jobs/find/responsible?email=${input.email}&page=${input.page}&size=${input.size}`,
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

export interface jobFilterProps {
  jobFilter: JobFilter;
  page: number;
  size: number;
}

export const jobFilter = createAsyncThunk(
  "job/filter",
  async (input: jobFilterProps) => {
    const { jobFilter, page, size } = input;
    const response = await api
      .post(
        `/api/jobs/filter?title=${jobFilter.title}&companyName=${jobFilter.companyName}&workFormat=${jobFilter.workFormat}&cityName=${jobFilter.cityName}&maxSalary=${jobFilter.maxSalary}&seniority=${jobFilter.seniority}&keywordName=${jobFilter.keywordName}&page=${page}&size=${size}`,
        input
      )
      .then((user: AxiosResponse) => user.data)
      .catch((erro: AxiosResponse) => erro);
    return response;
  }
);

interface jobPostProps {
  token: string;
  jobDTO: JobDTO;
}

export const jobPost = createAsyncThunk(
  "job/post",
  async (input: jobPostProps) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${input.token}`,
      },
    };
    const response = await api
      .post(`/api/jobs/post`, input.jobDTO, config)
      .then((user: AxiosResponse) => user.data)
      .catch((erro: AxiosResponse) => erro);
    return response;
  }
);

interface jobPostAddTalentProps {
  token: string;
  jobTalent: JobTalent;
}

export const jobPostAddTalent = createAsyncThunk(
  "job/add/talent",
  async (input: jobPostAddTalentProps) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${input.token}`,
      },
    };
    const response = await api
      .post(`/api/jobs/add/talent`, input.jobTalent, config)
      .then((user: AxiosResponse) => user.data)
      .catch((erro: AxiosResponse) => erro);
    return response;
  }
);

export const jobLogout = createAsyncThunk("company/logout", async () => {
  const response = console.log("Logout success.");
  return response;
});

const adapter = createEntityAdapter<JobDTO>({
  selectId: (item) => item.uid,
});

export const { selectAll, selectById, selectEntities, selectIds } =
  adapter.getSelectors((state: RootState) => state.job);

const JobSlice = createSlice({
  name: "job",
  initialState: adapter.getInitialState({ loading: false, error: false }),
  reducers: {},
  extraReducers(builder) {
    builder.addCase(jobFindByTalentBank.fulfilled, (state, action) => {
      adapter.setAll(state, action.payload.content);
    });
    builder.addCase(jobFindBySearchTitle.fulfilled, (state, action) => {
      adapter.setAll(state, action.payload.content);
    });
    builder.addCase(jobFindByResponsible.fulfilled, (state, action) => {
      adapter.setAll(state, action.payload.content);
    });
    builder.addCase(jobGetAll.fulfilled, (state, action) => {
      adapter.setAll(state, action.payload.content);
    });
    // builder.addCase(jobFindByTalentBank.fulfilled, (state, action) => {
    //   adapter.setAll(state, action.payload.content);
    // });
    builder.addCase(jobFilter.fulfilled, (state, action) => {
      adapter.setAll(state, action.payload.content);
    });
    builder.addCase(jobPost.fulfilled, (state, action) => {
      adapter.addOne(state, action.payload);
    });
    // builder.addCase(userPacienteUpdate.fulfilled, (state, action) => {
    //   adapter.updateOne(state, {
    //     id: action.meta.arg.id,
    //     changes: action.meta.arg,
    //   }); // put, update + update na store
    // });
    builder.addCase(jobLogout.fulfilled, (state) => {
      adapter.removeAll(state);
    });
  },
});

export default JobSlice.reducer;
