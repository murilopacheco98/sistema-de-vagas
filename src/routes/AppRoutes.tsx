/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import {
  BrowserRouter,
  Outlet,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { GrowdeverPrincipal } from "../pages/growdevPages/growdeverPrincipal/GrowdeverPrincipal";
import { ConsultaVaga } from "../pages/growdevPages/consultaVaga/ConsultaVaga";
import { ConsultaAlunos } from "../pages/growdevPages/consultaAlunos/ConsultaAlunos";
import { BancoTalentos } from "../pages/growdevPages/bancoTalentos/BancoTalentos";
import { UpdateAluno } from "../pages/growdevPages/consultaAlunos/UpdateAluno";
import { AlunoHome } from "../pages/alunoPages/alunoHome/AlunoHome";
import { VagasAbertas } from "../pages/alunoPages/vagasAbertas/VagasAbertas";
import { DetalhesVaga } from "../pages/alunoPages/detalhesVaga/DetalhesVaga";
import { VagasInscritas } from "../pages/alunoPages/vagasInscritas/VagasInscritas";
import { ParceiroHome } from "../pages/parceiroPages/ParceiroHome";
import { Parceiros } from "../pages/growdevPages/parceiros/Parceiros";
import { SignUp } from "../pages/signIn-signUp/SignUp";
import { SignUpSucess } from "../pages/signIn-signUp/SignUpSucess";
import { EmailResetPassword } from "../pages/signIn-signUp/EmailResetPassword";
import { ResetPassword } from "../pages/signIn-signUp/ResetPassword";
import { SignIn } from "../pages/signIn-signUp/SignIn";
import { useAppSelector } from "../store/hooks";

const ProtectedAdmin = () => {
  const navigate = useNavigate();
  const user = Object.values(
    useAppSelector((store) => store.userLogin.entities)
  );
  if (user[0]?.userDTO.roleName !== "GROWDEV") {
    navigate("/");
  }

  return <Outlet />;
};

export const AppRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <CssBaseline />
        <Routes>
          <Route path="/login" element={<SignIn />} />
          <Route path="/cadastro" element={<SignUp />} />
          <Route path="/cadastro/sucesso" element={<SignUpSucess />} />
          <Route
            path="/e-mail/reset-password"
            element={<EmailResetPassword />}
          />
          <Route path="/reset-password/:id" element={<ResetPassword />} />

          <Route path="/" element={<VagasAbertas />} />
          <Route path="/meu-perfil" element={<AlunoHome />} />
          <Route
            path="/vagas-abertas/informacoes-da-vaga/:uid"
            element={<DetalhesVaga />}
          />
          <Route path="/vagas-inscritas" element={<VagasInscritas />} />
          <Route
            path="/vagas-inscritas/informacoes-da-vaga"
            element={<DetalhesVaga />}
          />

          <Route element={<ProtectedAdmin />}>
            <Route path="/growdever" element={<GrowdeverPrincipal />} />
            <Route
              path="/growdever/consulta-vaga/:uid"
              element={<ConsultaVaga growdever />}
            />
            <Route
              path="/growdever/banco-de-talentos"
              element={<BancoTalentos />}
            />
            <Route
              path="/growdever/consulta-alunos"
              element={<ConsultaAlunos />}
            />
            <Route
              path="/growdever/consulta-alunos/editar"
              element={<UpdateAluno />}
            />
            <Route path="/growdever/parceiros" element={<Parceiros />} />
          </Route>

          <Route path="/empresa-parceira" element={<ParceiroHome />} />
          <Route
            path="/empresa-parceira/informacoes-da-vaga/:uid"
            element={<ConsultaVaga parceiro />}
          />
          <Route
            path="/empresa-parceira/informacoes-da-vaga/candidato/:uid"
            element={<ConsultaAlunos parceiro />}
          />
          <Route
            path="/empresa-parceira/vagas-abertas"
            element={<VagasAbertas parceiro />}
          />
          <Route
            path="/empresa-parceira/vagas-abertas/informacoes-da-vaga/:uid"
            element={<DetalhesVaga parceiro />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};
