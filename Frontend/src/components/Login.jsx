import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';

export default function Login() {
	const { register, handleSubmit } = useForm();
	const navigate = useNavigate()

	const onSubmit = async (formData) => {
		try {
			const response = await fetch("https://tasksync360.onrender.com/api/v1/auth/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(formData)
			});

			if (response.ok) {
				let data = await response.json();
				localStorage.setItem("token", JSON.stringify(data.token))
				localStorage.setItem("user", JSON.stringify(data.user))
				navigate("/todos")
			} else {
				console.error('Login failed'); // Handle login failure
			}
		} catch (error) {
			console.error('Error occurred:', error);
		}
	}

	return (

		<div className="wrapper signIn">
			<div className="form">
				<div className="heading">LOGIN</div>

				<form onSubmit={handleSubmit(onSubmit)}>
					<div>
						<label htmlFor="email">Email</label>
						<input placeholder='email' {...register("email")} />
					</div>
					<div>
						<label htmlFor="password">Password</label>
						<input placeholder='password' type="password" id="password" {...register("password")} />
					</div>
					<button type="submit" value="Submit">Submit</button>
				</form>
				 <p>
                    Don't have an account ? <Link to="/signup"> Sign Up </Link>
                </p>
			</div>
		</div>
	);
}

