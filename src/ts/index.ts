import Options, { Executor } from "./executor"

var options = {
    url: "http://sgscore/api/abp/api-definition?IncludeTypes=true",
    module : 'config',
    rootNamespace : 'Itcomp.Sgs.Config', 
    targetFolder: ""
} as Options

var executor = new Executor(options);

executor.getApiDefinition().then(()=>{
    executor.configureServicesAndDtos()
            .renderFiles()
            .saveFiles()
}).catch(error=>{ 
    console.error(error)
})
            