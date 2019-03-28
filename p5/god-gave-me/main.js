
var heads = [];
var torsos = [];
var lefts = [];
var rights = [];
var bottoms = [];

var head, torso, left, right, bottom;

/* ------------------------- P5.JS DEFAULTS ------------------------- */

function preload() {
    // image loads

    // head
    heads[0] = loadImage("assets/cat_head.png");
    heads[1] = loadImage("assets/bowlingball_head.png");
    heads[2] = loadImage("assets/dog_head.png");
    heads[3] = loadImage("assets/fish_head.png");
    heads[4] = loadImage("assets/old_man_head.png");
    heads[5] = loadImage("assets/pinocchio_head.png");
    heads[6] = loadImage("assets/real_pinocchio_head.png");
    
    // torso
    torsos[0] = loadImage("assets/cat_torso.png");
    torsos[1] = loadImage("assets/bikini_torso.png");
    torsos[2] = loadImage("assets/bikini_piercings_torso.png");
    torsos[3] = loadImage("assets/buff_piercings_torso.png");
    torsos[4] = loadImage("assets/buff_torso.png");
    torsos[5] = loadImage("assets/free_donuts_torso.png");
    torsos[6] = loadImage("assets/gingerbread_torso.png");
    torsos[7] = loadImage("assets/gingerbread_torso.png");
    torsos[8] = loadImage("assets/swimmer_torso.png");

    // bottom
    bottoms[0] = loadImage("assets/cat_bottom.png");
    bottoms[1] = loadImage("assets/legwarmers_bottom.png");
    bottoms[2] = loadImage("assets/mermaid_bottom.png");
    bottoms[3] = loadImage("assets/michaeljackson_bottom.png");
    bottoms[4] = loadImage("assets/robot_bottom.png");
    bottoms[5] = loadImage("assets/towel_bottom.png");

    // right
    rights[0] = loadImage("assets/cat_right.png");
    rights[1] = loadImage("assets/dab_right.png");
    rights[2] = loadImage("assets/goodhotdog_right.png");
    rights[3] = loadImage("assets/octopus_right.png");
    rights[4] = loadImage("assets/sadweiner_right.png");
    rights[5] = loadImage("assets/watch_right.png");
    rights[6] = loadImage("assets/tie_right.png");

    // left
    lefts[0] = loadImage("assets/cat_left.png");
    lefts[1] = loadImage("assets/dab_left.png");
    lefts[2] = loadImage("assets/donut_left.png");
    lefts[3] = loadImage("assets/finger_left.png");
    lefts[4] = loadImage("assets/selfie_left.png");
    lefts[5] = loadImage("assets/snap_left.png");
}

function setup() {

    // canvas and basic setup
    cnv = createCanvas(windowWidth, windowHeight);
    background(255);
    textSize(50);
    textAlign(CENTER, CENTER);
    noStroke();

    head = random(heads);
    torso = random(torsos);
    right = random(rights);
    left = random(lefts);
    bottom = random(bottoms);
}

function draw() {
    background(255);

    stroke(0);
    strokeWeight(4);
    fill(255);
    rect(0, 0, width/2, height);
    rect(width/2, 0, width/2, height);

    fill(0);
    stroke(255);
    strokeWeight(10);
    text("god gave me these hands to dab with", width/2, 75);
    text("x", width/4, height/2);
    text("o", 3*width/4, height/2);

    image(bottom, width/2-301, height/2-79, bottom.width/4, bottom.height/4);
    image(torso, width/2-151, height/2-189, torso.width/4, torso.height/4);
    image(right, width/2-66, height/2-335, right.width/4, right.height/4);
    image(left, width/2-333, height/2-237, left.width/4, left.height/4);
    image(head, width/2-194, height/2-325, head.width/4, head.height/4);
}

function mousePressed() {

}