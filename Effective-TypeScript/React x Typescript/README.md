# 리액트에서 타입스크립트 쓰기

1.설치 
```
npm i @types/node @types/react @types/react-dom @types/jest 
```

2.tsconfig.json설정.
```
{
    "compilerOptions": {
        "target": "ESNext",
        "module": "CommonJS",
        "strict": true,
        "allowJs": true,
        "esModuleInterop": true,
        "jsx": "react-jsx"
    },
    "include": ["src"]
}
```
3. 모든 js파일 jsx로 변경
4. 개별파일을 하나씩 tsx로 변경
