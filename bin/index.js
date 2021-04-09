#! /usr/bin/env node
const { Executor } = require("../lib/executor")
const yargs = require("yargs");
const fs = require("fs")
const babel = require("@babel/core")
const chalk = require("chalk")

const usage = "\nUsage: abp-generate-proxy-rn -m <module> -t <target folder> ";

yargs.usage(usage)
    // .option("b", { alias: "base-url", describe: "Base url of the abp project.", type: "string", demandOption: true })
    .option("m", { alias: "module", describe: "Name of the module.", type: "string", demandOption: true })
    // .option("r", { alias: "rootnamespace", describe: "Root namespace.", type: "string", demandOption: true })
    .option("t", { alias: "target", describe: "Target folder to save files.", type: "string", demandOption: true })
    .help(false)
    .argv;

function showHelp() {

    console.log('\nOptions:\r')
    //console.log('    -b, --base-url\t' + '      ' + 'Base url of the abp project.' + '\t\t' + '[string]\r')  
    console.log('    -m, --module\t' + '      ' + 'Taret modu00le.' + '\t\t' + '[string]\r')
    //console.log('    -r, --rootnamespace\t' + '      ' + 'Root namespace.' + '\t\t' + '[string]\r')  
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
        let pathToTemp = process.cwd() + "/env.temp.js"
        fs.writeFileSync(pathToTemp, "let __DEV__=true;\n" + data.code)
        let enVars = require(pathToTemp).getEnvVars()
        fs.unlinkSync(pathToTemp)
        return enVars
    } catch (e) {
        throw new Error(chalk.bgRed("Unable to read environment file."))
    }
}


function generateProxy(args) {
    if (!validateArgs(args)) {
        return
    }
    let env = getEnvironment()
    var executor = new Executor(env, yargs.argv.m, yargs.argv.t);

    try {
        executor.initialize()
            .getApiDefinition().then(() => {
                executor.configureServicesAndDtos()
                    .renderFiles()
                    .saveFiles()
            }).catch(error => {
                console.error(error)
            })
    } catch (error) {
        console.error(error)
    }


}

generateProxy(yargs.argv)