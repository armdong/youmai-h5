(function(window, document, $, undefined) {

  // ready
  $(function() {
    preLoadImg();
  });

  // images preload
  function preLoadImg() {
    var imgs = [
      '/assets/imgs/loading.png',
      '/assets/imgs/galaxy_bg.gif',
      '/assets/imgs/earth_animate.gif',
      '/assets/imgs/hand_animate.gif',
      '/assets/imgs/movies_animate.gif',
      '/assets/imgs/movie_player.gif',
      '/assets/imgs/movies_screen_bg.jpg',
      '/assets/imgs/movies_text_bg.png',
      '/assets/imgs/player_bg.jpg',
      '/assets/imgs/movie_01.jpg',
      '/assets/imgs/movie_02_01.png',
      '/assets/imgs/movie_02_02.png',
      '/assets/imgs/movie_02_03.png',
      '/assets/imgs/movie_02_04.png',
      '/assets/imgs/movie_03_01.gif',
      '/assets/imgs/movie_03_02.gif',
      '/assets/imgs/movie_03_03.gif',
      '/assets/imgs/movie_03_04.gif',
      '/assets/imgs/movie_03_05.gif',
      '/assets/imgs/movie_04.gif',
      '/assets/imgs/movie_05.gif',
      '/assets/imgs/movie_06.gif',
      '/assets/imgs/movie_07.gif',
      '/assets/imgs/movie_08.gif'
    ];

    $.imgpreload(imgs, {
      each: function() {
        // console.log(this);
      },
      all: function() {
        var $loading = $('#loading');
        $loading.fadeOut(function() {
          showMessageTyper();
        });
      }
    });
  }

  // message typer
  function showMessageTyper() {
    var sound = new Howl({
      src: ['/assets/audios/typer.mp3'],
      onload: function() {
        soundLoaded();
      }
    });
    sound.play();

    function soundLoaded() {
      var msgOne = '2015 年 9 月 20 日';
      var msgTwo = '优麦医生 APP 横空出世';
  
      var typerOne = new typer('lineOne');
      var typerTwo = new typer('lineTwo');

      typerOne.type(msgOne).end(2000);
      typerTwo.end();
      setTimeout(function() {
        typerTwo.type(msgTwo).end(3000);
        setTimeout(function() {
          sound.stop();

          setTimeout(function() {
            $('#galaxy').find('.message').hide();
            initEarth();
          }, 3000);
        }, 2000);
      }, 4000);
    }
  }

  function initEarth() {
    $('#earth .inner > img')
      .css({
        width: '0.01%',
      })
      .fadeIn()
      .animate({}, 200, function(){
        $(this).css({
          width: '500%',
          transition: 'width 8s ease-in-out'
        });
        setTimeout(function() {
          initMoviePlayer();
        }, 5000);
      });
  }

  function initMoviePlayer() {
    $('#earth .inner .movie-player')
      .animate({
        opacity: 1
      }, 1000)
      .on('click', '.btn', function(e) {
        $('#earth').fadeOut(1000);
        initMovies();
      });
  }

  function initMovies() {
    var $movies = $('#movies');

    $movies.fadeIn();

    var swiper = new Swiper('.swiper-container', {
      direction: 'horizontal',
      loop: false,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      on: {
        init: function() {
          initAnimationItems();
          playAnimation(this);
        },
        transitionEnd: function() {
          playAnimation(this);
        },
        reachEnd: function() {
          // last slide
          setTimeout(function() {
            $movies.fadeOut(function() {
              initStar();
            });
          }, 3000);
        }
      }
    });
  }

  function initStar() {
    $('#star')
      .show()
      .find('>img')
      .animate({
        top: '50%',
      }, 1000)
      .animate({}, 200, function(){
        $(this).css({
          width: '5%',
          left: '70%',
          transition: 'width 3s ease-in-out, left 3.5s ease-in-out'
        });
      })
      .on('transitionEnd webkitTransitionEnd', function() {
        $('#star .text').fadeIn();
      });
  }

})(window, document, jQuery);