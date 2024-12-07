import { AST } from "./AST";
import { Floorplan } from "./Floorplan";

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

    // /**
    //  * Print text representation of AST to stdout
    //  * @param ast root node of AST
    //  */
    // showTree(ast: AST): void {
    //     console.log("======= AST Display =========================");
    //     ast.visit(this, "");
    //     console.log("=============================================");
    // }

    // // Methods to format output

    // /**
    //  * Display arbitrary text for a node
    //  * @param prefix  indent text to indicate depth in AST
    //  * @param text    preformatted node display
    //  */
    // private show(prefix: string, text: string): void {
    //     console.log(prefix + text);
    // }

    // /**
    //  * Display AST node by name
    //  * @param prefix  spaced indent to indicate depth in AST
    //  * @param node    AST node, will be shown by name
    //  */
    // private showNode(prefix: string, node: AST): void {
    //     console.log(prefix + node.toString());
    // }

    // /**
    //  * Quote a string
    //  * @param text    string to quote
    //  */
    // private quote(text: string): string {
    //     return `"${text}"`;
    // }

    // /**
    //  * Increase depth in AST
    //  * @param prefix  current spacing to indicate depth in AST
    //  * @return  new spacing 
    //  */
    // private indent(prefix: string): string {
    //     return prefix + "  ";
    // }

    // ///////////////////////////////////////////////////////////////////////////////
    // //
    // // PACKAGE
    // //
    // /////////////////////////////////////////////////////////////////////////////// 

    // visitPackage(prog: Floorplan, arg: string): any {
    //     this.showNode(arg, prog);
    //     this.show(arg, `  Floorplan [${prog.buildingDeclList.length}]`);
    //     const pfx = arg + "  . "; 
    //     for (const c of prog.classDeclList) {
    //         c.visit(this, pfx);
    //     }
    //     return null;
    // }

    // ///////////////////////////////////////////////////////////////////////////////
    // //
    // // DECLARATIONS
    // //
    // ///////////////////////////////////////////////////////////////////////////////

    // visitClassDecl(clas: ClassDecl, arg: string): any {
    //     this.showNode(arg, clas);
    //     this.show(this.indent(arg), `${this.quote(clas.name)} classname`);
    //     this.show(arg, `  FieldDeclList [${clas.fieldDeclList.length}]`);
    //     const pfx = arg + "  . "; 
    //     for (const f of clas.fieldDeclList) {
    //         f.visit(this, pfx);
    //     }
    //     this.show(arg, `  MethodDeclList [${clas.methodDeclList.length}]`);
    //     for (const m of clas.methodDeclList) {
    //         m.visit(this, pfx);
    //     }
    //     return null;
    // }

    // visitFieldDecl(f: FieldDecl, arg: string): any {
    //     this.show(arg, `(${f.isPrivate ? "private" : "public"}${f.isStatic ? " static) " : ") "}${f.toString()}`);
    //     f.type.visit(this, this.indent(arg));
    //     this.show(this.indent(arg), `${this.quote(f.name)} fieldname`);
    //     return null;
    // }

    // visitMethodDecl(m: MethodDecl, arg: string): any {
    //     this.show(arg, `(${m.isPrivate ? "private" : "public"}${m.isStatic ? " static) " : ") "}${m.toString()}`);
    //     m.type.visit(this, this.indent(arg));
    //     this.show(this.indent(arg), `${this.quote(m.name)} methodname`);

    //     const pdl = m.parameterDeclList;
    //     this.show(arg, `  ParameterDeclList [${pdl.length}]`);
    //     const pfx = arg + "  . ";
    //     for (const pd of pdl) {
    //         pd.visit(this, pfx);
    //     }

    //     const sl = m.statementList;
    //     this.show(arg, `  StmtList [${sl.length}]`);
    //     for (const s of sl) {
    //         s.visit(this, pfx);
    //     }
    //     return null;
    // }

    // visitParameterDecl(pd: ParameterDecl, arg: string): any {
    //     this.showNode(arg, pd);
    //     pd.type.visit(this, this.indent(arg));
    //     this.show(this.indent(arg), `${this.quote(pd.name)} parametername`);
    //     return null;
    // }

    // visitVarDecl(vd: VarDecl, arg: string): any {
    //     this.showNode(arg, vd);
    //     vd.type.visit(this, this.indent(arg));
    //     this.show(this.indent(arg), `${this.quote(vd.name)} varname`);
    //     return null;
    // }

    // // Similar methods for the other visit methods can be implemented...
}
