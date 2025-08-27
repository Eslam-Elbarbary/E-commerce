import React, { useContext, useState } from "react";
import "./CheckOut.module.css";
import { useFormik } from "formik";
import { CartContext } from "../../Context/CartContext";

export function CheckOut() {
  const { onlinePayment, cashPayment } = useContext(CartContext);

  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
      paymentMethod: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.details) {
        errors.details = "Details are required";
      }
      if (!values.phone) {
        errors.phone = "phone is required";
      }
      if (!values.city) {
        errors.city = "city is required";
      }
      return errors;
    },
    onSubmit: (values) => {
      console.log("Form submitted:", values);
      performPayment(values);
    },
  });

  async function performPayment(values) {
    const shippingAddress = {
      details: values.details,
      phone: values.phone,
      city: values.city,
    };
    if (values.paymentMethod === "online") {
      await onlinePayment(values, shippingAddress);
    } else if (values.paymentMethod === "cash") {
      await cashPayment(values, shippingAddress);
    } else {
      console.warn("No Payment Method Selected");
    }
  }

  return (
    <div className="w-1/2 mx-auto">
      <h2 className="text-main-color my-10">Enter Your Shipping Data :</h2>

      <form onSubmit={formik.handleSubmit}>
        {/* Details */}
        <input
          value={formik.values.details}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="details"
          type="text"
          placeholder="Details"
          className="input w-full bg-white focus:outline-0 focus:border-black my-2 rounded-lg"
        />
        {formik.touched.details && formik.errors.details ? (
          <div role="alert" className="alert alert-error alert-outline">
            {formik.errors.details}
          </div>
        ) : null}

        {/* phone */}
        <input
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="phone"
          type="tel"
          placeholder="phone"
          className="input w-full bg-white focus:outline-0 focus:border-black my-2 rounded-lg"
        />
        {formik.touched.phone && formik.errors.phone ? (
          <div role="alert" className="alert alert-error alert-outline">
            {formik.errors.phone}
          </div>
        ) : null}
        {/* city */}
        <input
          value={formik.values.city}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="city"
          type="text"
          placeholder="city"
          className="input w-full bg-white focus:outline-0 focus:border-black my-2 rounded-lg"
        />
        {formik.touched.city && formik.errors.city ? (
          <div role="alert" className="alert alert-error alert-outline">
            {formik.errors.city}
          </div>
        ) : null}

        {/* Submit Button */}
        <div className="text-end">
          <fieldset className="fieldset">
            <select
              name="paymentMethod"
              value={formik.values.paymentMethod}
              className="select bg-white w-full my-2"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="">Pick Payment Method</option>

              <option value="online">Online Payment</option>
              <option value="cash">Cash Payment</option>
            </select>
          </fieldset>
          <button
            type="submit"
            className=" cursor-pointer my-2.5 py-2 px-6 bg-main-color rounded-lg text-white"
          >
            Checkout
          </button>
        </div>
      </form>
    </div>
  );
}
