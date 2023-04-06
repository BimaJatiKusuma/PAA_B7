import React, { useState } from 'react';
import { authPage } from '../../middlewares/authorizationPage'
import Router from 'next/router';
import Nav from '../../komponen/Nav';

export async function getServerSideProps(ctx){
    const {token} = await authPage(ctx);

    return {
        props: {
            token
        }
    }
}

export default function PostCreate(props){
    const [ fields, setFields ] = useState({
        title: '',
        content: ''
    });

    const [status, setStatus] = useState('normal')

    async function createHandler(e){
        e.preventDefault();

        setStatus('loading');

        const { token } = props

        const create = await fetch('/api/posts/create',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(fields),
        });

        if(!create.ok) return setStatus('error');

        const res = await create.json();
        
        setStatus('Success');

        Router.push('/posts')
    }
    
    function fieldHandler(e){
        const name = e.target.getAttribute('name');

        setFields({
            ...fields,
            [name]: e.target.value
        })
    }
    
    return (
        <div>
            <h1>Create a Post</h1>
            <Nav />
            <br></br>
            <form onSubmit={createHandler.bind(this)}>
                <input
                    onChange={fieldHandler.bind(this)}
                    type="text"
                    placeholder="nama_barang"
                    name="nama_barang">
                </input>
                <br></br>
                <input
                    onChange={fieldHandler.bind(this)}
                    type="text"
                    placeholder="deskripsi"
                    name="deskripsi">
                </input>
                <br></br>
                <br></br>
                <input
                    onChange={fieldHandler.bind(this)}
                    type="number"
                    placeholder="harga"
                    name="harga">
                </input>
                <br></br>

                <br></br>
                <input
                    onChange={fieldHandler.bind(this)}
                    type="number"
                    placeholder="stok"
                    name="stok">
                </input>
                <br></br>
                
                <input
                    onChange={fieldHandler.bind(this)}
                    type="text"
                    placeholder="url_gambar"
                    name="url_gambar">
                </input>
                <br></br>

                <button type="submit">Create Posts</button>

                <div>
                    Status: {status}
                </div>
            </form>

        </div>
    )
}