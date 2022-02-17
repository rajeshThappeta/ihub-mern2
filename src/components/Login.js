import { useEffect } from 'react'
import { useForm, useFormState } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import { userLogin } from '../slices/userSlice'
import { useNavigate } from 'react-router-dom'
import { clearState } from '../slices/userSlice'
//import { clearState } from '../slices/userSlice'

function Login() {


    let { register, handleSubmit, formState: { errors } } = useForm()
    let navigate = useNavigate()


    let dispath = useDispatch()
    let { isError, errMsg, loginStatus } = useSelector(state => state.user)



    const onFormSubmit = (userLoginObj) => {

        dispath(userLogin(userLoginObj))

    }

    

     //navigating to userprofile when loginStatus is true
    useEffect(() => {
      
        if (loginStatus == true) {
            //vnavigate to userprofile
            navigate("/userprofile")
        }

    }, [loginStatus, errMsg])

   
    return (
        <div className="row">
            <p className="display-1 text-center text-info">Login</p>
            <div className="col-12 col-sm-10 col-md-6 mx-auto">

                {/* to display invalid credentials details */}
                {isError && <p className='text-danger text-center fw-bold display-4'>{errMsg}</p>}

                <form className='form-style p-4' onSubmit={handleSubmit(onFormSubmit)}>

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
                    {/* submit button */}
                    <button type='submit' className='submitBtn d-block mx-auto'>
                        Login  <i className="fas fa-sign-in-alt ms-2"></i>
                    </button>

                </form>
            </div>
        </div>

    )
}

export default Login
