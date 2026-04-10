# 现代语法支持

Jukkit 内置 **Rspack + Babel** 构建工具链，编译目标为 ES5.1，可以在代码中愉快地使用现代 JavaScript 语法。

## 支持的语法

- ✅ 箭头函数 `() => {}`
- ✅ 模板字符串 `` `Hello ${name}` ``
- ✅ 解构赋值 `const { name } = obj`
- ✅ 展开运算符 `...args`
- ✅ `let` / `const`
- ✅ `async/await`
- ✅ `class` 类语法

## 示例

```javascript
// 使用箭头函数和模板字符串
const greet = (name) => `Hello, ${name}!`;

// 使用解构赋值
const { name, level } = playerInfo;

// 使用 async/await
async function fetchData(url) {
    const response = await fetch(url);
    return response.json();
}

// 使用 class
class PlayerManager {
    constructor() {
        this.players = new Map();
    }

    addPlayer(name, data) {
        this.players.set(name, data);
    }
}
```
