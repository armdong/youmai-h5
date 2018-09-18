(function(window, document, $, undefined){

  $(function() {
    initReport(buildReport);
  });

  function initReport(callback) {
    // 拿到url中带的umerId
    // 分享的URL中需带上当前用户的umerId
    var umerId = getUrlParam('umerId', '10816181');

    $.ajax({
      url: "http://120.25.226.242:8084/umer-extend/api/extend/getAct2018920Stat",
      type: "POST",
      dataType: "json",
      data: { umerId: umerId },
      success: function(data) {
        callback && callback(data);
      }
    });
  }

  function buildReport(data) {
    var $report = $('#report'),
      $wrapper = $report.find('.wrapper');

    var regDate = data.registerData.split('-');

    var _html = '';
    _html += '<div class="top">';
    _html += '<img src="assets/imgs/report_top.png" alt="">';
    _html += '</div>';
    _html += '<div class="text bold">';
    _html += '<p>2015年9月20日</p>';
    _html += '<p>优麦医生APP横空出世</p>';
    _html += '</div>';
    _html += '<div class="text">';
    _html += '<p>'+ regDate[0] +'年'+ parseInt(regDate[1]) +'月'+ parseInt(regDate[2]) +'日</p>';
    _html += '<p>'+ data.userName +'医生登陆优麦星球</p>';
    _html += '</div>';
    _html += '<div class="text">';
    _html += '<p>累计听课'+ data.counts.class +'节</p>';
    _html += '<p>阅读资讯'+ data.counts.message +'篇</p>';
    _html += '<p>参与点赞'+ data.counts.favor +'次</p>';
    _html += '<p>发表评论'+ data.counts.comment +'次</p>';
    _html += '</div>';
    _html += '<div class="text">';
    _html += '<p>最常登录时间段为'+ data.activeRange.range[0] +'点-'+ data.activeRange.range[1] +'点</p>';
    _html += '</div>';
    _html += '<div class="text">';
    _html += '<p>'+ data.fans.join(" ") +'</p>';
    _html += '<p>他们是您最“粉”的三位导师或同道</p>';
    _html += '</div>';
    _html += '<div class="middle">';
    _html += '<img src="assets/imgs/report_middle.png" alt="">';
    _html += '</div>';
    _html += '<div class="bottom">';
    _html += '<img src="assets/imgs/report_bottom.png" alt="">';
    _html += '</div>';

    $wrapper.html(_html);
  }

  function getUrlParam(parameter, defaultValue) {
    var urlParameter = defaultValue;
    if (window.location.href.indexOf(parameter) > -1) {
      urlParameter = getUrlVars()[parameter];
    }
    return urlParameter;
  }

  function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
      vars[key] = value;
    });
    return vars;
  }

})(window, document, jQuery);