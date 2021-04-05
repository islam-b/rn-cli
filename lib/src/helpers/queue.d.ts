import { TypeNode } from "../types/type-node";
export declare class Queue {
    data: TypeNode[];
    constructor();
    index: number;
    get current(): TypeNode;
    get previous(): TypeNode | null;
    get tree(): TypeNode;
    push(el: TypeNode): void;
    pop(): void;
}
