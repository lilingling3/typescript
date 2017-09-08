import * as co from 'co';
import * as fs from 'fs';

interface IResult { content: string, readTime: number }
let readFile = (path: string) => {
  return (cb: ((err: any, result?: IResult) => void)) => {
    fs.readFile(path, (err, buffer) => {
      err ? cb(err) : cb(null, { content: buffer.toString(), readTime: Date.now() })
    })
  }
}

let readFile2 = (path: string) => {
  return new Promise<IResult>((resolve, reject) => {
    fs.readFile(path, (err, buffer) => {
      err ? reject(err) : resolve({ content: buffer.toString(), readTime: Date.now() })
    })
  });
}


let main = function* () {
  let result1 = yield readFile(__dirname + '/a.txt');
  console.log(result1.content);
  let result2 = yield readFile(__dirname + '/a.txt')
  console.log(result2.readTime);
  return 'with generator function';
}

let main2 = async () => {
  let result1 = await readFile2(__dirname + '/a.txt');
  console.log('------', result1.content);
  let result2 = await readFile2(__dirname + '/a.txt');
  console.log('------', result2.readTime);
  return 'with async function';
}

co(main()).then(data=>console.log(data)).catch(err=>console.log(err))
main2().then(data=>console.log(data)).catch(err=>console.log(err))