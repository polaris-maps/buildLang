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

export class SQLGenerator {

    private generatedCode: string[] = [];

    generateCode(line: string) {
        this.generatedCode.push(line);
    }
    ///////////////////////////////////////////////////////////////////////////////
    //
    // Floorplan
    //
    /////////////////////////////////////////////////////////////////////////////// 

    visitFloorplan(fp: Floorplan, arg: string): any {
        let i = 0;
        while (i < fp.buildingList.size()) {
            const c = fp.buildingList.get(i);
            c.visit(this, pfx)
            i++;
        }
        return null;
    }

    ///////////////////////////////////////////////////////////////////////////////
    //
    // DECLARATIONS
    //
    ///////////////////////////////////////////////////////////////////////////////

    visitBuilding(bd: BuildingDecl, arg: string): any {
        this.show(arg, `  Building [${bd.floorList.size()}]`);
        const pfx = arg + "  . "; 
        let i = 0;
        while (i < bd.floorList.size()) {
            const c = bd.floorList.get(i);
            c.visit(this, pfx)
            i++;
        }
        return null;
    }

    visitFloor(fd: FloorDecl, arg: string): any {
        this.show(arg, `  Floor [${fd.roomList.size()}]`);
        const pfx = arg + "  . "; 
        let i = 0;
        while (i < fd.roomList.size()) {
            const c = fd.roomList.get(i);
            c.visit(this, pfx)
            i++;
        }
        return null;
    }

    ///////////////////////////////////////////////////////////////////////////////
    //
    // Other
    //
    ///////////////////////////////////////////////////////////////////////////////

    visitRoom(r: Room, arg: string): any {
        this.show(this.indent(arg), `${this.quote(r.name)} RoomName`);

        if (r.sideList != null) {
            this.show(arg, `  Room [${r.sideList.size()}]`);
            const pfx = arg + "  . "; 
            let i = 0;
            while (i < r.sideList.size()) {
                const c = r.sideList.get(i);
                c.visit(this, pfx)
                i++;
            }
        }
        return null;
    }

    visitSide(s: Side, arg: string): any {
        if (s.roomDoorList != null) {
            this.show(arg, `  Side [${s.roomDoorList.size()}]`);
            const pfx = arg + "  . "; 
            let i = 0;
            while (i < s.roomDoorList.size()) {
                const c = s.roomDoorList.get(i);
                c.visit(this, pfx)
                i++;
            }
        }
        return null;
    }

    visitRoomDoor(rd: RoomDoor, arg: string): any {
        // this.showNode(arg, rd);
        this.visitRoom(rd.room, arg);
        
        if (rd.doorType != null) {
            this.visitDoorType(rd.doorType, arg);
        }
        return null;
    }

    visitDoorType(dt: DoorType, arg: string): any {
        this.show(arg, `Hallway`);
        return null;
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
    visitIdentifier(id: Identifier, arg: string): any {
        this.show(arg, this.quote(id.spelling) + " " + id.toString());
        return null;
    }


    /**
     * Visit an IntLiteral node
     * @param num IntLiteral node to visit
     * @param arg Indentation or prefix string
     */
    visitIntLiteral(num: IntLiteral, arg: string): any {
        this.show(arg, this.quote(num.spelling) + " " + num.toString());
        return null;
    }

    /**
     * Visit a BooleanLiteral node
     * @param bool BooleanLiteral node to visit
     * @param arg  Indentation or prefix string
     */
    visitBooleanLiteral(bool: BooleanLiteral, arg: string): any {
        this.show(arg, this.quote(bool.spelling) + " " + bool.toString());
        return null;
    }
}