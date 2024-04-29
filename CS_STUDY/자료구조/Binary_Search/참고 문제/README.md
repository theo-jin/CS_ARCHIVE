```ts
//  문제 번호:https://www.acmicpc.net/problem/10815
// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/label
const readFileSync = require('fs').readFileSync;
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const [N, arr1, M, arr2] = readFileSync(filePath).toString().trim().split('\n');
const N1 = Number(N);
const M1 = Number(M);
const array1 = arr1
  .split(' ')
  .map(Number)
  .sort((a, b) => a - b);
const targetArr = arr2.split(' ').map(Number);

const ans = [];
// for (const target of targetArr) {
// 	ans.push(bs(target));
// }
// function bs(target) {
// 	let start = 0;
// 	let end = array1.length - 1;

// 	while (start <= end) {
// 		let mid = Math.floor((start + end) / 2);
// 		if (array1[mid] === target) {
// 			return 1;
// 		} else if (array1[mid] > target) {
// 			end = mid - 1;
// 		} else {
// 			start = mid + 1;
// 		}
// 	}
// 	return 0;
// }

a: for (let i = 0; i < M1; i++) {
  //label처리를 해서  44번 줄에서 처리해준다
  let start = 0;
  let end = array1.length - 1;

  while (start <= end) {
    let mid = Math.floor((start + end) / 2);
    if (array1[mid] === targetArr[i]) {
      ans.push(1);
      continue a; //라벨 처리를 해서 continue a사용
    } else if (array1[mid] > targetArr[i]) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }
  ans.push(0);
}

console.log(ans.join(' '));
```
