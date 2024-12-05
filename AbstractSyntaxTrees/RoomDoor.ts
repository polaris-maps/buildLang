import { SourcePosition } from "../SyntacticAnalyzer/SourcePosition";
import { AST } from "./AST";
import { DoorType } from "./DoorType";
import { Room } from "./Room";
import { SideList } from "./SideList";
import { Visitor } from "./Visitor";

export class RoomDoor extends AST{
    public room: Room;
    public doorType: DoorType | null;

    constructor(room: Room, doorType: DoorType | null, posn: SourcePosition) {
        super(posn);
        this.room = room;
        this.doorType = doorType;
    }

    public visit<A, R>(visitor: Visitor<A, R>, arg: A): R {
        return visitor.visitRoomDoor(this, arg);
    }

}