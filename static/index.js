console.log("index.js loaded!");

$(document).ready(function() {

    // Make a GET request to your Flask API
    $.get("http://10.0.0.1/customers", function(data) {
        console.log("API data:", data);

        // Example: show it on the page
        let output = "";
        data.forEach(customer => {
            output += `<li>${customerID}: ${customer.name}</li>`;
        });

        $("#db-output").html(output);
    })
    .fail(function() {
        console.error("Failed to fetch data from API.");
    });

});
