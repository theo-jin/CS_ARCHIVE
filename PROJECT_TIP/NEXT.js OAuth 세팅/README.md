NextAuth 라이브러리 셋팅
pages/api/auth/[...nextauth].js 파일 만들어서 이런 코드를 작성 셋팅

```ts
import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: 'Github에서 발급받은ID',
      clientSecret: 'Github에서 발급받은Secret',
    }),
  ],
  secret: 'jwt생성시쓰는암호',
};
export default NextAuth(authOptions);
```

### 페이지에서 로그인된 유저의 정보를 출력하고싶다

server component의 경우
getServerSession() 가져오고 authOptions 가져와서 컴포넌트안에서 사용하면 그 자리에 유저 정보가 남는다.

```ts
import { authOptions } from "@/pages/api/auth/[...nextauth].js"
import { getServerSession } from "next-auth"

export default function Page(){
  let session = await getServerSession(authOptions)
  if (session) {
    console.log(session)
  }
```

client component의 경우
<SessionProvider>라는걸 import 해와서 부모 컴포넌트를 감싸면 자식 컴포넌트들은 useSession() 이라는 함수를 이용가능

```ts
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

▲ 어떤 page.js 옆에 layout.js 만들어서 이렇게 <SessionProvider>로 감싸놓으면

지금부터 그 안에 들어가는 client component 컴포넌트들은 로그인된 유저 정보를 출력해볼 수 있다.

```ts
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

useSession() 쓰면 그 자리에 지금 로그인한 유저 정보가 남기 때문에 변수에 담아놓고 쓰면 됨.

근데 보통 server component에서 유저정보 가져와서 client component로 전송해주는게 나을 수 있다.

왜냐면 useSession 함수는 html 다 보여주고나서 한 박자 늦게 실행될수 있기 때문.
