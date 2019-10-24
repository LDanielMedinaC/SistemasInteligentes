var fs = require('fs');
var indico = require("indico.io"); 


indico.apiKey =  'dee58ac2ca668703679d6962a5e5011b';

function split(data){
    let lines = data.split("\n");
    let reviews = [];
    lines.forEach(element => {
        reviews.push(element.split(","));
    });
    return reviews;
}


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

async function toCSV(data){
    new Promise(function(resolve, reject){
        fs.writeFile("TrainingPersonality.csv", data, (err) => {
            if(err)
                throw(err);
        });
    });
}

(async () => {
    let linesTraining = split(await read("../data/Training1.csv"));
    let rows = "";
    for (var i = 0; i < linesTraining.length; i++)
    {    
        console.log(i);
        let reviews = await indico.personality(linesTraining[i][0]);
        rows += reviews.extraversion + ',' + reviews.openness + ',' + reviews.agreeableness + ','+reviews.conscientiousness +'\n'; 
        // let sentiments = new Object;
        // let row = await Object.assign(sentiments,await reviews);
        // rows+= await writeCSV(await row);
        if(i%500 == 0)
            await toCSV(rows);
    }
    //console.log(rows);
    await toCSV(rows);
})();