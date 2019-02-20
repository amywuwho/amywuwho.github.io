var rm, lines;
var z;
var places, rg;
var input;
var cur_room;
var lines_margin;
var cnv;

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
                var new_title = rg.expand();
                var new_room = new Room(new_title);
                rm.loadText(new_title);
                new_room.south = this;
                this.north = new_room;
                cur_room = new_room;
            }
        }
        else if (dir === "south") {
            if (this.south != null) cur_room = this.south;
            else {
                var new_title = rg.expand();
                var new_room = new Room(new_title);
                rm.loadText(new_title);
                new_room.north = this;
                this.south = new_room;
                cur_room = new_room;
            }
        }
        else if (dir === "east") {
            if (this.east != null) cur_room = this.east;
            else {
                var new_title = rg.expand();
                var new_room = new Room(new_title);
                rm.loadText(new_title);
                new_room.west = this;
                this.east = new_room;
                cur_room = new_room;
            }
        }
        else if (dir === "west") {
            if (this.west != null) cur_room = this.west;
            else {
                var new_title = rg.expand();
                var new_room = new Room(new_title);
                rm.loadText(new_title);
                new_room.east = this;
                this.west = new_room;
                cur_room = new_room;
            }
        }
        // else { // move in random direction
        //     var dirs = ["north", "south", "east", "west"];
        //     var random_dir = random(dirs);
        //     this.move(random_dir);
        // }
    }
}

function preload() {
    z = loadStrings("zork.txt");
}

function centerCanvas() {
    var x = (windowWidth - width) / 2;
    var y = (windowHeight - height) / 2;
    cnv.position(x, y);
}

function setup() {

    cnv = createCanvas(windowWidth, windowHeight);
    centerCanvas();
    background(253, 246, 227);
    fill(48, 63, 71);
    textSize(25);
    textAlign(CENTER, CENTER);
    rectMode(CENTER);
    noStroke();
    lines_margin = 50;

    input = createInput();
    // input.style('font-size', '25px');
    input.position(width/2-input.width/2, height*4/5);

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
         cur_room.title + ".", width/2, height/4);

    var lines = rm.generateSentences(4);
    text(lines.join(' '), width/2, height*3/4, width-2*lines_margin);
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
        else rm.loadText(input_cmd, 3);

        input.value('');
        drawText();
    }
}

function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
    centerCanvas();
}