import React from "react"
import Layout from "../components/layout"
import { Formik } from 'formik';

export default function Contact() {
  return (
    <Layout>
      <div className="cart">
        <h1>Message</h1>
        <Formik
          initialValues={{message:'' }}
          validate={values => {
            const errors = {};
            if (!values.message) {
              errors.message = 'Required';
            } 
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            fetch("/.netlify/functions/add_message",{
              method:"post",
              body:JSON.stringify(values)
            })
            .then(res=>res.json())
            .then(data=>{
              console.log(data)
            })
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              <input
              className="input"
                type="text"
                name="message"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.message}
              />
              {errors.message && touched.message && errors.message}
              <br />
              <button className="btn" type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </form>
          )}
        </Formik>
      </div>
    </Layout>
  )
}
