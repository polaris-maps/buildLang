import { Floor } from "./Floor";

export class FloorList implements Iterable<Floor> {
    private floorList: Floor[];

    [Symbol.iterator](): Iterator<Floor> {
        let index = 0;

        return {
            next(): IteratorResult<Floor> {
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
        this.floorList = [];
    }

    public add(b: Floor): void {
        this.floorList.push(b);
    }

    public get(i: number): Floor {
        return this.floorList[i];
    }

    public size(): number {
        return this.floorList.length;
    }

}