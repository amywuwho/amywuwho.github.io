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
// jank storage of what room we're currently populating
var populating;
var api = "https://api.flickr.com/services/rest/?method=flickr.photos.search&per_page=1&format=json&nojsoncallback=1";
var apiKey = "&api_key=78f071a753939e11f518b370bd043b40&tags=";
var imgSize = 100;
var takeHP = .25;

// because async sucks
var trash1, trash2, trash3, trash4;
var trash = [];
 

/* ------------------------- CLASS DEFINITIONS ------------------------- */
class Character {
    constructor() {
        this.inventory = {}; // key is object, value is desc
    }

    // takes object if possible
    take(thing, place) {
        // console.log(thing);
        var thingIndex = -1;
        
        // sees if obj exists
        for (var index = 0; index < place.objects.length; index++) {
            if (place.objects[index].indexOf(thing) !== -1) thingIndex = index;
        }

        // moving things around in inventory
        if (thingIndex !== -1) {
            var obj_sentence = "";
            console_message = "";
            
            // remove from objects
            place.objects.splice(thingIndex, 1);
            var obj_img = place.object_imgs.splice(thingIndex, 1);
            var obj_coord = place.object_coords.splice(thingIndex, 1);
            // var obj_hp = place.object_hp.splice(thingIndex, 1);

            // finds relevant sentence in desc
            for (var j = 0; j < place.desc.length; j++) {
                if (place.desc[j].indexOf(thing) !== -1) {
                    // delete other objects from that sentence
                    for (var i = 0; i < place.objects.length; i++) {
                        if (place.desc[j].indexOf(place.objects[i]) !== -1) {
                            place.objects.splice(i, 1);
                        }
                    }

                    obj_sentence += place.desc[j];
                    place.desc.splice(j, 1);
                }
            }

            this.inventory[thing] = {sentence: obj_sentence, 
                                     img: obj_img[0], 
                                     coords: obj_coord[0]};
                                    //  hp: obj_hp[0]};

            // console.log(place.objects);
            // console.log(this.inventory);
        }
        else console_message = "Can't find " + thing + " in room!";
    }

    // puts down object if possible
    put(thing, place) {
        // console.log(thing);
        if (thing in this.inventory) {
            console_message = "";
            place.objects.push(thing);
            var thing_data = this.inventory[thing];

            // deteriorate the pixels
            var img = thing_data.img;
            // console.log(img);
            for (let y = 0; y < img.height; y++) {
                for (let x = 0; x < img.width; x++) {
                    let i = (x + y * img.width) * 4;
                    let p = random(1);
                    if (p < takeHP) {
                        img.pixels[i] = 255;
                        img.pixels[i+1] = 255;
                        img.pixels[i+2] = 255;
                        img.pixels[i+3] = 255;
                    }
                }
            }
            img.updatePixels();

            // put all data in room where it belongs
            place.desc.push(thing_data.sentence);
            place.object_imgs.push(img);
            place.object_coords.push(thing_data.coords);
            // place.object_hp.push(thing_data.hp - takeHP);


            delete this.inventory[thing];

            // console.log(place.objects);
            // console.log(this.inventory);
        }
        else console_message = "Can't find " + thing + " in inventory!";
    }

    takeInventory() {
        var has_things = false;
        var inventory_str = "You have: ";
        for (var key in this.inventory) {
            has_things = true;
            var thing = key + ", ";
            inventory_str += thing;
        }
        if (has_things) {
            inventory_str = inventory_str.slice(0, inventory_str.length-2);
            inventory_str += ".";
        }
        else inventory_str = "You have nothing.";

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

        // eventually clean this up to just be an array of objects
        this.objects = [];
        this.object_imgs = [];
        this.object_coords = [];
        // this.object_hp = [];
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
        populating = this;
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

            // console.log(query);
            var url = api + apiKey + query;
            loadJSON(url, this.gotData);

            var biased_y = sqrt(random()) * 340;
            var img_x = random(width/2 - 200, 
                               width/2 + 200);
            
            // hopefully bias towards floor
            var img_y = height/2 - 340/3 + biased_y;

            // populate object data
            this.object_coords.push({x: img_x, y: img_y});
            // this.object_hp.push(1);
        }
    }

    roomImage() {
        return loadImage('assets/room_base.png');
    }

    // after retrieving JSON object loads the relevant image from a built URL
    gotData(data) {
        // console.log(data);
        if (data.photos.photo.length != 0) {
            var farmid = data.photos.photo[0].farm;
            var serverid = data.photos.photo[0].server;
            var id = data.photos.photo[0].id;
            var secret = data.photos.photo[0].secret;
            
            var imgurl = "https://farm" + farmid + ".staticflickr.com/" + serverid + "/" + id + "_" + secret + ".jpg";

            // double check callback stuff
            loadImage(imgurl, 
                img => {
                    img.loadPixels();
                    populating.object_imgs.push(img);
                }, img => {
                    populating.object_imgs.push(random(trash));
                }

            );
        }
        else {
            populating.object_imgs.push(random(trash));
        }
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

/* -------------------------- IMAGE HELPERS -------------------------- */


/* ------------------------- P5.JS DEFAULTS ------------------------- */

function preload() {
    z = loadStrings("data/lines.txt");
    font = loadFont('assets/cour.ttf');

    // load the fucking garbage
    trash1 = loadImage("assets/trash1.png");
    trash2 = loadImage("assets/trash2.png");
    trash3 = loadImage("assets/trash3.png");
    trash4 = loadImage("assets/trash4.png");

    trash1.loadPixels();
    trash2.loadPixels();
    trash3.loadPixels();
    trash4.loadPixels();
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

    // trash
    trash.push(trash1);
    trash.push(trash2);
    trash.push(trash3);
    trash.push(trash4);

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
    text(console_message, width/2, imgSize/2);
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
        if (obj_img.width > obj_img.height)
            obj_img.resize(imgSize, 0);
        else
            obj_img.resize(0, imgSize);

        var coords = cur_room.object_coords[i];
        var x = coords.x;
        var y = coords.y;

        // draw objects, but make sure they're within bounds
        var margin = 10;
        if (x < width/2 - cur_room.img.width/2 + margin) x = width/2 - cur_room.img.width/2 + margin;
        if (x > width/2 + cur_room.img.width/2 - imgSize - margin) x = width/2 + cur_room.img.width/2 - imgSize - margin;

        if (y < height/2 - cur_room.img.height/3 + margin) y = height/2 - cur_room.img.height/3 + margin;
        if (y > height/2 + cur_room.img.height*2/3 - obj_img.height - margin) y = height/2 + cur_room.img.height*2/3 - obj_img.height - margin;
        image(obj_img, x, y);
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