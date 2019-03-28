
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
    bowlingball_head = loadImage("assets/bowlingball_head.png");
    cat_head = loadImage("assets/cat_head.png");
    dog_head = loadImage("assets/dog_head.png");
    fish_head = loadImage("assets/fish_head.png");
    old_man_head = loadImage("assets/old_man_head.png");
    pinocchio_head = loadImage("assets/pinocchio_head.png");
    real_pinocchio_head = loadImage("assets/real_pinocchio_head.png");
    
    // torso
    bikini_torso = loadImage("assets/bikini_torso.png");
    bikini_piercings_torso = loadImage("assets/bikini_piercings_torso.png");
    buff_piercings_torso = loadImage("assets/buff_piercings_torso.png");
    buff_torso = loadImage("assets/buff_torso.png");
    cat_torso = loadImage("assets/cat_torso.png");
    free_donuts_torso = loadImage("assets/free_donuts_torso.png");
    gingerbread_torso = loadImage("assets/gingerbread_torso.png");
    gingerbread_eaten_torso = loadImage("assets/gingerbread_torso.png");
    swimmer_torso = loadImage("assets/swimmer_torso.png");

    // bottom
    cat_bottom = loadImage("assets/cat_bottom.png");
    legwarmers_bottom = loadImage("assets/legwarmers_bottom.png");
    mermaid_bottom = loadImage("assets/mermaid_bottom.png");
    michaeljackson_bottom = loadImage("assets/michaeljackson_bottom.png");
    robot_bottom = loadImage("assets/robot_bottom.png");
    towel_bottom = loadImage("assets/towel_bottom.png");

    // right
    cat_right = loadImage("assets/cat_right.png");
    dab_right = loadImage("assets/dab_right.png");
    goodhotdog_right = loadImage("assets/goodhotdog_right.png");
    octopus_right = loadImage("assets/octopus_right.png");
    sadweiner_right = loadImage("assets/sadweiner_right.png");
    watch_right = loadImage("assets/watch_right.png");
    tie_right = loadImage("assets/tie_right.png");

    // left
    cat_left = loadImage("assets/cat_left.png");
    dab_left = loadImage("assets/dab_left.png");
    donut_left = loadImage("assets/donut_left.png");
    finger_left = loadImage("assets/finger_left.png");
    selfie_left = loadImage("assets/selfie_left.png");
    snap_left = loadImage("assets/snap_left.png");

    
    // image arrays
    // head
    heads[0] = bowlingball_head;
    heads[1] = cat_head;
    heads[2] = dog_head;
    heads[3] = fish_head;
    heads[4] = old_man_head;
    heads[5] = pinocchio_head;
    heads[6] = real_pinocchio_head;
    
    // torso
    torsos[7] = bikini_torso;
    torsos[8] = bikini_piercings_torso;
    torsos[9] = buff_piercings_torso;
    torsos[10] = buff_torso;
    torsos[11] = cat_torso;
    torsos[12] = free_donuts_torso;
    torsos[13] = gingerbread_torso;
    torsos[14] = gingerbread_eaten_torso;
    torsos[15] = swimmer_torso;

    // bottom
    bottoms[16] = cat_bottom;
    bottoms[17] = legwarmers_bottom;
    bottoms[18] = mermaid_bottom;
    bottoms[19] = michaeljackson_bottom;
    bottoms[20] = robot_bottom;
    bottoms[21] = towel_bottom;

    // right
    rights[22] = cat_right;
    rights[23] = dab_right;
    rights[24] = goodhotdog_right;
    rights[25] = octopus_right;
    rights[26] = sadweiner_right;
    rights[27] = watch_right;
    rights[28] = tie_right;

    // left
    lefts[29] = cat_left;
    lefts[30] = dab_left;
    lefts[31] = donut_left;
    lefts[32] = finger_left;
    lefts[33] = selfie_left;
    lefts[34] = snap_left;
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