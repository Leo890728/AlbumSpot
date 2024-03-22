
function getMainColors(imageUrl, numColors) {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    var img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = imageUrl;
    return new Promise((resolve, reject) => {
        img.onload = function () {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            let colorThief = new ColorThief();
            if (numColors == 1) {
                resolve(colorThief.getColor(img));
            } else {
                resolve(colorThief.getPalette(img, numColors));
            }
        };
    });
}


function drawElmBackgroundColorByImage(elm, imageUrl) {
    getMainColors(imageUrl, numColors).then((result) => {
        let mainColors = result;
        elm.style['background'] = 'rgb(' + mainColors[0] + ',' + mainColors[1] + ',' + mainColors[2] + ')';
    })
}

function drawElmBackgroundGradientByImage(elm, imageUrl, numColors = 2) {
    getMainColors(imageUrl, numColors).then((result) => {
        let mainColors = result;

        if (numColors == 1) {
            var gradientColor = "rgb("+mainColors.join(', ')+")";
            elm.style.background = "linear-gradient(to bottom right, " + gradientColor + ',' + gradientColor + ")";
        } else {
            var gradientColors = mainColors.map(color => 'rgb(' + color.join(',') + ')').join(', ');
            elm.style.background = "linear-gradient(to bottom right, " + gradientColors + ")";
        }
    });
}