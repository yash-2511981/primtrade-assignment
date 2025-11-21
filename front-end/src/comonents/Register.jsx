import { useState } from 'react';
import useApi from '../hooks/useApi';
import { useUser } from '../hooks/useUser';
import { REGISTER_API } from '../utils/apiEndpoints';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const { post } = useApi()
    const { setUser } = useUser();
    const navigate = useNavigate();

    const [formData, setformData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setformData({
            ...formData,
            [name]: value
        });
    }

    const validateInputs = () => {
        const { email, password, name } = formData;
        if (!email || !password || !name) {
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

        if (name.length < 2) {
            alert("Name must be at least 2 characters long");
            return false;
        }

        return true;
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (validateInputs()) {
            post(REGISTER_API, formData).then(response => {
                if (response.success) {
                    const userData = response.data;
                    setUser(userData);
                    navigate('/user-home');
                } else {
                    alert(response.error || "Registration failed");
                }
            }).catch((err) => {
                console.error("Registration error:", err);
                alert("Registration failed. Please try again.");
            });
        }
    }

    return (
        <div className='h-screen w-full flex justify-center items-center'>
            <form onSubmit={onSubmit} className='flex flex-col h-fit max-w-md p-8 rounded-2xl shadow-lg gap-6'>
                <h2 className='text-2xl font-bold text-center'>Register</h2>
                <div className='flex flex-col gap-3'>
                    <label htmlFor="name">Name</label>
                    <input type="text" placeholder='Name' required name='name' className='border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' onChange={handleInputChange} />
                </div>

                <div className='flex flex-col gap-3'>
                    <label htmlFor="email">Email</label>
                    <input type="email" placeholder='Email' required name='email' className='border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' onChange={handleInputChange} />
                </div>

                <div className='flex flex-col gap-3'>
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder='Password' required className='border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' name="password" onChange={handleInputChange} />
                </div>

                <button type="submit" className='bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition'>Register</button>
                <span>Already Registred? <Link to="/login">click here to login</Link></span>
            </form>

        </div>
    )
}

export default Register
