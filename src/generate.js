let {renderProxyService , renderDto, renderEnum, renderImports} = require("./template")

let fs = require("fs")
let makeRequest = require("./request")



makeRequest().then(metas => { 
    metas.services.forEach(meta => { 
        let output = renderProxyService(meta)
        output = output.replace(/&quot;/g, '\"')
            .replace(/amp;/g, '')
            .replace(/&#x2F;/g, '/')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&#x3D;/g, '=')
            .replace(/&#x60;/g, '\`')
        saveServices(meta.directory, meta.fileName, output)
    })
    
    for (key in metas.dtos) {
        let group = metas.dtos[key]
        let imports = renderImports(group.imports) +"\n\n"
        group.content = imports + group.dtos.map(dto=>{
            return dto.isEnum ? renderEnum(dto) : renderDto(dto) 
        }).join('')

        group.content = group.content.replace(/&quot;/g, '\"')
            .replace(/amp;/g, '')
            .replace(/&#x2F;/g, '/')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&#x3D;/g, '=')
            .replace(/&#x60;/g, '\`')
 
        saveDtos(group.directory, group.fileName, group.content)
    } 
})


function saveServices(directory, fileName, output) {
    var dir = './proxy/services/'+directory;

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir,  { recursive: true });
    }
    fs.writeFileSync(dir+"/"+fileName, output)
}

function saveDtos(directory, fileName, output) {
    var dir = './proxy/dtos/'+directory;

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir,  { recursive: true });
    }
    fs.writeFileSync(dir+"/"+fileName, output)
}




