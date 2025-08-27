// ملف: src/pages/auth/Login.jsx  (نسخة معدلة من كودك)
import React, { useContext, useState } from "react";
import "./Login.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { TokenContext } from "../../Context/TokenContext";

export function Login() {
  const { token, setToken } = useContext(TokenContext);
  const [userMessage, setuserMessage] = useState(null);
  const [userErrorMessage, setUserErrorMessage] = useState(null);
  const [isLodding, setIsLodding] = useState(false);
  const navigate = useNavigate();

  const mySchema = Yup.object({
    email: Yup.string().email("email").required("email is req"),
    password: Yup.string()
      .matches(/^[A-Z][a-z0-9]{3,}$/)
      .required("pass is req"),
  });

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: mySchema,
    onSubmit: (values) => {
      loginForm(values);
    },
  });

  async function loginForm(values) {
    setIsLodding(true);
    return await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .then((data) => {
        localStorage.setItem("userToken", data.data.token);
        setToken(data.data.token);
        setuserMessage(data.data.message);
        setUserErrorMessage(null);
        navigate("/");
        setIsLodding(false);
      })
      .catch((err) => {
        setuserMessage(null);
        if (err.response && err.response.data && err.response.data.message) {
          setUserErrorMessage(err.response.data.message);
        } else {
          setUserErrorMessage("Something went wrong. Please try again.");
        }
        setIsLodding(false);
      });
  }

  return (
    <div className="w-[70%] mx-auto">
      <h2 className="text-3xl my-3">Login Now :</h2>

      {userMessage && (
        <div role="alert" className="alert alert-success alert-outline">
          <p>{userMessage}</p>
        </div>
      )}
      {userErrorMessage && (
        <div role="alert" className="alert alert-error  alert-outline">
          <p>{userErrorMessage}</p>
        </div>
      )}

      <form onSubmit={formik.handleSubmit}>
        <input
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="email"
          type="email"
          autoComplete="username"
          placeholder="Email"
          className="input w-full bg-white focus:outline-0 focus:border-black my-2 rounded-lg"
        />
        {formik.touched.email && formik.errors.email && (
          <div role="alert" className="alert alert-error alert-outline">
            {formik.errors.email}
          </div>
        )}

        <input
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="Password"
          className="input w-full bg-white focus:outline-0 focus:border-black my-2 rounded-lg"
        />
        {formik.touched.password && formik.errors.password && (
          <div role="alert" className="alert alert-error alert-outline">
            {formik.errors.password}
          </div>
        )}

        {/* رابط نسيت كلمة المرور */}
        <div className="flex justify-end mb-3">
          <Link to="/forgetpassword" className="text-sm text-blue-600 hover:underline">
          Forget Password?
          </Link>
        </div>

        <div className="text-end">
          {isLodding ? (
            <button type="submit" className="my-2.5 py-2 px-6 bg-main-color rounded-lg text-white">
              <i className="fa fa-spinner"></i>
            </button>
          ) : (
            <button type="submit" className="my-2.5 py-2 px-6 bg-main-color rounded-lg text-white">
              Log in
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
