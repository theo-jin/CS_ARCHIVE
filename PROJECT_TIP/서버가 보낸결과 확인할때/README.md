```
fetch('/URL')
.then((r)=>r.json())
.then((result)=>{ console.log(result) })
```
서버에서 보낸 결과가 object, array 자료면 이렇게 출력. 


```
fetch('/URL')
.then((r)=>{
  if(r.status == 200) {
    return r.json()
  } else {
    //서버가 에러코드전송시 실행할코드
  }
})
.then((result)=>{ 
  //성공시 실행할코드
}).catch((error)=>{
  //인터넷문제 등으로 실패시 실행할코드
  console.log(error)
})
```
fetch 코드가 길고 귀찮아서 편리하게 바꿔주는 axios같은 라이브러리 설치해서 쓰는 경우가 많은데,Nextjs 13부터는 fetch가 특별한 기능이 추가되어있기 때문에
server component 함수 안에서 fetch() 쓸 일이 있을 경우 그거 그대로 쓰는게 좋다. 

client component 에선 axios든 fetch든 상관없다. 
