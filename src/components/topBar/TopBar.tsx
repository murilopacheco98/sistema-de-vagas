import React, { SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { companyLogout } from "../../store/modules/company/CompanySlice";
import { jobLogout } from "../../store/modules/job/JobSlice";
import { talentBankLogout } from "../../store/modules/talentBank/TalentBankSlice";
import { userLogout } from "../../store/modules/user/UserSlice";
import { userLoginLogout } from "../../store/modules/userLogin/UserLoginSlice";
import { BsPersonCircle } from "react-icons/bs";
import { AiOutlineMenu } from "react-icons/ai";

interface TopBarProps {
  setOpenMenu?: React.Dispatch<SetStateAction<boolean>>;
}

export const TopBar = ({ setOpenMenu }: TopBarProps) => {
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
    <div className="flex bg-blue-900 h-[60px] items-center">
      <div
        onClick={() => setOpenMenu && setOpenMenu(true)}
        className="flex md:hidden cursor-pointer w-[10%] ml-[6%] text-[35px] text-white"
      >
        <AiOutlineMenu />
      </div>
      <div className="w-[90%] md:w-[95%] justify-end flex items-center">
        {userLogin[0] === undefined && (
          <div
            onClick={() => navigate("/login")}
            className="bg-orange-500 py-[3px] px-[20px] mr-[45px] md:mr-[0px] rounded-full cursor-pointer text-[21px] text-white"
          >
            Login
          </div>
        )}
        {userLogin[0] !== undefined && (
          <>
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
              {userLogin[0].userDTO.name.split(" ")[0]}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
