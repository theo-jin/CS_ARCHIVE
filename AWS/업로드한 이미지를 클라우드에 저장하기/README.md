# 업로드된 이미지를 클라우드에 저장하기(AWS S3)

이전 강의에서 설명했듯이 업로드된 파일(또는 런타임에 생성된 기타 파일)을 로컬 파일 시스템에 저장하는 것은 이상적이지 않습니다. 실행 중인 NextJS 애플리케이션에는 해당 파일을 사용할 수 없기 때문입니다.

대신AWS S3과 같은 클라우드 파일 저장소를 통해 이러한 파일(예: 업로드된 이미지)을 저장하는 것이 좋습니다.

AWS S3은(환경설정에 따라) 파일을 저장하고 제공할 수 있는 AWS 서비스입니다. 이 서비스는 무료로 시작할 수 있지만 예기치 않는 상황을 대비해서 가격페이지를 확인하는 것이 좋습니다.

이번 강의에는 AWS S3을 사용하여 업로드된 사용자 이미지를 저장하고 NextJS 웹사이트에 이미지를 제공할 수 있는 방법에 대해 설명하겠습니다.

## 1. AWS 계정 만들기

AWS S3을 사용하기 위해 AWS 계정이 필요합니다. 여기에서 계정을 생성할 수 있습니다.

## 2. S3 버킷 생성

계정을 만들고 로그인한 후 S3 콘솔로 이동하여 이른바 ‘버킷(bucket)’을 생성해야 합니다.

‘버킷’은 파일을 저장할 수 있는 용기입니다 (주석: 이미지를 포함한 모든 파일을 저장할 수 있습니다).

모든 버킷은 전 세계적으로 고유한 이름이어야 하므로 창의적인 이름이 지어야 합니다. 예를 들어 <your-name>-nextjs-demo-users-image와 같은 이름을 사용할 수 있습니다.

저는 maxschwarzmueller-nextjs-demo-users-image를 예시로 사용할 것입니다.

버킷을 만들 때 모든 기본 설정을 확인할 수 있으며 이름만 여러분이 설정해야 합니다.

## 3. 더미 이미지 파일 업로드

버킷이 생성되었으니 파일을 추가할 수 있습니다. => 이전에 public/images 폴더에 로컬로 저장한 더미 이미지.

그러기 위해, 생성한 버킷을 선택하고 ‘업로드(Upload)’ 버튼을 클릭합니다. 그런 다음, 이미지들을 상자에 끌어 놓고 업로드를 확인합니다.
![alt text](image.png)
그런 다음, 모든 이미지가 버킷에 포함됩니다:
![alt text](image-1.png)

## 4. 이미지를 제공할 버킷 환경설정

더미 이미지를 업로드했으니 NextJS 웹사이트에서 로딩될 수 있도록 버킷 환경설정을 해야 합니다.

기본 설정으로 인해 불가능하기 때문입니다! S3의 기본 설정은 ‘잠겨져(locked down)’있어서 그 안의 파일들이 보호되고 다른 사람이 접근할 수 없습니다.

그러나 우리의 목적을 위해 모든 사람이 이미지를 볼 수 있도록 버킷 설정을 업데이트해야 합니다.

이를 수행하려면 첫 번째 단계로 ‘권한(Permission)’ 탭을 클릭하고 ‘공용 액세스 차단(Block public access)’을 ‘편집(Edit)’합니다:

그런 다음 ‘모든 공용 액세스 차단(Block all public access)’ 체크박스와 이와 동반된 모든 체크박스를 비활성화하고 ‘변경사항 저장(Save Changes)’을 선택합니다.

확인 오버레이가 나타나면 ‘confirm’을 입력합니다.

그게 전부가 아닙니다. 다음이자 마지막 단계에 이른바 ‘버킷 정책(Bucket Policy)’을 추가해야 합니다. 이는 AWS 전용 정책 문서로 버킷에 저장된 객체의 권한을 관리할 수 있습니다.

‘권한’ 탭에 있는 ‘모든 공용 액세스 차단’ 영역 바로 아래에 이와 같은 ‘버킷 정책’을 추가할 수 있습니다:

‘편집’을 클릭한 후 다음 버킷 정책을 상자에 삽입합니다:

```ts
{
"Version": "2012-10-17",
"Statement": [
{
"Sid": "PublicRead",
"Effect": "Allow",
"Principal": "_",
"Action": [
"s3:GetObject",
"s3:GetObjectVersion"
],
"Resource": [
"arn:aws:s3:::DOC-EXAMPLE-BUCKET/_"
]
}
]
}
```

DOC-EXAMPLE-BUCKET 을 여러분의 버킷 이름(저의 경우에는maxschwarzmueller-nextjs-demo-users-image)으로 변경합니다. 그리고 ‘변경사항 저장’을 클릭합니다.

