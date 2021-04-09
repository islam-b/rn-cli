#! /usr/bin/env node

const { Executor } = require("../lib/executor")
const yargs = require("yargs");
const { validateArgs, getEnvironment } = require("./utils")

const usage = "\nUsage: abp-generate-proxy-rn -m <module> -t <target folder> ";

yargs.usage(usage)
    // .option("b", { alias: "base-url", describe: "Base url of the abp project.", type: "string", demandOption: true })
    .option("m", { alias: "module", describe: "Name of the module.", type: "string", demandOption: true })
    // .option("r", { alias: "rootnamespace", describe: "Root namespace.", type: "string", demandOption: true })
    .option("t", { alias: "target", describe: "Target folder to save files.", type: "string", demandOption: true })
    .help(false)
    .argv;


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