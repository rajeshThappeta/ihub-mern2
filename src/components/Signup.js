import React from 'react'
import { useForm } from 'react-hook-form'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

function Signup() {

    let { register, handleSubmit, formState: { errors } } = useForm()
    let navigate=useNavigate()

    const onFormSubmit = async (newUser) => {

        //make HTTP POST req by sending userObj to userApi
        let response = await axios.post('http://localhost:5000/user/createuser', newUser)
        let data = response.data

        if (data.message == "success") {
            //navigate to login
            navigate("/login") 
        }
        else {
            alert("Something went wrong in user creation")
        }
    }


    return (
        <div className="row">
            <p className="display-1 text-center text-info">Signup</p>
            <div className="col-12 col-sm-10 col-md-6 mx-auto">
                <form className='form-style p-4' onSubmit={handleSubmit(onFormSubmit)}>

                    {/* name */}
                    <div className="mb-3">
                        <label htmlFor="password">Name</label>
                        <input type="text" {...register("name", { required: true })}
                            id="name"
                            className="form-control" />
                        {/* validation erro msg for password*/}
                        {
                            errors.name?.type === 'required' && <p className='text-danger fw-bold'>* Name is required</p>
                        }
                    </div>
                    {/* username */}
                    <div className="mb-3">
                        <label htmlFor="username">Username</label>
                        <input type="text"
                            {...register("username", { required: true })}
                            id="username"
                            className="form-control" />
                        {/* validation erro msg for username */}
                        {
                            errors.username?.type === 'required' && <p className='text-danger fw-bold'>* Username is required</p>
                        }
                    </div>
                    {/* password */}
                    <div className="mb-3">
                        <label htmlFor="password">Password</label>
                        <input type="password" {...register("password", { required: true })}
                            id="password"
                            className="form-control" />
                        {/* validation erro msg for password*/}
                        {
                            errors.password?.type === 'required' && <p className='text-danger fw-bold'>* Password is required</p>
                        }
                    </div>
                    {/* email */}
                    <div className="mb-3">
                        <label htmlFor="email">Email</label>
                        <input type="email" {...register("email", { required: true })}
                            id="email"
                            className="form-control" />
                        {/* validation erro msg for password*/}
                        {
                            errors.email?.type === 'required' && <p className='text-danger fw-bold'>* Email is required</p>
                        }
                    </div>
                    {/* date of birth */}
                    <div className="mb-3">
                        <label htmlFor="dob">Date of birth</label>
                        <input type="date" {...register("dob", { required: true })}
                            id="dob"
                            className="form-control" />
                        {/* validation erro msg for password*/}
                        {
                            errors.dob?.type === 'required' && <p className='text-danger fw-bold'>* Date of birth is required</p>
                        }
                    </div>
                    {/* submit button */}
                    <button type='submit' className='btn btn-success d-block mx-auto'>
                        Register  <i className="fas fa-user-plus"></i>
                    </button>

                </form>
            </div>
        </div>
    )
}

export default Signup
