var emotion = ["anger", "joy", "fear", "sadness", "surprise"];
var sentiment = ["score_tag", "agreement", "subjectivity", "confidence", "irony"];

var request = require("request");
var fs = require('fs');
var indico = require("indico.io");
var counter = 1500; 


indico.apiKey =  'a03c448f0845f57e1142dc6048c008db';

function split(data){
    let lines = data.split("\n");
    let reviews = [];
    lines.forEach(element => {
        reviews.push(element.split(","));
    });
    return reviews;
}


async function writeCSV(data, id){
    let tags = "";
    if(counter++ == 0)
    {
        tags = "id";   
        for(const key of sentiment){
            tags += "," + key;
        }
        for(const key of emotion){
            tags += "," + key;
        }
        tags += "\n"; 
    }
    tags += counter;
    for(const key of sentiment){
        tags += "," + data[key];
    }
    for(const key of emotion){
        tags += "," + data[key];
    }
    tags+="\n";
    return tags;
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
        fs.writeFile("testing.csv", data, (err) => {
            if(err)
                throw(err);
        });
    });
}

async function mCloud(options){
    return new Promise(function(resolve, reject){
        request(options, function (error, response, body) {
            if (error) throw new Error(error);
            let obj = JSON.parse(body);
            resolve(obj);
        });
    });
}

(async () => {
    let linesTraining = split(await read("data/Training.csv"));
    let rows = "";
    for (var i = 0; i < linesTraining.length; i++)
    {    
        console.log(i);
        let options = {
            method: 'POST',
            url: 'https://api.meaningcloud.com/sentiment-2.1',
            headers: {'content-type': 'application/x-www-form-urlencoded'},
            form: {
                key : "9d0dc1916b8af26cf23540fda972ef45",
                lang : "en",
                txt : linesTraining[i][0],
                txtf : "plain"
            }
        };
        let ans = await mCloud(options);
        let reviews = await indico.emotion(linesTraining[i][0]);
        let sentiments = new Object;
        for(const key of sentiment){
            sentiments[key] = ans[key];
        }
        let row = await Object.assign(sentiments,await reviews);
        rows+= await writeCSV(await row);
        if(i % 500 == 0){
            await toCSV(rows);
        }
    }
    await toCSV(rows);
})();