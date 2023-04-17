import { combineReducers } from "@reduxjs/toolkit";
import user from "./user/UserSlice";
import userLogin from "./userLogin/UserLoginSlice";
import company from "./company/CompanySlice";
import job from "./job/JobSlice";
import talentBank from "./talentBank/TalentBankSlice";
import keyword from "./keyword/KeywordSlice";

export const rootReducer = combineReducers({
  user,
  userLogin,
  job,
  talentBank,
  company,
  keyword,
});
