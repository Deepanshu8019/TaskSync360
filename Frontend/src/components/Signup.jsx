import React from "react";
import { useForm } from 'react-hook-form';
import { Link ,useNavigate} from "react-router-dom";

export default function Signup() {

  const { register, handleSubmit } = useForm();
	const navigate = useNavigate()


  const onSubmit = async (formData) => {
    try {
      let response = await fetch("https://tasksync360.onrender.com/api/v1/auth/newaccount", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        let data = await response.json();
        navigate("/login")
      } else {
        console.error('Signup failed'); // Handle Signup failure
      }
    } catch (error) {
      console.log("Running error");
      console.error('Error occurred:', error);
    }
  }

  return (
    <div className="wrapper signUp">
      <div className="form">
        <div className="heading">CREATE AN ACCOUNT</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text" id="name" 
              placeholder="Enter your name"
              {...register("username")} />
          </div>
          <div>
            <label htmlFor="email">E-Mail</label>
            <input
              type="email" id="email"
              placeholder="Enter your mail"
              {...register("email")} />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter you password"
              {...register("password")}
            />
          </div>
          <button type="submit" >Submit</button>
          <h2 align="center" className="or">
            OR
          </h2>
        </form>
        <p>
          Have an account ? <Link to="/login" > Login </Link>
        </p>
      </div>
    </div>
  );
}