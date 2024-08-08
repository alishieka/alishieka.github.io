//changes the color of the storm date by removing class
function changeColor() {
    var element = document.getElementById("dateColor");
    element.classList.remove("dateColor");
  }
  
  
  //add the value of the storm severity level
  var slider = document.getElementById("severityRangeInput");
  var output = document.getElementById("severityRange");
  output.innerHTML = slider.value; 
  slider.oninput = function() {
    output.innerHTML = this.value;
  }