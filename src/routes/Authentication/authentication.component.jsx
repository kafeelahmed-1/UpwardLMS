import UserLogin from "../../components/UserAuthentication/loginForm.component";
// import MainHeading from "../../components/Header/header.component";
import { useNavigate } from "react-router-dom";

import { useState } from "react";
import Label from "../../components/Label/label.component";
import Button from "../../components/Button/button.component";
import Alert from "../../components/Alert/alert.component";
import UpwardsLogo from "../../assets/upwards.jpg";

const AuthenticationPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [allFieldsError, setAllFieldsError] = useState(false);
  const [displayAddStudentForm, setDisplayAddStudentForm] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setSubmissionMessage("");
      setError("Email and password are required");
      setAllFieldsError(true);
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/Authentication/Login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userEmail: email, userPassword: password }),
        }
      );
      if (response.ok) {
        const { data } = await response.json();
        const token = data.token;

        localStorage.setItem("token", token);
        setEmail("");
        setPassword("");
        navigate("/dashboard");
      } else {
        setSubmissionMessage("");
        setError("Enter the correct email or password......!");
      }
    } catch (error) {
      console.error("Error:", error);
      setSubmissionMessage("");
      setError("failed to login.....!");
    }
  };
  return (
    <>
      <div className="flex flex-col gap-y-4 py-10">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={UpwardsLogo}
            alt="logo"
            style={{
              objectFit: "contain",
              width: 250,
              height: 100,
            }}
          />
        </div>
        {/* <MainHeading title="Authentication" /> */}
        {/* <p>this is main authentication form</p> */}
        {/* <UserLogin /> */}

        <>
          <div className="w-[520.5px] h-[fit-content] rounded-lg border border-secondary mx-auto mt-4 bg-white">
            <div className="w-[520px] h-[60px] py-3 px-5 bg-default border border-b-secondary rounded-t-lg flex justify-between">
              <p className="self-center text-xl font-semibold">User Login</p>
            </div>
            <form className="pt-3 px-5 pb-8 flex flex-col gap-y-4 w-[520px] h-[fit-content]">
              <div className="flex flex-col gap-y-4">
                <div className="input-div-styles">
                  <label className="text-xs text-textSecondary flex gap-x-1">
                    {"Email"}
                    <sup className="text-error text-sm">*</sup>
                  </label>
                  <input
                    type="text"
                    placeholder="Email Address"
                    value={email}
                    onChange={handleEmailChange}
                    className={`${
                      allFieldsError ? "input-styles-error" : "input-styles"
                    }`}
                  />
                </div>
                <div className="input-div-styles">
                  <label className="text-xs text-textSecondary flex gap-x-1">
                    {"Password"}
                    <sup className="text-error text-sm">*</sup>
                  </label>
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                    className={`${
                      allFieldsError ? "input-styles-error" : "input-styles"
                    }`}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 25,
                  }}
                >
                  {error && (
                    <Alert
                      alert_type={"error"}
                      title={"Invalid"}
                      description={error}
                    />
                  )}
                </div>
              </div>
            </form>
            <div className="w-[520px] h-[72px] py-3 px-5 flex justify-end">
              <Button
                button_type="primary"
                button_size="medium"
                text="SignUp"
                onclick={() => {
                  navigate("/registration");
                }}
                icon="none"
              />
              <div style={{ marginLeft: 30 }}>
                <Button
                  button_type="primary"
                  button_size="medium"
                  text="Login"
                  onclick={handleLogin}
                  icon="none"
                />
              </div>
            </div>
          </div>
        </>
      </div>
    </>
  );
};

export default AuthenticationPage;
