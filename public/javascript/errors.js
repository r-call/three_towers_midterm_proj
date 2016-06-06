var errors = (function() {

  // PUBLIC

  // rocket.io error handling
  function ioError(error) {
    $('#player-alert-box').text("No connection!");
  }

  // API

  var api = {
    ioError: ioError
  }

  return api
})();
