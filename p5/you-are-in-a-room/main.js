var rm, lines;
var z;
var cur_loc;
var places, rg;

function preload() {
    z = loadStrings("zork.txt");
}

function setup() {

    createCanvas(windowWidth, windowHeight);
    background(253, 246, 227);
    fill(48, 63, 71);
    textSize(50);
    textAlign(CENTER, CENTER);
    noStroke();

    rg = new RiGrammar();
    rg.loadFrom("places.yml");
    cur_loc = "room";


    rm = new RiMarkov(5);
    rm.loadText(z.join(' '));

    drawText();
}

function drawText() {
    background(253, 246, 227);
    var first_letter = cur_loc.substring(0, 1);
    var article = "a ";
    if (first_letter == "a" || 
        first_letter == "e" ||
        first_letter == "i" ||
        first_letter == "o" ||
        first_letter == "u")
        article = "an ";
    text("You are in " + 
         article + 
         cur_loc + ".", windowWidth/2, windowHeight/2);

    // text(lines.join(' '), windowWidth/2, windowHeight/2);
}

function mouseClicked() {
    // lines = rm.generateSentences(2);
    
    cur_loc = rg.expand();
    drawText();
}

// var rm, lines;
// var z;

// function preload() {
//     z = loadStrings("zork.txt");
// }

// function setup() {

//     createCanvas(windowWidth, windowHeight);
//     background(253, 246, 227);
//     fill(48, 63, 71);
//     textSize(50);
//     textAlign(CENTER, CENTER);
//     noStroke();

//     lines = ["click to re-generate"];

//     rm = new RiMarkov(4);
//     rm.loadText(z.join(' '));

//     drawText();
// }

// function drawText() {
//     background(253, 246, 227);
//     text(lines.join(' '), windowWidth/2, windowHeight/2);
// }

// function mouseClicked() {
//     lines = rm.generateSentences(2);
//     drawText();
// }
