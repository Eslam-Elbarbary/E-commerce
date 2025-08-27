import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function ForgetPassword() {
  const [userMessage, setUserMessage] = useState(null);
  const [userErrorMessage, setUserErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const mySchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: mySchema,
    onSubmit: (values) => {
      console.log(values);
      forgotPasswordForm(values);
    },
  });

  async function forgotPasswordForm(values) {
    setIsLoading(true);
    return await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", values)
      .then((res) => {
        console.log(res.data);
        setUserMessage(res.data.message || "Check your email for reset code.");
        setUserErrorMessage(null);
        setIsLoading(false);

        // 🚀 بعد ما الإيميل يتبعت بنجاح → روح لصفحة Verify Code
        setTimeout(() => {
          navigate("/verifycode");
        }, 1000);
      })
      .catch((err) => {
        setUserMessage(null);
        if (err.response && err.response.data && err.response.data.message) {
          setUserErrorMessage(err.response.data.message);
        } else {
          setUserErrorMessage("Something went wrong. Please try again.");
        }
        console.log(err);
        setIsLoading(false);
      });
  }

  return (
    <div className="w-[70%] mx-auto">
      <h2 className="text-3xl my-3">Forgot Password :</h2>

      {userMessage && (
        <div role="alert" className="alert alert-success alert-outline">
          <p>{userMessage}</p>
        </div>
      )}
      {userErrorMessage && (
        <div role="alert" className="alert alert-error alert-outline">
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
        {formik.touched.email && formik.errors.email ? (
          <div role="alert" className="alert alert-error alert-outline">
            {formik.errors.email}
          </div>
        ) : null}

        <div className="text-end">
          {isLoading ? (
            <button
              type="submit"
              className="my-2.5 py-2 px-6 bg-main-color rounded-lg text-white"
            >
              <i className="fa fa-spinner"></i>
            </button>
          ) : (
            <button
              type="submit"
              className="my-2.5 py-2 px-6 bg-main-color rounded-lg text-white"
            >
              Send Reset Code
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
