import React, {useState}  from 'react';

const Login = () =>{
    const [form, setForm] = useState({
        email: '',
        password: ''
    })
const [error, setError] = useState('')
    return <div>
        <form>
        <h2>Login</h2>
        <input type = 'email' placeholder = 'email' className = 'border p2 w-full mb-3'
        value = {form.email} onChange={(event) => setForm({
            ...form, email: event.target.value})} />
        </form>
    </div>
};

export default Login