import { ErrorReporter } from "./ErrorReporter";
import { InputStream } from "./InputStream";
import { Scanner } from "./SyntacticAnalyzer/Scanner";
import { Parser } from "./SyntacticAnalyzer/Parser";
import { ASTDisplay } from "./AbstractSyntaxTrees/ASTDisplay";

// read in file
import { readFileSync } from 'fs';

const file = readFileSync('./sn_fb_room_code.bl', 'utf-8');

// parse file
const myInputStream = new InputStream(file);
const myErrorReporter = new ErrorReporter();
const myScanner = new Scanner(myInputStream, myErrorReporter);
// var i = 0
// while(i < 100){
//     console.log(myScanner.scan());
//     i++;
// }
const myParser = new Parser(myScanner, myErrorReporter);
const myAST = myParser.parse();
console.log("done parsing");
const myASTDisplay = new ASTDisplay();
myASTDisplay.showTree(myAST);