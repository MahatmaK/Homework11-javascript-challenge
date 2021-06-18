// from data.js
var tableData = data;

// YOUR CODE HERE!

// Select and store tbody as variable
var tbody = d3.select('tbody');

tableData.forEach(function(ufoInstance) {
    // console.log(ufoInstance);
    var row = tbody.append('tr');

    Object.entries(ufoInstance).forEach(function([key, value]) {
        // console.log(value);
        var cell = row.append('td');
        cell.text(value);
    });
});













// Store date
var date = tableData.map(sighting => sighting.datetime);

// Store city
var city = tableData.map(sighting => sighting.city);

// Store state
var cstate = tableData.map(sighting => sighting.state);

// Store country
var country = tableData.map(sighting => sighting.country);

// Store shape
var shape = tableData.map(sighting => sighting.shape);

// Store comments
var comments = tableData.map(sighting => sighting.comments);