이제 버킷은 해당 객체 중 하나를 가리키는 URL을 가진 모든 사용자에게 그 안에 있는 모든 객체에 대한 액세스 권한을 부여하도록 설정됩니다.

때문에 이제 세상과 공유하고 싶지 않은 어떤 파일도 버킷에 추가하면 안 됩니다!

모두 작동하는지 테스트하려면 버킷에 업로드한 이미지 중 하나를 클릭합니다.

그리고 ‘Object URL’을 클릭합니다. 열린다면 즉, 이미지를 볼 수 있다면, 모두 정상적으로 설정된 것입니다.
![alt text](image-2.png)

## 5. S3 이미지를 사용하기 위한 NextJS 코드 업데이트

이제 S3을 통해 이미지가 저장+제공되었으니 NextJS 앱에서 이미지를 로딩할 차례입니다.

첫 번째 단계로 public/images 폴더를 삭제하여 public/이라는 빈 폴더만 남도록 합니다.

이제 NextJS 프로젝트에 있는 .next 폴더를 삭제하고 localhost:3000/meals을 방문하면 이미지가 없는 식사들이 보입니다.

이미지를 다시 불러오기 위해 첫 단계로 initdb.js 파일을 업데이트하여 데이터베이스를 편집합니다:

이미지의 속성 값을 image: '/images/burger.jpg'에서 image: 'burger.jpg'와 같은 형식으로 모든 식사를 변경합니다.

대안으로 업데이트된 initdb.js파일이 첨부되어 있습니다.

그 다음 MealItem 컴포넌트가 있는 components/meals/meal-item.js 파일에 들어가 <Image> src를 업데이트합니다:

```ts
<Image
  src={`https://maxschwarzmueller-nextjs-demo-users-image.s3.amazonaws.com/${image}`}
  alt={title}
  fill
/>
```

물론 여러분의 S3 URL/버킷명을 사용해야 합니다!

새로운 src값은 버킷 객체로 연결되는 S3 URL (즉, 테스트 목적으로 클릭한 URL으로, 이미지 파일명이 끝에 없어야 합니다)을 포함한 문자열(string)입니다. 실제 이미지 이름은 ${image}을 통해 동적으로 삽입됩니다.

참고: 이 작업은 S3 버킷에 저장된 이미지의 이름이 initdb.js 파일에 참조된 경우에만 수행됩니다!

또한 app/meals/[mealSlug]/page.js 파일을 업데이트하고 이 페이지의 이미지도 S3에서 가져오는지 확인해야 합니다:

```ts
<Image
  src={`https://maxschwarzmueller-nextjs-demo-users-image.s3.amazonaws.com/${meal.image}`}
  alt={meal.title}
  fill
