const axios = require("axios")
const jsConvert = require('js-convert-case');
let fs = require("fs")
let {parseType, buildTypeName, getCompositeTypes, isPrimitiveType} = require("./parser");

let url = 'http://sgscore/api/abp/api-definition?IncludeTypes=true'
let targetModule = 'config'
let rootNamespace = 'Itcomp.Sgs.Config'
let dtosConfig = {}

function makeRequest() {
    const data = fs.readFileSync('./json.json', 'utf8') 
    return {
        services: getServicesConfig(targetModule, rootNamespace, JSON.parse(data)),
        dtos: dtosConfig
    }
    // return axios.get(url).then(response => {
        
    // }).catch(error => {
    //     console.log(error);
    // });
}


function getServicesConfig(key, rootNamespace, { modules, types }) {
    let module = modules[key]
    console.log(module)
    let configurations = []
    for (const key in module.controllers) {

        let config = {
            fileName: '',
            directory: '',
            serviceName: '',
            apiName: '',
            path: '',
            imports: [],
            functions: [],
            dependencies: []
        }
        let controller = module.controllers[key]
        console.log(controller.type)
        // setting file  (service) name
        config.fileName = pascalToSnakeCase(controller.controllerName) + ".service.ts"
        config.serviceName = controller.controllerName + "Service"
        config.apiName = module.rootPath
        config.directory = getDirectory(controller.type, rootNamespace)

        //setting types and imports declarations

        //setting functions delarations
        for (const action in controller.actions) {
            let fn = controller.actions[action]
            let fonction = {}
            fonction.T = 'any'
            fonction.R = parseType(fn.returnValue.typeSimple,true, false) // getType(fn.returnValue.typeSimple)
            fonction.name = jsConvert.toCamelCase(fn.name.replace('Async', ''))
            fonction.method = fn.httpMethod
            fonction.url = "/" + fn.url
            fonction.inputType = []
            fn.parametersOnMethod.forEach(arg => {
                config.dependencies = addDependicies(config.dependencies, resolveDtoConfig(rootNamespace,arg.typeSimple.replace('?', '') ,types))
                fonction.inputType.push({
                    name: arg.name,
                    type: parseType(arg.typeSimple.replace('?', ''),true, false),  //getType(arg.typeSimple.replace('?', '')),
                    optional: arg.isOptional ? '?' : ''
                })
            })
            fonction.paramsType = []
            fonction.body = null
            fn.parameters.forEach(param => {
                switch (param.bindingSourceId) {
                    case "Body": {
                        fonction.body = param.name
                        break;
                    }
                    case "Path": {
                        break;
                    }
                    default: {
                        fonction.paramsType.push({
                            value: (param.descriptorName == "" ? "" : param.descriptorName + ".") + jsConvert.toCamelCase(param.name),
                            key: jsConvert.toCamelCase(param.name),
                        })
                        break;
                    }

                }

            })

            config.dependencies = addDependicies(config.dependencies, resolveDtoConfig(rootNamespace, fn.returnValue.typeSimple ,types))
            config.functions.push(fonction)
        }
        //fs.writeFileSync("./json.json", JSON.stringify(config))
        config.imports = setImports(rootNamespace, controller.type, config.dependencies)
        configurations.push(config)
    }   
    return configurations
}

let addDependicies = (deps, elements) => {
    if (elements) {
        elements.forEach(el=>{
            if (isPrimitiveType(el)<0 && deps.indexOf(el)<0) {
                deps.push(el)
            }
        }) 
    }
    return deps
     
}

let getDirectory = (type, rootNamespace) => {
    type = type.replace(rootNamespace + ".", "")
    let parts = type.split(".")
    parts.pop()
    let res = parts.map(p => pascalToSnakeCase(p))
    return res.join("/")
}


const pascalToSnakeCase = (str) => {
    return jsConvert.toCamelCase(str).replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);
}



function resolveDtoConfig(root, namespace, types ) {
 

    namespace = namespace.replace(/\[/g, '').replace(/\]/g, '')
    let key = parseType(namespace, false, true)
    console.log(key)
    if (!dtosConfig[key]) {
        let dto = types[key]
        if (dto) {
            let name = buildTypeName(namespace, dto.genericArguments)
            let directory = getDirectory(namespace,root)
            let config = {
                fileName: pascalToSnakeCase(name.replace("Dto",""))+".dto.ts",
                directory: directory,
                dtoName: name,
                isEnum: dto.isEnum,
                baseType:  dto.baseType ? parseType(dto.baseType, true, false) : '',
                genericArguments: dto.genericArguments,
                imports:[],
                properties:[]
            }
            if (dto.isEnum) {
                dto.enumNames.forEach((name,index)=>{
                    config.properties.push({
                        name,
                        type: dto.enumValues[index],
                        isOptional: false
                    })
                })
            } else {
                dto.properties ? dto.properties.forEach(prop=>{
                    if (isPrimitiveType(prop.typeSimple)<0) {
                        resolveDtoConfig(root, prop.typeSimple, types)
                    }
                    config.properties.push({
                        name: jsConvert.toCamelCase(prop.name),
                        type: parseType(prop.typeSimple.replace('?',''), true, false),
                        isOptional: prop.typeSimple.includes("?")
                    })
                }) : true
               
               
                if (config.baseType) {
                    resolveDtoConfig(root, dto.baseType, types)
                }
            }

            dtosConfig[key] = config
            
        } 
    }
    let composites = getCompositeTypes(namespace)
    composites.forEach(piece=>{
        if (piece!=namespace && isPrimitiveType(piece)<0) {
            resolveDtoConfig(root,piece,types)
        }
    })
    return composites
}

function setImports(rootNamespace,currentNamespace, deps) {
    let imports = {}
    let prefix = currentNamespace.replace(rootNamespace+".",'').split('.').map(x=>"..")

    deps.forEach(dep=>{
        let el = dep.replace(rootNamespace+".",'')
        let parts = el.split(".")
        let obj = parts.pop()
        let pieces = parts.map(x=> pascalToSnakeCase(x)) 
        let path= prefix.join("/")+"/dtos/"+pieces.join('/')+(pieces.length>0 ? '/':'')+"models"
        if (imports[path] && isPrimitiveType(obj)<0) {
            imports[path].names.push(obj)
        } else {
            if (isPrimitiveType(obj)<0) {
                imports[path]= {
                    path,
                    names: [obj],
                }
            }
        }
    })
    let response = [];
    for (key in imports) {
        let item = {
            obj: imports[key].names.join(", "),
            path: imports[key].path
        }
        response.push(item)
    }
    return response
}





















module.exports = makeRequest
