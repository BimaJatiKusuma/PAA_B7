import Link from 'next/link';
import Cookie from 'js-cookie';
import Router from 'next/router';

export default function Nav(){
    function logoutHandler(e){
        e.preventDefault();

        Cookie.remove('token');

        Router.replace('/auth/login')
    }

    return(
        <>
         <Link href="/posts/">BERANDA</Link>
         <br></br>
         <Link href="/posts/create">BUAT POSTINGAN BARU</Link>
         <br></br>
         <a href="#" onClick={logoutHandler.bind(this)}>Keluar</a>
        </>
    )
}