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

/**
 * Display AST in text form, one node per line, using indentation to show 
 * subordinate nodes below a parent node.
 * 
 * Performs an in-order traversal of AST, visiting an AST node of type XXX 
 * with a method of the form  
 * 
 *       visitXXX(astnode: XXX, arg: string): any
 *       
 *   where arg is a prefix string (indentation) to precede display of the AST node
 *   and a null object is returned as the result.
 *   The display is produced by printing a line of output at each node visited.
 */

export class ASTDisplay {
    static showPosition: boolean = false;

    /**
     * Print text representation of AST to stdout
     * @param ast root node of AST
     */
    showTree(ast: AST | null): void {
        console.log("======= AST Display =========================");
        if (ast != null) {
            ast.visit(this, "");
        }
        console.log("=============================================");
    }

    // Methods to format output

    /**
     * Display arbitrary text for a node
     * @param prefix  indent text to indicate depth in AST
     * @param text    preformatted node display
     */
    private show(prefix: string, text: string): void {
        console.log(prefix + text);
    }

    /**
     * Display AST node by name
     * @param prefix  spaced indent to indicate depth in AST
     * @param node    AST node, will be shown by name
     */
    private showNode(prefix: string, node: AST): void {
        console.log(prefix + node.toString());
    }

    /**
     * Quote a string
     * @param text    string to quote
     */
    private quote(text: string): string {
        return `"${text}"`;
    }

    /**
     * Increase depth in AST
     * @param prefix  current spacing to indicate depth in AST
     * @return  new spacing 
     */
    private indent(prefix: string): string {
        return prefix + "  ";
    }

    ///////////////////////////////////////////////////////////////////////////////
    //
    // Floorplan
    //
    /////////////////////////////////////////////////////////////////////////////// 

    visitFloorplan(fp: Floorplan, arg: string): any {
        this.showNode(arg, fp);
        this.show(arg, `  Floorplan [${fp.buildingList.size()}]`);
        const pfx = arg + "  . "; 
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
        this.showNode(arg, bd);
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
        this.showNode(arg, fd);
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
        this.showNode(arg, r);
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
        this.showNode(arg, s);

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
        this.showNode(arg, dt);
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
