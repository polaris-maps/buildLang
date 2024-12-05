import { Building } from "./Building";

export class BuildingList implements Iterable<Building> {
    private buildingList: Building[];

    [Symbol.iterator](): Iterator<Building> {
        let index = 0;

        return {
            next(): IteratorResult<Building> {
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
        this.buildingList = [];
    }

    public add(b: Building): void {
        this.buildingList.push(b);
    }

    public get(i: number): Building {
        return this.buildingList[i];
    }

    public size(): number {
        return this.buildingList.length;
    }

}