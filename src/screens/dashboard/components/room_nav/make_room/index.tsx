import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { toast } from "react-toastify";
import { useHistory, useParams } from "react-router-dom";
import Button from "@material-ui/core/Button";
import axios from "axios";

export const MakeRoomForm = () => {
  const history = useHistory();
  const userId = localStorage.getItem("userId");
  const [inputs, setInputs] = useState({ roomname: "" });
  const [canSubmit, setCanSubmit] = useState(false);
  useEffect(() => {
    if (inputs.roomname) {
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
        .post(process.env.REACT_APP_SERVER_URL + "/madeRoom", {
          roomname: inputs.roomname,
          userId: userId,
        })
        .then((res) => {
          if (res.status === 200) {
            localStorage.setItem("roomcode", res.data.roomcode);
            console.log(res.data.roomcode);

            toast.success("Room's Successfully Made 🚀");
            history.push(`/room/${res.data.roomcode}/${userId}`);
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("Error 🚫");
        });
    }
  };

  return (
    <>
      <div className="form">
        <form noValidate autoComplete="off">
          <TextField
            id="outlined-name"
            label="Room Name"
            name="roomname"
            placeholder="Enter username"
            value={inputs.roomname}
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
            Make A Room
          </Button>
        </form>
      </div>
    </>
  );
};

export default MakeRoomForm;
