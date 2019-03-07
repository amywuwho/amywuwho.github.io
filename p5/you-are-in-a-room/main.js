var rm;
var z;
var places, rg;
var input;
var cur_room, start_room, you;
var lines_margin;
var cnv;
var nlp = window.nlp_compromise;
var console_message;
var help_message;
var font;
var room_img;
var api = "https://api.flickr.com/services/rest/?method=flickr.photos.search&per_page=1&format=json&nojsoncallback=1";
var apiKey = "&api_key=78f071a753939e11f518b370bd043b40&tags=";
 

/* ------------------------- CLASS DEFINITIONS ------------------------- */
class Character {
    constructor() {
        this.inventory = {}; // key is object, value is desc
    }

    // takes object if possible
    take(thing, place) {
        console.log(thing);
        var thingIndex = -1;
        for (var index = 0; index < place.objects.length; index++) {
            if (place.objects[index].indexOf(thing) !== -1) thingIndex = index;
        }

        if (thingIndex !== -1) {
            var obj_sentence = "";
            console_message = "";
            place.objects.splice(thingIndex, 1);

            for (var j = 0; j < place.desc.length; j++) {
                if (place.desc[j].indexOf(thing) !== -1) {
                    obj_sentence += place.desc[j];
                    place.desc.splice(j, 1);
                }
            }
            this.inventory[thing] = obj_sentence;

            console.log(place.objects);
            console.log(this.inventory);
        }
        else console_message = "Can't find " + thing + " in room!";
    }

    // puts down object if possible
    put(thing, place) {
        console.log(thing);
        if (thing in this.inventory) {
            console_message = "";
            place.objects.push(thing);
            place.desc.push(this.inventory[thing]);
            delete this.inventory[thing];

            console.log(place.objects);
            console.log(this.inventory);
        }
        else console_message = "Can't find " + thing + " in inventory!";
    }

    takeInventory() {
        var inventory_str = "You have: ";
        for (var key in this.inventory) {
            var thing = key + ", "
            inventory_str += thing;
        }
        inventory_str.slice(0, inventory_str.length-2);
        inventory_str += ".";

        console_message = inventory_str;
    }
}

class Room {
    constructor(name) {
        this.title = name;
        this.desc = [];
        this.img = this.roomImage(name);

        this.north = null;
        this.east = null;
        this.west = null;
        this.south = null;

        this.objects = [];
        this.object_imgs = [];
    }

