import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function VerifyResetCode() {
  const [userMessage, setUserMessage] = useState(null);
  const [userErrorMessage, setUserErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const mySchema = Yup.object({
    resetCode: Yup.string()
      .required("Reset code is required")
      .matches(/^[0-9]{6}$/, "Code must be 6 digits"),
  });

  const formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema: mySchema,
    onSubmit: (values) => {
      console.log(values);
      verifyCodeForm(values);
    },
  });

  async function verifyCodeForm(values) {
    setIsLoading(true);
    return await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", values)
      .then((res) => {
        console.log(res.data);
        setUserMessage(res.data.status || "Code verified successfully!");
        setUserErrorMessage(null);
        setIsLoading(false);

        // بعد نجاح الكود → تحويل لصفحة reset password
        navigate("/resetpassword");
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
      <h2 className="text-3xl my-3">Verify Reset Code :</h2>

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
          value={formik.values.resetCode}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="resetCode"
          type="text"
          placeholder="Enter reset code"
          className="input w-full bg-white focus:outline-0 focus:border-black my-2 rounded-lg"
        />
        {formik.touched.resetCode && formik.errors.resetCode ? (
          <div role="alert" className="alert alert-error alert-outline">
            {formik.errors.resetCode}
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
              Verify Code
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
