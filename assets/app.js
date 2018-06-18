var config = {

    apiKey: "AIzaSyC2fXWmf2XHBRMxSm33loaWbt6pISJce-g",
    authDomain: "chwtimesheet.firebaseapp.com",
    databaseURL: "https://chwtimesheet.firebaseio.com",
    projectId: "chwtimesheet",
    storageBucket: "",
    messagingSenderId: "163369477025"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

function getFormData () {
    // getting data
    var trainName = $("#train-name").val().trim();
    var destination = $("#destination").val().trim();
    var trainTime = $("#train-time").val().trim();
    var frequency = $("#frequency").val().trim();

    var userInput  = {
        train: trainName,
        dest: destination,
        trtime: trainTime
        freq: frequency
    };
    return userInput;
}

function submitBtn() {

    event.preventDefault();

   var userInput = getFormData();

    console.log(userInput);

    database.ref("/trains").push(userInput);

}


var table = $("<table style='width: 100%'>");
table.attr("id", "train-table");

var tr = $("<tr>");

var th = $("<th>"); th.text("Train Name"); tr.append(th);
var th1 = $("<th>"); th1.text("Destination"); tr.append(th1);
var th2 = $("<th>"); th2.text("Arrival Time"); tr.append(th2);
var th3 = $("<th>"); th3.text("Frequency"); tr.append(th3);


table.append(tr);

$("#train-table-div").append(table);



database.ref("/trains").on("child_added", function(snapshot) {

    console.log(snapshot.val());

    var tr = $("<tr>");

    var td = $("<td>"); td.text(snapshot.val().name); tr.append(td);
    var td1 = $("<td>"); td1.text(snapshot.val().role); tr.append(td1);
    var td2 = $("<td>"); td2.text(snapshot.val().stDate); tr.append(td2);
    var td3 = $("<td>"); td3.text(snapshot.val().mRate); tr.append(td3);





    var startM = moment(snapshot.val().stDate, "MM/DD/YYYY");

    var monthsWorked = moment().diff(startM, "months");

    console.log(monthsWorked);

    var totalBilled = monthsWorked * parseInt(snapshot.val().mRate);

    console.log(totalBilled);

    var td4 = $("<td>"); td4.text(monthsWorked); tr.append(td4);
    var td5 = $("<td>"); td5.text(totalBilled); tr.append(td5);

    $("#train-table").append(tr);

})



$("#submit-btn").on("click", submitBtn);
