/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import * as Yup from "yup";
import { useState } from "react";
import { useFormik, Form, FormikProvider } from "formik";
import { TextField, IconButton, Button } from "@mui/material";
import { MdVisibilityOff, MdVisibility } from "react-icons/md";
import { userLogin } from "../../store/modules/userLogin/UserLoginSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

interface Values {
  email: string;
  password: string;
}

export const SignIn = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<string>("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = Object.values(useAppSelector((store) => store.user.entities));

  useEffect(() => {
    if (user[0] !== undefined) {
      navigate("/");
    }
  }, []);

  const login = async (values: Values) => {
    setLoading(true);
    setError(false);
    const { email, password } = values;
    const usuarioLogado = await dispatch(
      userLogin({
        email: email,
        senha: password,
      })
    );

    if (usuarioLogado.payload.uid) {
      setLoading(false);
      if (usuarioLogado.payload.userDTO.roleName === "CANDIDATO") {
        navigate("/");
      } else if (usuarioLogado.payload.userDTO.roleName === "PARCEIRO") {
        navigate("/empresa-parceira");
      } else if (usuarioLogado.payload.userDTO.roleName === "GROWDEV") {
        navigate("/growdever");
      }
    } else {
      setLoading(false);
      setResponse(usuarioLogado.payload.response.data.message);
      setError(true);
    }
  };

  const SignupSchema = Yup.object().shape({
    email: Yup.string(),
    password: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: SignupSchema,
    onSubmit: (values, actions) => {
      setTimeout(() => {
        login(values);
        actions.setSubmitting(false);
      }, 1000);
    },
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <div className="h-[100vh] w-[100vw] text-center flex items-center justify-center bg-slate-50">
      {loading && (
        <div className="absolute z-10">
          <ClipLoader color={"#000001"} size={60} />
        </div>
      )}
      <div>
        <div className="shadow-3xl w-[400px] text-center items-center justify-center border-black border-solid border-[2px] rounded-lg py-[20px] px-[30px] bg-white">
          <div className="text-[30px] mb-[15px]">Login</div>
          {error && (
            <div className="text-[16px] mb-[15px] mt-[-10px] text-red-500">
              {response}
            </div>
          )}
          <FormikProvider value={formik}>
            <Form onSubmit={handleSubmit}>
              <div className="mb-[15px]">
                <TextField
                  required
                  fullWidth
                  autoComplete="email"
                  type="email"
                  label="Email address"
                  {...getFieldProps("email")}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                />
              </div>
              <div className="mb-[15px]">
                <TextField
                  required
                  fullWidth
                  autoComplete="current-password"
                  type={showPassword ? "text" : "password"}
                  label="Password"
                  {...getFieldProps("password")}
                  InputProps={{
                    endAdornment: (
                      <div>
                        <IconButton
                          edge="end"
                          onClick={() => setShowPassword((prev) => !prev)}
                          className="w-[50px] h-[50px]"
                        >
                          {showPassword ? (
                            <MdVisibility className="w-[35px] h-[35px]" />
                          ) : (
                            <MdVisibilityOff className="w-[35px] h-[35px] ml-[-0px]" />
                          )}
                        </IconButton>
                      </div>
                    ),
                  }}
                  error={Boolean(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
                />
              </div>
              <div className="border-solid bg-blue-700 border-[2px] rounded-lg w-[100%] hover:bg-blue-500">
                <Button className="w-[100%]" type="submit">
                  <h1 className="text-[18px] text-white">ENTRAR</h1>
                </Button>
              </div>
            </Form>
          </FormikProvider>
          <div className="mt-[10px] underline text-gray-800">
            <a href="/e-mail/reset-password">Esqueceu sua senha?</a>
          </div>
        </div>
        <div className="shadow-3xl w-[400px] mt-[30px] text-center items-center justify-center border-black border-solid border-[2px] rounded-lg p-5 bg-white">
          <h4>
            Não possui uma conta? &nbsp;&nbsp;
            <a href="/cadastro" className="underline text-blue-500 text-[16px]">
              CRIAR CONTA
            </a>
          </h4>
        </div>
      </div>
    </div>
  );
};