    move(dir) {
        console_message = "";
        if (dir === "north" || dir === "up" || dir === "forwards") {
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
        else if (dir === "south" || dir === "down" || dir === "backwards") {
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
    }

    // populates the room with objects via Markov sentence construction
    populate() {
        var sentences = rm.generateSentences(4);
        this.desc = sentences;
        
        var objs = nlp(this.desc).nouns().out('array');

        // just removes all "heres"
        for (var i = 0; i < objs.length; i++) {
            if (objs[i] === "here") objs.splice(i, 1);
        }

        this.objects = objs;

        for (var i = 0; i < this.objects.length; i++) {
            var query = trim(this.objects[i]);
            query = query.replace(/\s/g, "+");
            console.log(query);
            var url = api + apiKey + query;
            // console.log(url);
            loadJSON(url, this.gotData);
        }

        console.log(this.objects);
    }

    // after retrieving JSON object loads the relevant image from a built URL
    gotData(data) {
        console.log(this.objects);
        console.log(this.object_imgs);
        var farmid = data.photos.photo[0].farm;
        var serverid = data.photos.photo[0].server;
        var id = data.photos.photo[0].id;
        var secret = data.photos.photo[0].secret;
        
        var imgurl = "https://farm" + farmid + ".staticflickr.com/" + serverid + "/" + id + "_" + secret + ".jpg";

        // double check callback stuff
        var img = loadImage(imgurl);
        this.object_imgs.push(img);
    }

    roomImage() {
        return loadImage('assets/room_base.png');
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
    z = loadStrings("data/lines.txt");
    font = loadFont('assets/cour.ttf');
}

function setup() {

    // canvas and basic setup
    cnv = createCanvas(windowWidth, windowHeight);
    centerCanvas();
    background(45, 74, 76);
    fill(255, 255, 255);
    textSize(35);
    textAlign(CENTER, CENTER);
    textFont(font);
    noStroke();
    lines_margin = 50;

    // input and console message setups
    input = createInput();
    input.style('font-size', '25px');
    input.size(300, 50);
    input.position(width/2-input.width/2, height*2/3+100);
    console_message = "";
    help_message = true;

    // object setups
    start_room = new Room("room");
    cur_room = start_room;
    you = new Character();

    // automatic writing setup
    rg = new RiGrammar();
    rg.loadFrom("places.yml");
    rm = new RiMarkov(5);
    rm.loadText(z.join(' '));

}

function draw() {
    background(45, 74, 76);

    // YOU ARE IN A ROOM sentence construction
    var article = chooseArticle();

    textSize(35);
    textAlign(CENTER, CENTER);
    textFont(font);
    fill(255, 255, 255);
    text("You are in " + 
         article + 
         cur_room.title + ".", width/2, height/8);

    // help + console message
    textSize(20);
    text(console_message, width/2, height/10);
    textAlign(LEFT, TOP);
    if (help_message) {
        text("You are in an ever-generating map of rooms! You can either: move in a cardinal direction, pick things up/put them down, or check your inventory. Sorry, it's a little boring right now.",
        lines_margin, height*7/8, width-2*lines_margin, height
        );
    }

    // writing room description
    textSize(30);
    fill(255, 255, 255);
    textAlign(LEFT, TOP);
    text(cur_room.desc.join(' '), lines_margin, height/6, width-2*lines_margin, height/2);
    
    // testing room images

    // basic room
    image(cur_room.img, width/2-cur_room.img.width/2, height/2 - cur_room.img.height/3);

    // all objects in room
    for (var i = 0; i < cur_room.object_imgs.length; i++) {
        var obj_img = cur_room.object_imgs[i];
        obj_img.resize(150, 0);

        // give x as the range from the left of the "room" to right of the "room"
        var x = random(width/2 - cur_room.img.width/2, 
                       width/2 + cur_room.img.width/2 - obj_img.width);

        // same for height
        var y = random(height/2 - cur_room.img.height/2, 
                       height/2 + cur_room.img.height/2 - obj_img.height);

        image(img, x, y);
    }
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
            cmd_tokens[0] === "right" ||
            cmd_tokens[0] === "forwards" ||
            cmd_tokens[0] === "backwards"
        ) cur_room.move(cmd_tokens[0]);

        // PUT DOWN/PICK UP
        else if (cmd_tokens[0] === "put" && cmd_tokens[1] === "down")
            you.put(cmd_tokens.slice(2).join(" "), cur_room);
        else if (cmd_tokens[0] === "put" ||
                 cmd_tokens[0] === "throw") 
                you.put(cmd_tokens.slice(1).join(" "), cur_room);
        else if (cmd_tokens[0] === "take") you.take(cmd_tokens.slice(1).join(" "), cur_room);
        else if (cmd_tokens[0] === "pick" && cmd_tokens[1] === "up")
            you.take(cmd_tokens.slice(2).join(" "), cur_room);

        // INVENTORY
        else if (cmd_tokens[0] === "inventory" || 
                 cmd_tokens[0] === "i" ||
                 cmd_tokens[0] === "check inventory")
            you.takeInventory();

        else if (cmd_tokens[0] === "help" || cmd_tokens[0] === "h")
            help_message = !help_message;

        // HIT

        // try to respond in some way
        else {
            rm.loadText(input_cmd, 5);
            console_message = "I didn't understand that.";
        }
        /* ----------------------------------------------------------- */

        input.value('');
    }
}