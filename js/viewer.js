
/*****MAIN*****/
jQuery(document).ready(function() {

  // window.parent would get to calling window

  // grab the uidlist from the iframe data
  var uidlist=getCallingParam("uidlist");
  expected_profiles=uidlist.length;

/*
  var dataTypelist= loadAndProcessFromUID(uidlist);
  if(dataTypelist == null) {
     window.console.log("ERROR, no datatype in the data file\n");
     return;
  }
*/
 
// Assign handler to message event
  if(window.addEventListener) {
     window.addEventListener('message', handleMessage, false);
  } else if ( window.attachEvent ) { // ie8
     window.attachEvent('onmessage', handleMessage);
  }

}) // end of MAIN
