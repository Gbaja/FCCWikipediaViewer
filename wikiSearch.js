$(document).ready(function(){
     $("#searchBtn").click(function() {
            var searchValue = $("#searchBox").val();
            var wikiSearch = xhttpWiki(searchValue);
            getResult(wikiSearch);
            $("#searchBox").val("");
     })
});

function xhttpWiki(search){
    var url = "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch="+search+"&origin=*";

    var xhr = new XMLHttpRequest(search);
    xhr.open("GET", url, false);
    xhr.send();

    return xhr;
}

var displayResult = document.getElementById("searchResult");    
function getResult(result){
    if(result.status === 200){
        var responses = result.responseText;
        var responseJS = JSON.parse(responses)
        var pageid = [];
        for( var id in responseJS.query.pages ) {
              pageid.push( id );
           }
        displayResult.innerHTML = "";
        for(var i = 0; i < pageid.length; i++){
            displayResult.innerHTML += "<div class='display'>" + "<h2>" + responseJS.query.pages[pageid[i]].title + "</h2>" + "<p>" + responseJS.query.pages[pageid[i]].extract + "</p>" +  "<a href='https://en.wikipedia.org/?curid="+responseJS.query.pages[pageid[i]].pageid+"'>" + "Visit wiki page" + "</a>" + "</div>";
        }
    }
}