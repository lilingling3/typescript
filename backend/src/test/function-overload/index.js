function foo(x, y) {
    if (y === undefined) {
        if (typeof x == 'number') {
            return 'call method foo(param:number)';
        }
        else if (typeof x == 'string') {
            return 'call method foo(param:string)';
        }
        else if (Array.isArray(x)) {
            return 'call method foo(param:string[])';
        }
        else {
            throw new Error('no implement');
        }
    }
    else {
        return 'call method foo(param:string[],param2:string)';
    }
}
console.log(foo(1));
console.log(foo('s'));
console.log(foo(['s']));
console.log(foo(['s'], 's'));
