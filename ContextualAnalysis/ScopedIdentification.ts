import { Declaration } from "../AbstractSyntaxTrees/Declaration";
import { Stack } from "../Stack";

export class ScopedIdentification {
    public IDTable: Stack<Map<string, Declaration>>;

    public openScope() {
        this.IDTable.push(new Map<string, Declaration>());
    }

    public closeScope() {
        this.IDTable.pop();
    }

    public addDeclaration(name: string, decl: Declaration) {
        var topMost = this.IDTable.peek();
        topMost?.set(name, decl);
    } 
    
    public findDeclaration() {
        // TODO
    }
}