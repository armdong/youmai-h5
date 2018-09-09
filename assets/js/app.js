(function(window, document, $, undefined) {

  // ready
  $(function() {
    preLoadImg();
  });

  // images preload
  function preLoadImg() {
    var imgs = [
      '/assets/imgs/loading.png',
      '/assets/imgs/galaxy_bg.gif'
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
    var msgOne = '2015 年 9 月 20 日';
    var msgTwo = '优麦医生 APP 横空出世';

    var typerOne = new typer('lineOne');
    var typerTwo = new typer('lineTwo');

    var sound = new Howl({
      src: ['/assets/audios/typer.mp3'],
      onload: function() {
        soundLoaded();
      }
    });
    sound.play();

    function soundLoaded() {
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
          console.log(this.activeIndex);
          initAnimationItems();
          playAnimation(this);
        },
        transitionEnd: function() {
          playAnimation(this);
        }
      }
    });

    // swiper.on('init', function() {
    //   initAnimationItems();
    //   playAnimation(swiper);
    // });

    // swiper.on('transitionEnd', function() {
    //   playAnimation(swiper)
    // });
  }

})(window, document, jQuery);