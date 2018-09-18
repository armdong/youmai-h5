(function(window, document, $, undefined) {

  var tl = new TimelineLite();
  var bgmAudio = new Howl({
    src: ["assets/audios/bgm.mp3", "assets/audios/bgm.aac"]
  });

  // ready
  $(function() {
    init();
  });

  function init() {
    preLoadImg();

    // $('#loading').hide();
    // initMovies();
    // initNext();

    window.fetchData(function(data) {
      initMoviePlayer(data);
      buildAllSlide(data);
    });
  }

  // images preload
  function preLoadImg() {
    var imgs = [
      "assets/imgs/bean.png",
      "assets/imgs/coin.png",
      "assets/imgs/earth_animate.png",
      "assets/imgs/eating_animate_backward.gif",
      "assets/imgs/eating_animate.gif",
      "assets/imgs/galaxy_bg.gif",
      "assets/imgs/hand_animate.gif",
      "assets/imgs/movie_01.gif",
      "assets/imgs/movie_02_01.png",
      "assets/imgs/movie_02_02.png",
      "assets/imgs/movie_02_03.png",
      "assets/imgs/movie_02_04.png",
      "assets/imgs/movie_03_01.gif",
      "assets/imgs/movie_03_02.gif",
      "assets/imgs/movie_03_03.gif",
      "assets/imgs/movie_03_04.gif",
      "assets/imgs/movie_03_05.gif",
      "assets/imgs/movie_04.gif",
      "assets/imgs/movie_05.gif",
      "assets/imgs/movie_06.gif",
      "assets/imgs/movie_07.gif",
      "assets/imgs/movie_08.gif",
      "assets/imgs/movie_10.gif",
      "assets/imgs/movie_player.gif",
      "assets/imgs/movies_animate.gif",
      "assets/imgs/movies_screen_bg.gif",
      "assets/imgs/movies_text_bg.png",
      "assets/imgs/next_star_bg.gif",
      "assets/imgs/open_animate_bg.gif"
    ];

    $.imgpreload(imgs, {
      each: function() {
        // console.log(this);
      },
      all: function() {
        var $loading = $("#loading");
        $loading.fadeOut(function() {
          initOpen();
        });
      }
    });
  }

  function initOpen() {
    var $opening = $('#opening');

    $opening.on('click', function() {
      bgmAudio.play();
      $(this).fadeOut(function() {
        $('#galaxy').fadeIn();
        setTimeout(showMessageTyper, 1000);
      });
    });
  }

  // message typer
  function showMessageTyper() {
    var msgOne = "2015 年 9 月 20 日";
    var msgTwo = "优麦医生 APP 横空出世";

    var typerOne = new typer("lineOne");
    var typerTwo = new typer("lineTwo");

    typerOne.type(msgOne, 150).end();
    typerTwo.end();
    setTimeout(function() {
      typerTwo.type(msgTwo, 150).end();
      setTimeout(function() {
        $("#galaxy")
          .find(".message")
          .hide();
        initEarth();
      }, 4000);
    }, 3500);
  }

  function initEarth() {
    var $inner = $("#earth .inner");

    $inner
      .on("animationEnd webkitAnimationEnd", function() {
        $inner.find(".hand").fadeIn();
        $("#firstLoginMsg").fadeIn();
      })
      .addClass("ani");
  }

  function initMoviePlayer(data) {
    var _html = "";
    var dateArr = data.registerData.split("-");
    _html +=
      "<p>" +
      dateArr[0] +
      " 年 " +
      parseInt(dateArr[1], 10) +
      " 月 " +
      parseInt(dateArr[2], 10) +
      " 日</p>";
    _html += "<p>" + data.userName + "医生登录优麦星球</p>";
    $("#firstLoginMsg").html(_html);

    $("#moviePlayer")
      .animate(
        {
          opacity: 1
        },
        1000
      )
      .on("touchstart", ".btn", function(e) {
        $("#earth").fadeOut(1000);
        initMovies();
      });
  }

  // build slides
  function buildAllSlide(data) {
    var $wrapper = $("#swiperWrapper");
    var _html = "";

    // slide 1
    _html += '<div class="swiper-slide">';
    _html += '<div class="screen">';
    _html += '<img src="assets/imgs/movie_01.gif" alt="">';
    _html += '</div><div class="text">';
    _html += '<img src="assets/imgs/movies_text_bg.png" alt="">';
    _html += "</div></div>";

    // slide 2
    _html += '<div class="swiper-slide movie_02">';
    _html += '<div class="screen">';
    _html += '<img src="assets/imgs/movies_screen_bg.gif" alt="">';
    _html += '<div class="box">';
    _html +=
      '<img class="animated" data-ani-name="fadeInDown" data-ani-duration="1s" data-ani-delay="0.25s" src="assets/imgs/movie_02_01.png" alt="">';
    _html +=
      '<img class="animated" data-ani-name="fadeInUp" data-ani-duration="1s" data-ani-delay="0.5s" src="assets/imgs/movie_02_02.png" alt="">';
    _html +=
      '<img class="animated" data-ani-name="fadeInDown" data-ani-duration="1s" data-ani-delay="0.75s" src="assets/imgs/movie_02_03.png" alt="">';
    _html +=
      '<img class="animated" data-ani-name="fadeInUp" data-ani-duration="1s" data-ani-delay="1s" src="assets/imgs/movie_02_04.png" alt="">';
    _html += "</div></div>";
    _html += '<div class="text">';
    _html += '<img src="assets/imgs/movies_text_bg.png" alt="">';
    _html += '<div class="msg">';
    _html += "<p>目前</p>";
    _html += "<p>您已累计听课" + data.counts.class + "节</p>";
    _html += "<p>阅读资讯" + data.counts.message + "篇</p>";
    _html += "</div></div></div>";

    // slide 3
    _html += '<div class="swiper-slide">';
    _html += '<div class="screen">';
    _html +=
      '<img src="assets/imgs/movie_03_0' +
      data.activeRange.type +
      '.gif" alt="">';
    _html += '</div><div class="text">';
    _html += '<img src="assets/imgs/movies_text_bg.png" alt="">';
    _html += '<div class="msg">';
    _html += "<p>您最常登录的时间段为</p>";
    _html +=
      "<p>" +
      data.activeRange.range[0] +
      "点 - " +
      data.activeRange.range[1] +
      "点</p>";
    _html += "</div></div></div>";

    // slide 4
    _html += '<div class="swiper-slide">';
    _html += '<div class="screen">';
    _html += '<img src="assets/imgs/movie_04.gif" alt="">';
    _html += "</div>";
    _html += '<div class="text">';
    _html += '<img src="assets/imgs/movies_text_bg.png" alt="">';
    _html += '<div class="msg">';
    _html += "<p>" + data.fans.join(" ") + "</p>";
    _html += "<p>是您最“粉”的</p>";
    _html += "<p>三位导师或同道</p>";
    _html += "</div></div></div>";

    // slide 5
    _html += '<div class="swiper-slide">';
    _html += '<div class="screen">';
    _html += '<img src="assets/imgs/movie_05.gif" alt="">';
    _html += "</div>";
    _html += '<div class="text">';
    _html += '<img src="assets/imgs/movies_text_bg.png" alt="">';
    _html += '<div class="msg">';
    _html += "<p>您总共点赞" + data.counts.favor + "次</p>";
    _html += "<p>发表评论" + data.counts.comment + "次</p>";
    _html += "</div></div></div>";

    // slide 6
    _html += data.festvals
      .map(function(festval) {
        var _inner = "";

        var img = "";
        if (festval.type === 1) {
          img = '<img src="assets/imgs/movie_06.gif" alt="">';
        } else if (festval.type === 2) {
          img = '<img src="assets/imgs/movie_07.gif" alt="">';
        } else if (festval.type === 3) {
          img = '<img src="assets/imgs/movie_08.gif" alt="">';
        } else {
          img = '<img src="assets/imgs/movie_06.gif" alt="">';
        }

        var paragraphs = "";
        var dateArr = festval.date.split("-");
        if (festval.name === "元旦") {
          paragraphs +=
            "<p>" +
            dateArr[0] +
            "年" +
            parseInt(dateArr[1], 10) +
            "月" +
            parseInt(dateArr[2], 10) +
            "日</p>";
          paragraphs += "<p>您登录了优麦医生APP</p>";
          paragraphs += "<p>新的一年</p>";
          paragraphs += "<p>我们一同出发</p>";
        } else if (festval.name === "除夕") {
          paragraphs +=
            "<p>" +
            dateArr[0] +
            "年" +
            parseInt(dateArr[1], 10) +
            "月" +
            parseInt(dateArr[2], 10) +
            "日</p>";
          paragraphs += "<p>您登录了优麦医生APP</p>";
          paragraphs += "<p>那年除夕</p>";
          paragraphs += "<p>我们共同守岁</p>";
        } else if (festval.name === "年初一") {
          paragraphs +=
            "<p>" +
            dateArr[0] +
            "年" +
            parseInt(dateArr[1], 10) +
            "月" +
            parseInt(dateArr[2], 10) +
            "日</p>";
          paragraphs += "<p>您登录了优麦医生APP</p>";
          paragraphs += "<p>大年初一</p>";
          paragraphs += "<p>携手辞旧迎新</p>";
        } else if (festval.name === "情人节") {
          paragraphs +=
            "<p>" +
            dateArr[0] +
            "年" +
            parseInt(dateArr[1], 10) +
            "月" +
            parseInt(dateArr[2], 10) +
            "日</p>";
          paragraphs += "<p>您登录了优麦医生APP</p>";
          paragraphs += "<p>情人节</p>";
          paragraphs += "<p>要你听见我</p>";
          paragraphs += "<p>最长情的告白</p>";
        } else if (festval.name === "七夕") {
          paragraphs +=
            "<p>" +
            dateArr[0] +
            "年" +
            parseInt(dateArr[1], 10) +
            "月" +
            parseInt(dateArr[2], 10) +
            "日</p>";
          paragraphs += "<p>您登录了优麦医生APP</p>";
          paragraphs += "<p>七夕节</p>";
          paragraphs += "<p>要你听见我</p>";
          paragraphs += "<p>最长情的告白</p>";
        } else if (festval.name === "中秋") {
          paragraphs +=
            "<p>" +
            dateArr[0] +
            "年" +
            parseInt(dateArr[1], 10) +
            "月" +
            parseInt(dateArr[2], 10) +
            "日</p>";
          paragraphs += "<p>您登录了优麦医生APP</p>";
          paragraphs += "<p>团圆</p>";
          paragraphs += "<p>才是中秋该有的样子</p>";
        }

        _inner += '<div class="swiper-slide">';
        _inner += '<div class="screen">';
        _inner += img;
        _inner += "</div>";
        _inner += '<div class="text">';
        _inner += '<img src="assets/imgs/movies_text_bg.png" alt="">';
        _inner += '<div class="msg">';
        _inner += paragraphs;
        _inner += "</div></div></div>";

        return _inner;
      })
      .join("");

    // slide 7
    _html += '<div class="swiper-slide eating-bean-slide">';
    _html += '<div class="screen">';
    _html += '<img src="assets/imgs/movies_screen_bg.gif" alt="">';
    _html += '<div class="eating-beans" id="eatingBeans">';

    for (var i = 0; i < 18; i++) {
      _html += '<div class="box">';
      _html += '<img src="assets/imgs/bean.png" class="bean">';
      _html += '<img src="assets/imgs/coin.png" class="coin">';
      _html += "</div>";
    }

    _html += '<div class="animal">';
    _html += '<img src="assets/imgs/eating_animate.gif" class="forward">';
    _html += '<img src="assets/imgs/eating_animate_backward.gif" class="backward">';
    _html += "</div></div></div>";
    _html += '<div class="text">';
    _html += '<img src="assets/imgs/movies_text_bg.png" alt="">';
    _html += '<div class="msg">';
    _html += "<p>您总共收获" + data.score.recieve + "麦豆</p>";
    _html += "<p>消费" + data.score.cost + "麦豆</p>";
    _html += "</div></div></div>";

    // slide 8
    _html += '<div class="swiper-slide">';
    _html += '<div class="screen">';
    _html += '<img src="assets/imgs/movie_10.gif" alt="">';
    _html += '</div><div class="text">';
    _html += '<img src="assets/imgs/movies_text_bg.png" alt="">';
    _html += "</div></div>";

    $wrapper.html(_html);
  }

  function initMovies() {
    var $movies = $("#movies");

    $movies.fadeIn(1000);

    var swiper = new Swiper(".swiper-container", {
      direction: "horizontal",
      loop: false,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      },
      on: {
        init: function() {
          initAnimationItems();
          playAnimation(this);
        },
        slideChange: function() {
          var activeIndex = this.activeIndex;
          var slide = this.slides[activeIndex];
          var isEatingBeanSlide = $(slide).hasClass("eating-bean-slide");
          if (isEatingBeanSlide) {
            setTimeout(initAnimalEating, 1000);
          } else {
            resetAnimalEating();
          }
        },
        transitionEnd: function() {
          playAnimation(this);
        },
        reachEnd: function() {
          // last slide
          $(".swiper-button-prev").hide();
          $(".swiper-button-next").hide();

          setTimeout(function() {
            $movies.fadeOut(function() {
              initNext();
            });
          }, 3000);
        }
      }
    });
  }

  // 吃豆豆动画
  function initAnimalEating() {
    var $eatingBeans = $("#eatingBeans"),
      $animal = $eatingBeans.find(".animal"),
      $boxes = $eatingBeans.find(".box"),
      len = $boxes.length;

    var currBean = 0;
    var direction = "forward";
    $boxes.css({opacity: 1});
    step();

    function step() {
      var $box = $boxes.eq(currBean);
      var iLeft = $box && $box.position().left;
      var iTop = $box && $box.position().top;

      if (currBean === 0) {
        $boxes
          .find(".bean")
          .show()
          .end()
          .find(".coin")
          .hide();
        $animal
          .css({ top: 0 })
          .find(".backward")
          .hide()
          .siblings(".forward")
          .show();
      }

      tl.clear();
      tl.to($animal, 1, {
        left: iLeft,
        top: iTop,
        onStart: function() {
          setTimeout(function() {
            $boxes
              .eq(currBean)
              .css({ opacity: 0 })
              .siblings()
              .css({ opacity: 1 });
          }, 300);
        },
        onComplete: function() {
          $box
            .find(".bean")
            .hide()
            .siblings(".coin")
            .show();

          if (currBean < len) {
            if (direction === "forward") {
              currBean = currBean + 1;
              if (currBean === 6) {
                direction = "backward";
                currBean = 11;

                tl.clear();
                tl.to(
                  $animal,
                  1,
                  {
                    left: "100%",
                    onStart: function() {
                      setTimeout(function() {
                        $boxes.css({ opacity: 1 });
                      }, 300);
                    },
                    onComplete: function() {
                      var top = $boxes.eq(currBean).position().top;
                      $animal
                        .css({ top: top })
                        .find(".forward")
                        .hide()
                        .siblings(".backward")
                        .show();
                      if (currBean < len) {
                        setTimeout(step, 50);
                      }
                    }
                  },
                  0.1
                );
              } else {
                if (currBean < len) {
                  setTimeout(step, 50);
                }
              }
            } else {
              currBean = currBean - 1;
              if (currBean === 5) {
                direction = "forward";
                currBean = 12;

                tl.clear();
                tl.to(
                  $animal,
                  1,
                  {
                    left: "-20%",
                    onStart: function() {
                      setTimeout(function() {
                        $boxes.css({ opacity: 1 });
                      }, 300);
                    },
                    onComplete: function() {
                      var top = $boxes.eq(currBean).position().top;
                      $animal
                        .css({ top: top })
                        .find(".backward")
                        .hide()
                        .siblings(".forward")
                        .show();
                      if (currBean < len) {
                        setTimeout(step, 50);
                      }
                    }
                  },
                  0.1
                );
              } else {
                if (currBean < len) {
                  setTimeout(step, 50);
                }
              }
            }
          }
        }
      });
    }
  }

  function resetAnimalEating() {
    var $eatingBeans = $("#eatingBeans"),
      $animal = $eatingBeans.find(".animal"),
      $boxes = $eatingBeans.find(".box");

    tl.clear();
    $animal
      .css({ left: "-20%", top: "-100%" })
      .find(".backward")
      .hide()
      .siblings(".forward")
      .show();
    $boxes
      .css({opacity: 1})
      .find(".bean")
      .show()
      .end()
      .find(".coin")
      .hide();
  }

  function initNext() {
    $("#star").fadeIn(3000, function() {
      
      $("#star .text").show();

      var line1 = "下一站";
      var line2 = "人工智能";
      var line3 = "优智皮肤 APP";

      var typer1 = new typer("line1");
      var typer2 = new typer("line2");
      var typer3 = new typer("line3");

      typer1.end();
      typer2.end();
      typer3.end();

      typer1
        .del()
        .type(line1)
        .end(1000);
      setTimeout(function() {
        typer2
          .del()
          .type(line2)
          .end(1000);
        setTimeout(function() {
          typer3
            .del()
            .type(line3)
            .end(1000);
          setTimeout(function() {
            $("#star .footer").fadeIn();
          }, 2000);
        }, 1000);
      }, 1000);
    });
  }
})(window, document, jQuery);
