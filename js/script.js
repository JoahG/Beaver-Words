var branchHeight = 14;
var scoreLimit = 9;

// Number of branches
var b = 0;

// Current Branch
var h = 0;

// Dictionary of words
var hardWords = [ 'Aeroplane',  'Aircraft-Carrier',  'Airforce',  'Airport',  'Alphabet',  'Backpack',  'Balloon',  'Banana',  'Barbecue',  'Bathroom',  'Bathtub',  'Bottle',  'Bridge',  'Butterfly',  'Button',  'Cappuccino',  'Car-race',  'Carpet',  'Carrot',  'Chess-Board',  'Chisel',  'Chocolates',  'Church',  'Church',  'Circle',  'Circus',  'Circus',  'Coffee',  'Coffee-shop',  'Compact-Disc',  'Compass',  'Computer',  'Crystal',  'Data-Base',  'Diamond',  'Electricity',  'Elephant',  'Eraser',  'Explosive',  'Family',  'Feather',  'Festival',  'Finger',  'Floodlight',  'Flower',  'Freeway',  'Fungus',  'Garden',  'Gemstone',  'Gloves',  'Grapes',  'Guitar',  'Hammer',  'Hieroglyph',  'Highway',  'Ice-cream',  'Insect',  'Jet-fighter',  'Kaleidoscope',  'Kitchen',  'Leather-jacket',  'Lackadaisically',  'Library',  'Liquid',  'Magnet',  'Meteor',  'Microscope',  'Milkshake',  'Monster',  'Mosquito',  'Necklace',  'Needle',  'Octopus',  'Paintbrush',  'Parachute',  'Passport',  'Pebble',  'Pendulum',  'Pepper',  'Perfume',  'Pillow',  'Planet',  'Pocket',  'Platapus',  'Post-office',  'Potato',  'Printer',  'Prison',  'Pyramid',  'Rainbow',  'Record',  'Restaurant',  'Rocket',  'Saddle',  'Sandpaper',  'Sandwich',  'Satellite',  'School',  'Shower',  'Signature',  'Skeleton',  'Software',  'Space-Shuttle',  'Spectrum',  'Sphere',  'Spiral',  'Sports-car',  'Spot-Light',  'Square',  'Staircase',  'Stomach',  'Sunglasses',  'Surveyor',  'Swimming-Pool',  'Tapestry',  'Telescope',  'Television',  'Tennis-racquet',  'Thermometer',  'Toilet',  'Tongue',  'Torpedo',  'Treadmill',  'Triangle',  'Tunnel',  'Typewriter',  'Umbrella',  'Vacuum',  'Videotape',  'Vulture',  'Weapon',  'Wheelchair',  'Window' ];
var easyWords = [ 'Air',  'Album',  'Apple',  'Arm',  'Army',  'Baby',  'Baby',  'Bank',  'Bed',  'Bed',  'Bee',  'Bible',  'Bible',  'Bird',  'Bomb',  'Book',  'Boss',  'Bowl',  'Box',  'Boy',  'Brain',  'Car',  'Cave',  'Chair',  'Chief',  'Child',  'Clock',  'Clown',  'Comet',  'Cup',  'Cycle',  'Desk', 'Dog' ,  'Drill',  'Drink',  'Drum',  'Ears',  'Earth',  'Egg',  'Eyes',  'Fan',  'Film',  'Fire',  'Foot',  'Fork',  'Fruit',  'Game',  'Gas',  'Gate',  'God',  'Hat',  'Horse',  'Hose',  'Ice',  'Junk',  'Knife',  'Leg',  'Man',  'Map',  'Maze',  'Meat',  'Milk',  'Mist',  'Money',  'Mouth',  'Nail',  'Navy',  'Onion',  'Pants',  'Plane',  'Radar',  'Rifle',  'Ring',  'Robot',  'Rock',  'Roof',  'Room',  'Rope',  'Salt',  'Ship',  'Shoes',  'Shop',  'Slave',  'Snail',  'Solid',  'Spice',  'Spoon',  'Star',  'Sun',  'Sword',  'Table',  'Teeth',  'Tiger',  'Torch',  'Train',  'Water',  'Web',  'Worm',  'X-ray' ];
var w = []; // Current Dictionary

