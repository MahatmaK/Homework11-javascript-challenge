// from data.js
var tableData = data;

// YOUR CODE HERE!

// Select and store tbody as variable
var tbody = d3.select('tbody');

tableData.forEach((ufoInstance) => {
    // console.log(ufoInstance);
    var row = tbody.append('tr');

    Object.entries(ufoInstance).forEach(([key, value]) => {
        // console.log(value);
        var cell = row.append('td');
        cell.text(value);
    });
});

console.log('test');

// CLICK AND ENTER FILTER
// ----------------------------------------- //

// Capture input tag
var form = d3.select("form");

// If the user clicks outside the input box
form.on("submit", dateFilter);

form.on("change", dateFilter);

// Caputure button tag
var button = d3.select('button');

// If the user clicks the button
button.on("click", dateFilter);


// FUNCTIONS
// ----------------------------------------- //

// Filter function
function dateFilter () {

    // Prevent the page from refreshing
    d3.event.preventDefault();

    // Store user input
    var userDate = d3.select("#datetime");
    var userValue = userDate.property("value")

    // Delete all 'tr' and 'td' tags
    tbody.remove();

    // Add back tbody in proper location
    var table = d3.select('table');
    tbody = table.append('tbody');


    console.log(userValue);
    
    // Iterate through data and pull values with matching date/time
    if (userValue == "") {
        tableData.forEach((ufoInstance) => {
            
            var row = tbody.append('tr');
        
            Object.entries(ufoInstance).forEach(([key, value]) => {
                var cell = row.append('td');
                cell.text(value);
            });
        });
    }

    else {
        var filteredData = data.filter(ufoSighting => ufoSighting.datetime === userValue);     
        
        filteredData.forEach((ufoInstance) => {
            
            var row = tbody.append('tr')

            Object.entries(ufoInstance).forEach(([key, value]) => {
                var cell = row.append('td');
                cell.text(value);
            });
        });
    }       
}