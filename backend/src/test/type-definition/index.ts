

//用type定义
type TPerson = { name: string; age: number; address: { zone: string, street: string } }
//用interface定义
interface IPerson { name: string; age: number; address: { zone: string, street: string } }
//用class定义
class Person {
  name: string; age: number; address: { zone: string, street: string };
  constructor(name: string, age: number, address: { zone: string, street: string }) {
    this.name = name;
    this.age = age;
    this.address = address;
  }
}

let p1 = { name: 'ss', age: 22, address: { zone: '2', street: 'ss' } };
let p2: TPerson = { name: 'ss', age: 22, address: { zone: '2', street: 'ss' } };
let p3: IPerson = { name: 'ss', age: 22, address: { zone: '2', street: 'ss' } };
let p4: Person = { name: 'ss', age: 22, address: { zone: '2', street: 'ss' } };
let p5: Person = new Person('dfd', 11, { zone: '1', street: 'dd' });
let p6: Person = { name: 'ss', age: 22, address: { zone: '2', street: 'ss' } };
console.log(p5.address);

//基于type太死板，基于class声明太重啰嗦, 基于interface可灵活扩展
interface IPersonAsia extends IPerson{ hobby:string[]|string }//联合类型
let p7: IPersonAsia = { name: 'ss', age: 22, address: { zone: '2', street: 'ss' }, hobby:'singing'};

interface IPersonAffrica extends IPerson{ weight:number,[prop:string]:any }//动态索引
let p8: IPersonAffrica = { name: 'ss', age: 22, address: { zone: '2', street: 'ss' }, weight:222, color:'black'};

interface IPersonAmerica extends IPerson{ height?:number }//可选类型
let p9: IPersonAmerica = { name: 'ss', age: 22, address: { zone: '2', street: 'ss' }, height:10};
let p10: IPersonAmerica = { name: 'ss', age: 22, address: { zone: '2', street: 'ss' }};

interface IPersonEarth<T> extends IPerson{ unknown:T }//泛型
let p11: IPersonEarth<string> = { name: 'ss', age: 22, address: { zone: '2', street: 'ss' },unknown:'well'};
let p12: IPersonEarth<{atk:number,def:number}> = { name: 'ss', age: 22, address: { zone: '2', street: 'ss' },unknown:{atk:22,def:100}};

//类型的多重继承
interface A{a:number}
interface B{b:string}
interface C extends A,B{c:string}
let c:C = {a:1,b:'d',c:'d'};

interface IPersonMars extends IPerson{ unknown:A&B }//交叉类型
let p13: IPersonMars = { name: 'ss', age: 22, address: { zone: '2', street: 'ss' },unknown:{a:1,b:'dd'}};

//用type声明声明方法
type Tfunc = (p1:string,p2:number)=>number

//用接口声明声明方法
interface Tfunc2 {(p1:string,p2:number):number}