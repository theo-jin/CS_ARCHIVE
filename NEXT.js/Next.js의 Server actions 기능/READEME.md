# Next.js의 Server actions 기능

DB에 데이터를 저장, 수정 등을 하고 싶으면 당연히 서버를 거쳐야합니다.

그래서 page.js에 <form>같은 것도 만들고 서버 파일로 이동해서 거기에 API도 작성해놔야하는데

그게 귀찮으면 그냥 page.js 안에서 해결할 수 있는 기능도 있습니다.

Server actions 라고 부르는 시험적인 기능인데 Next.js 13.4 버전 이후부터 사용가능하고 어떻게 쓰는지 알아봅시다.

사전작업

1. Next.js 13.4 버전 이상에서만 작동해서

package.json 파일 열어서 'next' 부분 버전숫자가 13.4.0 이상으로 되어있는지 확인합시다.

아니라면 직접 13.4.0 혹은 그 이상으로 수정하고 저장하고

터미널 열어서 npm install 입력합시다.

2. next.config.js 파일 열어서 아래와 같은 코드를 추가해야합니다.

차이점만 잘 붙여넣기합시다.

아까 확인한 next 버전이 14.0.0 이상으로 되어있으면 따로 안해도 될걸요

```ts
module.exports = {
  experimental: {
    serverActions: true,
  },
};
```

DB에 데이터를 저장하자

DB에 글을 하나 저장한다고 칩시다.

그럼 보통은 1. DB에 글넣어주는 서버 API를 만들고 2. 거기로 요청을 날리면 되겠지만

Server actions라는 기능을 이용하면 server/client component 안에서 한 번에 처리할 수 있습니다.

```ts
/app/2eirtw / page.js;

//1. 페이지만들었음
export default async function Write2() {
  //3. 서버기능만들었음
  async function handleSubmit(formData) {
    'use server';
    console.log(formData);
    console.log(formData.get('title'));
  }

  //2.폼만들었음
  return (
    <form action={handleSubmit}>
      <input type="text" name="title" />
      <button type="submit">Submit</button>
    </form>
  );
}
```

1. /write2 폴더 안에 page.js 만들고

2. 폼을 하나 만들었습니다.

그리고 action={ } 속성에 중괄호치고 함수를 넣을 수 있는데 그럼 폼 전송시 함수가 실행됩니다.

3. 근데 그 함수안에 'use server' 를 작성해두면 그 함수 내용을 자동으로 서버 API로 만들어줍니다.

그럼 이제 함수안에 있는 코드는 유저에게 노출되는 코드가 아니라 서버코드기 때문에

거기서 맘대로 폼내용을 DB에 저장하거나 검사하거나 그러셔도 됩니다.

```ts
import { connectDB } from '@/util/database';

export default async function Write2() {
  async function handleSubmit(formData) {
    'use server';
    const db = (await connectDB).db('forum');
    await db
      .collection('post_test')
      .insertOne({ title: formData.get('title') });
  }

  return (
    <form action={handleSubmit}>
      <input type="text" name="title" />
      <button type="submit">Submit</button>
    </form>
  );
}
```

폼전송시 MongoDB에 저장하라고 해봤더니 진짜 저장 잘됩니다.

진짠지 테스트해봅시다.

그래서 서버 API 만드는게 귀찮으면 여기서 한 번에 처리해도 된다는 소리입니다.

'use server' 넣은 코드는 서버 API로 자동으로 변환되어서 유저에게 전달되고 그러지 않습니다.

(참고)

<button formAction={함수}>버튼</button>

이렇게 버튼이나 <input> 안에서 formAction 열어서 작성해도 됩니다.

단 <form>태그 안에 있는 것들만 가능

```ts
import { connectDB } from '@/util/database';

export default async function Write2() {
  //DB에서 데이터 뽑아서 보여주기
  const db = (await connectDB).db('forum');
  let result = await db.collection('post_test').find().toArray();

  async function handleSubmit(formData) {
    'use server';
    const db = (await connectDB).db('forum');
    await db
      .collection('post_test')
      .insertOne({ title: formData.get('post1') });
  }

  return (
    <form action={handleSubmit}>
      <input type="text" name="post1" />
      <button type="submit">Submit</button>
      {result ? result.map((a) => <p>글제목 : {a.title}</p>) : null}
    </form>
  );
}
```

DB에 데이터가 잘 저장되어있는지 확인할 겸 데이터도 뽑아서 보여줘봅시다.

### 근데 폼 전송 눌러도 새로고침해야 새로운 글이 보이는데요

action={ } 써놓으면 폼전송시 새로고침이 되지 않습니다.

새로고침하려면 router.refresh()를 쓰거나 서버컴포넌트라면 revalidatePath, revalidateTag 이런걸 써야합니다.

```ts
import { revalidatePath } from 'next/cache'; //페이지 상단에 추가

async function handleSubmit(formData) {
  'use server';
  const db = (await connectDB).db('forum');
  await db.collection('post_test').insertOne({ title: formData.get('post1') });
  revalidatePath('/write2');
}
```

revalidatePath('/URL') 함수는 실은 해당 /URL에 있던 캐시를 삭제하고 다시 생성해주는 함수인데

페이지를 다시 로드해주는 기능도 있습니다.

근데 새로고침이 아니라 차이점만 바꿔주는 이쁜 새로고침입니다.

그래서 이거 사용하면 server component만으로도 html을 SPA처럼 이쁘게 샥샥 업데이트가 가능합니다.

client component 에서 사용하려면

```ts
(action1.js)

'use server'

export async function action1() {
폼 전송시 실행할 서버코드~~
}
```

js파일 아무데나 만들고 'use server' 넣고 폼전송시 동작할 서버코드를 작성합니다.

```ts
'use client';

import { action1 } from './action1';

export default function ClientComponent() {
  return (
    <form action={action1}>
      <button type="submit">Add to Cart</button>
    </form>
  );
}
```

그리고 client component에서 그걸 가져와서 action={ } 안에 넣으면 됩니다.

그래서 결론은

이제 글 생성/수정/삭제기능 만들 때도 컴포넌트 안에서 모든 걸 해결할 수 있기 때문에

서버 API를 따로 만들 일 없이 거의 모든 기능을 컴포넌트 안에서 개발할 수 있습니다.

실은 예전에 php 아니면 자바의 jsp 같은걸 사용했을 때

html 파일 안에 서버코드를 마구 작성해서 개발했었는데

그때는 이런 식의 개발방법은 매우 더럽다고 사람들이 싫어하긴 했습니다.

하지만 결국 유행은 돌고도는 것인지 그거랑 개발방식이 비슷하군요

하지만 이번엔 서버코드도 자바스크립트 문법이라 다행


