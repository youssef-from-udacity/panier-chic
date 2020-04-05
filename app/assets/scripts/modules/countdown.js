import $ from 'jquery';
import countdown from 'countdown';

class DateCount {
  constructor(arr) {
    (this.monthsName = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre']), (this.products = null);
    this.loopThroughProducts(arr);
  }
  getDate(arr) {
    return new Date(...arr);
  }
  injectSnippet(objElement) {
    var obj = objElement,
      elementName = `.${objElement.id} .bottom-right`,
      element = $(elementName),
      years = `<div class="countdown ml-1">
              <p class="centerXandY text-center">
                <span class="countdown-number">${obj.timespan.years}</span>
                <span class="countdown-unit">ans</span>
              </p>
            </div>`,
      months = `<div class="countdown ml-1">
              <p class="centerXandY text-center">
                <span class="countdown-number">${obj.timespan.months}</span>
                <span class="countdown-unit">mois</span>
              </p>
            </div>`,
      days = `<div class="countdown ml-1">
              <p class="centerXandY text-center">
                <span class="countdown-number">${obj.timespan.days}</span>
                <span class="countdown-unit">jours</span>
              </p>
            </div>`,
      hours = `<div class="countdown ml-1">
              <p class="centerXandY text-center">
                <span class="countdown-number">${obj.timespan.hours}</span>
                <span class="countdown-unit">heures</span>
              </p>
            </div>`,
      minutes = `<div class="countdown ml-1">
              <p class="centerXandY text-center">
                <span class="countdown-number">${obj.timespan.minutes}</span>
                <span class="countdown-unit">minutes</span>
              </p>
            </div>`,
      seconds = `<div class="countdown ml-1">
              <p class="centerXandY text-center">
                <span class="countdown-number">${obj.timespan.seconds}</span>
                <span class="countdown-unit">secondes</span>
              </p>
            </div>`;

    if (obj.timespan.years) {
      var template = years + months + days + hours + minutes + seconds;
      $(element).html(template);
    } else {
      if (obj.timespan.months) {
        var template = months + days + hours + minutes + seconds;
        $(element).html(template);
      } else {
        if (obj.timespan.days) {
          var template = days + hours + minutes + seconds;
          $(element).html(template);
        } else {
          if (obj.timespan.hours) {
            var template = hours + minutes + seconds;
            $(element).html(template);
          } else {
            if (obj.timespan.minutes) {
              var template = minutes + seconds;
              $(element).html(template);
            } else {
              if (obj.timespan.seconds) {
                var template = seconds;
                $(element).html(template);
              } else {
                $(element).html('');
              }
            }
          }
        }
      }
    }
  }
  interval(obj) {
    obj.ticking = false;
    obj.timer = setInterval(this.setTimer.bind(this, obj), 1000);
  }
  setTimer(obj) {
    if (!obj.ticking) {
      var that = this;
      obj.timespan = countdown(new Date(), this.getDate(obj.endDate));
      window.requestAnimationFrame(function() {
        //if negative destroy countdown
        if (obj.timespan.value < 0) {
          var elementName = `.${obj.id} > section.bottom-right`;
          $(elementName).html('');
          window.clearInterval(obj.timer);
        } else {
          that.injectSnippet(obj);
        }
        obj.ticking = false;
      });

      obj.ticking = true;
    }
  }
  loopThroughProducts(products) {
    for (let i = 0, len = products.length; i < len; i++) {
      var id = products[i].id,
        countdown = products[i].countdown,
        date = this.getDate(products[i].endDate),
        dateString = `${date.getDate()} ${this.monthsName[date.getMonth() - 1]} ${date.getFullYear()}`;
      $(`.${id}`)
        .find('.end-date')
        .html(dateString);
      countdown ? this.interval(products[i]) : null;
    }
  }
}

$(document).ready(function() {
  $.getJSON('items.json', function(result) {
    var products = result.items;
    new DateCount(products);
  });
});
