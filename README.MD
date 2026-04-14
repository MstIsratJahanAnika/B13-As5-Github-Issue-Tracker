# 1. What is the difference between var, let, and const?

- **var**: Old way to declare a variable, re-assignable and re-declarable, a variable declared inside a block can be called from outside, possibility to create bug.

- **let**: Introduced in ES6, modern, block-scoped, not re-declarable but re-assignable.

- **const**: Introduced in ES6, modern, block-scoped, neither Re-declarable nor re-assignable.


# 2.  What is the spread operator (...)?

Spread Operator is used to spread or expand an array or object, separating each value of any array or object

# 3. What is the difference between map(), filter(), and forEach()?
- **map()**: Transform elements from an array and make a new array with the elements, and return it.
```javascript
const num = [1, 2, 3];
const res = num.map(num => num * 2);

console.log(res); // [2, 4, 6]
```
- **filter()**: Selects and filters elements from an array based on a specific condition, makes a new array with the filtered elements, and returns it.
```javascript
const num = [1, 2, 3, 4];
const res = num.filter(num => num > 2);

console.log(res); // [3, 4]
```
- **forEach()**: Loop through the array, checking each element every time 
```javascript
const num = [1, 2, 3];

num.forEach(n =>{
  console.log(n*2);
});
```

# 4. What is an arrow function?
- A method of writing a function using ⇒ this sign
if the function contains multiple lines then it have to return something.
- It is a modern way to declare a function rather than traditional way.
```javascript
const add = (a, b) => {
  return a + b;
};
```
# 5. What are template literals?
- Template literals are backtick(``), which are used to write strings, insert variables, or write an HTML block of code in JavaScript.
```javascript
const issue = { label: "Bug", status: "open" };

const card = `
  <h2>${issue.label}</h2>
  <p>Status: ${issue.status}</p>
`;
```