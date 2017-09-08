
//字面量的类型
function foo2(age:string, sex:'male'|'female'):{age:string,info:string}{
  return {age,info:'just fo fun'}
}
console.log(foo2('gogo','male'))

//泛型类型
function foo3<T>(age:T, sex?:string):{age:T,info:string}{
  return {age,info:'just fo fun'}
}
console.log(foo3('gogo','male'))
console.log(foo3({name:1},'male'))
console.log(foo3([1,2,3],'male'))

//带有约束的泛型类型
interface OurPerson{name:string}
function foo4<T extends OurPerson>(age:T):{age:T,info:string}{
  return {age,info:'just fo fun'}
}
console.log(foo4({name:'string',age:2}))