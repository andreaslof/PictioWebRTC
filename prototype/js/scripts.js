var Welcome = function() {
    var init = {
        start: function() {
            $('#welcome').fadeIn();
            this.callbacks();
        },
        callbacks: function() {
            $('.show-loading').click(function() {
                $('#welcome').fadeOut();
            });
            $('#ready').click(startGame);
        }
    };
    var startGame = function() {
        new Game();
    };
    init.start();
};

var Game = function(player1Name, player2Name) {
    var player1Name = player1Name,
        player2Name = player2Name,
        img = {};

    var player1 = document.getElementById('player1'), // a video element
        player2 = document.getElementById('player2');

    img.one = "",
    img.two = "",
    img.three = "",
    img.four = "";

    var canvas = document.getElementById('photo');
    var ctx = canvas.getContext('2d');


    var init = {
        start: function() {
            $('#game').fadeIn(function() {
                init.webcam();
                init.callbacks();
            });
            $('#action').text("Click go to go!");
            $('#player1-name').text(player1Name);
            $('#player2-name').text(player2Name);
        },
        webcam: function() {
            var n = navigator,
            isWebkit = false;

            function onSuccess(stream) {
                var source;

                if (!isWebkit) {
                    source = stream;
                } else {
                    source = window.webkitURL.createObjectURL(stream);
                }

                player1.src = source;
                player2.src = source;

                canvas.width = 640;
                canvas.height = 480;
            }

            function onError() {}

            if (n.getUserMedia) {
                // opera users (hopefully everyone else at some point)
                n.getUserMedia({video: true, audio: true}, onSuccess, onError);
            } else if (n.webkitGetUserMedia) {
                // webkit users
                isWebkit = true;
                n.webkitGetUserMedia('video, audio', onSuccess, onError);
            } else {
                // moms, dads, grandmas, and grandpas
            }
        },
        callbacks: function() {
            $('#go-btn').click(go.firstStep.one);
        }
    };
var timeoutTime = 1000;
    var go = {
        firstStep: {
            one: function() {
                $('#action').text('Strike a pose!');
                $('.step').removeClass('highlight');
                $('#one').addClass('highlight');
                setTimeout(go.firstStep.two, timeoutTime);
            },
            two: function() {
                $('.step').removeClass('highlight');
                $('#two').addClass('highlight');
                setTimeout(go.firstStep.three, timeoutTime);
            },
            three: function() {
                $('.step').removeClass('highlight');
                $('#three').addClass('highlight');
                setTimeout(go.firstStep.go, timeoutTime);
            },
            go: function() {
                $('#action').text('Copy!');
                $('.step').removeClass('highlight');
                $('#go').addClass('highlight');

                ctx.drawImage(player1, 0, 0);
                img.one = canvas.toDataURL('image/webp');

                setTimeout(function() {
                    ctx.drawImage(player1, 0, 0);
                    img.three = canvas.toDataURL('image/webp');
                }, 2000);

                setTimeout(go.secondStep.one, timeoutTime*2);
            }
        },
        secondStep: {
            one: function() {
                $('.step').removeClass('highlight');
                $('#one').addClass('highlight');
                setTimeout(go.secondStep.two, timeoutTime);
            },
            two: function() {
                $('.step').removeClass('highlight');
                $('#two').addClass('highlight');
                setTimeout(go.secondStep.three, timeoutTime);
            },
            three: function() {
                $('.step').removeClass('highlight');
                $('#three').addClass('highlight');
                setTimeout(go.secondStep.go, timeoutTime);
            },
            go: function() {
                $('.step').removeClass('highlight');
                $('#go').addClass('highlight');
                var winner = (Math.random() > 0.3) ? (Math.random() > 0.5) ? player1Name : player2Name : "Draw";

                var img1 = $('<img src="img/player.png" class="player-thumb">');
                var img2 = $('<img src="img/player.png" class="player-thumb">');
                var img3 = $('<img src="img/player.png" class="player-thumb">');
                var img4 = $('<img src="img/player.png" class="player-thumb">');


                ctx.drawImage(player1, 0, 0);
                img.two = canvas.toDataURL('image/webp');

                setTimeout(function() {
                    ctx.drawImage(player1, 0, 0);
                    img.four = canvas.toDataURL('image/webp');

                    action.archive(img.one, img.two, img.three, img.four, winner);
                    $('#action').text("Click go to go again!");
                }, 2000);
            }
        }
    };
/*
    var capture = function() {
        ctx.drawImage(video, 0, 0);
        var img = document.createElement('img');
        img.src = canvas.toDataURL('image/webp');
    }
    */

    var action = {
        archive: function(img1, img2, img3, img4, winner) {
            console.log(img1);
            var results = $('#results'),
                itemTmpl = $('#archive-item').html(),
                itemContent = _.template(itemTmpl, { player1: img1, player2: img2, player3: img3, player4: img4, winner: winner }),
                item = $('<div class="clearfix">');

            item.append(itemContent).hide();

            results.prepend(item);

            item.slideDown();
        }
    };

    init.start();
};

//new Welcome();
new Game("Jonny", "Egon");