/**
=========================================================
* Material Dashboard 2 React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from "react";

// react-router-dom components

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDAlert from "components/MDAlert";
import validator from "validator";
// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import { toast } from "react-toastify";
// eslint-disable-next-line import/named
import { login } from "components/api";
import { useNavigate } from 'react-router-dom';
import { saveToken } from "redux/user";
import { useDispatch } from "react-redux";
function Basic() {
  const history = useNavigate();
  const dispatch  = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setError] = useState(false);
  const [error, setErrorText] = useState("");
  const [loading, setLoading] = useState(false);

  const logIn = async () => {
    if (!validator.isEmail(email)) {
      return toast.error("Invalid Email Address");
    }
    setLoading(true);
    toast.loading("Logging in");
    const log = await login(email, password);
    setLoading(false);
    toast.dismiss();
    // console.log(loginme);
    if (log.status === 200) {
      //console.log('200');
      //console.log(log.data.token);
      dispatch(saveToken(log.data.token));
      // history("/", { replace: true });
      window.location.href="/users";
    } else {
      setError(true);
      // console.log(log?.data?.data?.message);
      setErrorText(log?.data?.data?.message || "Unknown Error Occured");
    }
  };
  return (
    <BasicLayout image={bgImage} showNav={false}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="Email"
                fullWidth
                onChange={(e) => setEmail(e.target.value)}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Password"
                fullWidth
                onChange={(e) => setPassword(e.target.value)}
              />
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton
                variant="gradient"
                color="info"
                fullWidth
                disabled={loading}
                onClick={logIn}
              >
                {loading && <i className="fa fa-spinner fa-spin" />}
                sign in
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                {isError && (
                  <MDAlert color="error" dismissible>
                    {error}
                  </MDAlert>
                )}
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
