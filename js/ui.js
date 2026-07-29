(function () {
  var original_title = document.title;

  document.addEventListener('visibilitychange', function () {
    document.title = document.hidden ? 'Come back!' : original_title;
  });
})();
