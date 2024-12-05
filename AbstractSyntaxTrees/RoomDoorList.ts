import { RoomDoor } from "./RoomDoor";

export class roomDoorList implements Iterable<RoomDoor> {
    private roomDoorList: RoomDoor[];

    [Symbol.iterator](): Iterator<RoomDoor> {
        let index = 0;

        return {
            next(): IteratorResult<RoomDoor> {
                if (index < this.roomDoorList.length) {
                    return {
                        value: this.roomDoorList[index++],
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
        this.roomDoorList = [];
    }

    public add(b: RoomDoor): void {
        this.roomDoorList.push(b);
    }

    public get(i: number): RoomDoor {
        return this.roomDoorList[i];
    }

    public size(): number {
        return this.roomDoorList.length;
    }

}