init = function () {
	video = document.getElementById('video');
	canvas = document.getElementById('canvas');
	img1 = document.getElementById('img1');
	img2 = document.getElementById('img2');
	context = canvas.getContext('2d');

	canvas.width = 320;
	canvas.height = 240;

	getUserMedia();
};

getUserMedia = function () {
	try {
		navigator.webkitGetUserMedia('video',
			onUserMediaSuccess,
			onUserMediaError);
		console.log('Requested camera');
	} catch (e) {
		console.log('getUserMedia error');
	}
};

onUserMediaSuccess = function (stream) {
	console.log('User granted access!');
	localStream = stream;
	video.src = window.webkitURL.createObjectURL(stream);
};

onUserMediaError = function (error) {
	console.log('Failed, error code:'+error.code);
};

takePhoto = function (img) {
	context.drawImage(video,0,0,320,240);

	var idata = context.getImageData(0,0,320,240),
			data = idata.data,
			w = idata.width,
			limit = data.length;

	/*for (var i = 0; i < limit; i++) {
		if ( i%4 === 3 ) continue;
		data[i] = 127 + 2*data[i] - data[i+4] - data[i+w*4];
	}*/
	for (var i = 0; i < data.length; i+=4) {
		var r = data[i],
				g = data[i+1],
				b = data[i+2],
				//brightness = (3*r+4*g+b)>>>3;
				brightness = (3*127+4*(g+b)*-0.4)>>>3;
		data[i] = brightness;
		data[i+1] = brightness;
		data[i+2] = brightness;
	}

	idata.data = data;

	context.putImageData(idata,0,0);

	img.src = canvas.toDataURL('image/png');
	//video.style.opacity = 0.7;
};

diffImg = function () {

};