export interface CreateTalentBankDTO {
  userUid: string;
  candidateName: string; 
  email: string;
  phoneNumber: string;
  birthDate: string;
  cpf: string;
  addressStreet: string;
  addressNumber: number | undefined;
  addressNeighborhood: string;
  addressZipCode: string;
  cityName: string;
  stateName: string;
  pcd: boolean;
  growdever: boolean;
  status: string;
  stateInitials: string;
  countryName: string;
  countryInitials: string;
  seniority: string;
  keywordsName: string[];
  linkedin: string;
  github: string;
  otherLinks: string;
}

export interface TalentBankDTO {
  uid: string;
  name: string;
  curriculumDTO: CurriculumDTO;
  email: string;
  phoneNumber: string;
  pcd: boolean;
  birthDate: string;
  addressDTO: AdressDTO;
  status: string;
  huntingStatus: string;
  isGrowdever: boolean;
}

export interface TalentBankFilter {
  cityName: string;
  seniority: string;
  keywords: string[];
  page: number;
  size: number;
}

export interface CurriculumDTO {
  uid: string;
  seniority: string;
  tecnologyName: string[];
  linkedin: string;
  github: string;
  otherLinks: string;
}

export interface AdressDTO {
  uid: string;
  street: string;
  number: number | undefined;
  neighborhood: string;
  zipCode: string;
  cityName: string;
  stateName: string;
}

