let {renderProxyService , renderDto, renderEnum} = require("./template")

let fs = require("fs")
let makeRequest = require("./request")

let configuration = {
    imports: [
        {
            obj: 'CycleDto',
            path: '@module/proxy'
        }, {
            obj: 'CycleDto',
            path: '@module/proxy'
        }
    ],
    functions: [
        {
            name: 'getList',
            T: "any",
            R: "CycleDto",
            method: "POST",
            url: "api/config/lookup/promotions/{id}",
            inputs: "",
            inputType: [
                {
                    name: "id",
                    type: "string",
                    optional: '?'
                }
            ],
            body: 'input',
            paramsType: []
        }
    ]
}

//.then(metas => { 
    let metas =makeRequest()
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
    let groups = groupDtos(metas.dtos)
    for (key in groups) {
        let group = groups[key]
        saveDtos(group.directory, group.fileName, group.content)
    } 
//})

function groupDtos(dtos) {
    let groups =  Object.keys(dtos).reduce((acc, key) => {
        let dto = dtos[key]
        let output = dto.isEnum ? renderEnum(dto) : renderDto(dto) 
        output = output.replace(/&quot;/g, '\"')
            .replace(/amp;/g, '')
            .replace(/&#x2F;/g, '/')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&#x3D;/g, '=')
            .replace(/&#x60;/g, '\`')
        
        if (acc[dto.directory]) {
            acc[dto.directory].content = acc[dto.directory].content + output
        } else {
            acc[dto.directory] = {
                fileName: "models.ts",
                directory: dto.directory,
                imports: [],
                content: output, 
            }
        }
        return acc;

    }, {}); 
    return groups
}


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




