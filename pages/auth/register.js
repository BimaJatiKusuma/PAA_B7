import React, {useState} from 'react';
import { unauthPage } from '../../middlewares/authorizationPage';
import Link from 'next/link';
// import { Router } from 'next/router';
import Router from 'next/router';

export async function getServerSideProps(ctx){
    unauthPage(ctx);

    return { props:{} }
}


export default function Register(){
    const [fields, setFields] = useState({
        email: '',
        password: ''
    })
    
    const [status, setStatus]=useState('normal')

    async function registerHandler(e){
        e.preventDefault();
        
        setStatus('loading');

        const registerReq = await fetch('/api/auth/register',{
            method: 'POST',
            body: JSON.stringify(fields),
            headers:{
                'Content-Type': 'application/json'
            }
        });

        if(!registerReq.ok) return setStatus('error'+registerReq.status)

        const registerRes = await registerReq.json();

        setStatus('success')
        Router.push('login')
        alert("Akun berhasil dibuat")
    }
    
    function fieldHandler(e){
        const name = e.target.getAttribute('name')
        setFields({
            ...fields,
            [name]: e.target.value
        })
        
    }

    return (
        <div>
            <h1>REGISTRASI</h1>

            <form onSubmit={registerHandler.bind(this)}>
                <input name="email" type="text" onChange={fieldHandler.bind(this)} placeholder="Email"/>
                <br></br>
                <input name="password" type="password" onChange={fieldHandler.bind(this)} placeholder="Pasword"/>
                <br></br>
                <button type="submit">
                    Daftar
                </button>

                <div>{status}</div>
                <p>Sudah memiliki akun? </p><Link href={"login"}>masuk</Link>
            </form>
        </div>
    )
}