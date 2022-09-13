import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Login from '../components/Login'
import AppHome from "../components/AppHome"
import { getSession,  useSession,  GetSessionParams } from "next-auth/react";

interface props{ 
  sessionDetails:{}
}

const Home: NextPage = ({sessionDetails}:any) => {

  // const session = "willliam"

  const { data: Session } = useSession();



  return (
    <div className="flex h-screen flex-col items-center justify-center py-2 bg-[#2f3233]">
      <Head>
        <title>BillyChat</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!Session ? (
         <Login/>
      ):(

      <AppHome/>
      )}

    </div>
  )
}

export default Home

export async function getServerSideProps(context: GetSessionParams) {
  return {
    props: {
      sessionDetails: await getSession(context),
    },
  };
}
