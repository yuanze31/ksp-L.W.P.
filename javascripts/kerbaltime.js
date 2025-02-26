// Generated by CoffeeScript 1.9.0
(function () {
  var KerbalTime;

  KerbalTime = (function () {
    KerbalTime.hoursPerDay = 6;

    KerbalTime.daysPerYear = 426;

    KerbalTime.setDateFormat = function (newHoursPerDay, newDaysPerYear) {
      var oldDaysPerYear, oldHoursPerDay;
      oldHoursPerDay = this.hoursPerDay;
      oldDaysPerYear = this.daysPerYear;
      this.hoursPerDay = newHoursPerDay;
      this.daysPerYear = newDaysPerYear;
      return $(this).trigger("dateFormatChanged", [oldHoursPerDay, oldDaysPerYear]);
    };

    KerbalTime.secondsPerDay = function () {
      return this.hoursPerDay * 3600;
    };

    KerbalTime.hmsString = function (hour, min, sec) {
      if (min < 10) {
        min = "0" + min;
      }
      if (sec < 10) {
        sec = "0" + sec;
      }
      return hour + ":" + min + ":" + sec;
    };

    KerbalTime.fromDuration = function (years, days, hours, mins, secs) {
      if (years == null) {
        years = 0;
      }
      if (days == null) {
        days = 0;
      }
      if (hours == null) {
        hours = 0;
      }
      if (mins == null) {
        mins = 0;
      }
      if (secs == null) {
        secs = 0;
      }
      return new KerbalTime(
        (((+years * this.daysPerYear + +days) * this.hoursPerDay + +hours) * 60 + +mins) * 60 +
          +secs
      );
    };

    KerbalTime.fromDate = function (year, day, hour, min, sec) {
      if (year == null) {
        year = 0;
      }
      if (day == null) {
        day = 0;
      }
      if (hour == null) {
        hour = 0;
      }
      if (min == null) {
        min = 0;
      }
      if (sec == null) {
        sec = 0;
      }
      return this.fromDuration(+year - 1, +day - 1, +hour, +min, +sec);
    };

    KerbalTime.parse = function (dateString) {
      var components;
      components = dateString.match(/(\d+)\/(\d+)\s+(\d+):(\d+):(\d+)/);
      components.shift();
      return this.fromDate.apply(this, components);
    };

    function KerbalTime(t) {
      this.t = t.constructor === KerbalTime ? t.t : t;
    }

    KerbalTime.prototype.hms = function () {
      var hours, mins, secs, t;
      hours = (this.t / 3600) | 0;
      t = this.t % 3600;
      mins = (t / 60) | 0;
      secs = t % 60;
      return [hours, mins, secs];
    };

    KerbalTime.prototype.ydhms = function () {
      var days, hours, mins, secs, years, _ref;
      (_ref = this.hms()), (hours = _ref[0]), (mins = _ref[1]), (secs = _ref[2]);
      days = (hours / KerbalTime.hoursPerDay) | 0;
      hours = hours % KerbalTime.hoursPerDay;
      years = (days / KerbalTime.daysPerYear) | 0;
      days = days % KerbalTime.daysPerYear;
      return [years, days, hours, mins, secs];
    };

    KerbalTime.prototype.toDays = function () {
      return this.t / KerbalTime.secondsPerDay();
    };

    KerbalTime.prototype.toDate = function () {
      var days, hours, mins, secs, years, _ref;
      (_ref = this.ydhms()),
        (years = _ref[0]),
        (days = _ref[1]),
        (hours = _ref[2]),
        (mins = _ref[3]),
        (secs = _ref[4]);
      return [years + 1, days + 1, hours, mins, secs];
    };

    KerbalTime.prototype.toDateString = function () {
      var day, hour, min, sec, year, _ref;
      (_ref = this.toDate()),
        (year = _ref[0]),
        (day = _ref[1]),
        (hour = _ref[2]),
        (min = _ref[3]),
        (sec = _ref[4]);
      return year + "年 " + day + "日 " + KerbalTime.hmsString(hour, min, Math.round(sec));
    };

    KerbalTime.prototype.toShortDateString = function (t) {
      var day, hour, min, sec, year, _ref;
      (_ref = this.toDate()),
        (year = _ref[0]),
        (day = _ref[1]),
        (hour = _ref[2]),
        (min = _ref[3]),
        (sec = _ref[4]);
      return year + "/" + day + " " + KerbalTime.hmsString(hour, min, Math.round(sec));
    };

    KerbalTime.prototype.toDurationString = function (t) {
      var days, hours, mins, result, secs, years, _ref;
      (_ref = this.ydhms()),
        (years = _ref[0]),
        (days = _ref[1]),
        (hours = _ref[2]),
        (mins = _ref[3]),
        (secs = _ref[4]);
      result = "";
      if (years > 0) {
        result += years + "年 ";
      }
      if (years > 0 || days > 0) {
        result += days + "日 ";
      }
      result += hours + "时 " + mins + "分 " + Math.round(secs) + "秒 ";
      return result;
    };

    return KerbalTime;
  })();

  (typeof exports !== "undefined" && exports !== null ? exports : this).KerbalTime = KerbalTime;
}).call(this);
