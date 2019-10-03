var fs = require('fs');

async function read(path){
    return new Promise(function(resolve, reject){
        fs.readFile(path, "utf8", function(err, data) {
            allData = data;    
            if(err){
                reject(err)
            }else{
                resolve(data);
            }
        });
    });
}


function split(data){
    let lines = data.split("\n");
    return lines;
}

async function toCSV(data, fileName){
    new Promise(function(resolve, reject){
        fs.writeFile(fileName, data, (err) => {
            if(err)
                throw(err);
        });
    });
}

async function cleanData(fileSource, fileOutput){
    new Promise(function(resolve, reject){
        
    });
} 

(async () => {
    // await cleanData("resultREPTree.csv", "resultREPTreeCleaned.csv");
    // await cleanData("resultRandomForest.csv", "resultRandomForestCleaned.csv");    
    let lines = split(await read("resultREPTree.csv"));
    let lineNumber = "";
    console.log("im here");
    lines.forEach(element => {
        console.log("========>" + element.split(":")[0]);
        lineNumber += element.split(":")[0] + "\n";
    });
    await toCSV(lineNumber, "resultREPTreeCleaned.csv");

})();