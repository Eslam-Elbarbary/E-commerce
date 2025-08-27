import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function ResetPassword() {
  const [userMessage, setUserMessage] = useState(null);
  const [userErrorMessage, setUserErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const mySchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    newPassword: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("New password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema: mySchema,
    onSubmit: (values) => {
      resetPasswordForm(values);
    },
  });

  async function resetPasswordForm(values) {
    setIsLoading(true);
    return await axios
      .put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", values)
      .then((res) => {
        console.log(res.data);
        setUserMessage(res.data.message || "Password reset successfully!");
        setUserErrorMessage(null);
        setIsLoading(false);

        // بعد الريسيت يرجع على اللوجين
        setTimeout(() => {
          navigate("/login");
        }, 1500);
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
      <h2 className="text-3xl my-3">Reset Password :</h2>

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
          placeholder="Email"
          className="input w-full bg-white focus:outline-0 my-2 rounded-lg"
        />
        {formik.touched.email && formik.errors.email && (
          <div role="alert" className="alert alert-error alert-outline">
            {formik.errors.email}
          </div>
        )}

        <input
          value={formik.values.newPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="newPassword"
          type="password"
          placeholder="New password"
          className="input w-full bg-white focus:outline-0 my-2 rounded-lg"
        />
        {formik.touched.newPassword && formik.errors.newPassword && (
          <div role="alert" className="alert alert-error alert-outline">
            {formik.errors.newPassword}
          </div>
        )}

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
              Reset Password
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
