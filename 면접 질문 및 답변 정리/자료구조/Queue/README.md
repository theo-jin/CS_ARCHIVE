```ts
class Stack {
	constructor() {
		this.storage = {};
		this.top = 0;
	}
	size() {
		return this.top;
	}
	push(element) {
		this.storage[this.top] = element;
		this.top++;
	}
	pop() {
		if (this.size() <= 0) {
			return;
		}
		const insideStack = this.storage[this.top - 1];
		delete this.storage[this.top - 1];
		this.top--;
		return insideStack;
	}
}
```