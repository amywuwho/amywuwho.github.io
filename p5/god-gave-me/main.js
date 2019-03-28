
var head = [];
var torso = [];
var left = [];
var right = [];
var bottom = [];

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
    head[0] = bowlingball_head;
    head[1] = cat_head;
    head[2] = dog_head;
    head[3] = fish_head;
    head[4] = old_man_head;
    head[5] = pinocchio_head;
    head[6] = real_pinocchio_head;
    
    // torso
    torso[7] = bikini_torso;
    torso[8] = bikini_piercings_torso;
    torso[9] = buff_piercings_torso;
    torso[10] = buff_torso;
    torso[11] = cat_torso;
    torso[12] = free_donuts_torso;
    torso[13] = gingerbread_torso;
    torso[14] = gingerbread_eaten_torso;
    torso[15] = swimmer_torso;

    // bottom
    bottom[16] = cat_bottom;
    bottom[17] = legwarmers_bottom;
    bottom[18] = mermaid_bottom;
    bottom[19] = michaeljackson_bottom;
    bottom[20] = robot_bottom;
    bottom[21] = towel_bottom;

    // right
    right[22] = cat_right;
    right[23] = dab_right;
    right[24] = goodhotdog_right;
    right[25] = octopus_right;
    right[26] = sadweiner_right;
    right[27] = watch_right;
    right[28] = tie_right;

    // left
    left[29] = cat_left;
    left[30] = dab_left;
    left[31] = donut_left;
    left[32] = finger_left;
    left[33] = selfie_left;
    left[34] = snap_left;
}

function setup() {

    // canvas and basic setup
    cnv = createCanvas(windowWidth, windowHeight);
    background(255);
    textSize(50);
    textAlign(CENTER, CENTER);
    noStroke();

}

function draw() {
    background(255);

    stroke(0);
    strokeWeight(4);
    rect(0, 0, width/2, height);
    rect(width/2, 0, width/2, height);

    fill(0);
    text("god gave me these hands to dab with", width/2, height/8);
    text("x", width/4, height/2);
    text("o", 3*width/4, height/2);

    image(cat_head, width/2, height/2-500);
    image(cat_torso, width/2, height/2);
    image(cat_bottom, width/2, height/2+250);
    image(cat_right, width/2+300, height/2);
    image(cat_left, width/2-300, height/2);
}

function mousePressed() {

}