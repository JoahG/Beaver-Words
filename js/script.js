// Number of branches
var b = 0

// Current Branch
var h = 0

// Dictionary of words
var w = ["test","joah","haley"]

// Current word
var c = ""

// Current Speed
var q = 50

var l;

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

// Adds a new branch, and sets it in motion
function start() {
    newBranch()
    y = setInterval(function() {$("div#branch.b"+(b-1).toString(10)).css("right","+=1")}, q)
    a = setInterval(function() {if (parseInt($("div#branch.b"+(b-1).toString(10)).css("right"),10) === 20) {clearInterval(y);start()}}, 1)
}

$(document).ready(function() {
    start()
    // Counter for current letter (of current word)
    var i = 0
    $(this).keypress(function() {
        // Key pressed
        var k = s(event.keyCode ? event.keyCode : event.which);

        // Current letter's <span>
        l = $("div#branch.b"+h.toString(10)+" span#"+i.toString(10));
        if (k === l.text()) {
            l.css("color","green");
            i += 1
        }
        if (i === c.length) {
            $("div#branch.b"+h.toString(10)).remove();
            clearInterval(y)
            clearInterval(a)
            h += 1
            i = 0;
            start();
        }
    });
});