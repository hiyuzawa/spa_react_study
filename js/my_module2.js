export default class MyModule2 {
    constructor(name) {
        this.name =  name
    }
    sayHello() {
        return `Hello My Name is ${this.name}`;  // ES2015のTemplate構文
    }
}
