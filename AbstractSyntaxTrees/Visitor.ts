import { AST } from "./AST";

export interface Visitor<A, R> {
    visit(node: AST, arg: A): R;
}