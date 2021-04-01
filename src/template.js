const {render} = require("mustache")



function renderImports(imports) {
    const template = `import { {{obj}} } from "{{path}}";`

    let response = ""
    imports.forEach(im=>{
        let res = render(template,im)
        response = response+'\n'+res 
    })
    return response
}

function renderFunctions(functions) {
    const template = `
    {{name}} = ({{inputs}}) =>
        this.restService.request<{{T}} , {{R}}> ({
            method: "{{method}}",
            url: \`{{ url }}\`, {{params}} {{body}}
        },
        { apiName: this.apiName });
    `
    let response = ""
    functions.forEach(fn=>{
       
        fn.url = renderUrl(fn.url)
        fn.inputs = renderFunctionInputs(fn.inputType)
        fn.params = renderParams(fn.paramsType)
        fn.body = renderBody(fn.body)
        fn.body=="" ?  "" :  "," + fn.body
        response = response + "\n"+ render(template,fn)
    })
    return response
}

function renderFunctionInputs(inputs) {
    const template = `{{name}}{{optional}} : {{type}}`
    let response = ""
    inputs.forEach((input, index)=>{ 
        let prefix = index==0 ? '' : ", "
        response=   response +  prefix + render(template,input)
    })
    return response
}

function renderParams(params) { 
    if (params.length==0) {
        return ''
    }
    const template = `{{key}}:{{value}}`
    let response = ""
    params.forEach((param, index)=>{ 
        let prefix = index==0 ? '' : ", "
        response=  response + prefix + render(template,param)
    })

    response = `\n \t \t \tparams: { ` + response  +`}`
    return response

}

function renderBody(body) {
    return body==null ? '' :  '\n \t \t \tbody: '+body  
}

function renderUrl(url) {
    return url.replace(/{/g,"${")
}


function renderProxyService(service) {
    let template = `{{imports}} \n
export class {{serviceName}}  {
    
    apiName = "{{apiName}}"
    
    constructor(private restService: RestService) {}
    {{functions}}
}
    `
    service.imports.push({
        obj: "RestService",
        path: "@itcomp/abp-rn"
    })
    let imports = renderImports(service.imports)
    let functions = renderFunctions(service.functions)
 
    let response = render(template,{
        serviceName: service.serviceName,
        apiName: service.apiName,
        imports,
        functions
    }) 
    return response.toString()
     
}

function renderDtoProperties(properties) {

    let template = `\n \t{{name}}: {{type}}`
    let res = ""
    properties.forEach((prop,index)=>{
        prop.name = prop.name+ (prop.isOptional ? '?' : '') 
        res = res + render(template, prop)
    })
    return res

}

function renderEnumValues(properties) {

    let template = `\n \t{{name}} = {{type}},`
    let res = ""
    properties.forEach((prop,index)=>{
        res = res + render(template, prop)
    })
    return res

}

function renderEnum(enumeration) {
    let template = `export enum {{dtoName}} { {{properties}} \n}\n\n`

    let properties = renderEnumValues(enumeration.properties)
    return render(template,{ 
        dtoName: enumeration.dtoName,
        properties
    }) 
}

function renderDto(dto) {
    let template = `export interface {{dtoName}} {{baseType}} { {{properties}} \n}\n\n`

    let imports = ""
    let properties = renderDtoProperties(dto.properties)
    let baseType = dto.baseType ? "extends "+dto.baseType : ''
    return render(template,{ 
        dtoName: dto.dtoName,
        baseType,
        imports,
        properties
    }) 
}



module.exports  =  {renderProxyService , renderDto, renderEnum, renderImports}
 