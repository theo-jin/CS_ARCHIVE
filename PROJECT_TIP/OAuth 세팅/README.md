```
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: 'Github에서 발급받은ID',
      clientSecret: 'Github에서 발급받은Secret',
    }),
  ],
  secret : 'jwt생성시쓰는암호'
};
export default NextAuth(authOptions);
```

### 페이지에서 로그인된 유저의 정보를 출력하고싶다
server component의 경우
```
import { authOptions } from "@/pages/api/auth/[...nextauth].js"
import { getServerSession } from "next-auth"

export default function Page(){
  let session = await getServerSession(authOptions)
  if (session) {
    console.log(session)
  }
```


client component의 경우
```
(page.js 옆에 있는 layout.js)

'use client'

import { SessionProvider } from "next-auth/react"

export default function Layout({ children }){
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}
```
```
(page.js)

'use client'

import { useSession } from 'next-auth/react'
export default function Page(){
  let session  = useSession();
  if (session) {
    console.log(session)
  }
(생략)
```
