export interface ImportType {
    obj: string,
    path: string
}

export interface InputFnType {
    name: string,
    type: string,
    optional: '?' | ''
}

export interface ParamType{
    key: string,
    value: string,
}

export interface FunctionType {
    T: string,
    R: string, 
    name: string,
    method: string,
    url: string,
    inputs: string,
    params: string,
    body: string,
    inputType: InputFnType[],
    paramsType: ParamType[],
}


export interface ServiceType {
    fileName: string,
    directory: string,
    serviceName:string,
    path:string,
    apiName:string,
    imports: ImportType[],
    functions: FunctionType[],
    dependencies: string[]
}

export interface PropertyType {
    name: string,
    type: string,
    isOptional: boolean
}

export interface DtoType {
    fileName: string,
    directory: string,
    ns: string,
    dtoName:string,
    isEnum: boolean,
    baseType: string,
    genericArguments: string,
    imports: ImportType[],
    properties: PropertyType[],
    dependencies: string[]
}

export interface ModelsType {
    fileName: string,
    directory: string,
    imports: ImportType[],
    content: string, 
    ns:string,
    dtos: DtoType[],
    dependencies: string[]
}