
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
        cur[values[0]] = values[1];
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
let ageInfoSorted = ageInfo.sort((a, b) => (a.year > b.year) ? 1 : -1);

let data = ageInfoSorted;

var margin = {top: 20, right:20, bottom: 30, left: 40}
var width = 960-margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;

var x = d3.scaleBand()
        .range([0,width])
        .padding(0.1);

var y = d3.scaleLinear()
        .range([height,0]);

let svg = d3.select(".first");

svg.attr("width", width+margin.left + margin.right)
    .attr("height", height+margin.top + margin.bottom)
    .append("g")
    .attr("transform", 
        "translate("+margin.left+","+margin.top + ")");

x.domain(data.map(function(d) { return d.year; }));
y.domain([0, d3.max(data, function(d) { return parseFloat(d['18 or less'].replace(/,/g, '')); })]);


svg.selectAll(".bar")
    .data(data)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d){ return x(d.year)})
    .attr("width", x.bandwidth())
    .attr("y", function(d){return y(parseFloat(d['18 or less'].replace(/,/g, '')))})
    .attr("height", function(d){ return height - y(parseFloat(d['18 or less'].replace(/,/g, '')))});

// add the x Axis
svg.append("g")
.attr("transform", "translate(0," + height + ")")
.call(d3.axisBottom(x));

// add the y Axis
svg.append("g")
.call(d3.axisLeft(y));

// svg.selectAll("circle")
// .data(data)
// .enter()
// .append("circle")
// .attr("cx", function(d,i) {return (i+1)*200})
// .attr("cy", function(d) {return 110})
// .transition()
// .duration(1000)
// .attr("r", function(d) {return (parseFloat(d['18 or less'].replace(/,/g, ''))) /100000})
// .delay(function(d,i){return(i*100)})
 
svg = d3.select(".second");

svg.attr("width", width+margin.left + margin.right)
    .attr("height", height+margin.top + margin.bottom)
    .append("g")
    .attr("transform", 
        "translate("+margin.left+","+margin.top + ")");

x.domain(data.map(function(d) { return d.year; }));
y.domain([0, d3.max(data, function(d) { return parseFloat(d['19 through 24'].replace(/,/g, '')); })]);


svg.selectAll(".bar")
    .data(data)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d){ return x(d.year)})
    .attr("width", x.bandwidth())
    .attr("y", function(d){return y(parseFloat(d['19 through 24'].replace(/,/g, '')))})
    .attr("height", function(d){ return height - y(parseFloat(d['19 through 24'].replace(/,/g, '')))});

// add the x Axis
svg.append("g")
.attr("transform", "translate(0," + height + ")")
.call(d3.axisBottom(x));

// add the y Axis
svg.append("g")
.call(d3.axisLeft(y));

//  svg = d3.select(".second");

// svg.selectAll("circle")
// .data(data)
// .enter()
// .append("circle")
// .transition()
// .delay(1500)
// .attr("cx", function(d,i) {return (i+1)*200})
// .attr("cy", function(d) {return 110})
// .transition()
// .duration(1000)
// .attr("r", function(d) {return (parseFloat(d['19 through 24'].replace(/,/g, '')))/100000})
// .delay(function(d,i){return(i*100)})
  svg = d3.select(".third");

svg.attr("width", width+margin.left + margin.right)
    .attr("height", height+margin.top + margin.bottom)
    .append("g")
    .attr("transform", 
        "translate("+margin.left+","+margin.top + ")");

x.domain(data.map(function(d) { return d.year; }));
y.domain([0, d3.max(data, function(d) { return parseFloat(d['25 or greater'].replace(/,/g, '')); })]);


svg.selectAll(".bar")
    .data(data)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d){ return x(d.year)})
    .attr("width", x.bandwidth())
    .attr("y", function(d){return y(parseFloat(d['25 or greater'].replace(/,/g, '')))})
    .attr("height", function(d){ return height - y(parseFloat(d['25 or greater'].replace(/,/g, '')))});

// add the x Axis
svg.append("g")
.attr("transform", "translate(0," + height + ")")
.call(d3.axisBottom(x));

// add the y Axis
svg.append("g")
.call(d3.axisLeft(y));
// svg = d3.select(".third");

// svg.selectAll("circle")
// .data(data)
// .enter()
// .append("circle")
// .attr("cx", function(d,i) {return (i+1)*200})
// .attr("cy", function(d) {return 110})
// .transition()
// .duration(1000)
// .attr("r", function(d) {return (parseFloat(d['25 or greater'].replace(/,/g, '')))/100000})
// .delay(function(d,i){return(i*100)})
 
 svg = d3.select(".fourth");

svg.attr("width", width+margin.left + margin.right)
    .attr("height", height+margin.top + margin.bottom)
    .append("g")
    .attr("transform", 
        "translate("+margin.left+","+margin.top + ")");

x.domain(data.map(function(d) { return d.year; }));
y.domain([0, d3.max(data, function(d) { return parseFloat(d['Age Unknown'].replace(/,/g, '')); })]);


svg.selectAll(".bar")
    .data(data)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d){ return x(d.year)})
    .attr("width", x.bandwidth())
    .attr("y", function(d){return y(parseFloat(d['Age Unknown'].replace(/,/g, '')))})
    .attr("height", function(d){ return height - y(parseFloat(d['Age Unknown'].replace(/,/g, '')))});

// add the x Axis
svg.append("g")
.attr("transform", "translate(0," + height + ")")
.call(d3.axisBottom(x));

// add the y Axis
svg.append("g")
.call(d3.axisLeft(y));
// svg = d3.select(".fourth");

// svg.selectAll("circle")
// .data(data)
// .enter()
// .append("circle")
// .attr("cx", function(d,i) {return (i+1)*200})
// .attr("cy", function(d) {return 110})
// .transition()
// .duration(1000)
// .attr("r", function(d) {return (parseFloat(d['Age Unknown'].replace(/,/g, '')))/20})
// .delay(function(d,i){return(i*100)})
 
