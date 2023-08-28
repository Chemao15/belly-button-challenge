console.log('hello')

const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json'

function initilize() {
    let dropdownMenu = d3.select("#selDataset");
    d3.json(url).then((data) => {
        let names = data.names;
        names.forEach((id) => {
            dropdownMenu.append("option")
            .text(id)
            .property("value",id);
        });
        buildbar(names[0]);
        buildbub(names[0]);

    });
};


//Function build bar graph
function buildbar(sample) {
    d3.json(url).then((data) => {

        let sampledata = data.samples;
        let value = sampledata.filter(result => result.id == sample);
        let otu_ids = value[0].otu_ids;
        let otu_labels = value[0].otu_labels;
        let sample_values = value[0].sample_values;

        let y = otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse();
        let x = sample_values.slice(0,10).reverse();
        let l = otu_labels.slice(0,10).reverse();
        
        let trace1 = {
            x: x,
            y: y,
            text: l,
            type: "bar",
            orientation: "h"
        };

        let layout = {
            title: "Top 10 OTUs"
        };

        Plotly.newPlot("bar", [trace1], layout)
    });
};

//Function build bubble graph
function buildbub(sample) {
    d3.json(url).then((data) => {
        
        let sampledata = data.samples;
        let value = sampledata.filter(result => result.id == sample);
        let otu_ids = value[0].otu_ids;
        let otu_labels = value[0].otu_labels;
        let sample_values = value[0].sample_values;

        let trace2 = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Picnic"
            }
        };

        let layout = {
            title: "Bacteria Per Sample",
            hovermode: "closest",
            xaxis: {title: "OTU ID"},
        };

        Plotly.newPlot("bubble", [trace2], layout)
    });
};

// Function thant updates the graph
function optionChanged(value) { 
    buildbar(value);
    buildbub(value);
};

initilize();