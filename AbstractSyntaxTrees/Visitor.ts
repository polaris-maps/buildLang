import { AST } from "./AST";
import { BooleanLiteral } from "./BooleanLiteral";
import { BuildingDecl } from "./BuildingDecl";
import { DoorType } from "./DoorType";
import { FloorDecl } from "./FloorDecl";
import { Floorplan } from "./Floorplan";
import { Identifier } from "./Identifier";
import { IntLiteral } from "./IntLiteral";
import { Room } from "./Room";
import { RoomDoor } from "./RoomDoor";
import { Side } from "./Side";

export interface Visitor<ArgType, ResultType> {
    // // placeholder, remove
    // visit(node: AST, arg: ArgType): ResultType;

    // Floorplan
    visitFloorplan(fp: Floorplan, arg: ArgType): ResultType;

    // Building
    visitBuilding(bd: BuildingDecl, arg: ArgType): ResultType;

    // Floor
    visitFloor(fd: FloorDecl, arg: ArgType): ResultType;

    // Room
    visitRoom(r: Room, arg: ArgType): ResultType;

    // Side
    visitSide(s: Side, arg: ArgType): ResultType;

    // RoomDoor
    visitRoomDoor(rd: RoomDoor, arg: ArgType): ResultType;

    // DoorType
    visitDoorType(dt: DoorType, arg: ArgType): ResultType;

    // Terminals
    visitBooleanLiteral(bl: BooleanLiteral, arg: ArgType): ResultType;
    visitIntLiteral(il: IntLiteral, arg: ArgType): ResultType;
    visitIdentifier(id: Identifier, arg: ArgType): ResultType;
}