var rm;
var z;
var places, rg;
var input;
var cur_room, start_room, you;
var lines_margin;
var cnv;
var nlp = window.nlp_compromise;

/* ------------------------- CLASS DEFINITIONS ------------------------- */
class Character {
    constructor() {
        this.inventory = {}; // key is object, value is desc
    }

    take(thing, place) {
        if (place.objects.includes(thing)) {
            var i = places.objects.indexOf(thing);
            var obj_sentence = "";
            place.objects.splice(i, 1);

            for (var j = 0; j < places.desc.length; j++) {
                if (places.desc[j].indexOf(thing) !== -1) {
                    obj_sentence += places.desc[j];
                    places.desc.splice(j, 1);
                }
            }
            this.inventory[thing] = obj_sentence;

            console.log(place.objects);
            console.log(this.inventory);
        }
    }

    put(thing, place) {
        if (this.inventory.includes(thing)) {
            place.objects += thing;
            place.desc += this.inventory[thing];
            delete this.inventory[thing];

            console.log(place.objects);
            console.log(this.inventory);
        }
    }
}

class Room {
    constructor(name) {
        this.title = name;
        this.desc = [];

        this.north = null;
        this.east = null;
        this.west = null;
        this.south = null;

        this.objects = [];
    }

    move(dir) {
        if (dir === "north" || dir === "up") {
            if (this.north != null) cur_room = this.north;
            else {
                var new_title = rg.expand();
                var new_room = new Room(new_title);
                rm.loadText(new_title);
                new_room.populate();
                new_room.south = this;
                this.north = new_room;
                cur_room = new_room;
            }
        }
        else if (dir === "south" || dir === "down") {
            if (this.south != null) cur_room = this.south;
            else {
                var new_title = rg.expand();
                var new_room = new Room(new_title);
                rm.loadText(new_title);
                new_room.populate();
                new_room.north = this;
                this.south = new_room;
                cur_room = new_room;
            }
        }
        else if (dir === "east" || dir === "right") {
            if (this.east != null) cur_room = this.east;
            else {
                var new_title = rg.expand();
                var new_room = new Room(new_title);
                rm.loadText(new_title);
                new_room.populate();
                new_room.west = this;
                this.east = new_room;
                cur_room = new_room;
            }
        }
        else if (dir === "west" || dir === "left") {
            if (this.west != null) cur_room = this.west;
            else {
                var new_title = rg.expand();
                var new_room = new Room(new_title);
                rm.loadText(new_title);
                new_room.populate();
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

    populate() {
        var sentences = rm.generateSentences(4);
        this.desc = sentences;
        
        var objs = nlp(this.desc).nouns().out('array');
        this.objects = objs;
        console.log(this.objects);
    }
}

/* ------------------------- WINDOW HELPERS ------------------------- */
function centerCanvas() {
    var x = (windowWidth - width) / 2;
    var y = (windowHeight - height) / 2;
    cnv.position(x, y);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    centerCanvas();
}

/* ----------------------- TEXT PARSE HELPERS ----------------------- */

function chooseArticle() {
    var first_letter = cur_room.title.substring(0, 1);
    var article = "a ";
    if (first_letter == "a" || 
        first_letter == "e" ||
        first_letter == "i" ||
        first_letter == "o" ||
        first_letter == "u")
        article = "an ";
    return article;
}

/* ------------------------- P5.JS DEFAULTS ------------------------- */

function preload() {
    z = loadStrings("lines.txt");
}

function setup() {

    cnv = createCanvas(windowWidth, windowHeight);
    centerCanvas();
    background(253, 246, 227);
    fill(48, 63, 71);
    textSize(35);
    textAlign(CENTER, CENTER);
    noStroke();
    lines_margin = 50;

    input = createInput();
    input.style('font-size', '25px');
    input.size(300, 50);
    input.position(width/2-input.width/2, height*2/3);

    start_room = new Room("room");
    cur_room = start_room;
    you = new Character();

    rg = new RiGrammar();
    rg.loadFrom("places.yml");


    rm = new RiMarkov(5);
    rm.loadText(z.join(' '));

    drawText();
}

function drawText() {
    background(253, 246, 227);

    var article = chooseArticle();

    textAlign(CENTER, CENTER);
    text("You are in " + 
         article + 
         cur_room.title + ".", width/2, height/5);

    textAlign(LEFT, TOP);
    text(cur_room.desc.join(' '), lines_margin, height/3, width-2*lines_margin, height/2);
}

function keyPressed() {
    if (keyCode === ENTER) {
        // make sure they're correct formatting
        const input_cmd = RiTa.trimPunctuation(input.value().trim());
        const cmd_tokens = RiTa.tokenize(input_cmd);

        /* ------------------------- ACTIONS ------------------------- */
        // HARDCODE A BUNCH OF DIRECTIONS THEY COULD ASK TO MOVE IN
        if (cmd_tokens[0] === "move" ||
            cmd_tokens[0] === "go" ||
            cmd_tokens[0] === "walk"
        ) cur_room.move(cmd_tokens[1]);

        else if (
            cmd_tokens[0] === "north" ||
            cmd_tokens[0] === "west" ||
            cmd_tokens[0] === "east" ||
            cmd_tokens[0] === "south" ||
            cmd_tokens[0] === "up" ||
            cmd_tokens[0] === "left" ||
            cmd_tokens[0] === "down" ||
            cmd_tokens[0] === "right"
        ) cur_room.move(cmd_tokens[0]);

        else if (cmd_tokens[0] === "put" ||
                 cmd_tokens[0] === "throw") 
                you.put(cmd_tokens[1]);
        else if (cmd_tokens[0] === "take" ||
                 cmd_tokens[1] === "pick") 
                you.take(cmd_tokens[1]);

        // just make it smarter if they don't have...anything
        else rm.loadText(input_cmd, 3);
        /* ----------------------------------------------------------- */

        input.value('');
        drawText();
    }
}