$("#url").val(default_url);
$("#pid").val(default_id);

$.each(query_buttons, function(i, e) {
	$('#buttons').append("<input class=\"btn btn-mini btn-primary\" type=\"button\" id=\"q"+i+"\" title=\""+e[0]+"\" value=\""+e[1]+"\"></input>&nbsp;");
	$("#q"+i).on("click", function() {
		$("#filter").val(e[0]);
		render();
	});
});

$.each(select_urls, function(i, e) {
	$("#selecturls").append("<option value=\""+e[0]+"\">"+e[1]+"</option>");
});

$("#urlt").hide();
$("#c1").live("click", function() {
	$("#urlt").toggle();
	$("#urls").toggle();
	$("#pid").toggle();
});

var jsonObject;

function render() {
	if($("#debug").html() == "")
	  getJson();
	
	var json;
	var v = $("#filter").val();
  if(v!="") {
	json = jsonPath(jsonObject, "$.."+v.replace(/ /g,''));
	}
	 
  else {
   json = jsonObject;
}
	
	if($('#format').val() == 'dynamic') {
			$('#debug').jsonView(json);
	} 
	
	if($('#format').val() == 'table') {
		var ppTable;
		if(json[0]!=undefined) {
			ppTable = prettyPrint(json[0], {});
		} else {
			ppTable = prettyPrint(json, {});
		}
		$("#debug").html(ppTable);
	}
	
	if($('#format').val() == 'raw') {	
		 $("#debug").html(JSON.stringify(json, null, 4));	
	}
	
	if($('#format').val() == 'simple') {	
		var str = JSON.stringify(json, null, 4);	
		str = "<span><pre><code>"+str+"</code></pre></span>"
		$("#debug").html(str);
		$('pre code').each(function(i, e) {hljs.highlightBlock(e)});
	}
	
}

$("#format").on("change", function() {
	render();
});

$("#filter").on("change", function() {
	render();
});

function getJson() {
	// stupid
	var baseUrl = $("#urls").is(':visible') ? $("select.urlv").val() : $("input.urlv").val();
	var metadataURL = baseUrl;
	// append the id only if we are in select box list mode
	if($("#c1").attr('checked')==undefined) {

		metadataURL+=$("#pid").val();
	}
	
	var contentType = "application/json"
	var dataType = "json"
	// if($('#c2').attr('checked')) {
	// 	contentType = "application/text"
	// 	dataType = "text"
	// }
	$("#debug").html("<img style=\"padding-left:40%; padding-top: 15%;\" src=\"css/img/ajax-loader-bar.gif\" border=\"0\"/>");
	
	var useProxy = $('#c3').attr('checked');
	if(useProxy) {
		console.log("using proxy:"+baseProxyUrl)
		metadataURL = baseProxyUrl+metadataURL;
	}
	console.log("fetching:"+metadataURL);
	
	if(metadataURL != "")
	{
	$.ajax({
		type: 'GET',
		url: metadataURL,
		async: false,
		cache: false,
		contentType: contentType,
		dataType: dataType,
		success: function( json )
		{
			// if($('#c2').attr('checked')) {
			// 	jsonObject = JSON.parse(json)
			// } else {
				jsonObject = json
			// }
			console.log(jsonObject);
			render();			
		},
		error: function(e)
		{
			$("#debug").html(e.statusText);
		}
	});
	
	} // end if
}

$("#button").live("click", function() {
	getJson();
});