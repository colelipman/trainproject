var config = {
  apiKey: "AIzaSyC6NqHL96YCinDDwMXTi8Hv4QRlmBLQ278",
  authDomain: "colestrainproject.firebaseapp.com",
  databaseURL: "https://colestrainproject.firebaseio.com",
  projectId: "colestrainproject",
  storageBucket: "colestrainproject.appspot.com",
  messagingSenderId: "233112874834"
};
firebase.initializeApp(config);

var database = firebase.database();

// import firebase from 'firebase/app'
// import 'firebase/firestore'
// import 'firebase/messaging'

function getFormData() {

  //var trainNameText = $("dropdown").find("option:selected").text();
  var trainName = $(".dropdown").val().trim();
  var destination = $("#destination").val().trim();
  var trainTime = $("#train-time").val().trim();
  var frequency = $("#frequency").val().trim();

  var userInput = {
    train: trainName,
    dest: destination,
    trtime: trainTime,
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

var th = $("<th>");
th.text("Train Name");
tr.append(th);
var th1 = $("<th>");
th1.text("Destination");
tr.append(th1);
var th2 = $("<th>");
th2.text("Arrival Time");
tr.append(th2);
var th3 = $("<th>");
th3.text("Frequency");
tr.append(th3);


table.append(tr);

$("#train-table-div").append(table);



database.ref("/trains").on("child_added", function(snapshot) {

  console.log(snapshot.val());

  var tr = $("<tr>");

  var td = $("<td>");
  td.text(snapshot.val().train);
  tr.append(td);
  var td1 = $("<td>");
  td1.text(snapshot.val().dest);
  tr.append(td1);
  var td2 = $("<td>");
  td2.text(snapshot.val().);
  trtime.append(td2);
  var td3 = $("<td>");
  td3.text(snapshot.val().freq);
  tr.append(td3);

  $("#train-table").append(tr);

})



$("#submit-btn").on("click", submitBtn);
