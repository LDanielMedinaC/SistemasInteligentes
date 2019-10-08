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

async function countUppercases(text)
{
    let total = 0;
    let uppercases = 0; 
    for(var i = 0; i < text.length; i++)
    {
        console.log(text.charAt(i));
        if(text.charAt(i) >= 'a' && text.charAt(i) <= 'z' || text.charAt(i) >= 'A' && text.charAt(i) <= 'Z')
        {
            total++;
        }
        if(text.charAt(i) >= 'A' && text.charAt(i) <= 'Z')
        {
            uppercases++;
        }
    }
    console.log(total);
    return uppercases/total;
}

async function toCSV(data){
    new Promise(function(resolve, reject){
        fs.writeFile("TestingUppercaseCounter.csv", data, (err) => {
            if(err)
                throw(err);
        });
    });
}

(async () => {
    let reviews = split(await read("./data/Testing.csv"));
    let tupples = split(await read("testing1.csv"));
    let rows = "";  
    tupples[0].push("word_number");

    for (var i = 1; i < tupples.length - 1; i++)
    {    
        //console.log(reviews[i][0]);
        tupples[i].push(await countUppercases(reviews[i][1]) + '');
    }
    await toCSV(await writeCSV(tupples));
})();