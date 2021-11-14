function testWebP(callback) {

  var webP = new Image();
  webP.onload = webP.onerror = function () {
    callback(webP.height == 2);
  };
  webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {

  if (support == true) {
    document.querySelector('body').classList.add('webp');
  } else {
    document.querySelector('body').classList.add('no-webp');
  }
});

$(function () {
  $('.top-slider__inner').slick({
    dots: true,
    arrows: false,
    fade: true,
  });
  $('.star').rateYo({
    starWidth: '17px',
    normalFill: "#ccccce",
    ratedFill: "#ffc35b",
    readOnly: true,
    spacing: '1px',
    starSvg: '<svg width="19" height="17"><path d="M8.555.59 6.398 4.988l-4.82.707C.715 5.82.371 6.895.996 7.508l3.488 3.418-.828 4.832c-.148.875.766 1.527 1.531 1.12l4.313-2.28 4.313 2.28c.765.403 1.68-.245 1.53-1.12l-.827-4.832 3.488-3.418c.625-.613.281-1.688-.582-1.813l-4.82-.707L10.445.59c-.383-.781-1.504-.793-1.89 0zm0 0"/></svg>'
  })


  function getTimeRemaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }

  function initializeClock(className, endtime) {
    var clock = document.querySelector('.' + className);
    var daysSpan = clock.querySelector('.promo__days');
    var hoursSpan = clock.querySelector('.promo__hours');
    var minutesSpan = clock.querySelector('.promo__minutes');
    var secondsSpan = clock.querySelector('.promo__seconds');

    function updateClock() {
      var t = getTimeRemaining(endtime);

      daysSpan.innerHTML = t.days;
      hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
      minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
      secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

      if (t.total <= 0) {
        clearInterval(timeinterval);
      }
    }

    updateClock();
    var timeinterval = setInterval(updateClock, 1000);
  }

  var deadline = $('.promo__clock').attr('data-timer');

  initializeClock('promo__clock', deadline);
})