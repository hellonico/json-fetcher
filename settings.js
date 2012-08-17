// supposing the proxy server is on the same server with a different port
// also supposing we are using: https://github.com/hellonico/dapah
var baseProxyUrl = "http://localhost:9999/__ajaxproxy/"

query_buttons = [
	["","clear"],
	["postalcodes[0]", "First Postcode"]
]
select_urls = [
	// ["http://api.geonames.org/citiesJSON?north=44.1&south=-9.9&east=-22.4&west=55.2&lang=de&username=demo", "Sample 1"],
	["http://api.geonames.org/postalCodeLookupJSON?postalcode=6600&country=AT&username=demo", "Sample"]
]
default_id = "";
default_url = "";

console.log(query_buttons);