import React, { useState } from 'react';
import { authPage } from '../../middlewares/authorizationPage'
import Router from 'next/router';
import Nav from '../../komponen/Nav';

export async function getServerSideProps(ctx){
    const { token } = await authPage(ctx);

    const postReq = await fetch('http://localhost:3000/api/posts/',
        {headers:{'Authorization':'Bearer '+ token}})

    const posts = await postReq.json();
    // console.log(posts)

    return { props: {
        token,
        posts: posts.data,
    } }
}

export default function PostIndex(props){

const [posts, setPosts] = useState(props.posts);
// console.log(posts)

async function deleteHandler(id, e){
    e.preventDefault();

    const {token} = props;

    const ask = confirm('Apakah yakin untuk menghapus?');
    if(ask) {
        const deletePost = await fetch('/api/posts/delete/' + id, {
          method: 'DELETE',
          headers: {
              'Authorization': 'Bearer ' + token
          }
        });
    
        const res = await deletePost.json();
        
        const postsFiltered = posts.filter(post => {
            return post.id !== id && post;
        })
        
        setPosts(postsFiltered);
    
    };

}

function editHandler(id){
    Router.push('/posts/edit/'+id)
}
    return (
        <div>
            <h1>POSTS</h1>
            <Nav />
            { posts.map(post =>
                (
                    <div key={post.id}>
                        <h1>{post.nama_barang}</h1>
                        <p>{post.deskripsi}</p>
                        <h3>{post.harga}</h3>
                        <h4>{post.stok}</h4>
                        <img src={`${post.url_gambar}`}/>
                        <div>
                            <button onClick={editHandler.bind(this, post.id)}>Edit</button>
                            <button onClick={deleteHandler.bind(this, post.id)}>Delete</button>
                        </div>

                        <hr />
                        <br></br>
                    </div>
                )
            )}

        </div>
    )
}