/>
```

물론 여러분의 S3 URL/버킷명을 사용해야 합니다!

이제 데이터베이스 데이터를 재설정하려면 meals.db 파일을 삭제하고(즉, SQLite 데이터베이스 파일 삭제) node initdb.js를 다시 실행하여 업데이트된 이미지 값으로 초기화합니다.

그 다음 개발 서버(npm run dev)를 다시 시작하면 /meals 페이지를 방문할 때 오류가 발생하는 것을 볼 수 있습니다:

Error: Invalid src prop (https://maxschwarzmueller-nextjs-demo-users-image.s3.amazonaws.com/burger.jpg) on `next/image`, hostname "maxschwarzmueller-nextjs-demo-users-image.s3.amazonaws.com" is not configured under images in your `next.config.js`

## 6. 이미지 소스로 S3 허용

기본값으로 NextJS는<Image> 컴포넌트를 사용할 때 외부 URL을 허용하지 않기 때문에 오류가 발생하는 것입니다.

이와 같은 오류를 제거하려면 이러한 URL을 명시적으로 허용해야 합니다.

이는next.config.js file을 편집하여 해결할 수 있습니다:

```ts
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'maxschwarzmueller-nextjs-demo-users-image.s3.amazonaws.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};
```

물론 여러분의 S3 URL/버킷명을 사용해야 합니다!

이 remotePatternsconfig을 통해 특정 S3 URL을 이미지의 유효한 소스로 사용 가능합니다.

이 config 파일을 업데이트+저장하면 /meals를 방문하여 이미지들을 다시 볼 수 있게 됩니다.

## 7. 업로드된 이미지를 S3에 저장

이제 더미 이미지를 다시 볼 수 있게 되었으니 유저가 생성한(즉, 업로드한) 이미지를 S3에 ‘포워딩(forward)’할 시간입니다.

이는 AWS에서 제공하는 패키지인 @aws-sdk/client-s3 package를 통해 가능합니다. 이 패키지는 S3과 상호 작용할 수 있는 기능을 제공합니다(예: 특정 버킷에 파일 저장).

npm install @aws-sdk/client-s3을 통해 해당 패키지를 설치합니다.

그 다음 lib/meals.js 파일로 이동하여 AWS S3 SDK(파일 상단에 위치)를 가져옵니다:

```ts
import { S3 } from '@aws-sdk/client-s3';
```

그 다음 이 줄을 추가하여 초기화합니다(예: db 객체가 생성된 줄 바로 위):

```ts
const s3 = new S3({
  region: 'us-east-1',
});
const db = sql('meals.db'); // <- this was already there!
```

이제 거의 다 됐습니다!

이제 saveMeal() 함수를 편집하고 로컬 파일 시스템에 이미지 저장과 관련된 모든 코드를 제거합니다.

대신 다음 코드를 추가합니다:

```ts
s3.putObject({
  Bucket: 'maxschwarzmueller-nextjs-demo-users-image',
  Key: fileName,
  Body: Buffer.from(bufferedImage),
  ContentType: meal.image.type,
});
```

물론 여러분의 S3 URL/버킷명을 사용해야 합니다!

또한 meal.image 하에 이미지 파일 이름을 저장해야 합니다:

```ts
meal.image = fileName;
```

마지막 saveMeal() 함수는 다음과 같습니다:

```ts
export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  const extension = meal.image.name.split('.').pop();
  const fileName = `${meal.slug}.${extension}`;

  const bufferedImage = await meal.image.arrayBuffer();

  s3.putObject({
    Bucket: 'maxschwarzmueller-nextjs-demo-users-image',
    Key: fileName,
    Body: Buffer.from(bufferedImage),
    ContentType: meal.image.type,
  });

  meal.image = fileName;

  db.prepare(
    `    INSERT INTO meals
      (title, summary, instructions, creator, creator_email, image, slug)
    VALUES (
      @title,
      @summary,
      @instructions,
      @creator,
      @creator_email,
      @image,
      @slug
    )
 `
  ).run(meal);
}
```

## 8. NextJS 백엔드 AWS 접근 권한 부여

이제 마지막이지만 아주 중요한 단계인 NextJS 앱 S3 접근 권환 부여입니다.

버킷의 내용을 모두에게 제공하도록 S3을 설정했습니다.

하지만 모든 사람이 버킷에 작성하거나 버킷 내용을 변경할 수 있도록 설정하지 않았습니다. 또 설정해서도 안 됩니다!

그러나 현재의 S3 AWS SDK를 통한 NextJS 앱은 이것을 하려고 합니다!

앱에 적절한 권한을 부여하려면 앱에 대한 AWS 접근 키를 설정해야 합니다.

이는 루트(root) NextJS 프로젝트에 .env.local 파일을 추가함으로써 할 수 있습니다. 이 파일은 NextJS에 의해 자동으로 읽히고 거기에

설정된 환경 변수를 여러분의 앱의 백엔드(!) 부분에서 사용할 수 있게 됩니다.

다음에서 NextJS 앱 환경 변수 설정에 대한 자세한 내용을 확인할 수 있습니다: https://nextjs.org/docs/app/building-your-application/configuring/environment-variables

이 .env.local파일에 두개의 키-값 쌍(key-value pairs)을 추가해야 합니다:

```ts
AWS_ACCESS_KEY_ID=<your aws access key>
AWS_SECRET_ACCESS_KEY=<your aws secret access key>
```

해당 접근 코드는 브라우저에 있는 AWS 콘솔 내부에서 얻을 수 있습니다. AWS 콘솔 오른쪽 상단에 있는 여러분의 계정 이름을 클릭하고 ‘보안 자격 증명(Security Credentials)’을 클릭하여 부여됩니다.

‘접근 키(Access Key)’ 부분으로 스크롤하여 새 접근 키를 생성합니다. 값을 복사하여 .env.local 파일에 붙여 넣고 이 키는 다른 사람과 절대 공유하면 안됩니다! Git의 다른 사용자에게 공유하는 등의 행동을 하면 안 됩니다.

더 자세한 내용은 다음에서 볼 수 있습니다:

https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html

이 모든 것을 마치고 새로운 식사를 생성하고 이미지를 업로드하면 /meals에서 드디어 볼 수 있게 됩니다. 심지어 제작 중에도 가능합니다! 이 이미지들이 S3에 저장되었기 때문입니다!

완성되고 조정된 코드가 첨부되어 있습니다. 그러나 .env.local 파일은 포함되어 있지 않다는 점 참고하시기 바랍니다. 첨부된 코드를 실행하려면 각자의 자격 증명을 사용해 여러분이 직접 추가해야 합니다.

https://github.com/mschwarzmueller/nextjs-complete-guide-course-resources/blob/main/attachments/02-nextjs-essentials/s3-file-storage.zip

https://github.com/mschwarzmueller/nextjs-complete-guide-course-resources/blob/main/code/02-nextjs-essentials/32-s3-file-storage/initdb.js
