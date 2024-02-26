# react-query 사용법

## setting

1. 터미널에 입력
```
npm install @tanstack/react-query 
```

2. index.js에 이거 설정해준다. 
```ts
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'  //1번
const queryClient = new QueryClient()   //2번

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <QueryClientProvider client={queryClient}>  //3번
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </QueryClientProvider>
); 
```
3. 컴포넌트에서 react-query로 ajax요청 
```ts
import { useQuery } from '@tanstack/react-query';

function App(){
  let result = useQuery(['작명'], ()=>
    axios.get('주소')
    .then((a)=>{ return a.data })
  )
}
```