import { ErrorReporter } from "./ErrorReporter";
import { InputStream } from "./InputStream";
import { Scanner } from "./SyntacticAnalyzer/Scanner";

// read in file
import { readFileSync } from 'fs';

const file = readFileSync('./sn_fb.bl', 'utf-8');

// parse file
const myInputStream = new InputStream(file);
const myErrorReporter = new ErrorReporter();
const myScanner = new Scanner(myInputStream, myErrorReporter);
var i = 0
while(i < 100){
    console.log(myScanner.scan());
    i++;
}
