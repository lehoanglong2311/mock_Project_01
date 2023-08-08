import "./LoginSignUp.css"
import React from "react";
import Form from 'react-bootstrap/Form';
const SignUp = () => {
  return (
    <>
      <div class="auth-page">
        <div class="container page">
          <div class="row">
            <div class="col-md-6 offset-md-3 col-xs-12 text-center">
              <h1 class="text-xs-center">Sign up</h1>
              <p class="text-xs-center">
                <a href="/login" className="need">Have an account?</a>
              </p>

              {/* <ul class="error-messages">
                <li>That email is already taken</li>
              </ul> */}

              <Form>
                <fieldset class="form-group">
                  <input
                    class="form-control form-control-lg m-2"
                    type="text"
                    placeholder="Username"
                  />
                </fieldset>
                <fieldset class="form-group">
                  <input
                    class="form-control form-control-lg m-2"
                    type="text"
                    placeholder="Email"
                  />
                </fieldset>
                <fieldset class="form-group">
                  <input
                    class="form-control form-control-lg m-2"
                    type="password"
                    placeholder="Password"
                  />
                </fieldset>
                <button class="btn btn-lg btn-success pull-xs-right" >
                  Sign up
                </button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
