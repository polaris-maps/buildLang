import { BuildingDecl } from "./BuildingDecl";

export class BuildingDeclList implements Iterable<BuildingDecl> {
    private buildingDeclList: BuildingDecl[];

    [Symbol.iterator](): Iterator<BuildingDecl> {
        let index = 0;

        return {
            next(): IteratorResult<BuildingDecl> {
                if (index < this.buildingDeclList.length) {
                    return {
                        value: this.buildingDeclList[index++],
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
        this.buildingDeclList = [];
    }

    public add(b: BuildingDecl): void {
        this.buildingDeclList.push(b);
    }

    public get(i: number): BuildingDecl {
        return this.buildingDeclList[i];
    }

    public size(): number {
        return this.buildingDeclList.length;
    }

}