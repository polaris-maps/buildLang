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
    visitBuilding(b: BuildingDecl, arg: ArgType): ResultType;

    // Floor
    visitFloor(b: FloorDecl, arg: ArgType): ResultType;

    // Room
    visitRoom(b: Room, arg: ArgType): ResultType;

    // Side
    visitSide(b: Side, arg: ArgType): ResultType;

    // RoomDoor
    visitRoomDoor(b: RoomDoor, arg: ArgType): ResultType;

    // DoorType
    visitDoorType(b: DoorType, arg: ArgType): ResultType;

    // Terminals
    visitBooleanLiteral(b: BooleanLiteral, arg: ArgType): ResultType;
    visitIntLiteral(b: IntLiteral, arg: ArgType): ResultType;
    visitIdentifier(b: Identifier, arg: ArgType): ResultType;
}