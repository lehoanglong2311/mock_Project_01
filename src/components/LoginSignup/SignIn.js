import React from "react";
import Form from 'react-bootstrap/Form';
const SignIn = () => {
  return (
    <>
      <div class="auth-page">
        <div class="container page">
          <div class="row">
            <div class="col-md-6 offset-md-3 col-xs-12 text-center">
              <h1 class="text-xs-center">Sign in</h1>
              <p class="text-xs-center">
                <a href="/register" style={{color: 'green '}}>Need an account?</a>
              </p>

              {/* <ul class="error-messages">
                <li>That email is already taken</li>
              </ul> */}

              <Form>
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
                <button class="btn btn-lg btn-success pull-xs-right">
                  Sign in
                </button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
