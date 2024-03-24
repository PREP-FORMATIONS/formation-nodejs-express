const fs =require("node:fs/promises")
const {rootDir} = require("./config.js");




async function transformArrayToObjectByIdKey(filename){
    const initialArray=JSON.parse(await fs.readFile(`${rootDir}/${filename}.json`,"utf8"));
    const resultingObj={}
    for(const obj of initialArray) {
        resultingObj[obj?.id] = obj;
    }

    await fs.writeFile(`${rootDir}/${filename}.json`,JSON.stringify(resultingObj))
}


transformArrayToObjectByIdKey("tasks")
transformArrayToObjectByIdKey("users")