
/*
https://stackoverflow.com/questions/45104632/plotly-js-modebar-download-as-png-give-png-a-name
*/
/**************************************************************/
function addAPlot(data, layout, image_fname) {
         //  displayModeBar: true
  var nplot=Plotly.newPlot('myDiv', data, layout,
        {
           toImageButtonOptions: { filename: image_fname, format: 'png' }
        });
  return nplot;
}

/**************************************************************/
function addLinesPlot(dtype) {

  var divname="#myDiv";

  var _data=makeLinesDataTraces(dtype,pPlot_data);

  var yaxis="Depth (m)";
  var xaxis="Vs (m/s)";

  if(dtype=="vp") {
    xaxis="Vp (m/s)";
  }
  if(dtype=="density") {
    xaxis="Rho (g/cm^3)";
  }
  var _layout=getPlotlyLayout(dtype,xaxis,yaxis,"Depth Profiles");

  var ptitle="profile_plot";
  addAPlot(_data, _layout, ptitle);
} 

function makeLinesDataTraces(dtype) {

  var psz=pPlot_data.length;
  var i,j;
  var ret=[];
  var xval=[];
  var name=uid+model;

  for(i=0; i<psz; i++) {
    var uid=pPlot_uid[i];
    var info=pPlot_info[i];
    var model=info['model'];
    var item=pPlot_data[i];
    var yval=item['depth'];
    var mp=item['mp']; 
    var dsz=mp.length;
    for(j=0;j<dsz;j++) {
      var titem=mp[j];
      var term=titem[dtype]/1000;
      xval.push(term);
    }
    
    var marker_val = { 
        size:4,
        symbol:'circle', 
        color: defaultColor[i], 
        opacity: 1,
        line: {color: 'black', width: 1}
      };

    var t={ 
        x:xval,
        y:yval,
        name:name,
        marker: marker_val, 
        line: {width:3, opacity:1},
        mode: "lines+markers",
        type:"scatter" };

    ret.push(t);  
    xval=[];
  }

  return ret;
}

function getPlotlyLayout(datatype,xaxis,yaxis,title) {
  
  var height=window.innerHeight;
  var width=window.innerWidth;
  var pheight= 0.8 * height;
  var pwidth= 0.9 * width;

  var p= {
        xaxis: {
          domain: [0,0.8],
          title: xaxis,
          showline: true,
          ticks:'outside',
          linewidth: 2,
          zeroline: true
        },
        yaxis: {
          title: yaxis,
          showline: true,
          ticks:'outside',
          linewidth: 2,
          autorange: 'reversed',
//          range: [50000,0],  // 0, 50km
          zeroline: true
        },
        width: pwidth,
        height: pheight,
        margin: { t:50, b:40 },
        showlegend: true,
        hovermode: 'closest',
//       legend: { traceorder: 'reversed' }
        };

  if(title != null) {
    p.title=title;
  }
  return p;
}
