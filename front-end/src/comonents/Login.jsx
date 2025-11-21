import { useEffect, useState } from 'react'
import useApi from '../hooks/useApi';
import { GET_USER_API, LOGIN_API } from '../utils/apiEndpoints';
import { useUser } from '../hooks/useUser';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {

    const { post, get } = useApi()
    const { setUser } = useUser();
    const navigate = useNavigate();

    const [formData, setformData] = useState({
        email: '',
        password: ''
    });

    useEffect(() => {
        get(GET_USER_API)
            .then((result) => {
                if (result?.data) {
                    setUser(result.data);
                    setTimeout(() => {
                        navigate("/")
                    }, 100);
                }
            })
            .catch(() => {
                setUser(null);
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setformData({
            ...formData,
            [name]: value
        });
    }

    const validateInputs = () => {
        const { email, password } = formData;
        if (!email || !password) {
            alert("Please fill in all fields");
            return false;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            alert("Please enter a valid email");
            return false;
        }

        if (password.length < 6) {
            alert("Password must be at least 6 characters long");
            return false;
        }

        return true;
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (validateInputs()) {
            post(LOGIN_API, formData).then(response => {
                if (response.success) {
                    const userData = response.data?.user || response.data;
                    setUser(userData);
                    navigate(userData?.role === 'admin' ? '/admin-home' : '/user-home');
                } else {
                    alert(response.error || "Login failed");
                }
            }).catch((err) => {
                console.error("Login error:", err);
                alert("Login failed. Please try again.");
            });
        }
    }

    return (
        <div className='h-screen w-full flex justify-center items-center'>
            <form onSubmit={onSubmit} className='flex flex-col h-fit max-w-lg p-8 rounded-2xl shadow-lg gap-6'>
                <h2 className='text-2xl font-bold text-center'>Login</h2>
                <div className='flex flex-col gap-3'>
                    <label htmlFor="email">Email</label>
                    <input type="email" placeholder='Email' required name='email' className='border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' onChange={handleInputChange} />
                </div>

                <div className='flex flex-col gap-3'>
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder='Password' required className='border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' name="password" onChange={handleInputChange} />
                </div>

                <button type="submit" className='bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition'>Login</button>
                <span>New user? <Link to="/register">click here to register</Link></span>
            </form>

        </div>
    )
}

export default Login
