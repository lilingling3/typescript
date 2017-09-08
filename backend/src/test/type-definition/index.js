//用class定义
var Person = /** @class */ (function () {
    function Person(name, age, address) {
        this.name = name;
        this.age = age;
        this.address = address;
    }
    return Person;
}());
var p1 = { name: 'ss', age: 22, address: { zone: '2', street: 'ss' } };
var p2 = { name: 'ss', age: 22, address: { zone: '2', street: 'ss' } };
var p3 = { name: 'ss', age: 22, address: { zone: '2', street: 'ss' } };
var p4 = { name: 'ss', age: 22, address: { zone: '2', street: 'ss' } };
var p5 = new Person('dfd', 11, { zone: '1', street: 'dd' });
var p6 = { name: 'ss', age: 22, address: { zone: '2', street: 'ss' } };
console.log(p5.address);
var p7 = { name: 'ss', age: 22, address: { zone: '2', street: 'ss' }, hobby: 'singing' };
var p8 = { name: 'ss', age: 22, address: { zone: '2', street: 'ss' }, weight: 222, color: 'black' };
var p9 = { name: 'ss', age: 22, address: { zone: '2', street: 'ss' }, height: 10 };
var p10 = { name: 'ss', age: 22, address: { zone: '2', street: 'ss' } };
var p11 = { name: 'ss', age: 22, address: { zone: '2', street: 'ss' }, unknown: 'well' };
var p12 = { name: 'ss', age: 22, address: { zone: '2', street: 'ss' }, unknown: { atk: 22, def: 100 } };
var c = { a: 1, b: 'd', c: 'd' };
var p13 = { name: 'ss', age: 22, address: { zone: '2', street: 'ss' }, unknown: { a: 1, b: 'dd' } };
