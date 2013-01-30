$(document).ready(function() {
  $("#resetBtn").click(function() {
    var c = window.confirm("Are you sure you want to reset?");
    if (!c) return false;
  });
});
