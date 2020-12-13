let predictions = [];
let facemesh;
let video;

function setup() {
    createCanvas(640, 480);
    video = createCapture(VIDEO);
    video.size(width, height);

    //make a new facemesh method
    facemesh = ml5.facemesh(video, modelLoaded)

    facemesh.on('predict', resuts => {
        predictions = results;
        console.log(results);
    });

    video.hide();
}

//callback when model is loaded
function modelLoaded() {
    console.log('Model Loaded Successfully')
}

function draw() {
    image(video, 0, 0, width, height);

    drawKeypoints();
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
    for (let i = 0; i < predictions.length; i += 1) {
        const keypoints = predictions[i].scaledMesh;

        // Draw facial keypoints.
        for (let j = 0; j < keypoints.length; j += 1) {
            const [x, y] = keypoints[j];

            fill(0, 255, 0);
            ellipse(x, y, 5, 5);
        }
    }
}