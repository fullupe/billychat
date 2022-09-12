import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"

import {ChatContextProvider} from "../context/chatContext"
import React from 'react'

function MyApp({ Component, pageProps:{ session, ...pageProps } }: AppProps) {
  return(
    <SessionProvider session={session}>
      <ChatContextProvider>
     <Component {...pageProps} />
      </ChatContextProvider>
     </SessionProvider>
     
     )
}

export default MyApp
