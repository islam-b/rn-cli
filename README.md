# @Itcomp/abp-rn

abp-rn is a command line interface made to helps for generating proxy files (services and dtos) when using the react-native template with [Abp Framework](https://docs.abp.io/en/abp/latest/Getting-Started-React-Native)

###### *Note: For better use, it's recommended to work with typescript on your react-native project.*
## Installation

Using npm :
```bash
npm install --save @itcomp/abp-rn
```
Using yarn:
```bash
yarn add @itcomp/abp-rn
```

## Usage

#### Setting up environment file
Reorganize the environment file  ``` Environment.js ``` so that,
each entry of ``` apis ``` have to match a module name, and have to contain both ``` baseUrl``` and ``` rootNameSpace ```
``` javascript
const ENV = {
    dev: {
      apis:{
        default: {
          baseUrl: '...'   //default base url
          rootNameSpace: '...' //root namespace 
        }, 
        //example
        identity: { 
          baseUrl: 'http://localhost.43063', 
          rootNameSpace: 'Volo.Abp.Identity'
        },
        //... other modules
      },
      oAuthConfig: {
        issuer: '...',
        clientId: '...',
        clientSecret: '...',
        scope: '...',
      },
      localization: {
        defaultResourceName: '...',
      }, 
    },  
    prod: {/*...*/}
  };
  export const getEnvVars = () => {
    return __DEV__ ? ENV.dev : ENV.prod;
  };
```


#### Executing the CLI
Ensure that you execute the following command in the root directory of the project, where the ``` Environment.js ``` is located :
```bash
npx abp-generate-proxy-rn -m <module-name> -t <target-folder>
```
- **-m,  --module** : The name of the module.
- **-t, --target** : The target folder to save files, starting from ``` PROJECT_FOLDER/src/```. 

