#! /usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../lib/index");
const yargs = require("yargs");
const usage = "\nUsage: abp-generate-proxy-rn -b <base url> -m <module> -r <rootnamespace> -t <target folder> ";
yargs.usage(usage)
    .option("b", { alias: "base-url", describe: "Base url of the abp project.", type: "string", demandOption: true })
    .option("m", { alias: "module", describe: "Name of the module.", type: "string", demandOption: true })
    .option("r", { alias: "rootnamespace", describe: "Root namespace.", type: "string", demandOption: true })
    .option("t", { alias: "target", describe: "Target folder to save files.", type: "string", demandOption: true })
    .help(false)
    .argv;
let options = {
    url: yargs.argv.b + "/api/abp/api-definition?IncludeTypes=true",
    module: yargs.argv.m,
    rootNamespace: yargs.argv.r,
    targetFolder: yargs.argv.t,
};
index_1.default(options);
//# sourceMappingURL=index.js.map