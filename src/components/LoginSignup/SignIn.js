import "./LoginSignUp.css";
import React from "react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { UserContext } from "../../App";
import axios from "axios";

const SignIn = () => {
  const { setUser } = useContext(UserContext);
  const [isCorrect, setIsCorrect] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const nav = useNavigate();

  const handleSubmit = (values) => {
    const data = {
      user: {
        ...values,
      },
    };

    axios
      .post("https://api.realworld.io/api/users/login", data)
      .then((res) => {
        setUser(res.data.user);
        localStorage.setItem('userToken', res.data.user.token);
        nav("/");
      })
      .catch((error) => {
        setIsCorrect(false);
        const errors = error.response.data.errors;
        const key = Object.keys(errors)[0];
        setErrorMessage(`${key} ${errors[key][0]}`);
        console.log(errors);
      });
  };

  return (
    <>
      <div class="auth-page">
        <div class="container page">
          <div class="row">
            <div class="col-md-6 offset-md-3 col-xs-12 text-center">
              <h1 class="text-xs-center">Sign in</h1>
              <p class="text-xs-center">
                <a href="/register" className="need">
                  Need an account?
                </a>
              </p>
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                }}
                onSubmit={(values) => handleSubmit(values)}
              >
                <Form>
                  {!isCorrect && (
                    <div className="text-danger"><h6>{errorMessage}</h6></div>
                  )}
                  <Field
                    class="form-control form-control-lg m-2"
                    type="email"
                    name="email"
                    placeholder="Email"
                  />

                  <Field
                    class="form-control form-control-lg m-2"
                    type="password"
                    name="password"
                    placeholder="Password"
                  />

                  <button
                    class="btn btn-lg btn-success pull-xs-right"
                    type="submit"
                  >
                    Sign in
                  </button>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
