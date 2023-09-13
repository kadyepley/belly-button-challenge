// URL for the data 

const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

//Promise Pending

const dataPromise = d3.json(url);
    console.log('Data Promise:', dataPromise);

// Fetch the JSON data and console log it

d3.json(url).then(function(data) {
    console.log(data);
});

// Set up the variables to be referenced for our charts and check that each works
// 0 is the first participant in the data set and the default that will show before selection

var meta_data;
var samples; 

d3.json(url).then(function(data){
    let selector = d3.select('#selDataset');
    meta_data = data.metadata;
    samples = data.samples;
    data.names.forEach((id) => {
        selector.append('option').text(id).property('value', id);
    });
    
    metaData(meta_data[0]);
    hbarChart(samples[0]);
    bubbleChart(samples[0]);
});

// Creating the function that runs when a selection is chosen from the dropdown that will pull the values attributed to the participant's ID number

function optionChanged(value) {
    const selectedId = samples.find((item) => item.id === value);
    const demographicInfo = meta_data.find((item) => item.id == value);

    // Adding Demographic Data for the panel

    metaData(demographicInfo);

    // Adding in the information for the ID selected into the bar chart

    hbarChart(selectedId);

    // Adding in the information for the ID selected into the bar chart

    bubbleChart(selectedId);
}

// Adding the function that will display the appropriate information for the selected participant in the panel 

function metaData(demographicInfo) {
    let demoSelect = d3.select('#sample-metadata');

    demoSelect.html(
        `id: ${demographicInfo.id} <br>
        ethnicity: ${demographicInfo.ethnicity} <br>
        gender: ${demographicInfo.gender} <br> 
        age: ${demographicInfo.age} <br>
        location: ${demographicInfo.location} <br>
        bbtype: ${demographicInfo.ethnicity} <br>
        wfreq: ${demographicInfo.wfreq} <br>`
    );
}

// Adding in the function that would display only 10 OTU IDs in the bar chart at a time and creating all the variables needed in the chart

function hbarChart(selectedId) {
    let x_values = selectedId.sample_values.slice(0, 10).reverse();
    let y_values = selectedId.otu_ids
        .slice(0, 10)
        .reverse()
        .map((item) => `OTU ${item}`);
    let text = selectedId.otu_labels.slice(0,10).reverse();

    // Checking to make sure that everything worked

    console.log(x_values);
    console.log(y_values);
    console.log(text);    

// Assigning all the variables and attributes to the bar chart

    barChart = {
        x: x_values,
        y: y_values,
        text: text,
        type: 'bar',
        orientation: 'h',
    };

// Assiging the bar chart to a variable to reference in the newPlot function

    let chart = [barChart];

// Formatting the bar chart to match references

    let layout = {
        margin: {
            l: 100,
            r: 100,
            t: 0,
            b: 100,
        },
        height: 500,
        width: 600
    };

// Using the Plotly library to create the chart 

    Plotly.newPlot('bar', chart, layout)
}

// Adding in the function that would display the bubble chart and creating all the variables needed in the bubble chart

function bubbleChart(selectedId) {
    let x_values2 = selectedId.otu_ids;
    let y_values2 = selectedId.sample_values;
    let marker_size = selectedId.sample_values;
    let color = selectedId.otu_ids;
    let text = selectedId.otu_labels;

// Assigning all the variables and attributes to the bubble chart

    bubble = {
        x: x_values2,
        y: y_values2,
        text: text,
        mode: 'markers',
        marker: {
            color: color,
            colorscale: 'RdBu',
            size: marker_size
        },
        type: 'Scatter',
    };

// Making sure everything works

    console.log(x_values2);
    console.log(y_values2);
    console.log(marker_size);
    console.log(color);
    console.log(text);

// Assiging the bubble chart to a variable to reference in the newPlot function

    let chart = [bubble];

// Formatting the bubble chart to match references

    let layout = {
        xaxis: {
            title: {text: 'OTU ID'},
        },
    };

// Using the Plotly library to create the bubble chart

    Plotly.newPlot('bubble', chart, layout);
}