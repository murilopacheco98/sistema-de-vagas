import { CompanyDTO } from "./Company";

export interface JobDTO {
  uid: string;
  title: string;
  description: string;
  mainRequirements: string;
  differentials: string;
  seniority: string;
  keywordsName: string[];
  budget: number | undefined;
  workFormat: string;
  expectedStartDate: string;
  status: string;
  companyDTO: CompanyDTO;
  cityName: string;
  dataProfileDTO: DataProfileDTO;
  stateName: string;
  numberParticipants: number;
}

export interface JobFilter {
  title: string;
  companyName: string;
  workFormat: string;
  cityName: string;
  maxSalary: string;
  seniority: string;
  keywordName: string[]
}

export interface JobTalent {
  jobUid: string;
  talentUid: string;
}

export interface DataProfileDTO {
  uid: string;
  email: string;
  name: string;
}
