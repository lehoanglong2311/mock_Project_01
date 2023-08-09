import React from "react";
import { Formik, Form, Field } from "formik";
import "./LoginSignUp.css";
import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";

const SignUp = () => {
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
      .post("https://api.realworld.io/api/users", data)
      .then((res) => {
        setUser(res.data.user);
        nav("/");
      })
      .catch((error) => {
        setIsCorrect(false);
        const errors = error.response.data.errors;
        const errorMessages = Object.keys(errors).map(
          (key) => `${key} ${errors[key][0]}`
        );
        setErrorMessage(errorMessages);
        console.log(errors);
      });
  };
  return (
    <>
      <div class="auth-page">
        <div class="container page">
          <div class="row">
            <div class="col-md-6 offset-md-3 col-xs-12 text-center">
              <h1 class="text-xs-center">Sign up</h1>
              <p class="text-xs-center">
                <a href="/login" style={{ color: "green " }}>
                  Have an account?
                </a>
              </p>

              <Formik
                initialValues={{
                  username: "",
                  email: "",
                  password: "",
                }}
                onSubmit={(values) => handleSubmit(values)}
              >
                <Form>
                  {!isCorrect && (
                    <div className="text-danger">
                      {errorMessage.map((message, index) => (
                        <h6 key={index}>{message}</h6>
                      ))}
                    </div>
                  )}
                  <Field
                    class="form-control form-control-lg m-2"
                    type="username"
                    name="username"
                    placeholder="Username"
                  />

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
                  <button class="btn btn-lg btn-success pull-xs-right">
                    Sign up
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

export default SignUp;
