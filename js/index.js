function loadData() {
	var wikiElem = $('#wiki-items');
	var searchText = $("#search-text").val();
	console.log(searchText);
	wikiElem.text("");
	var wikiurl = "https://en.wikipedia.org/w/api.php?action=opensearch&search="+ searchText + '&format=json';
	//Adding a Timer and executing an annonymous fallback function to set the failed wiki text element
	//if the response is not received
	var wikiRequestTimeout = setTimeout(function(){
		$wikiElem.text("Failed to get wikipedia resources");
	},8000);

	$.ajax({
		url: wikiurl,
		dataType: "jsonp",
		success: function(response){
			var wikilink;
			var wikilinktitle;
			var wikilinkdata;
			console.log(response);
			var addresswikilist = response[1];
			var addresswikidesc = response[2];
			for (var i=0;i<addresswikilist.length;i++)    {
				wikilinktitle = addresswikilist[i];
				wikilinkdata = addresswikidesc[i];
				wikilink  = 'http://en.wikipedia.org/wiki/'+ wikilinktitle ;
				var wikiElemItem = '<li><a target ="_blank" href="'+wikilink+ '">';
				wikiElemItem += '<h3>' + wikilinktitle + '</h3>';
				wikiElemItem += '<hr><p>' + wikilinkdata + '</p>';
				wikiElemItem += '</a>'+'</li>';
				wikiElem.append(wikiElemItem);
			}
			clearTimeout(wikiRequestTimeout);
		}
	}).done(function(response) {
	console.log( "wiki second success" )
	});
}

$('#btn-search').on('click',loadData);

$(window).on('keypress',function(e){
	if (e.keyCode == 13) {
		e.preventDefault();
		loadData();
   }
});

$.fn.visible = function(partial) {
	var $t            = $(this),
	$w            = $(window),
	height        = $w.height(),
	delta         = height*0.05,
	viewTop       = $w.scrollTop(),
	viewBottom    = viewTop + height,
	_top          = $t.offset().top,
	_bottom       = _top + $t.height(),
	compareTop    = partial === true ? _bottom : _top,
	compareBottom = partial === true ? _top : _bottom;
  	// console.log((viewTop+delta),(viewBottom - delta));
	// console.log(viewTop,viewBottom,_top,_bottom,compareTop,compareBottom);
	return ((compareBottom <= viewBottom-delta) && (compareTop >= viewTop+delta));
};

$(window).scroll(function(event) {
	$("li").each(function(i, el) {
		var el = $(el);
	if (el.visible(true)) {
		el.addClass("come-in");
		el.removeClass("go-out");
	}else{
		el.addClass("go-out");
		el.removeClass("come-in");
  	}
	});

});