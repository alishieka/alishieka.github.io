var lastTampering = document.lastModified;
document.getElementById("output").textContent = "Last Updated: " + lastTampering;
var currentYear = new Date();
document.getElementById("classYear").textContent = currentYear.getFullYear();