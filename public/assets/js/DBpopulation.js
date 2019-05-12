//var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var source = "file://C:/Users/Afafamba/Documents/GitHub/Bookstore-Hypermedia-2019---FE/public/assets/js/DBpopulation.json";

function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    var allText = null;
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                allText = rawFile.responseText;
                //console.log(allText);
            }
        }
    }
    rawFile.send(null);
    return allText;
}

var dataRead = readTextFile(source);
//console.log(" response " + dataRead);
var objRead = eval(dataRead);
console.log(objRead[0]);