var rm, lines;
var z;
var places, rg;
var input;
var cur_room;

class Room {
    constructor(name) {
        this.title = name;
        this.north = null;
        this.east = null;
        this.west = null;
        this.south = null;
    }

    move(dir) {
        if (dir === "north") {
            if (this.north != null) cur_room = this.north;
            else {
                var new_room = new Room(rg.expand());
                new_room.south = this;
                this.north = new_room;
                cur_room = new_room;
            }
        }
        else if (dir === "south") {
            if (this.south != null) cur_room = this.south;
            else {
                var new_room = new Room(rg.expand());
                new_room.north = this;
                this.south = new_room;
                cur_room = new_room;
            }
        }
        else if (dir === "east") {
            if (this.east != null) cur_room = this.east;
            else {
                var new_room = new Room(rg.expand());
                new_room.west = this;
                this.east = new_room;
                cur_room = new_room;
            }
        }
        if (dir === "west") {
            if (this.west != null) cur_room = this.west;
            else {
                var new_room = new Room(rg.expand());
                new_room.east = this;
                this.west = new_room;
                cur_room = new_room;
            }
        }
        else { // move in random direction
            var dirs = ["north", "south", "east", "west"];
            var random_dir = random(dirs);
            this.move(random_dir);
        }
    }
}

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

    input = createInput();
    input.position(windowWidth/2, windowHeight*4/5);

    cur_room = new Room("room");

    rg = new RiGrammar();
    rg.loadFrom("places.yml");


    rm = new RiMarkov(5);
    rm.loadText(z.join(' '));

    drawText();
}

function drawText() {
    background(253, 246, 227);
    var first_letter = cur_room.title.substring(0, 1);
    var article = "a ";
    if (first_letter == "a" || 
        first_letter == "e" ||
        first_letter == "i" ||
        first_letter == "o" ||
        first_letter == "u")
        article = "an ";
    text("You are in " + 
         article + 
         cur_room.title + ".", windowWidth/2, windowHeight/4);

    var lines = rm.generateSentences(4);
    text(lines.join(' '), windowWidth/4, windowWidth*3/4, windowHeight/2, windowHeight*3/4);
}

function keyPressed() {
    if (keyCode === ENTER) {
        // make sure they're correct formatting
        const input_cmd = RiTa.trimPunctuation(input.value().trim());
        const cmd_tokens = RiTa.tokenize(input_cmd);
        console.log(input_cmd);
        for (var i = 0; i < cmd_tokens.length; i++) {
            cmd_tokens[i].trim().toLowerCase();
        }

        // move
        
        if (cmd_tokens[0] === "move") cur_room.move(cmd_tokens[1]);

        // try to return something based on what they say
        else rm.loadTokens(cmd_tokens);

        drawText();
    }
}