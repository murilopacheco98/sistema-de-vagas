import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { companyLogout } from "../../store/modules/company/CompanySlice";
import { jobLogout } from "../../store/modules/job/JobSlice";
import { talentBankLogout } from "../../store/modules/talentBank/TalentBankSlice";
import { userLogout } from "../../store/modules/user/UserSlice";
import { userLoginLogout } from "../../store/modules/userLogin/UserLoginSlice";
import { BsPersonCircle } from "react-icons/bs";

export const TopBar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const userLogin = Object.values(
    useAppSelector((store) => store.userLogin.entities)
  );

  const handleLogout = async () => {
    const logout = await dispatch(userLoginLogout());
    dispatch(userLogout());
    dispatch(jobLogout());
    dispatch(talentBankLogout());
    dispatch(companyLogout());

    if (logout) {
      navigate("/login");
    }
  };

  return (
    <div className="h-[70px] w-[100%] bg-blue-900 justify-end flex items-center">
      <div
        onClick={(e) => {
          e.preventDefault();
          handleLogout();
        }}
        className="cursor-pointer mr-[45px] text-[21px] text-white"
      >
        Logout
      </div>
      <div className="mr-[55px] text-[25px] flex items-center text-white">
        <BsPersonCircle className="mr-[10px]" />
        {userLogin[0] !== undefined ? userLogin[0].userDTO.name.split(" ")[0] : "usuário"}
      </div>
    </div>
  );
};
