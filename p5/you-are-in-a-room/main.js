var rm, lines;
var z;
var cur_loc;
var places, rg;

function preload() {
    z = loadStrings("zork.txt");
    places = loadStrings("places.yml");
}

function setup() {

    createCanvas(windowWidth, windowHeight);
    background(253, 246, 227);
    fill(48, 63, 71);
    textSize(50);
    textAlign(CENTER, CENTER);
    noStroke();

    rg = new RiGrammar(places.join('\n'));
    cur_loc = "room";


    rm = new RiMarkov(5);
    rm.loadText(z.join(' '));

    drawText();
}

function drawText() {
    background(253, 246, 227);
    text("You are in a " + cur_loc, windowWidth/2, windowHeight/2);

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
