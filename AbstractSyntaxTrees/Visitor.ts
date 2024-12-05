import { AST } from "./AST";
import { Building } from "./Building";
import { Floor } from "./Floor";
import { Floorplan } from "./Floorplan";
import { Room } from "./Room";
import { Side } from "./Side";

export interface Visitor<ArgType, ResultType> {
    // // placeholder, remove
    // visit(node: AST, arg: ArgType): ResultType;

    // Floorplan
    visitFloorplan(fp: Floorplan, arg: ArgType): ResultType;

    // Building
    visitBuilding(b: Building, arg: ArgType): ResultType;

    // Floor
    visitFloor(b: Floor, arg: ArgType): ResultType;

    // Room
    visitRoom(b: Room, arg: ArgType): ResultType;

    // Side
    visitSide(b: Side, arg: ArgType): ResultType;
}