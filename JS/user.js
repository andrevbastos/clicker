let points = 0;

function drawPoints() {
    ctx.save();

    ctx.font = "50px Georgia";
    ctx.fillStyle = "#E7EBEB"
    ctx.fillText(points, canvas.width / 2, 50);
    
    ctx.restore();
};