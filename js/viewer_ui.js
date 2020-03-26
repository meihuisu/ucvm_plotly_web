// track what is current type being displayed
var save_dataType;

function getTargetList() { // get a list of uid 
  // should be grabbing from the html iframe's  arg 
var ulist=["UCVM_1585075692897", "UCVM_1585075710277"];
  return ulist;
}

function acceptProfileData() {
  window.console.log("Got a ping from somewhere..\n");
}


function refreshPlot() {
  var dtype=document.getElementById("dataType").value;
  // dtype could be vs, vp, density
  if(dtype == save_data_type) {
    // do nothing
    return;
  }

  $('#myDiv').empty();
  save_data_type=dtype;
  addLinesPlot(save_data_type);
}

