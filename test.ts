import { ErrorReporter } from "./ErrorReporter";
import { InputStream } from "./InputStream";
import { Scanner } from "./SyntacticAnalyzer/Scanner";
import { Parser } from "./SyntacticAnalyzer/Parser";
import { ASTDisplay } from "./AbstractSyntaxTrees/ASTDisplay";
import { readFileSync } from 'fs';
import { SQLGenerator } from "./CodeGeneration/SQLGenerator";


// read in file
// const filePath = './Examples/sn_fb_room_code.bl';
const filePath = './Examples/sn_fb_global_rooms.bl';
// const filePath = './Examples/small.bl';
const file = readFileSync(filePath, 'utf-8');
const myInputStream = new InputStream(file);

// scan file
const myErrorReporter = new ErrorReporter();
const myScanner = new Scanner(myInputStream, myErrorReporter);
// var i = 0
// while(i < 100){
//     console.log(myScanner.scan());
//     i++;
// }

// parse file
const myParser = new Parser(myScanner, myErrorReporter);
const myAST = myParser.parse();
console.log("done parsing");
const myASTDisplay = new ASTDisplay();
myASTDisplay.showTree(myAST);

// generate code
const mySQLGenerator = new SQLGenerator();
mySQLGenerator.generateCode(myAST);
mySQLGenerator.showGeneratedCode();