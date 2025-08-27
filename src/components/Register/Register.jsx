import React, { useState } from "react";
import "./Register.module.css";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export function Register() {
  const [userMessage, setuserMessage] = useState(null);
  const [userErrorMessage, setUserErrorMessage] = useState(null);
  const [isLodding, setIsLodding] = useState(false);
  const navigate = useNavigate();

  //   const validate = (values) => {
  //     const error = {};

  //     if (!values.name) {
  //       error.name = "Required";
  //     } else if (values.name.length < 3) {
  //       error.name = "name must be gretter than 3 characters";
  //     }

  //     if (!values.email) {
  //       error.email = "Required";
  //     } else if (
  //       !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  //     ) {
  //       error.email = "Invalid email address";
  //     }

  //     if (!values.password) {
  //       error.password = "Required";
  //     } else if (!/^[A-Z][a-z0-9]{3,}$/i.test(values.password)) {
  //       error.password = "Invalid password ";
  //     }
  //     if (!values.rePassword) {
  //       error.rePassword = "Required";
  //     } else if (values.password !== values.rePassword) {
  //       error.password = "Password Not Match";
  //     }
  //     if (!values.phone) {
  //       error.phone = "Required";
  //     } else if (!/^(0020)?01[0125][0-9]{8}$/i.test(values.phone)) {
  //       error.phone = "Invalid Phone ";
  //     }

  //     return error;
  //   };

  const mySchema = Yup.object({
    name: Yup.string()
      .min(3, "name must be greater than 3 chart")
      .required("name is req"),
    email: Yup.string().email("email").required("email is req"),
    password: Yup.string()
      .matches(/^[A-Z][a-z0-9]{3,}$/)
      .required("pass is req"),
    rePassword: Yup.string()
      .required("req")
      .oneOf([Yup.ref("password")], "must be match with pass"),
    phone: Yup.string()
      .matches(/^(0020)?01[0125][0-9]{8}$/)
      .required("phone is req"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema: mySchema,
    onSubmit: (values) => {
      console.log(values);
      registerForm(values);
    },
  });
  async function registerForm(values) {
    setIsLodding(true);
    return await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .then((data) => {
        console.log(data);
        setuserMessage(data.data.message);
        setUserErrorMessage(null);
        console.log(userMessage);
        navigate("/login");
        setIsLodding(false);
      })
      .catch((err) => {
        console.log(err);
        setuserMessage(null);
        setUserErrorMessage(err.response.data.message);
        console.log(userErrorMessage);
        setIsLodding(false);
      });
  }
  return (
    <>
      <div className="w-[70%] mx-auto">
        <h2 className="text-3xl my-3">Register Now :</h2>
        {userMessage ? (
          <div role="alert" className="alert alert-success alert-outline">
            <p>{userMessage}</p>
          </div>
        ) : null}
        {userErrorMessage ? (
          <div role="alert" className="alert alert-error  alert-outline">
            <p>{userErrorMessage}</p>
          </div>
        ) : null}
        <form onSubmit={formik.handleSubmit}>
          <input
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="name"
            type="text"
            placeholder="Name"
            className="input w-full bg-white focus:outline-0  focus:border-black my-2  rounded-lg"
          />
          {formik.touched.name && formik.errors.name ? (
            <div role="alert" className="alert alert-error alert-outline">
              {formik.errors.name}
            </div>
          ) : null}

          <input
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="email"
            type="email"
            autoComplete="username"
            placeholder="Email"
            className="input w-full bg-white focus:outline-0 focus:border-black my-2  rounded-lg"
          />
          {formik.touched.email && formik.errors.email ? (
            <div role="alert" className="alert alert-error alert-outline">
              {formik.errors.email}
            </div>
          ) : null}

          <input
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="password"
            type="password"
            autoComplete="new-password"
            placeholder="Password"
            className="input w-full bg-white focus:outline-0  focus:border-black my-2  rounded-lg"
          />
          {formik.touched.password && formik.errors.password ? (
            <div role="alert" className="alert alert-error alert-outline">
              {formik.errors.password}
            </div>
          ) : null}

          <input
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="rePassword"
            type="password"
            autoComplete="new-password"
            placeholder="Re-Password"
            className="input w-full bg-white focus:outline-0  focus:border-black my-2  rounded-lg"
          />
          {formik.touched.rePassword && formik.errors.rePassword ? (
            <div role="alert" className="alert alert-error alert-outline">
              {formik.errors.rePassword}
            </div>
          ) : null}

          <input
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="phone"
            type="tel"
            placeholder="Phone"
            className="input w-full bg-white focus:outline-0  focus:border-black my-2  rounded-lg"
          />
          {formik.touched.phone && formik.errors.phone ? (
            <div role="alert" className="alert alert-error alert-outline">
              {formik.errors.phone}
            </div>
          ) : null}

          <div className=" text-end">
            {isLodding ? (
              <button
                type="submit"
                className=" my-2.5 py-2 px-6  bg-main-color rounded-lg text-white"
              >
                <i className=" fa fa-spinner"></i>
              </button>
            ) : (
              <button
                type="submit"
                className=" my-2.5 py-2 px-6 bg-main-color rounded-lg text-white"
              >
                Register
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
