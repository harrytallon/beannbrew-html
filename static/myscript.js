$(document).ready(function() {//runs when the doccument loads
    $.get("http://10.0.0.1/customers", function(data) {
        console.log("data from API:", data);

        let output="";
        data.forEach(customer => {
            output += `<li>${customer.id}: ${customer.name}</li>`

        });

        $("#db-output").html(output)
    })
});