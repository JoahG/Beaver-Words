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

// Space between branches (in px)
var o = 40

// Frontmost branch for removal
var e = 0

// Number of User branches 
var y = 0

// Number of CPU branches
var p = 0

// Testing variable (when inputted to the Chrome console, it should output the HTML for the letter it is waiting for)
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
    c = w[Math.floor((Math.random()*w.length))]
    $("#container").append("<div id='branch' class='b"+b.toString(10)+"'>"+span(c)+"</div>")
    b += 1
}

// Adds a new branch, and sets it in motion
function start() {
    // Create new branch
    newBranch()

    // Set the branch in motion, going one pixel every 'q' milliseconds
    $("div#branch.b"+(b-1).toString(10)).animate({right:"250"}, q*432, 'linear')

    // Check every millisecond to see if it needs to add another branch (last branch has reached 20px left margin)
    a = setInterval(function() {if (parseInt($("div#branch.b"+(b-1).toString(10)).css("right"),10) === o) {start()}}, 1)
}

function stop(m) {
    $("#branch").remove()
    $("#overlay").show()
    $("#msg").show()
    $("#msg span").text(m)
}

function uUp() {
    console.log("User Up 1")
    $("#udam").removeClass('u' + y)
    y += 1
    if (y === 9) {
        stop("You Win! :)")
    }
    $("#udam").addClass('u' + y)
}

function cpuUp() {
    console.log("Computer Up 1")
    $("#cdam").removeClass('u' + p)
    p += 1
    if (p === 1) {
        stop("You Lose :(")
    }
    $("#cdam").addClass('u' + p)
}

$(document).ready(function() {
    start()

    // When a branch hits 250px right margin, remove it
    setInterval(function() {if (parseInt($("div#branch.b"+e.toString(10)).css("right"),10) === 250) {$("div#branch.b"+e.toString(10)).remove(); e+=1; cpuUp(); h += 1}}, 1)

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
            if (parseInt($("div#branch.b"+e.toString(10)).css("right"),10) < o) {
                start()
            }
            $("div#branch.b"+h.toString(10)).remove();
            uUp()
            h += 1
            i = 0
            e += 1
        }
        // if (k === " ") {$("div#branch.b"+e.toString(10)).remove(); e+=1; cpuUp(); h += 1; start()}
    });

    $("#button").click(function() {
        start()
        $("#overlay").hide()
        $("#msg").hide()
        
    });
});