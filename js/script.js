// Number of branches
var b = 0

// Current Branch
var h = 0

// Dictionary of words
var hardWords = [ 'Aeroplane',  'Aircraft Carrier',  'Airforce',  'Airport',  'Alphabet',  'Backpack',  'Balloon',  'Banana',  'Barbecue',  'Bathroom',  'Bathtub',  'Bottle',  'Bridge',  'Butterfly',  'Button',  'Cappuccino',  'Car-race',  'Carpet',  'Carrot',  'Chess Board',  'Chisel',  'Chocolates',  'Church',  'Church',  'Circle',  'Circus',  'Circus',  'Coffee',  'Coffee-shop',  'Compact Disc',  'Compass',  'Computer',  'Crystal',  'Data Base',  'Diamond',  'Electricity',  'Elephant',  'Eraser',  'Explosive',  'Family',  'Feather',  'Festival',  'Finger',  'Floodlight',  'Flower',  'Freeway',  'Fungus',  'Garden',  'Gemstone',  'Gloves',  'Grapes',  'Guitar',  'Hammer',  'Hieroglyph',  'Highway',  'Ice-cream',  'Insect',  'Jet fighter',  'Kaleidoscope',  'Kitchen',  'Leather jacket', "Lackadaisically" ,  'Library',  'Liquid',  'Magnet',  'Meteor',  'Microscope',  'Milkshake',  'Monster',  'Mosquito',  'Necklace',  'Needle',  'Paintbrush',  'Parachute',  'Passport',  'Pebble',  'Pendulum',  'Pepper',  'Perfume',  'Pillow',  'Planet',  'Pocket',  'Post-office',  'Potato',  'Printer',  'Prison',  'Pyramid',  'Rainbow',  'Record',  'Restaurant',  'Rocket',  'Saddle',  'Sandpaper',  'Sandwich',  'Satellite',  'School',  'Shower',  'Signature',  'Skeleton',  'Software',  'Space Shuttle',  'Spectrum',  'Sphere',  'Spiral',  'Sports-car',  'Spot Light',  'Square',  'Staircase',  'Stomach',  'Sunglasses',  'Surveyor',  'Swimming Pool',  'Tapestry',  'Telescope',  'Television',  'Tennis racquet',  'Thermometer',  'Toilet',  'Tongue',  'Torpedo',  'Treadmill',  'Triangle',  'Tunnel',  'Typewriter',  'Umbrella',  'Vacuum',  'Videotape',  'Vulture',  'Weapon',  'Wheelchair',  'Window' ]

var easyWords = [ 'Air',  'Album',  'Apple',  'Arm',  'Army',  'Baby',  'Baby',  'Bank',  'Bed',  'Bed',  'Bee',  'Bible',  'Bible',  'Bird',  'Bomb',  'Book',  'Boss',  'Bowl',  'Box',  'Boy',  'Brain',  'Car',  'Cave',  'Chair',  'Chief',  'Child',  'Clock',  'Clown',  'Comet',  'Cup',  'Cycle',  'Desk',  'Drill',  'Drink',  'Drum',  'Ears',  'Earth',  'Egg',  'Eyes',  'Fan',  'Film',  'Fire',  'Foot',  'Fork',  'Fruit',  'Game',  'Gas',  'Gate',  'God',  'Hat',  'Horse',  'Hose',  'Ice',  'Junk',  'Knife',  'Leg',  'Man',  'Map',  'Maze',  'Meat',  'Milk',  'Mist',  'Money',  'Mouth',  'Nail',  'Navy',  'Onion',  'Pants',  'Plane',  'Radar',  'Rifle',  'Ring',  'Robot',  'Rock',  'Roof',  'Room',  'Rope',  'Salt',  'Ship',  'Shoes',  'Shop',  'Slave',  'Snail',  'Solid',  'Spice',  'Spoon',  'Star',  'Sun',  'Sword',  'Table',  'Teeth',  'Tiger',  'Torch',  'Train',  'Water',  'Web',  'Worm',  'X-ray' ]

