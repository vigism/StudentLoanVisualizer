
const ageInfo = [];

for(let i = 6; i<18; i++) {
    if(i < 10) {
        d3.csv(`./data/fafsa/200${i}.csv`).then(data => receiveFafsaData(data, `200${i}`));
    }else {
        d3.csv(`./data/fafsa/20${i}.csv`).then(data => receiveFafsaData(data, `20${i}`));
    }
}

function receivedData(data) {
    console.log(data);
}   

function receiveFafsaData(data, yr) {
    let parsedData = [];
    for(let i = 0; i < data.length; i++) {
        let cur = {};
        let values = Object.values(data[i]);
        cur[values[0]] = values[1] 
        parsedData.push(cur);
    }
    console.log(yr);
    console.log( parsedData);
    let curAge = {};
    curAge["year"] = yr;
    curAge["18 or less"] = Object.values(parsedData[9])[0];
    curAge["19 through 24"] = Object.values(parsedData[10])[0];
    curAge["25 or greater"] = Object.values(parsedData[11])[0];
    curAge["Age Unknown"] = Object.values(parsedData[12])[0];
    ageInfo.push(curAge);
    console.log(ageInfo);
}
debugger;
let ageInfoSorted = ageInfo.sort((a, b) => (a.year > b.year) ? 1 : -1)

let data = ageInfoSorted;

let svg = d3.select("svg");

svg.selectAll("circle")
.data(data)
.enter()
.append("circle")
.attr("cx", function(d,i) {return (i+1)*200})
.attr("cy", function(d) {return 110})
.attr("r", function(d) {return (parseFloat(d['18 or less'].replace(/,/g, ''))-1000000) /10000})
 
