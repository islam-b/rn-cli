import { TypeNode } from "../types/type-node"

export class Queue {
    data:TypeNode[]
    constructor() {
        let initial = new TypeNode("") 
        this.data = [initial]
    }
    index = 0
    get current() {
        return this.data[this.index]
    }
    get previous() {
        return this.index >0 ?  this.data[this.index-1] : null
    } 
    
    get tree() {
        return this.data[0].typeArgs[0]
    }

    push(el: TypeNode) {
        this.data.push(el)
        this.index++
    }

    pop() { 
        this.data.pop()
        this.index-- 
    }
} 