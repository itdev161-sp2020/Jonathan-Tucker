import React, { useState } from 'react'
import axios from 'axios';

const Register = () => {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
        passwordConfirm: ''

    });

    const {name, email, password, passwordConfirm } = userData;

    const onChange = e => {
        const{ name,value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        })
    }
    const register = async () => {
        if (password !== passwordConfirm){
            console.log('Passwords do not match');
        }
        else{
            const newUser = {
                name: name,
                email: email,
                password: passwordConfirm,
            }
            try{
                const config = {
                    headers: {
                        'Content-Type':'application/json'
                    }
                }

                const body = JSON.stringify(newUser);
                const res = await axios.post('http://localhost:500/api/users', body,config);
                console.log(res.data);
            }catch (error){
                console.error(error.response.data);
                return;
            }
            }
         }
    }

    return(
        <div>
            <h2>Register</h2>
        <div>
        <input
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={e = onChange(e)} />
        </div>
        <div>
        <input
        type="text"
        placeholder="Email"
        name="name"
        value={Email}
        onChange={e = onChange(e)} />
        </div>
        <div>
         <input
        type="text"
        placeholder="Password"
        name="name"
        value={Password}
        onChange={e = onChange(e)} />
        </div>
        <div>
         <input
         type="text"
        placeholder="Confirm Password"
        name="name"
        value={PasswordConfirm}
        onChange={e = onChange(e)} />
        </div>
        <div>
            <button onClick={() => register()}>Register</button>
        </div>
        </div>
        
    )
    

    export default Register