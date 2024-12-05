import { Side } from "./Side";

export class SideList implements Iterable<Side> {
    private sideList: Side[];

    [Symbol.iterator](): Iterator<Side> {
        let index = 0;

        return {
            next(): IteratorResult<Side> {
                if (index < this.items.length) {
                    return {
                        value: this.items[index++],
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
        this.sideList = [];
    }

    public add(b: Side): void {
        this.sideList.push(b);
    }

    public get(i: number): Side {
        return this.sideList[i];
    }

    public size(): number {
        return this.sideList.length;
    }

}