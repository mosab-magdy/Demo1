function login() {
    var url = 'https://nlg-api-test.herokuapp.com/users/login';


    // // JS Way
    // var http = new XMLHttpRequest();
    // var params = 'email=' + inputEmail.value + '&password=' + inputPassword.value;
    // http.open('POST', url, true);
    // http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // http.onload = function () {
    //     if (http.readyState == 4 && http.status == 200) {
    //         let data = JSON.parse(http.response)
    //         // save in cookie
    //         // redirect
    //     } else {
    //         let err = JSON.parse(http.response)
    //         alert(err.msg)
    //     }
    // }
    // http.send(params);


    // JQuery Way
    let request = $.ajax({
        method: "POST",
        url: url,
        dataType: "json",
        data: { email: inputEmail.value, password: inputPassword.value }
    });
    request.done(function (data) {
        // save in cookie
        createCookie("MEAN2020Data", data.token);
        createCookie("MEAN2020DataUser", data.userId);
        // redirect
        window.location = 'Home.html'
    });
    request.fail(function (jqXHR) {
        alert(jqXHR.responseJSON.msg)
    });
}


// Cookies
function createCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    }
    else var expires = "";

    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function getCustomer() {
    var url = 'https://nlg-api-test.herokuapp.com/customers';

    let request = $.ajax({
        method: "GET",
        url: url,
        dataType: "json",
        // data: { fullName: fullName.value, email: email.value, country: country.value, "type": "Local"}

    });
    request.done(function (data) {
        // save in cookie
        // createCookie("MEAN2020Data", data.token);
        // createCookie("MEAN2020DataUser", data.userId);
        // redirect
        // window.location = 'Home.html'

        console.log(data)
        var customers = data["customers"];
        

        var col = [];
        for (var i = 0; i < customers.length; i++) {
            for (var key in customers[i]) {
                if (col.indexOf(key) === -1) {
                    col.push(key);
                }
            }
        }

        // CREATE DYNAMIC TABLE.
        var table = document.createElement("table");

        // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

        var tr = table.insertRow(-1);                   // TABLE ROW.

        for (var i = 0; i < col.length; i++) {
            var th = document.createElement("th");      // TABLE HEADER.
            th.innerHTML = col[i];
            tr.appendChild(th);
        }

        // ADD JSON DATA TO THE TABLE AS ROWS.
        for (var i = 0; i < customers.length; i++) {

            tr = table.insertRow(-1);

            for (var j = 0; j < col.length; j++) {
                var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = customers[i][col[j]];
            }
        }

        // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
        var divContainer = document.getElementById("showData");
        divContainer.innerHTML = "";
        divContainer.appendChild(table);
        // var tableMAIN = document.getElementById('mainTBL');
        // var tr = document.createElement('tr');

        // var td1 = document.createElement('td');
        // var td2 = document.createElement('td');

        // var text1 = document.createTextNode('Text1');
        // var text2 = document.createTextNode('Text2');

        // td1.appendChild(text1);
        // td2.appendChild(text2);
        // tr.appendChild(td1);
        // tr.appendChild(td2);
        // tableMAIN.appendChild(tr);

    });
    request.fail(function (err) {
        console.log("error")
    });
}
