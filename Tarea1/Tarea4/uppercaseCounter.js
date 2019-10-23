var fs = require('fs');

var counter = 0;
function split(data){
    let lines = data.split("\n");
    let reviews = [];
    lines.forEach(element => {
        reviews.push(element.split(","));
    });
    return reviews;
}

async function writeCSV(data){
    let tags = "";
    for(let i = 0; i < data.length; i++){
        for(const key of data[i]){
            tags += key.split('\r')[0] + ',';
        }
        tags+="\n";
    }
    return tags;

}


async function read(path){
    return new Promise(function(resolve, reject){
        fs.readFile(path, "latin1", function(err, data) {
            allData = data;    
            if(err){
                reject(err)
            }else{
                resolve(data);
            }
        });
    });
}

async function countUppercases(text)
{
    //console.log(">>> COUNT");
    
    let regex = /[\']/g;
    //console.log(text);   
    let weird = text.match(regex);
    if(weird == null){
        return 0;
    }
    return weird.length;


}

async function toCSV(data){
    new Promise(function(resolve, reject){
       + fs.writeFile("TrainingUppercaseCounter.csv", data, (err) => {
            if(err)
                throw(err);
        });
    });
}

(async () => {
    let reviews = split(await read("./data/Training1.csv"));
    let tupples = split(await read("Training.csv"));
    let rows = "";  
    tupples[0].push("word_number");

    for (var i = 1; i < reviews.length; i++)
    {    
        //console.log("----> " + reviews[i][0]);
        tupples[i].push(await countUppercases(reviews[i][0]) + '');
    }
    await toCSV(await writeCSV(tupples));
})();