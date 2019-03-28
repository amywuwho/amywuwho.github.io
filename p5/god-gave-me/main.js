
var heads = [];
var torsos = [];
var lefts = [];
var rights = [];
var bottoms = [];

var head, torso, left, right, bottom;
var head_i, torso_i, left_i, right_i, bottom_i;

/* ------------------------- P5.JS DEFAULTS ------------------------- */

function preload() {
    // image loads

    // head
    heads[0] = loadImage("assets/cat_head.png");
    heads[1] = loadImage("assets/dog_head.png");
    heads[2] = loadImage("assets/real_pinocchio_head.png");
    heads[3] = loadImage("assets/pinocchio_head.png");
    heads[4] = loadImage("assets/old_man_head.png");
    heads[5] = loadImage("assets/fish_head.png");
    heads[6] = loadImage("assets/bowlingball_head.png");

    // torso
    torsos[0] = loadImage("assets/cat_torso.png");
    torsos[1] = loadImage("assets/bikini_piercings_torso.png");
    torsos[2] = loadImage("assets/bikini_torso.png");
    torsos[3] = loadImage("assets/buff_piercings_torso.png");
    torsos[4] = loadImage("assets/buff_torso.png");
    torsos[5] = loadImage("assets/swimmer_torso.png");
    torsos[6] = loadImage("assets/gingerbread_torso.png");
    torsos[7] = loadImage("assets/gingerbread_eaten_torso.png");
    torsos[8] = loadImage("assets/free_donuts_torso.png");

    // bottom
    bottoms[0] = loadImage("assets/cat_bottom.png");
    bottoms[1] = loadImage("assets/legwarmers_bottom.png");
    bottoms[2] = loadImage("assets/mermaid_bottom.png");
    bottoms[3] = loadImage("assets/michaeljackson_bottom.png");
    bottoms[4] = loadImage("assets/robot_bottom.png");
    bottoms[5] = loadImage("assets/towel_bottom.png");

    // right
    rights[0] = loadImage("assets/cat_right.png");
    rights[1] = loadImage("assets/goodhotdog_right.png");
    rights[2] = loadImage("assets/dab_right.png");
    rights[3] = loadImage("assets/tie_right.png");
    rights[4] = loadImage("assets/watch_right.png");
    rights[5] = loadImage("assets/sadweiner_right.png");
    rights[6] = loadImage("assets/octopus_right.png");

    // left
    lefts[0] = loadImage("assets/cat_left.png");
    lefts[1] = loadImage("assets/donut_left.png");
    lefts[2] = loadImage("assets/dab_left.png");
    lefts[3] = loadImage("assets/snap_left.png");
    lefts[4] = loadImage("assets/selfie_left.png");
    lefts[5] = loadImage("assets/finger_left.png");
}

function setup() {

    // canvas and basic setup
    cnv = createCanvas(windowWidth, windowHeight);
    background(255);
    textSize(50);
    textAlign(CENTER, CENTER);
    noStroke();

    head_i = int(random(heads.length));
    torso_i = int(random(torsos.length));
    right_i = int(random(rights.length));
    left_i = int(random(lefts.length));
    bottom_i = int(random(bottoms.length));

    head = heads[head_i];
    torso = torsos[torso_i];
    right = rights[right_i];
    left = lefts[left_i];
    bottom = bottoms[bottom_i];
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

    image(bottom, width/2-301, height/2-68, bottom.width/4, bottom.height/4);
    image(torso, width/2-151, height/2-189, torso.width/4, torso.height/4);
    image(head, width/2-194, height/2-325, head.width/4, head.height/4);
    image(right, width/2-66, height/2-335, right.width/4, right.height/4);
    image(left, width/2-333, height/2-237, left.width/4, left.height/4);
}

function allCat() {
    return (head_i == 0 && 
            torso_i == 0 && 
            bottom_i == 0 && 
            right_i == 0 && 
            left_i == 0
            );
}

function isCat(body_part) {
    if (body_part == 0) { // bottom
        return bottom_i == 0;
    }

    else if (body_part == 1) { // torso
        return torso_i == 0;
    }

    else if (body_part == 2) { // head
        return head_i == 0;
    }

    else if (body_part == 3) { // right
        return right_i == 0;
    }

    else { // left
        return left_i == 0;
    }
}

function mousePressed() {
    if (allCat()) return;

    // later differentiate between right and left side;
    var choice = int(random(2));

    // lock in if you have a cat
    var body_part = int(random(5));
    while (isCat(body_part)) {
        var body_part = int(random(5));
    }

    if (choice == 0) { // "good" choice
        if (body_part == 0) { // bottom
            var bottom_i = int(random(0, bottom_i));
            bottom = bottoms[bottom_i];
        }

        else if (body_part == 1) { // torso
            var torso_i = int(random(0, torso_i));
            torso = torsos[torso_i];
        }

        else if (body_part == 2) { // head
            var head_i = int(random(0, head_i));
            head = heads[head_i];
        }

        else if (body_part == 3) { // right
            var right_i = int(random(0, right_i));
            right = rights[right_i];
        }

        else { // left
            var left_i = int(random(0, left_i));
            left = lefts[left_i];
        }
    }
    else { // bad choice
        if (body_part == 0) { // bottom
            var bottom_i = int(random(bottom_i+1, bottoms.length));
            bottom = bottoms[bottom_i];
        }

        else if (body_part == 1) { // torso
            var torso_i = int(random(torso_i+1, torsos.length));
            torso = torsos[torso_i];
        }

        else if (body_part == 2) { // head
            var head_i = int(random(head_i+1, heads.length));
            head = heads[head_i];
        }

        else if (body_part == 3) { // right
            var right_i = int(random(right_i+1, rights.length));
            right = rights[right_i];
        }

        else { // left
            var left_i = int(random(left_i+1, lefts.length));
            left = lefts[left_i];
        }
    }
}