// Word order
var c = [];

// Current Speed
var q = 25;

// Down-counter for z-index of branches
var z = 10000;

// Space between branches (in px)
var o = -50;

// Frontmost branch for removal
var e = 0;

// Number of User branches 
var y = 0;

// Number of CPU branches
var p = 0;

// Used for Progressive Leveling
var pl = 0; // Current Level
var v = false; // Variable to turn on/off progressive leveling
var x = ["e","m","e","m","h","m","h","m","h","h"]; // Order of levels (will be passed as parameters to startGame())

var i = 0; // Counter for current letter (of current word)

// Disables Capital Letters
var kr = false;

// Settings variable for easy access/change
var settings = {
    e: function() {      // Easy Mode
        w = easyWords;   // Dictionary to use
        o = -10;         // Space in between branches
        q = 25;          // Speed (Less is more) - ms/px
        kr = true;       // Capital letters disabled
        scoreLimit = 8;
    },
    m: function() {      // Medium Mode
        w = easyWords;
        o = -70;
        q = 20;
        scoreLimit = 12;
    },
    h: function() {      // Hard Mode
        w = hardWords;
        o = -100;
        q = 15;
        scoreLimit = 15;
    }
};

// Used to reset all the variables
function reset() {
    $(".filler").css("height", 0)
    b = 0; // Sets the number of branches to 0
    h = 0; // Sets the current branch to 0
    c = []; // Empties the word order
    q = 25; // Sets the speed to the default
    o = -50; // Sets the space to the default
    e = 0; // Resets frontmost branch
    y = 0; // Resets User score
    p = 0; // Resets CPU Scoure
    kr = false; // Turns Capital letters on (default)
    t = [];
    te = [];
    hei = 130;
    while (hei <= 315) {
        t.push(hei);
        hei += branchHeight;
    }
}

// Reset the Levels (For Progressive gameplay)
function resetLevels() {
    pl = 0; // Resets current level
    v = false; // Turns off progressive levels
}

// Translates keycode to letter
function s(n) {
   var i;                          // Localize 'i' variable (So as not to use the global variable)
   if (typeof n === "string") {    // If the input is a string...
      if (n.length > 1) {          // ... And its length is more than 1,
         a = [];                   // Make an array...
         for (i in n) {
            a.push(s(n[i]));       // And use semi-recursiveness to iterate over all the characters in the string...
         }
         return a;                 // and return the array
      } else {
         return n.charCodeAt(0);   // Else, simply return the corresponding charCode
      }
   } else {
      if (typeof n === "object"){  // If the input is an array (object)
         a = [];                   // Make an array...
         for (i in n) {
            a.push(s(n[i]));       // And use semi-recursiveness to iterate over all the characters in the string...
         }
         return a;                 // and return the array
      }
      return String.fromCharCode(n); // Else, simply return the corresponding character
   }
}

// Outputs a bunch of spans with the inputted word's letters in them
function span(w) {
    var i;  // Localize 'i' variable (So as not to use the global variable)
    a = []; // Make an array...
    for (i in w){
        a.push("<span id='"+i+"'>"+w[i]+"</span>");  // Which will include each character of the inputted string in a separate <span>
    }
    return a.join(""); // Which is joined together into a longer string and returned
}

// Adds a new branch to the #container
function newBranch() {
    c.push(w[Math.floor((Math.random()*w.length))]); // Add a new random word to the word order list ('c')
    $("#container").append("<div id='branch' class='b"+b.toString(10)+"'>"+span(c[b])+"</div>"); // Append a new branch to the container, using that word
    b += 1; // Add a branch to the counter variable
    z -= 1; // Lower the z-index counter by 1
    if (t.length === 0){t = te; te = [];}
    var top = t[Math.floor(Math.random()*t.length)]
    te.push(top)
    t.splice(t.indexOf(top), 1)
    $("div#branch.b"+(b-1).toString(10)).css("right", parseInt("-"+($("div#branch.b"+(b-1).toString(10)).css("width").toString(10)), 10)); // Make sure that the CSS 'right' property is set to the branch's width
    $("div#branch.b"+(b-1).toString(10)).css("top", top ).css("z-index", z); // Set the z-index of the branch to the 'z' variable, to prevent reverse stacking
}

