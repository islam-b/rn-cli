#! /usr/bin/env node
 
const {Executor} = require("../lib/executor")
const yargs = require("yargs");

const usage = "\nUsage: abp-generate-proxy-rn -b <base url> -m <module> -r <rootnamespace> -t <target folder> ";

yargs.usage(usage)
    .option("b", { alias: "base-url", describe: "Base url of the abp project.", type: "string", demandOption: true })
    .option("m", { alias: "module", describe: "Name of the module.", type: "string", demandOption: true })
    .option("r", { alias: "rootnamespace", describe: "Root namespace.", type: "string", demandOption: true })
    .option("t", { alias: "target", describe: "Target folder to save files.", type: "string", demandOption: true })
    .help(false)
    .argv; 
 

function validateArgs(args) { 
    if (args.b==null || args.b=="") return false
    if (args.m==null || args.m=="") return false
    if (args.r==null || args.r=="") return false
    if (args.t==null || args.t=="") return false
    return true
}


function generateProxy(args) {
    if (!validateArgs(args)) {
        return
    }
    let options = {
        url: yargs.argv.b+"/api/abp/api-definition?IncludeTypes=true",
        module: yargs.argv.m,
        rootNamespace: yargs.argv.r,
        targetFolder: yargs.argv.t,
    }
    var executor = new Executor(options);

    executor.getApiDefinition().then(()=>{
        executor.configureServicesAndDtos()
                .renderFiles()
                .saveFiles()
    }).catch(error=>{ 
        console.error(error)
    })
}

generateProxy(yargs.argv)