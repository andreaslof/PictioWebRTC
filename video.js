init = function () {
	video = document.getElementById('video');
	local = document.getElementById('local');
	remote = document.getElementById('remote');
	localImg = document.getElementById('localImg');
	remoteImg = document.getElementById('remoteImg');
	diff = document.getElementById('diff');
	localCtx = local.getContext('2d');
	remoteCtx = remote.getContext('2d');
	diffCtx = diff.getContext('2d');
	imgArray = [];

	local.width = 320;
	local.height = 240;

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
	video.src = window.webkitURL.createObjectURL(stream);
	setTimeout(takePhoto,500,localImg);
	setTimeout(takePhoto,2000,remoteImg);
};

onUserMediaError = function (error) {
	console.log('Failed, error code:'+error.code);
};

// @arg img : ID for img-tag
takePhoto = function (img) {
	localCtx.drawImage(video,0,0,320,240);

	var idata = localCtx.getImageData(0,0,320,240),
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
				brightness = (4*127+4*(g+b)*-0.18)>>>3;
		data[i] = brightness;
		data[i+1] = brightness;
		data[i+2] = brightness;
	}

	idata.data = data;

	localCtx.putImageData(idata,0,0);
	img.src = local.toDataURL('image/png');
};

diffImg = function () {
	diffCtx.putImageData(imagediff.diff(localImg,remoteImg),0,0);
	var tolerance = [],
			//tolerance = [250,240,230,220,210,200,175,150,140,130,120,110,100,90,80,70,60,50,40,30,20,10,9,8,7,6,5,4,3,2,1],
			diffSum = [],
			points = {
				point: 0,
				total: 0
			},
			sum;
	for ( var j = 150; j > 0; j-=5 ) tolerance.push(j);
	points.total = tolerance.length;
	for ( var i = 0; i < tolerance.length; i++ ) {
		var rand = Math.floor(Math.random() * (260-100+1)) + 100;
		diffSum[i] = imagediff.equal(localImg,remoteImg,tolerance[i]);
		//console.log(rand,diffSum[i]);
		console.log("tolerance:"+tolerance[i]+"px\n"+diffSum[i]);
		if ( diffSum[i] ) points.point++;
		console.log(points.point);
	}
	sum = points.point / points.total;
	console.log(sum);
};