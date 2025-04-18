import React, { useEffect, useState } from 'react';
import { login } from '../services/api'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Main/Header';
const Login = () => {


    const [form, setForm] = useState({
        username: "",
        password: ""
    });
    const navigate = useNavigate();



    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            return navigate('/');
        }
    }, []);

    const [error, setError] = useState(null);


    const hanldeChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    // const hanldeSubmit = async () => {
    //     console.log("form", form);
    //     const result = await login(form);
    //     console.log("form", result);


    // }

    const hanldeSubmit = async (e) => {
        e.preventDefault(); // Prevent the form from submitting via traditional HTTP request.
        // setError(null);

        try {
            const result = await login(form);
            console.log('Received data from login:', result.data.data);

            if (result.status === 200 && result.data.data && result.data.status === 200) {
                localStorage.setItem('user', JSON.stringify(result.data.data));
                navigate('/');
                return;
            }
            if (result?.data?.status === 201 || result?.data?.status === 202) {
                setError(result.data.data);
                toast(result.data.message);
                return;
            }






            if (result.data.status === 500) {
                setError(result.data.data);
                return
            }


            // Handle a successful login, such as redirecting to another page.
        } catch (error) {
            if (error.response) {
                console.log("Server responded with:", error.response.status, error.response.data);
            }
            setError("Invalid username or password");
            console.error("Login error:", error);
        }

    };

    return (
        <>
            <Header />

            <div className='container'>
                <ToastContainer />
                <div className="row justify-content-center mt-4 ">
                    <div className="col-lg-5 card border-primary mt-4">
                        <div className="card-body  ">
                            <h4 className='card-title'>Login Now</h4>
                            <form onSubmit={hanldeSubmit} className='d-grid gap-1'>

                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1" className="form-label mt-2">Username</label>
                                    <input
                                        type="text"
                                        onChange={hanldeChange}
                                        className="form-control"
                                        name='username'
                                        id="exampleInputusername" aria-describedby="nameHelp"
                                        placeholder="Enter username"
                                    />
                                    {error?.username && (
                                    <small id="" className='form-text text-danger'>{error.username.msg}</small>
                                    )
                                    }

                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1" className="form-label mt-2">Password</label>
                                    <input
                                        type="password"
                                        onChange={hanldeChange}
                                        name='password'
                                        className="form-control" id="exampleInputPassword1"
                                        placeholder="Password"
                                        autoComplete="off"

                                    />
                                    {error?.password && (
                                    <small id="" className='form-text text-danger'>{error.password.msg}</small>
                                    )
                                    }

                                </div>

                                <button type="submit" onClick={hanldeSubmit} className="btn btn-primary btn-lg">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;