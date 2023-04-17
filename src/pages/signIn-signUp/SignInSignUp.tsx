import React, { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { userLogin } from "../../store/modules/userLogin/UserLoginSlice";
import { userCreate } from "../../store/modules/user/UserSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { CreateUserDTO, Login } from "../../types/User";

interface modeProp {
  mode: string;
}

interface CadastroDTO {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
}

const SignInSignUp = ({ mode }: modeProp) => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [response, setResponse] = useState<string>("");
  const [previousNavigation, setPreviousNavigation] = useState<string>();
  // const [previousParam, setPreviousParam] = useState<string>();

  const user = Object.values(
    useAppSelector((store) => store.userLogin.entities)
  );

  useEffect(() => {
    if (state !== null) {
      const { url } = state;
      setPreviousNavigation(url);
    }
    if (user[0]) {
      if (user[0].token) {
        if (user[0].userDTO.roleName == "CANDIDATO") {
          setError(false);
          navigate("/");
        } else if (user[0].userDTO.roleName == "PARCEIRO") {
          setError(false);
          navigate("/empresa-parceira");
        } else if (user[0].userDTO.roleName == "GROWDEV") {
          setError(false);
          navigate("/growdever");
        }
      }
    }
  }, []);

  const Login = async (values: Login) => {
    setError(false);
    const { email, senha } = values;
    const usuarioLogado = await dispatch(
      userLogin({
        email: email,
        senha: senha,
      })
    );

    if (usuarioLogado.payload.userDTO) {
      if (previousNavigation) {
        setError(false);
        navigate(`${previousNavigation}`);
      } else {
        if (usuarioLogado.payload.userDTO.roleName == "CANDIDATO") {
          setError(false);
          navigate("/");
        } else if (usuarioLogado.payload.userDTO.roleName == "PARCEIRO") {
          setError(false);
          navigate("/empresa-parceira");
        } else if (usuarioLogado.payload.userDTO.roleName == "GROWDEV") {
          setError(false);
          navigate("/growdever");
        }
      }
    } else {
      setResponse(usuarioLogado.payload.response.data.message);
      setError(true);
    }
  };

  const Cadastro = async (values: CadastroDTO) => {
    setError(false);
    const { name, email, password, confirmPassword, phoneNumber } = values;
    if (password !== confirmPassword) {
      setError(true);
      setResponse("As senhas precisam ser iguais.");
      return;
    }
    const usuarioLogado = await dispatch(
      userCreate({
        name: name,
        email: email,
        password: password,
        phoneNumber: phoneNumber,
        roleName: "CANDIDATO",
        companyUid: "",
      })
    );
    if (usuarioLogado.payload.response) {
      setError(true);
      setResponse(usuarioLogado.payload.response.data.message);
    } else {
      setError(false);
      setResponse("");
      navigate("/login");
    }
  };

  return (
    <>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          lg={8}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
            justifyContent: "center",
            display: "flex",
            alignItems: "center",
          }}
        >
          {mode === "signin" ? (
            <div className=" hidden lg:flex m-0 p-0 leading-[200px] text-[151px] xl:text-[200px] text-white w-[40vw]">
              Bem-vindo
            </div>
          ) : (
            <div className=" hidden lg:flex m-0 p-0 leading-[200px] lg:text-[120px] xl:text-[151px] text-white w-[50vw]">
              Faça seu cadastro
            </div>
          )}
        </Grid>
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          lg={4}
          component={Paper}
          elevation={6}
          square
        >
          {mode == "signin" && (
            <Box
              sx={{
                mx: 6,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box sx={{ marginTop: "30px", marginBottom: "20px" }}>
                <img
                  className="w-[170px] h-[150px]"
                  src={require("../../assets/growdev.png")}
                />
              </Box>
              <div className="text-[22px] font-bold text-blue-900 mb-[20px]">
                Login
              </div>
              {error && <div className="text-red-500 mb-[0px]">{response}</div>}
              <Box component="form" noValidate>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  type="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  autoComplete="current-password"
                />
                {/* <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                /> */}
                <Button
                  color="warning"
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: "60px", mb: 2, borderRadius: 100 }}
                  onClick={(e) => {
                    e.preventDefault();
                    Login({ email: email, senha: password });
                  }}
                >
                  ENTRAR
                </Button>
                <Grid
                  container
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <Link href="/cadastrar" className="text-[16px]">
                    Não possui uma conta? Cadastrar.
                  </Link>
                </Grid>
              </Box>
            </Box>
          )}
          {mode == "signup" && (
            <Box
              sx={{
                // my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box sx={{ marginTop: "30px", marginBottom: "20px" }}>
                <img
                  className="w-[150px] h-[130px]"
                  src={require("../../assets/growdev.png")}
                />
              </Box>
              <div className="text-[22px] font-bold text-blue-900 mb-[20px]">
                Coloque seus dados Growdev
              </div>
              {error && (
                <div className="text-red-500 mb-[10px]">{response}</div>
              )}
              <Box component="form" noValidate>
                <div className="h-[350px] overflow-scroll px-[10px]">
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="name"
                    autoFocus
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Confirmar Senha"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    type="password"
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Celular"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    sx={{ marginBottom: "10px" }}
                  />
                </div>
                {/* <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                /> */}
                <Button
                  color="warning"
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: "40px", mb: 2, borderRadius: 100 }}
                  onClick={(e) => {
                    Cadastro({
                      name: name,
                      email: email,
                      password: password,
                      confirmPassword: confirmPassword,
                      phoneNumber: phoneNumber,
                    });
                    e.preventDefault();
                  }}
                >
                  CADASTRAR
                </Button>
                <Grid
                  container
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <Link href="/" className="text-[16px]">
                    Já possui uma conta? Entrar.
                  </Link>
                </Grid>
              </Box>
            </Box>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default SignInSignUp;
