import React, { useState } from 'react';
import { authPage } from '../../../middlewares/authorizationPage'
import Router from 'next/router';
import Nav from '../../../komponen/Nav';

export async function getServerSideProps(ctx){
    const {token} = await authPage(ctx);

    const { id } = ctx.query
    
    const postReq = await fetch('http://localhost:3000/api/posts/detail/' + id,
    {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })

    const res = await postReq.json();

    // console.log(res);

    return {
        props: {
            token,
            post: res.data
        }
    }
}

export default function PostEdit(props){
    const {post} = props;
    // console.log(props.post)
    const [ fields, setFields ] = useState({
        nama_barang: post.nama_barang,
        deskripsi: post.deskripsi,
        harga: post.harga,
        stok: post.stok,
        url_gambar: post.url_gambar
    });

    const [status, setStatus] = useState('normal')

    async function updateHandler(e){
        e.preventDefault();

        setStatus('loading');

        const { token } = props

        const update = await fetch('/api/posts/update/'+post.id,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(fields),
        });

        if(!update.ok) return setStatus('error');

        const res = await update.json();
        
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
            <h1>EDIT POSTINGAN</h1>
            <Nav />
            <p>post id: {post.id}</p>
            <br></br>
            <form onSubmit={updateHandler.bind(this)}>
                <input
                    onChange={fieldHandler.bind(this)}
                    type="text"
                    placeholder="nama_barang"
                    name="nama_barang"
                    defaultValue={post.nama_barang}>
                </input>
                <br></br>
                <input
                    onChange={fieldHandler.bind(this)}
                    type="text"
                    placeholder="deskripsi"
                    name="deskripsi"
                    defaultValue={post.deskripsi}>
                </input>
                <br></br>
                <input
                    onChange={fieldHandler.bind(this)}
                    type="number"
                    placeholder="harga"
                    name="harga"
                    defaultValue={post.harga}>
                </input>
                <br></br>
                <input
                    onChange={fieldHandler.bind(this)}
                    type="number"
                    placeholder="stok"
                    name="stok"
                    defaultValue={post.stok}>
                </input>
                <br></br>
                <input
                    onChange={fieldHandler.bind(this)}
                    type="text"
                    placeholder="url_gambar"
                    name="url_gambar"
                    defaultValue={post.url_gambar}>
                </input>
                <br></br>

                <button type="submit">Simpan Perubahan</button>

                <div>
                    Status: {status}
                </div>
            </form>

        </div>
    )
}