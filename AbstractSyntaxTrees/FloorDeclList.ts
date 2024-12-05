import { FloorDecl } from "./FloorDecl";

export class FloorDeclList implements Iterable<FloorDecl> {
    private floorDeclList: FloorDecl[];

    [Symbol.iterator](): Iterator<FloorDecl> {
        let index = 0;

        return {
            next(): IteratorResult<FloorDecl> {
                if (index < this.floorDeclList.length) {
                    return {
                        value: this.floorDeclList[index++],
                        done: false
                    };
                } else {
                    return {
                        done: true,
                        value: null
                    };
                }
            }
        };
    }

    constructor() {
        this.floorDeclList = [];
    }

    public add(b: FloorDecl): void {
        this.floorDeclList.push(b);
    }

    public get(i: number): FloorDecl {
        return this.floorDeclList[i];
    }

    public size(): number {
        return this.floorDeclList.length;
    }

}