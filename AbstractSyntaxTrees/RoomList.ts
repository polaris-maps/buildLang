import { Room } from "./Room";

export class RoomList implements Iterable<Room> {
    private roomList: Room[];

    [Symbol.iterator](): Iterator<Room> {
        let index = 0;

        return {
            next(): IteratorResult<Room> {
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
        this.roomList = [];
    }

    public add(b: Room): void {
        this.roomList.push(b);
    }

    public get(i: number): Room {
        return this.roomList[i];
    }

    public size(): number {
        return this.roomList.length;
    }

}