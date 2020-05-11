
// expected profiles
var expected_profiles;
// use as label
var  pPlot_uid=[];
//  { {depth=d, mp=[ {vp=a, vs=b, density=c}...] },.. }
var  pPlot_data=[];
// per plot
var  pPlot_info=[];

var defaultColor=[
                   '#DF013A',
                   '#298A08',
                   '#0174DF',
                   '#FF8000',
                   '#298A08',
                   '#3A848F',
                   '#0469B4',
                   '#8F3A53',
                 ];

function getDefaultColor(p) {
  var len=defaultColor.length;
  var t= (p+len) % len;
  return defaultColor[t];
}


function loadAndProcessFromUID(ulist) {
  var sz=ulist.length;
  var i;
  var cnt=0;

  for(i=0;i<sz;i++) {
     var uid=ulist[i];
     var mpfname=uid+"vertical_matprops.json";
     var metafname=uid+"vertical_meta.json";
     var mp=ckExist("data/"+mpfname);
     if(mp == null) {
        window.console.log("ERROR, can not read ",mpfname);
        continue;
     }
     var meta=ckExist("data/"+metafname);
     if(meta == null) {
        window.console.log("ERROR, can not read ",metafname);
        continue;
     }
     processProfileData(uid,JSON.parse(mp),JSON.parse(meta));
     cnt = cnt+1; 
  }
  return cnt;
}


function processProfileData(uid,mpjson,metajson) {

  var depth=metajson['depth'];
  var data=mpjson['matprops'];
  if(depth.length != data.length) {
         window.console.log("ERROR, material property data and depth does not match in size\n");
     }
  var lat=metajson['lat1'];
  var lon=metajson['lon1'];
  var model=metajson['cvm'];
  var step=metajson['vertical_spacing'];
    
  pPlot_data.push( { 'depth':depth, 'mp':data });
  pPlot_uid.push(uid);
  pPlot_info.push({ 'lat':lat, 'lon':lon,'model':model,'vstep':step });
}

// should be a very small file and used for testing and so can ignore
// >>Synchronous XMLHttpRequest on the main thread is deprecated
// >>because of its detrimental effects to the end user's experience.
function ckExist(url) {
  var http = new XMLHttpRequest();
  http.onreadystatechange = function () {
    if (this.readyState == 4) {
 // okay
    }
  }
  http.open("GET", url, false);
  http.send();
  if(http.status !== 404) {
    return http.responseText;
    } else {
      return null;
  }
};


// [{ ui:u, mp:mp, meta:meta },{}..]
function processProfileDataList(data) {
    var sz=data.length;
    var i;
    for(i=0; i<sz; i++) {
       var term=data[i];
       var uid=term['uid'];
       var mp=term['mp'];
       var meta=term['meta'];
       processProfileData(uid,mp,meta);
    }
    if(sz == expected_profiles) {
       // list should be "vs,vp,density"
       save_data_type="vs";
       addLinesPlot(save_data_type);
    }
}

// message event handler (e is event object) 
function handleMessage(e) {
    // Reference to element for data display
    var el = document.getElementById('display');
    // Check origin
    if ( e.origin === 'http://moho.scec.org' ||
	         e.origin === 'http://localhost' ) {
        //Retrieve data sent in postMessage
        //decodeURI(e.data);
        //el.innerHTML = e.data;
        var data=JSON.parse(e.data);
        processProfileDataList(data);
    }
}


// https://stackoverflow.com/questions/28295870/how-to-pass-parameters-through-iframe-from-parent-html
function getCallingParam(pname) {

  var url = window.location.search.substring(1); 
  var qArray = url.split('&'); //get key-value pairs
  for (var i = 0; i < qArray.length; i++)  
  {  
     var pArr = qArray[i].split('='); //split key and value
     if (pArr[0] == pname) {
         var r=decodeURI(pArr[1]);
         return JSON.parse(r);
     }
  }
  return null;
}