// Adds a new branch, and sets it in motion
function start() {
    newBranch(); // Create new branch
    $("div#branch.b"+(b-1).toString(10)).animate({right:"250"}, q*432, 'linear'); // Set the branch in motion, going one pixel every 'q' milliseconds
    a = setInterval(function() {if (parseInt($("div#branch.b"+(b-1).toString(10)).css("right"),10) === o) {start();}}, 1); // Check every millisecond to see if it needs to add another branch (last branch has reached 20px left margin)
}

// Stops the game, removes all branches from view, and shows the #overlay
function stop(m) {
    resetLevels(); // Call the resetLevels() variable
    $("body #branch").remove(); // Remove any branches in the body
    $("#overlay").show(); // Show the #overlay
    $("#keyb").show();     // Show the keyboard shortcuts button
    $("#msg").show(); // Show the #msg
    $("#msg span").show().text(m); // Show the span in the #msg, and make it say the inputted variable
    $("#pa").show(); // Show the 'Play Again' button
}

// Displays the "Level up" box
function levelUp(a) {
    if (a === undefined){ pl += 1; } // Simple way to bypass increasing the level on the first call (Level 1)
    $("body #branch").remove(); // Remove all branches
    $("#overlay").show(); // Show the #overlay
    $("#keyb").show();     // Show the keyboard shortcuts button
    $("#msg").show(); // Show the #msg
    $("#levelup").show(); // Show the #levelup text
    $("#levelup span").show().text((pl+1).toString(10)); // Display the current level in '#levelup span'
    $("#begin").show();
}

// Increases User Score by 1
function uUp() {
    y += 1; // Increase the User's score by 1
    if ((pl+1) === x.length && v) { // If the User is playing progressive mode, and has reached the last level,
        v = false; // Turn off progressive mode
    }
    if (y === scoreLimit) { // If the User has completed his dam
        if (v) { // If the User is playing progressive mode,
            levelUp(); // Level up
        } else {
            stop("You Win! :)"); // Stop and say, "You Win!"
        }
    }
    $("#uFiller").css("height", y*(parseInt($("#udam").css("height"), 10)/scoreLimit))
}

// Increases CPU Score by 1
function cpuUp() {
    $("div#branch.b"+e.toString(10)).remove(); // Remove the current branch
    e+=1; // Change frontmost branch
    p += 1; // Increase the CPU's score by 1
    if (p === scoreLimit) { // If the CPU has completed its dam
        stop("You Lose :("); // Stop and say, "You Lose"
    }
    $("#cpuFiller").css("height", p*(parseInt($("#cdam").css("height"), 10)/scoreLimit))
    h += 1; // Change current branch
    i = 0; // Reset current letter (Of current word)
}

// Shows the "Choose Level" screen
function showChoose() {
    $("#overlay").show();  // Show the #overlay
    $("#keyb").show();     // Show the keyboard shortcuts button
    $("#msg").show();      // Show the #msg
    $("#msg span").hide(); // Hide the <span> in the #msg
    $("#pa").hide();       // Hide the "Play Again" button
    $("#choose").show();   // Show the "Choose Level" screen
}

