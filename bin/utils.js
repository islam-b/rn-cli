
const fs = require("fs")
const babel = require("@babel/core")
const chalk = require("chalk")

function showHelp() {                                                             
    
    console.log('\nOptions:\r')  
    console.log('    -b, --base-url\t' + '      ' + 'Base url of the abp project.' + '\t\t' + '[string]\r')  
    console.log('    -m, --module\t' + '      ' + 'Taret modu00le.' + '\t\t' + '[string]\r')  
    console.log('    -r, --rootnamespace\t' + '      ' + 'Root namespace.' + '\t\t' + '[string]\r')  
    console.log('    -t, --target\t' + '      ' + 'Target folder to copy files.' + '\t\t' + '[string]\r')  
    console.log('\t--help\t\t      ' + 'Show help.' + '\t\t\t' + '[string]\n')  
}

function validateArgs(args) {
    //if (args.b == null || args.b == "") return false
    if (args.m == null || args.m == "") return false
    //if (args.r == null || args.r == "") return false
    if (args.t == null || args.t == "") return false
    return true
}



function getEnvironment() {
    try {
        let envPath = process.cwd() + "" 
        let data = babel.transformFileSync(envPath + "\\Environment.js", {
            plugins: ["@babel/plugin-transform-modules-commonjs"]
        }); 
        let pathToTemp = process.cwd()+"/env.temp.js"
        fs.writeFileSync(pathToTemp, "let __DEV__=true;\n"+data.code)
        let enVars = require(pathToTemp).getEnvVars()
        fs.unlinkSync(pathToTemp)
        return enVars
    } catch (e) {
        throw new Error(chalk.bgRed("Unable to read environment file."))
    }
    
}


module.exports = {  showHelp, validateArgs, getEnvironment   };