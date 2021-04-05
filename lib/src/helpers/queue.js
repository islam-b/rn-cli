"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Queue = void 0;
const type_node_1 = require("../types/type-node");
class Queue {
    constructor() {
        this.index = 0;
        let initial = new type_node_1.TypeNode("");
        this.data = [initial];
    }
    get current() {
        return this.data[this.index];
    }
    get previous() {
        return this.index > 0 ? this.data[this.index - 1] : null;
    }
    get tree() {
        return this.data[0].typeArgs[0];
    }
    push(el) {
        this.data.push(el);
        this.index++;
    }
    pop() {
        this.data.pop();
        this.index--;
    }
}
exports.Queue = Queue;
//# sourceMappingURL=queue.js.map