var b = 0
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

function span(w) {
    a = [];
    for (i in w){
        a.push("<span id='"+i+"'>"+w[i]+"</span>");
    }
    return a;
}

function newBranch() {
    w = "";
    $("#container").append("<div id='branch' class='b"+b.toString(10)+"'>"+w+"</div>")
    b += 1
}

$(document).ready(function() {
    function start() {
        newBranch()
        y = setInterval(function() {
            $("#branch.b"+(b-1).toString(10)).css("right","+=1")
        }, 50)
    }
    start()
    if (parseInt($("#branch.b"+(b-1).toString(10)).css("right"),10) === 20) {
        console.log("is it here?")
        clearInterval(y);
        start()
        break;
    } else {
      console.log("nope")
    }
});