import { AST } from "./AST";
import { Building } from "./Building";
import { Floorplan } from "./Floorplan";

export interface Visitor<ArgType, ResultType> {
    // // placeholder, remove
    // visit(node: AST, arg: ArgType): ResultType;

    // Floorplan
    visitFloorplan(fp: Floorplan, arg: ArgType): ResultType;

    // Building
    visitBuilding(b: Building, arg: ArgType): ResultType;
}