// Starts the game
function startGame(a) {
    reset(); // Reset the variables
    $("#overlay").hide(); // Hide the #overlay
    $("#keyb").hide(); // Hide the keyboard shortcuts button
    $("#msg").hide(); // Hide the #msg
    $("#pa").hide(); // Hide the "Play Again" button
    $("#choose").hide(); // Hide the "Choose Level" screen
    $("#levelup").hide(); // Hide the #levelup screen
    $("#levelup span").hide(); // Hide the Level on the #levelup screen
    $("#begin").hide() // Hide the #begin button
    // Sets variables to difficulty, 'w' is the dictionary of words, 'o' is the distance between branches, and 'q' is the speed (Lower is faster)
    if (a === "e") { 
        settings.e(); // If the passed parameter is "e," set the settings to Easy
    }
    if (a === "m") {
        settings.m(); // If the passed parameter is "m," set the settings to Medium
    }
    if (a === "h") {
        settings.h(); // If the passed parameter is "h," set the settings to Hard
    }
    if (a === "p") {
        resetLevels(); // If the passed parameter is "p," Reset the levels
        levelUp(1); // And show the #levelup screen, showing level 1 (the parameter is *not* undefined)
    } else {
        start(); // If it isn't Progressive mode, start the game
    }
}

$(document).ready(function() {
    showChoose(); // Show the "Choose level" screen

    // When a branch hits 250px right margin, remove it
    setInterval(function() {if (parseInt($("div#branch.b"+e.toString(10)).css("right"),10) === 250) {cpuUp();}}, 1);

    $(this).keypress(function() { // Document KeyPress function
        var y = event.keyCode ? event.keyCode : event.which
        if ((y === 13)&& ($('#begin').css('display') !== "none")) {
            $("#begin").click() // If User presses [Enter], and the "begin" button is showing, press the begin button
            return true; // Exit the .keypress() function
        }
        if ((y === 13)&& ($('#pa').css('display') !== "none")) {
            $("#pa").click() // If User presses [Enter], and the "Play Again" button is showing, press the begin button
            return true; // Exit the .keypress() function
        }
        var k = s(y); // Key pressed
        if (k === " ") { 
            cpuUp(); // If User presses "[space]", forfeit branch to CPU
        }
        // If the "Choose Level" dialogue is showing, and the user presses "e", "h", "m", or "p", respond accordingly
        if (k === "e" && ($('#choose').css('display') !== "none")) {
            $("#easy").click()
            return true;
        }
        if (k === "m" && ($('#choose').css('display') !== "none")) {
            $("#med").click()
            return true;
        }
        if (k === "h" && ($('#choose').css('display') !== "none")) {
            $("#hard").click()
            return true;
        }
        if (k === "p" && ($('#choose').css('display') !== "none")) {
            $("#pro").click()
            return true;
        }

        l = $("div#branch.b"+h.toString(10)+" span#"+i.toString(10)); // Current letter's <span>

        if (k === l.text() || (kr && k.toLowerCase() === (l.text().toLowerCase()))) { // If the User typed the correct letter - or Uppercase is disabled, and the user typed the lowercase version of the letter
            l.css("color","green"); // Set the current letter to green
            i += 1; // Go to the next letter
        }
        if (i === c[h].length) { // If the User has typed the entire word
            if (parseInt($("div#branch.b"+e.toString(10)).css("right"),10) < o) { // If there isn't a branch going already...
                start(); // ... Start one
            }
            $("div#branch.b"+h.toString(10)).remove(); // Remove the last branch
            uUp(); // Increase the User's score by 1
            h += 1; // Change to the next branch as the current one
            i = 0; // Go back to the first letter of the word
            e += 1; // Increase the frontmost branch for removal variable by 1
        }
    });

    // When you click the "Play Again?" button, it starts the game, hides the #overlay (and #msg), and resets the variables
    $("#pa").click(function() {
        showChoose(); // Show the "Choose Level" screen
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

    // Progressive starts the game with "p" as the parameter, and turns on progressive mode
    $("#pro").click(function() {
        startGame("p");
        v = true;
    });

    // The #begin button is for progressive mode only, and starts the next game in the lineup
    $("#begin").click(function() {
        startGame(x[pl]);
    });
    $("#kclose").click(function() {
        $("#keyb").click()
    });
    $("#keyb").click(function(){
        $("#keyboard").toggle()
    });
});