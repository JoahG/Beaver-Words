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