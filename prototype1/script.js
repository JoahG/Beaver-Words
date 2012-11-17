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

$(document).ready(function() {
    w = "Hello, this is my first test, this should work.... Maybe...";
    $("body").html(span(w));
    i = 0;
    p = 0;
    $("span#"+i).css("text-decoration", "underline");
    $(this).keypress(function() {
        var k = (event.keyCode ? event.keyCode : event.which);
        if (s(k) === w[i]) {
            $("span#"+i).css("color", "green");
            p += 1;
        } else {
            $("span#"+i).css("color", "red");
        }
        $("span#"+i).css("text-decoration", "none");
        i += 1;
        $("span#"+i).css("text-decoration", "underline");
        if (i >= w.length) {
            $("body").append("  <span id='answer' style='text-decoration: underline;'>"+p.toString(10)+"</span>");
            if (p === w.length) {
                $("body").append("   <span id='win' style='color:green;'> You Win! </span>");
            }
        }
    });
});