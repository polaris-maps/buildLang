import { SourcePosition } from "../SyntacticAnalyzer/SourcePosition";
import { AST } from "./AST";
import { DoorType } from "./DoorType";
import { Room } from "./Room";
import { SideList } from "./SideList";
import { Visitor } from "./Visitor";

export class RoomDoor extends AST{
    public name: string;
    public type: null;
    public room: Room;
    public doorType: DoorType;

    constructor(n: string, t: null, room: Room, doorType: DoorType, posn: SourcePosition) {
        super(posn);
        this.name = n;
        this.type = t;
        this.room = room;
        this.doorType = doorType;
    }

    public visit<A, R>(visitor: Visitor<A, R>, arg: A): R {
        return visitor.visitRoomDoor(this, arg);
    }

}