var w = [];

// Word *order* (I realized I had a major problem here)
var c = [];

// Current Speed
var q = 25

// Down-counter for z-index of branches
var z = 10000

// Space between branches (in px)
var o = -50

// Frontmost branch for removal
var e = 0

// Number of User branches 
var y = 0

// Number of CPU branches
var p = 0

// Used for Progressive Leveling
var pl = 0
var v = false;
var x = ["e","m","e","m","h","m","h","m","h","h"]

// Testing variable (when inputted to the Chrome console, it should output the HTML for the letter it is waiting for)
var l;

// Used to reset all the variables
function reset() {
    $("#udam").removeClass().addClass('u0')
    $("#cdam").removeClass().addClass('u0')
    b = 0
    h = 0
    c = []
    q = 25
    o = -50
    e = 0
    y = 0
    p = 0
}

function resetLevels() {
    pl = 0
    v = false
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
    $("div#branch.b"+(b-1).toString(10)).css("right", parseInt("-"+($("div#branch.b"+(b-1).toString(10)).css("width").toString(10)), 10))
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
    resetLevels()
    $("body #branch").remove()
    $("#overlay").show()
    $("#msg").show()
    $("#msg span").show().text(m)
    $("#pa").show()
}

function levelUp(a) {
    if (a === undefined){
        pl += 1
    }
    $("body #branch").remove()
    $("#overlay").show()
    $("#msg").show()
    $("#levelup").show()
    $("#levelup span").show().text((pl+1).toString(10))
}

// Increases User Score by 1
function uUp() {
    console.log("User Up 1")
    $("#udam").removeClass('u' + y)
    y += 1
    if ((pl+1) === x.length) {
        v = false;
    }
    if (y === 9) {
        if (v) {
            levelUp()
        } else {
            stop("You Win! :)")
        }
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

// Shows the "Choose Level" screen
function showChoose() {
    $("#overlay").show()
    $("#msg").show()
    $("#msg span").hide()
    $("#pa").hide()
    $("#choose").show()
}

// Starts the game
function startGame(a) {
    reset()
    $("#overlay").hide()
    $("#msg").hide()
    $("#pa").hide()
    $("#choose").hide()
    $("#levelup").hide()
    $("#levelup span").hide()
    // Sets variables to difficulty, 'w' is the dictionary of words, 'o' is the distance between branches, and 'q' is the speed (Lower is faster)
    if (a === "e") {
        w = easyWords;
        o = -10;
        q = 25
    }
    if (a === "m") {
        w = easyWords;
        o = -50;
        q = 20
    }
    if (a === "h") {
        w = hardWords;
        o = -100;
        q = 15
    }
    if (a === "p") {
        resetLevels()
        levelUp(1)
    } else {
        console.log(a)
        start()
    }
}

$(document).ready(function() {
    showChoose()

    // Counter for current letter (of current word)
    var i = 0

    // When a branch hits 250px right margin, remove it
    setInterval(function() {if (parseInt($("div#branch.b"+e.toString(10)).css("right"),10) === 250) {$("div#branch.b"+e.toString(10)).remove(); e+=1; cpuUp(); h += 1; i = 0}}, 1)

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
    });

    // When you click the "Play Again?" button, it starts the game, hides the #overlay (and #msg), and resets the variables
    $("#pa").click(function() {
        showChoose()
    });

    // Easy, Medium, and Hard buttons are simple function calls passing the level as the parameter
    $("#easy").click(function() {
        startGame("e");
    });
    $("#med").click(function() {
        startGame("m");
    });
    $("#hard").click(function() {
        startGame("h");
    });
    $("#pro").click(function() {
        startGame("p");
        v = true;
    });
    $("#begin").click(function() {
        startGame(x[pl]);
    });
});