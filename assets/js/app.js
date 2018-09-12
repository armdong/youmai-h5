(function(window, document, $, undefined) {

  // ready
  $(function() {
    preLoadImg();
  });

  // images preload
  function preLoadImg() {
    var imgs = [
      'assets/imgs/loading.png',
      'assets/imgs/galaxy_bg.gif',
      'assets/imgs/earth_animate.gif',
      'assets/imgs/hand_animate.gif',
      'assets/imgs/movies_animate.gif',
      'assets/imgs/movie_player.gif',
      'assets/imgs/movies_screen_bg.jpg',
      'assets/imgs/movies_text_bg.png',
      'assets/imgs/player_bg.jpg',
      'assets/imgs/movie_01.jpg',
      'assets/imgs/movie_02_01.png',
      'assets/imgs/movie_02_02.png',
      'assets/imgs/movie_02_03.png',
      'assets/imgs/movie_02_04.png',
      'assets/imgs/movie_03_01.gif',
      'assets/imgs/movie_03_02.gif',
      'assets/imgs/movie_03_03.gif',
      'assets/imgs/movie_03_04.gif',
      'assets/imgs/movie_03_05.gif',
      'assets/imgs/movie_04.gif',
      'assets/imgs/movie_05.gif',
      'assets/imgs/movie_06.gif',
      'assets/imgs/movie_07.gif',
      'assets/imgs/movie_08.gif'
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
      src: [
        '/assets/audios/typer.mp3',
        '/assets/audios/typer.aac'
      ],
      onload: function() {
        this.play();
        soundLoaded();
      }
    });
    // sound.play();

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
          }, 1500);
        }, 1800);
      }, 2000);
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
        // TODO 调用API,生成所有slide
        $.ajax({
          url: 'assets/data/api.json',
          type: 'GET',
          dataType: 'json',
          success: function(data) {
            buildAllSlide(data);
            setTimeout(function() {
              initMoviePlayer(data);
            }, 5000);
          }
        });
      });
  }

  function initMoviePlayer(data) {
    var _html = '';
    var dateArr = data.registerDate.split('-');
    _html += '<p>'+ dateArr[0] +' 年 '+ dateArr[1] +' 月 '+ dateArr[2] +' 日</p>';
    _html += '<p>'+ data.userName +'医生登录优麦星球</p>';
    $('#firstLoginMsg').html(_html);

    var bgm = new Howl({
      src: [
        '/assets/audios/bgm.mp3',
        '/assets/audios/bgm.aac'
      ],
      onplay: function() {
        $('#earth').fadeOut(1000);
        initMovies();
      }
    });

    $('#moviePlayer')
      .animate({
        opacity: 1
      }, 1000)
      .on('click', '.btn', function(e) {
        bgm.play();
      });
  }

  // build slides
  function buildAllSlide(data) {
    var $wrapper = $('#swiperWrapper');
    var _html = '';

    // slide 1
    _html += '<div class="swiper-slide">';
    _html += '<div class="screen animated" data-ani-name="zoomIn" data-ani-duration="1s" data-ani-delay="0.1s">';
    _html += '<img src="assets/imgs/movie_01.jpg" alt="">';
    _html += '</div><div class="text">';
    _html += '<img src="assets/imgs/movies_text_bg.png" alt="">';
    _html += '</div></div>';

    // slide 2
    _html += '<div class="swiper-slide movie_02">';
    _html += '<div class="screen">';
    _html += '<img src="assets/imgs/movies_screen_bg.jpg" alt="">';
    _html += '<div class="box">';
    _html += '<img class="animated" data-ani-name="fadeInDown" data-ani-duration="0.5s" data-ani-delay="0.5s" src="assets/imgs/movie_02_01.png" alt="">';
    _html += '<img class="animated" data-ani-name="fadeInUp" data-ani-duration="0.5s" data-ani-delay="1s" src="assets/imgs/movie_02_02.png" alt="">';
    _html += '<img class="animated" data-ani-name="fadeInDown" data-ani-duration="0.5s" data-ani-delay="1.5s" src="assets/imgs/movie_02_03.png" alt="">';
    _html += '<img class="animated" data-ani-name="fadeInUp" data-ani-duration="0.5s" data-ani-delay="2s" src="assets/imgs/movie_02_04.png" alt="">';
    _html += '</div></div>';
    _html += '<div class="text">';
    _html += '<img src="assets/imgs/movies_text_bg.png" alt="">';
    _html += '<div class="msg">';
    _html += '<p>目前</p>';
    _html += '<p>您已累计听课'+ data.counts.class +'节</p>';
    _html += '<p>阅读资讯'+ data.counts.message +'篇</p>';
    _html += '</div></div></div>';

    // slide 3
    _html += '<div class="swiper-slide">';
    _html += '<div class="screen animated" data-ani-name="zoomIn" data-ani-duration="1s" data-ani-delay="0.1s">';
    _html += '<img src="assets/imgs/movie_03_0'+ data.activeRange.type +'.gif" alt="">';
    _html += '</div><div class="text">';
    _html += '<img src="assets/imgs/movies_text_bg.png" alt="">';
    _html += '<div class="msg">';
    _html += '<p>您最常登录的时间段为</p>';
    _html += '<p>'+ data.activeRange.range[0] +'点 - '+ data.activeRange.range[1] +'点</p>';
    _html += '</div></div></div>';

    // slide 4
    _html += '<div class="swiper-slide">';
    _html += '<div class="screen animated" data-ani-name="zoomIn" data-ani-duration="1s" data-ani-delay="0.1s">';
    _html += '<img src="assets/imgs/movie_04.gif" alt="">';
    _html += '</div>';
    _html += '<div class="text">';
    _html += '<img src="assets/imgs/movies_text_bg.png" alt="">';
    _html += '<div class="msg">';
    _html += '<p>'+ data.fans.join(' ') +'</p>';
    _html += '<p>是您最“粉”的</p>';
    _html += '<p>三位导师或同道</p>';
    _html += '</div></div></div>';

    // slide 5
    _html += '<div class="swiper-slide">';
    _html += '<div class="screen animated" data-ani-name="zoomIn" data-ani-duration="1s" data-ani-delay="0.1s">';
    _html += '<img src="assets/imgs/movie_05.gif" alt="">';
    _html += '</div>';
    _html += '<div class="text">';
    _html += '<img src="assets/imgs/movies_text_bg.png" alt="">';
    _html += '<div class="msg">';
    _html += '<p>您总共点赞'+ data.counts.favor +'次</p>';
    _html += '<p>发表评论'+ data.counts.comment +'次</p>';
    _html += '</div></div></div>';

    // slide 6
    _html += data.festvals.map(function(festval) {
      var _inner = '';

      var img = '';
      if (festval.type === 1) {
        img = '<img src="assets/imgs/movie_06.gif" alt="">';
      } else if (festval.type === 2) {
        img = '<img src="assets/imgs/movie_07.gif" alt="">';
      } else if (festval.type === 3) {
        img = '<img src="assets/imgs/movie_08.gif" alt="">';
      } else {
        img = '<img src="assets/imgs/movie_06.gif" alt="">';
      }

      var paragraphs = '';
      var dateArr = festval.date.split('-');
      if (festval.name === '元旦') {
        paragraphs += '<p>'+ dateArr[0] +'年'+ dateArr[1] +'月'+ dateArr[2] +'日</p>';
        paragraphs += '<p>您登录了优麦医生APP</p>';
        paragraphs += '<p>新的一年</p>';
        paragraphs += '<p>我们一同出发</p>';
      } else if (festval.name === '除夕') {
        paragraphs += '<p>'+ dateArr[0] +'年'+ dateArr[1] +'月'+ dateArr[2] +'日</p>';
        paragraphs += '<p>您登录了优麦医生APP</p>';
        paragraphs += '<p>那年除夕</p>';
        paragraphs += '<p>我们共同守岁</p>';
      } else if (festval.name === '年初一') {
        paragraphs += '<p>'+ dateArr[0] +'年'+ dateArr[1] +'月'+ dateArr[2] +'日</p>';
        paragraphs += '<p>您登录了优麦医生APP</p>';
        paragraphs += '<p>大年初一</p>';
        paragraphs += '<p>携手辞旧迎新</p>';
      } else if (festval.name === '情人节') {
        paragraphs += '<p>'+ dateArr[0] +'年'+ dateArr[1] +'月'+ dateArr[2] +'日</p>';
        paragraphs += '<p>您登录了优麦医生APP</p>';
        paragraphs += '<p>情人节</p>';
        paragraphs += '<p>要你听见我</p>';
        paragraphs += '<p>最长情的告白</p>';
      } else if (festval.name === '七夕') {
        paragraphs += '<p>'+ dateArr[0] +'年'+ dateArr[1] +'月'+ dateArr[2] +'日</p>';
        paragraphs += '<p>您登录了优麦医生APP</p>';
        paragraphs += '<p>七夕节</p>';
        paragraphs += '<p>要你听见我</p>';
        paragraphs += '<p>最长情的告白</p>';
      } else if (festval.name === '中秋') {
        paragraphs += '<p>'+ dateArr[0] +'年'+ dateArr[1] +'月'+ dateArr[2] +'日</p>';
        paragraphs += '<p>您登录了优麦医生APP</p>';
        paragraphs += '<p>团圆</p>';
        paragraphs += '<p>才是中秋该有的样子</p>';
      }

      _inner += '<div class="swiper-slide">';
      _inner += '<div class="screen animated" data-ani-name="zoomIn" data-ani-duration="1s" data-ani-delay="0.1s">';
      _inner += img;
      _inner += '</div>';
      _inner += '<div class="text">';
      _inner += '<img src="assets/imgs/movies_text_bg.png" alt="">';
      _inner += '<div class="msg">';
      _inner += paragraphs;
      _inner += '</div></div></div>';

      return _inner;
    }).join('');

    // slide 7
    _html += '';
    _html += '';
    _html += '';
    _html += '';
    _html += '';
    _html += '';
    _html += '';
    _html += '';
    _html += '';
    _html += '';
    _html += '';

    // slide 8
    _html += '<div class="swiper-slide">';
    _html += '<div class="screen animated" data-ani-name="zoomIn" data-ani-duration="1s" data-ani-delay="0.1s">';
    _html += '<img src="assets/imgs/movie_10.jpg" alt="">';
    _html += '</div><div class="text">';
    _html += '<img src="assets/imgs/movies_text_bg.png" alt="">';
    _html += '</div></div>';

    $wrapper.html(_html);
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
          $('.swiper-button-prev').hide();
          $('.swiper-button-next').hide();

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