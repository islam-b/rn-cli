
let primitivesTypesMapping = {
    "Int32": "number",
    "String": "string",
    "Void":  "void",
}

class File {
    file = []
    constructor(res) {
        this.file = [res]
    }

    index = 0
    getCurrent() {
        return this.file[this.index]
    }
    getPrevious() {
        return this.index >0 ?  this.file[this.index-1] : null
    } 

    push(el) {
        this.file.push(el)
        this.index++
    }

    pop() { 
        this.file.pop()
        this.index-- 
    }
}  

function parse(str, index, QUEUE) {
    let currentEl = null
    let previousEl = null
    let parts = str.split("")
    let exit = false
    let i = index
    while (!exit) {
        currentEl = QUEUE.getCurrent()
        previousEl = QUEUE.getPrevious()
        switch (parts[i]) {
            case ("<"): { 
                let item = {
                    name: checkIfPrimitive(str.substring(index, i)),
                    typeArgs: []
                }
                currentEl.typeArgs.push(item)
                QUEUE.push(item)
                parse(str, i+1, QUEUE)
                exit = true;
                break;
            }
            case (","): {
                let item = {
                    name: checkIfPrimitive(str.substring(index, i)),
                    typeArgs: []
                }
                currentEl.typeArgs.push(item)
                parse(str, i+1, QUEUE)
                exit = true;
                break;
            } 
            case (">"): {
                let item = {
                    name: checkIfPrimitive(str.substring(index, i)),
                    typeArgs: []
                }
                currentEl.typeArgs.push(item)
                QUEUE.pop() 
                break;
            }  
        } 
        i++
        if(i==str.length) {
            exit= true
        }
    }
}

function stringify(obj, level, index, showPlaceholder) {
    let str = (!showPlaceholder || level<1) ? obj.name : ("T"+index)
    let generics = obj.typeArgs.map((element,index) => {
        return stringify(element,level+1,index,showPlaceholder)
    }).join(','); 
    return generics=="" ? str : str+"<"+generics+">"
     
}

function stringifyType(obj, level, index, showPlaceholder) {
    let str = (!showPlaceholder || level<=1) ? obj.name.split(".").pop() : ("T"+index)
    let generics = obj.typeArgs.map((element,index) => {
        return stringifyType(element,level+1,index,showPlaceholder)
    }).join(','); 
    return generics=="" ? str : str+"<"+generics+">"
     
}

function parseType(ns, showType, showPlaceholder) {
    ns = ns.replace(/\[/g,'').replace(/]/g,'[]')
    if (ns.includes("<")) {
        let res = {
            name: "",
            typeArgs: []
        }
        
        let QUEUE = new File(res)
        
        parse(ns,0 , QUEUE) 
        let str =""
        if (showType) {
            str= stringifyType(QUEUE.file[0].typeArgs[0],0, 0,showPlaceholder)
        } else {
            str= stringify(QUEUE.file[0].typeArgs[0],0, 0,showPlaceholder)
        } 
        return str
    } else return checkIfPrimitive(showType ? ns.split('.').pop() : ns)
}


function extractTypes(obj) {
    let str = checkIfPrimitive(obj.name)
    let res = [str]
    obj.typeArgs.forEach((element) => {
        res = [...res, ...extractTypes(element)]
    }); 
    return res
}

function getCompositeTypes(ns) {
    ns = ns.replace(/\[/g,'').replace(/]/g,'')
    if (ns.includes("<")) {
        let res = {
            name: "",
            typeArgs: []
        }
        let QUEUE = new File(res)
        parse(ns,0 , QUEUE) 
        return extractTypes(QUEUE.file[0].typeArgs[0])
    } else return [checkIfPrimitive(ns)];
}

function checkIfPrimitive(str) {
    for (origin in primitivesTypesMapping) {
        str = str.replace(origin, primitivesTypesMapping[origin])
    }
    return str
}

let isPrimitiveType = (str) =>{
    let primitives =["number","string","void"]
    let f = primitives.indexOf(str.replace('?'))
    return f
}

function buildTypeName(ns, genericArgs) {
    if (ns.includes("<")) {
        let parts = ns.split("<")
        let res = parts[0].split(".").pop() 
        return res +"<"+genericArgs.join(',')+">"

    } else {
        return ns.split('.').pop()
    }
}

module.exports = {parseType, buildTypeName, getCompositeTypes, isPrimitiveType}