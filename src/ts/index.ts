import Options, { Executor } from "./executor"

var options = {
    url: "https://localhost:44357/api/abp/api-definition?IncludeTypes=true",
    module : 'blog',
    rootNamespace : 'Itcomp.Sgs.Blog', 
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
            