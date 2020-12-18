import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { toast } from "react-toastify";
import { useHistory, useParams } from "react-router-dom";
import Button from "@material-ui/core/Button";
import axios from "axios";

export const JoinRoomForm = () => {
  const history = useHistory();
  let user: any = useParams();
  const [inputs, setInputs] = useState({ roomcode: "" });
  const [canSubmit, setCanSubmit] = useState(false);
  useEffect(() => {
    if (inputs.roomcode) {
      setCanSubmit(true);
    } else if (canSubmit) {
      setCanSubmit(false);
    }
  }, [inputs]);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    console.log(event.target);
    setInputs((inputs) => ({
      ...inputs,
      [name]: value,
    }));
  };
  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
      axios
        .post(process.env.REACT_APP_SERVER_URL + "/joinRoom", {
          roomcode: inputs.roomcode,
          userId: user.userId,
        })
        .then((res) => {
          if (res.status === 200) {
            localStorage.setItem("roomcode", inputs.roomcode);
            console.log(inputs.roomcode);
            toast.success("Room's Successfully Joined 🚀");
            history.push(`/room/${inputs.roomcode}/${user.userId}`);
          }
        })
        .catch((err) => {
          console.log(err);
          console.log(user.userId);
          toast.error("This Room Does Not Exist Yet 🚫");
        });
    }
  };

  return (
    <>
      <div className="form">
        <form noValidate autoComplete="off">
          <TextField
            id="outlined-name"
            label="Room Code"
            name="roomcode"
            placeholder="Enter username"
            value={inputs.roomcode}
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
            Join A Room
          </Button>
        </form>
      </div>
    </>
  );
};

export default JoinRoomForm;
