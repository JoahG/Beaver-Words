// Number of branches
var b = 0

// Dictionary of words
var w = ["test","joah","haley"];

// Current word
var c = ""

// Translates keycode to letter
function s(n) {
   var i;
   if (typeof n === "string") {
      if (n.length > 1) {
         a = [];
         for (i in n) {
            a.push(s(n[i]));
         }
         return a;
      } else {
         return n.charCodeAt(0);
      }
   } else {
      if (typeof n === "object"){
         a = [];
         for (i in n) {
            a.push(s(n[i]));
         }
         return a;
      }
      return String.fromCharCode(n);
   }
}

// Outputs a bunch of spans with the inputted word's letters in them
function span(w) {
    a = [];
    for (i in w){
        a.push("<span id='"+i+"'>"+w[i]+"</span>");
    }
    return a.join("");
}

// Adds a new branch to the #container
function newBranch() {
    c = w[Math.floor((Math.random()*3))]
    $("#container").append("<div id='branch' class='b"+b.toString(10)+"'>"+span(c)+"</div>")
    b += 1
}

$(document).ready(function() {
    function start() {
        newBranch()
        y = setInterval(function() {
            $("div#branch.b"+(b-1).toString(10)).css("right","+=1")
        }, 50)
    }
    start()
    //if (parseInt($("div#branch.b"+(b-1).toString(10)).css("right"),10) === 20) {
    //    console.log("is it here?")
    //    clearInterval(y);
    //    start();
    //} 
    var i = 0
    $(this).keypress(function() {
        var k = s(event.keyCode ? event.keyCode : event.which);
        var l = $("div#branch.b"+(b-1).toString(10)+" span#"+i.toString(10));
        if (k === l.text()) {
            l.css("color","green");
            i += 1
        }
        if (i === c.length) {
            $("div#branch.b"+(b-1).toString(10)).remove();
            clearInterval(y);
            i = 0;
            start();
        }
    });
});