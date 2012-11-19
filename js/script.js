// Number of branches
var b = 0

// Current Branch
var h = 0

// Dictionary of words
var w = ["Aeroplane" , "Air" , "Aircraft Carrier" , "Airforce" , "Airport" , "Album" , "Alphabet" , "Apple" , "Arm" , "Army" , "Baby" , "Baby" , "Backpack" , "Balloon" , "Banana" , "Bank" , "Barbecue" , "Bathroom" , "Bathtub" , "Bed" , "Bed" , "Bee" , "Bible" , "Bible" , "Bird" , "Bomb" , "Book" , "Boss" , "Bottle" , "Bowl" , "Box" , "Boy" , "Brain" , "Bridge" , "Butterfly" , "Button" , "Cappuccino" , "Car" , "Car-race" , "Carpet" , "Carrot" , "Cave" , "Chair" , "Chess Board" , "Chief" , "Child" , "Chisel" , "Chocolates" , "Church" , "Church" , "Circle" , "Circus" , "Circus" , "Clock" , "Clown" , "Coffee" , "Coffee-shop" , "Comet" , "Compact Disc" , "Compass" , "Computer" , "Crystal" , "Cup" , "Cycle" , "Data Base" , "Desk" , "Diamond" , "Drill" , "Drink" , "Drum" , "Ears" , "Earth" , "Egg" , "Electricity" , "Elephant" , "Eraser" , "Explosive" , "Eyes" , "Family" , "Fan" , "Feather" , "Festival" , "Film" , "Finger" , "Fire" , "Floodlight" , "Flower" , "Foot" , "Fork" , "Freeway" , "Fruit" , "Fungus" , "Game" , "Garden" , "Gas" , "Gate" , "Gemstone" , "Gloves" , "God" , "Grapes" , "Guitar" , "Hammer" , "Hat" , "Hieroglyph" , "Highway" , "Horse" , "Hose" , "Ice" , "Ice-cream" , "Insect" , "Jet fighter" , "Junk" , "Kaleidoscope" , "Kitchen" , "Knife" , "Leather jacket" , "Leg" , "Library" , "Liquid" , "Magnet" , "Man" , "Map" , "Maze" , "Meat" , "Meteor" , "Microscope" , "Milk" , "Milkshake" , "Mist" , "Money" , "Monster" , "Mosquito" , "Mouth" , "Nail" , "Navy" , "Necklace" , "Needle" , "Onion" , "Paintbrush" , "Pants" , "Parachute" , "Passport" , "Pebble" , "Pendulum" , "Pepper" , "Perfume" , "Pillow" , "Plane" , "Planet" , "Pocket" , "Post-office" , "Potato" , "Printer" , "Prison" , "Pyramid" , "Radar" , "Rainbow" , "Record" , "Restaurant" , "Rifle" , "Ring" , "Robot" , "Rock" , "Rocket" , "Roof" , "Room" , "Rope" , "Saddle" , "Salt" , "Sandpaper" , "Sandwich" , "Satellite" , "School" , "Ship" , "Shoes" , "Shop" , "Shower" , "Signature" , "Skeleton" , "Slave" , "Snail" , "Software" , "Solid" , "Space Shuttle" , "Spectrum" , "Sphere" , "Spice" , "Spiral" , "Spoon" , "Sports-car" , "Spot Light" , "Square" , "Staircase" , "Star" , "Stomach" , "Sun" , "Sunglasses" , "Surveyor" , "Swimming Pool" , "Sword" , "Table" , "Tapestry" , "Teeth" , "Telescope" , "Television" , "Tennis racquet" , "Thermometer" , "Tiger" , "Toilet" , "Tongue" , "Torch" , "Torpedo" , "Train" , "Treadmill" , "Triangle" , "Tunnel" , "Typewriter" , "Umbrella" , "Vacuum" , "Videotape" , "Vulture" , "Water" , "Weapon" , "Web" , "Wheelchair" , "Window" , "Worm" , "X-ray"]

// Word *order* (I realized I had a major problem here)
var c = []

// Current Speed
var q = 25

// Down-counter for z-index of branches
var z = 10000

// Space between branches (in px)
var o = -100

// Frontmost branch for removal
var e = 0

// Number of User branches 
var y = 0

// Number of CPU branches
var p = 0

// Testing variable (when inputted to the Chrome console, it should output the HTML for the letter it is waiting for)
var l;

// Used to reset all the variables
function reset() {
    b = 0
    h = 0
    c = ""
    q = 10
    o = 40
    e = 0
    y = 0
    p = 0
}

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
    c.push(w[Math.floor((Math.random()*w.length))])
    $("#container").append("<div id='branch' class='b"+b.toString(10)+"'>"+span(c[b])+"</div>")
    b += 1
    z -= 1
    $("div#branch.b"+(b-1).toString(10)).css("top", Math.floor(Math.random()*185) + 130).css("z-index", z);
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

// Stops the game, removes all branches from view, and shows the #overlay
function stop(m) {
    $("#branch").remove()
    $("#overlay").show()
    $("#msg").show()
    $("#msg span").text(m)
}

// Increases User Score by 1
function uUp() {
    console.log("User Up 1")
    $("#udam").removeClass('u' + y)
    y += 1
    if (y === 9) {
        stop("You Win! :)")
    }
    $("#udam").addClass('u' + y)
}

// Increases CPU Score by 1
function cpuUp() {
    console.log("Computer Up 1")
    $("#cdam").removeClass('u' + p)
    p += 1
    if (p === 9) {
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
        if (i === c[h].length) {
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

    // When you click the "Play Again?" button, it starts the game, hides the #overlay (and #msg), and resets the variables
    $("#button").click(function() {
        start()
        $("#overlay").hide()
        $("#msg").hide()
        reset()
    });
});