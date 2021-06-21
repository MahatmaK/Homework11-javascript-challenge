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


// CLICK AND ENTER FILTER
// ----------------------------------------- //

// Capture input tag
var form = d3.select("form");

// If the user clicks outside the input box
form.on("submit", massFilter);

// form.on("change", massFilter);

// Capture button tag
var button = d3.select('button');

// If the user clicks the button
button.on("click", massFilter);


// FUNCTIONS
// ----------------------------------------- //

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


