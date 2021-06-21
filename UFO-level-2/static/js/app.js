// from data.js
var tableData = data;

// YOUR CODE HERE!

// Select and store tbody as variable
var tbody = d3.select('tbody');

// Load data on window load
window.onload = loadData();


// CLICK AND ENTER FILTER
// ----------------------------------------- //

// Capture input tag
var form = d3.select("form");

// If the user clicks outside the input box
form.on("submit", massFilter);

// form.on("change", massFilter);

// Capture Filter Table button tag
var filterButton = d3.select('button');

// If the user clicks the filter table button
filterButton.on("click", massFilter);

// Capture Reset Table button tag
var allButtons = d3.selectAll('button');
var resetButton = d3.select(allButtons._groups[0][1]);

console.log(resetButton);

// If the user clicks the reset table button
resetButton.on("click", loadData);

// FUNCTIONS
// ----------------------------------------- //

function loadData () {

    // CLEAR FILTER SEARCH
    // --------------------------//
    // Select all input tags
    var userData = d3.selectAll('#datetime')
        
        // Iterate through each tag
        .each(function(d,i) {

            // Clear any old filters
            this.value = '';
            
        });
    

    // 
    // Delete all 'tr' and 'td' tags
    tbody.remove();

    // Add back tbody in proper location
    var table = d3.select('table');
    tbody = table.append('tbody');

    tableData.forEach((ufoInstance) => {
        // console.log(ufoInstance);
        var row = tbody.append('tr');

        Object.entries(ufoInstance).forEach(([key, value]) => {
            // console.log(value);
            var cell = row.append('td');
            cell.text(value);
        });
    });

}


function massFilter () {

    // Prevent the page from refreshing
    d3.event.preventDefault();
    
    // Define array of filter search
    var filterSearchElements = Object.keys(tableData[0]);
    // var filterSearchElements = ['datetime', 'city', 'state', 'country', 'shape'];

    // Define user input array
    var userInput = [];

    // Select all input tags
    var userData = d3.selectAll('#datetime')
        
        // Iterate through each tag
        .each(function(d,i) {

            // Store variable for current value
            var currentVar = this.value;
            
            // Append variable to user input array
            userInput.push(currentVar);
        });

    
    // Define final filter table that will be pushed to
    var filteredData = data;
   
    // Iterate through each ufo instance
    tableData.forEach(ufoInstance => {
        
        for (var j = 0; j < userInput.length; j++)  {
            
            // Define current user key 
            var userValue = userInput[j];

            // If input is blank -> do nothing
            if (userValue=='') {
                keepInstance = true;
            }        

            // Check each user input with index key from data (e.g. i = 0, userInput[0] with filterSearchElements[0])
            else {               
                filteredData = filteredData.filter(ufoSighting => {
                   var tableValue = (Object.values(ufoSighting))[j];
                   return tableValue === userValue;
                });
            }
            // console.log(j);
        }
    }); 

    console.log(filteredData);

    // Delete all 'tr' and 'td' tags
    tbody.remove();

    // Add back tbody in proper location
    var table = d3.select('table');
    tbody = table.append('tbody');

    // Append filtered data to table
    filteredData.forEach((ufoInstance) => {
            
        var row = tbody.append('tr');
    
        Object.entries(ufoInstance).forEach(([key, value]) => {
            var cell = row.append('td');
            cell.text(value);
        });
    });
};


