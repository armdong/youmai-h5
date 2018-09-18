(function(window, document, $, undefined) {
  
  function fetchData(callback){
    $.ajax({
      url: "http://120.25.226.242:8084/umer-extend/api/extend/getAct2018920Stat",
      type: "POST",
      // url: "assets/data/api.json",
      // type: "GET",
      dataType: "json",
      data: { umerId: "10816181" },
      success: function(data) {
        callback && callback(data);
      }
    });
  }

  window.fetchData = fetchData;

})(window, document, jQuery);