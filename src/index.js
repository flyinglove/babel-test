require('core-js')
const foo = (a, b) => {
    return Promise.resolve().finally();
}

foo(1, 2)