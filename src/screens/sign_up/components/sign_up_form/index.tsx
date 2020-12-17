import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { SignUpFormCSS } from "./styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import logoSmall from "../../../../static/icons/ate-bite-small-logo.png";

export const SignUpForm = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    console.log(event.target);
    setInputs((inputs) => ({
      ...inputs,
      [name]: value,
    }));
  };
  const [canSubmit, setCanSubmit] = useState(false);
  useEffect(() => {
    if (inputs.username && inputs.email && inputs.password) {
      setCanSubmit(true);
    } else if (canSubmit) {
      setCanSubmit(false);
    }
  }, [inputs]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    await axios
      .post("http://localhost:4000/signup", {
        username: inputs.username,
        email: inputs.email,
        password: inputs.password,
      })
      .then((res) => {
        console.log(`hi`, res.status);
        if (res.status === 200) {
          toast.success("Sign up success 🚀");
          setInputs({
            username: "",
            email: "",
            password: "",
          });
        }
      })
      .catch((err) => {
        toast.error("Sign up failed ❗️");
      });
  };

  return (
    <SignUpFormCSS>
      <img src={logoSmall} />
      <div className="form">
        <form noValidate autoComplete="off">
          <TextField
            id="outlined-name"
            label="Username"
            name="username"
            placeholder="Enter username"
            value={inputs.username}
            onChange={handleChange}
            variant="outlined"
          />
          <TextField
            id="outlined-uncontrolled"
            label="Email Address"
            name="email"
            placeholder="Enter Email Address"
            value={inputs.email}
            onChange={handleChange}
            variant="outlined"
          />
          <TextField
            id="outlined-uncontrolled"
            label="Password"
            name="password"
            placeholder="Enter Password"
            value={inputs.password}
            onChange={handleChange}
            variant="outlined"
          />
          <Button
            type="submit"
            disabled={!canSubmit}
            variant="outlined"
            color="primary"
            onClick={handleSubmit}
          >
            sign up
          </Button>
        </form>
      </div>
    </SignUpFormCSS>
  );
};

export default SignUpForm;
