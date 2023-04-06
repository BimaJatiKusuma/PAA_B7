import Router, { useRouter } from "next/router";

export default function Home(){
  const router = useRouter()

  return (
    <div>
      <button type="button" onClick={()=>router.push('/auth/login')}>MULAI SEKARANG</button>
    </div>
  )
}