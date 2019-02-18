var rm, lines, rg;
var z;
var places, location;

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

    // lines = ["You are in a room."];

    rg = new RiGrammar(places.join('\n'));
    location = "room";


    rm = new RiMarkov(4);
    rm.loadText(z.join(' '));
}

function draw() {
    background(253, 246, 227);
    text("You are in a" + location, windowWidth/2, windowHeight/2);

    // text(lines.join(' '), windowWidth/2, windowHeight/2);
}

function mouseClicked() {
    // lines = rm.generateSentences(4);
    
    location = rg.expand();
}
