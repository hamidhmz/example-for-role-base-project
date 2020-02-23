class test{
    constructor(){
        console.log('constructor')
    }
    test1(){
        console.log('test1')
    }
}

const testVar = new test
console.log('--------');
testVar.test1()