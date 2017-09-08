//字面量的类型
function foo2(age, sex) {
    return { age: age, info: 'just fo fun' };
}
console.log(foo2('gogo', 'male'));
//泛型类型
function foo3(age, sex) {
    return { age: age, info: 'just fo fun' };
}
console.log(foo3('gogo', 'male'));
console.log(foo3({ name: 1 }, 'male'));
console.log(foo3([1, 2, 3], 'male'));
function foo4(age) {
    return { age: age, info: 'just fo fun' };
}
console.log(foo4({ name: 'string', age: 2 }));
