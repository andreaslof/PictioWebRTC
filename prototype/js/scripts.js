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
        player2Name = player2Name;
    var init = {
        start: function() {
            $('#game').fadeIn(function() {
                init.webcam();
                init.callbacks();
            });
            $('#player1-name').text(player1Name);
            $('#player2-name').text(player2Name);
        },
        webcam: function() {
            var n = navigator,
            isWebkit = false;

            function onSuccess(stream) {
                var player1 = document.getElementById('player1'), // a video element
                    player2 = document.getElementById('player2'),
                    source;

                if (!isWebkit) {
                    source = stream;
                } else {
                    source = window.webkitURL.createObjectURL(stream);
                }

                player1.src = source;
                player2.src = source;
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

    var go = {
        firstStep: {
            one: function() {
                console.log('height');
                $('.step').removeClass('highlight');
                $('#one').addClass('highlight');
                setTimeout(go.firstStep.two, 1000);
            },
            two: function() {
                $('.step').removeClass('highlight');
                $('#two').addClass('highlight');
                setTimeout(go.firstStep.three, 1000);
            },
            three: function() {
                $('.step').removeClass('highlight');
                $('#three').addClass('highlight');
                setTimeout(go.firstStep.go, 1000);
            },
            go: function() {
                $('.step').removeClass('highlight');
                $('#go').addClass('highlight');
                setTimeout(go.secondStep.one, 3000);
            }
        },
        secondStep: {
            one: function() {
                $('.step').removeClass('highlight');
                $('#one').addClass('highlight');
                setTimeout(go.secondStep.two, 1000);
            },
            two: function() {
                $('.step').removeClass('highlight');
                $('#two').addClass('highlight');
                setTimeout(go.secondStep.three, 1000);
            },
            three: function() {
                $('.step').removeClass('highlight');
                $('#three').addClass('highlight');
                setTimeout(go.secondStep.go, 1000);
            },
            go: function() {
                $('.step').removeClass('highlight');
                $('#go').addClass('highlight');

                var img1 = $('<img src="img/player.png" class="player-thumb">');
                var img2 = $('<img src="img/player.png" class="player-thumb">');
                var img3 = $('<img src="img/player.png" class="player-thumb">');
                var img4 = $('<img src="img/player.png" class="player-thumb">');
                action.archive(img1[0], img2[0], img3[0], img4[0]);
            }
        }

    };

    var action = {
        archive: function(img1, img2, img3, img4) {
            var results1 = $('#player1-results'),
                results2 = $('#player2-results'),
                item1Tmpl = $('#archive-item').html(),
                item2Tmpl = $('#archive-item').html(),
                item1Content = _.template(item1Tmpl, { player1: img1.src, player2: img2.src }),
                item2Content = _.template(item2Tmpl, { player1: img3.src, player2: img4.src }),
                item1 = $('<li class="clearfix">'),
                item2 = $('<li class="clearfix">');

            item1.append(item1Content).hide();
            item2.append(item2Content).hide();

            results1.prepend(item1);
            results2.prepend(item2);

            item1.slideDown();
            item2.slideDown();
        }
    };

    init.start();
};

//new Welcome();
new Game("Jonny", "Egon");