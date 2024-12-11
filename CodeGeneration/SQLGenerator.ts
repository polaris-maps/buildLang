import { AST } from "../AbstractSyntaxTrees/AST";
import { BooleanLiteral } from "../AbstractSyntaxTrees/BooleanLiteral";
import { BuildingDecl } from "../AbstractSyntaxTrees/BuildingDecl";
import { DoorType } from "../AbstractSyntaxTrees/DoorType";
import { FloorDecl } from "../AbstractSyntaxTrees/FloorDecl";
import { Floorplan } from "../AbstractSyntaxTrees/Floorplan";
import { Identifier } from "../AbstractSyntaxTrees/Identifier";
import { IntLiteral } from "../AbstractSyntaxTrees/IntLiteral";
import { Room } from "../AbstractSyntaxTrees/Room";
import { RoomDoor } from "../AbstractSyntaxTrees/RoomDoor";
import { Side } from "../AbstractSyntaxTrees/Side";
import { Visitor } from "../AbstractSyntaxTrees/Visitor";

export class SQLGenerator implements Visitor<number[], number[]> {

    private generatedCode: string[] = [];

    public generateCode(ast: AST | null) {
        if (ast != null) {
            ast.visit(this, []);
        }
    }

    public showGeneratedCode() {
        for (var line of this.generatedCode) {
            console.log(line);
        }
    }

    private generateCodeLine(line: string) {
        this.generatedCode.push(line);
    }

    ///////////////////////////////////////////////////////////////////////////////
    //
    // Floorplan
    //
    /////////////////////////////////////////////////////////////////////////////// 

    visitFloorplan(fp: Floorplan, arg: number[]): any {
        var node_count: number = 0;
        const parent_id: number = 0;

        let i = 0;
        while (i < fp.buildingList.size()) {
            const c = fp.buildingList.get(i);
            const updated = c.visit(this, [node_count, parent_id])
            node_count = updated[0];
            i++;
        }

        return [node_count, parent_id];
    }

    ///////////////////////////////////////////////////////////////////////////////
    //
    // DECLARATIONS
    //
    ///////////////////////////////////////////////////////////////////////////////

    visitBuilding(bd: BuildingDecl, arg: number[]): any {
        var node_count: number = arg[0];
        const parent_id: number = arg[1];

        this.generateCodeLine(`INSERT INTO Buildings (name) VALUES ("${bd.name}");`);
        
        let i = 0;
        while (i < bd.floorList.size()) {
            const c = bd.floorList.get(i);
            const updated = c.visit(this, [node_count, parent_id])
            node_count = updated[0];
            i++;
        }

        // TODO: insert building sources nodes up to updated node_count

        return [node_count, parent_id];
    }

    visitFloor(fd: FloorDecl, arg: number[]): any {
        var node_count: number = arg[0];
        const parent_id: number = arg[1];

        let i = 0;
        while (i < fd.roomList.size()) {
            const c = fd.roomList.get(i);
            const updated = c.visit(this, [node_count, parent_id])
            node_count = updated[0];
            i++;
        }
        return [node_count, parent_id];
    }

    ///////////////////////////////////////////////////////////////////////////////
    //
    // Other
    //
    ///////////////////////////////////////////////////////////////////////////////

    visitRoom(r: Room, arg: number[]): any {
        var node_count: number = arg[0];
        const parent_id: number = arg[1];

        this.generateCodeLine(`INSERT INTO Nodes (name, node_type) VALUES ("${r.name}", "room");`);
        node_count++;
        const room_id = node_count;

        if (r.sideList != null) {
            let i = 0;
            while (i < r.sideList.size()) {
                const c = r.sideList.get(i);
                const updated = c.visit(this, [node_count, room_id, i + 1])
                node_count = updated[0];
                i++;
            }
        }
        return [node_count, parent_id];
    }

    visitSide(s: Side, arg: number[]): any {
        var node_count: number = arg[0];
        const parent_id: number = arg[1];
        const source_side: number = arg[2];

        if (s.roomDoorList != null) {
            let i = 0;
            while (i < s.roomDoorList.size()) {
                const c = s.roomDoorList.get(i);
                const updated = c.visit(this, [node_count, parent_id])
                node_count = updated[0];
                this.generateCodeLine(`INSERT INTO Edges (source_node, target_node, source_side, source_rank) VALUES (${parent_id}, ${node_count}, ${source_side}, ${i + 1});`);
                i++;
            }
        }
        return [node_count, parent_id];
    }

    visitRoomDoor(rd: RoomDoor, arg: number[]): any {
        var node_count: number = arg[0];
        const parent_id: number = arg[1];

        const updated = this.visitRoom(rd.room, [node_count, parent_id]);
        node_count = updated[0];
        
        if (rd.doorType != null) {
            this.visitDoorType(rd.doorType, arg);
        } else {
            // insert a door
            this.generateCodeLine(`INSERT INTO Nodes (name, node_type) VALUES ("${rd.room.name} door", "door");`);
            node_count++;
            this.generateCodeLine(`INSERT INTO Edges (source_node, target_node, source_side, source_rank) VALUES (${updated[0]}, ${node_count}, 0, 0);`);
        }
        return [node_count, parent_id];
    }

    visitDoorType(dt: DoorType, arg: number[]): any {
        return arg;
    }

    ///////////////////////////////////////////////////////////////////////////////
    //
    // Terminals
    //
    ///////////////////////////////////////////////////////////////////////////////

    /**
     * Visit an Identifier node
     * @param id  Identifier node to visit
     * @param arg Indentation or prefix string
     */
    visitIdentifier(id: Identifier, arg: number[]): any {
        return arg;
    }


    /**
     * Visit an IntLiteral node
     * @param num IntLiteral node to visit
     * @param arg Indentation or prefix string
     */
    visitIntLiteral(num: IntLiteral, arg: number[]): any {
        return arg;
    }

    /**
     * Visit a BooleanLiteral node
     * @param bool BooleanLiteral node to visit
     * @param arg  Indentation or prefix string
     */
    visitBooleanLiteral(bool: BooleanLiteral, arg: number[]): any {
        return arg;
    }
}