var rm, lines;
var ctt, ps, sh, tlh, z;

function preload() {
    ctt = loadStrings("color_the_truth.txt");
    ps = loadStrings("problem_sleuth.txt");
    sh = loadStrings("stone_harbor.txt");
    tlh = loadStrings("the_lurking_horror.txt");
    z = loadStrings("zork.txt");

}

function setup() {

    createCanvas(windowWidth, windowHeight);
    background(253, 246, 227);
    fill(48, 63, 71);
    textSize(50);
    textAlign(CENTER, CENTER);
    noStroke();

    lines = ["click to re-generate"];

    rm = new RiMarkov(4);
    rm.loadText(ctt.join(' '));
    rm.loadText(ps.join(' '));
    rm.loadText(sh.join(' '));
    rm.loadText(tlh.join(' '));
    rm.loadText(z.join(' '));

    drawText();
}

function drawText() {
    background(253, 246, 227);
    text(lines.join(' '), windowWidth/2, windowHeight/2);
}

function mouseClicked() {
    lines = rm.generateSentences(2);
    drawText();
}
