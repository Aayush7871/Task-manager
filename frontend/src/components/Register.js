import React, { useEffect, useState } from 'react'
import { register } from '../services/api.js';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Header from './Main/Header.js';

const Register = ({ user, setUser }) => {

    const [form, setForm] = useState({
        name: "",
        username: "",
        email: "",
        password: ""
    })
    const navigate = useNavigate();

    const [error, setError] = useState(null);

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            return navigate('/');
        }
    }, []);
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };


    const handleSubmit = async () => {
        const result = await register(form);
        console.log("handlesubmitres : ", result);

        if (result.status === 200) {

            if (result.data.status === 201) {
                setError(result.data.data);
                toast(result.data.message);
                return;
            }

            if (result.data.status == 200) {
                // localStorage.setItem('user', JSON.stringify(result.data.data));
                toast("Register Successfully");
                navigate("/login");
            }else{
                toast("Register with differentuser")
            }
        } else {
            toast("Someting went wrong, Please try again");
            // console.log("error else ");
        }

    };

    return (
        <>
            <Header />
            <div className='container'>
                <ToastContainer />
                <div className="row justify-content-md-center mt-4">
                    <div className="col-lg-5 card border-primary mb-3">
                        <div className="card-header h4 text-center">Register an Account</div>

                        <div className="card-body">
                            <div className="form-group">
                                <label className='col-form-label mt-2'>Name</label>
                                <input
                                    type="text"
                                    name='name'
                                    onChange={handleChange}
                                    placeholder='Enter your Name'
                                    className='form-control'
                                />

                                {error?.name && (
                                    <small id="" className='form-text text-danger'>{error.name.msg}</small>
                                )
                                }
                            </div>
                            <div className="form-group">
                                <label className='col-form-label mt-2'>Username</label>
                                <input
                                    type="text"
                                    name='username'
                                    onChange={handleChange}
                                    placeholder='Enter username'
                                    className='form-control'
                                />
                                {error?.username && (
                                    <small id="" className='form-text text-danger'>{error.username.msg}</small>
                                )
                                }
                            </div>
                            <div className="form-group">
                                <label className='col-form-label mt-2'>Email</label>
                                <input
                                    type="text"
                                    name='email'
                                    onChange={handleChange}
                                    placeholder='Enter email'
                                    className='form-control'
                                />
                                {error?.email && (
                                    <small id="" className='form-text text-danger'>{error.email.msg}</small>
                                )
                                }
                            </div>
                            <div className="form-group">
                                <label className='col-form-label mt-2'>Password</label>
                                <input
                                    type="password"
                                    name='password'
                                    onChange={handleChange}
                                    placeholder='Enter password'
                                    className='form-control'
                                />
                                {error?.password && (
                                    <small id="" className='form-text text-danger'>{error.password.msg}</small>
                                )
                                }
                            </div>

                            <div className="rowjustify-content-md-center form-group mt-2">
                                <button type='button'
                                    onClick={handleSubmit}
                                    className='col-sm-6 btn btn-outline-secondary center'>Register</button>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Register;