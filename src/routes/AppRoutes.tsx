import CssBaseline from "@mui/material/CssBaseline";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GrowdeverPrincipal } from "../pages/growdevPages/growdeverPrincipal/GrowdeverPrincipal";
import { ConsultaVaga } from "../pages/growdevPages/consultaVaga/ConsultaVaga";
import { ConsultaAlunos } from "../pages/growdevPages/consultaAlunos/ConsultaAlunos";
import SignInSignUp from "../pages/signIn-signUp/SignInSignUp";
import { BancoTalentos } from "../pages/growdevPages/bancoTalentos/BancoTalentos";
import { UpdateAluno } from "../pages/growdevPages/consultaAlunos/UpdateAluno";
import { AlunoHome } from "../pages/alunoPages/alunoHome/AlunoHome";
import { VagasAbertas } from "../pages/alunoPages/vagasAbertas/VagasAbertas";
import { DetalhesVaga } from "../pages/alunoPages/detalhesVaga/DetalhesVaga";
import { VagasInscritas } from "../pages/alunoPages/vagasInscritas/VagasInscritas";
import { ParceiroHome } from "../pages/parceiroPages/ParceiroHome";
import { Parceiros } from "../pages/growdevPages/parceiros/Parceiros";

export const AppRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <CssBaseline />
        <Routes>
          <Route path="/login" element={<SignInSignUp mode="signin" />} />
          <Route path="/cadastrar" element={<SignInSignUp mode="signup" />} />
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
          <Route path="/meu-perfil" element={<AlunoHome />} />
          <Route path="/" element={<VagasAbertas />} />
          <Route
            path="/vagas-abertas/informacoes-da-vaga/:uid"
            element={<DetalhesVaga />}
          />
          <Route path="/vagas-inscritas" element={<VagasInscritas />} />
          <Route
            path="/vagas-inscritas/informacoes-da-vaga"
            element={<DetalhesVaga />}
          />
          <Route path="/empresa-parceira" element={<ParceiroHome />} />
          {/* <Route
            path="/empresa-parceira/informacoes-da-vaga"
            element={<ConsultaVaga parceiro />}
          /> */}
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
