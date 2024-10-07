class KerbalTime
  # Default to Kerbin time
  @hoursPerDay: 6
  @daysPerYear: 426

  @setDateFormat: (newHoursPerDay, newDaysPerYear) ->
    oldHoursPerDay = @hoursPerDay
    oldDaysPerYear = @daysPerYear
    @hoursPerDay = newHoursPerDay
    @daysPerYear = newDaysPerYear
    $(@).trigger('dateFormatChanged', [oldHoursPerDay, oldDaysPerYear])

  @secondsPerDay: -> @hoursPerDay * 3600

  @hmsString: (hour, min, sec) ->
    min = "0#{min}" if min < 10
    sec = "0#{sec}" if sec < 10
    "#{hour}:#{min}:#{sec}"

  @fromDuration: (years = 0, days = 0, hours = 0, mins = 0, secs = 0) ->
    new KerbalTime(((((+years * @daysPerYear) + +days) * @hoursPerDay + +hours) * 60 + +mins) * 60 + +secs)

  @fromDate: (year = 0, day = 0, hour = 0, min = 0, sec = 0) ->
    @fromDuration(+year - 1, +day - 1, +hour, +min, +sec)

  @parse: (dateString) ->
    components = dateString.match(/(\d+)\/(\d+)\s+(\d+):(\d+):(\d+)/)
    components.shift()
    @fromDate(components...)

  constructor: (t) ->
    @t = if t.constructor == KerbalTime then t.t else t

  hms: ->
    hours = (@t / 3600) | 0
    t = @t % 3600
    mins = (t / 60) | 0
    secs = t % 60
    [hours, mins, secs]

  ydhms: ->
    [hours, mins, secs] = @hms()
    days = (hours / KerbalTime.hoursPerDay) | 0
    hours = hours % KerbalTime.hoursPerDay
    years = (days / KerbalTime.daysPerYear) | 0
    days = days % KerbalTime.daysPerYear
    [years, days, hours, mins, secs]

  toDays: ->
    @t / KerbalTime.secondsPerDay()

  toDate: ->
    [years, days, hours, mins, secs] = @ydhms()
    [years + 1, days + 1, hours, mins, secs]

  toDateString: ->
    [year, day, hour, min, sec] = @toDate()
    "#{year}年 #{day}日 #{KerbalTime.hmsString(hour, min, Math.round(sec))}"

  toShortDateString: (t) ->
    [year, day, hour, min, sec] = @toDate()
    "#{year}/#{day} #{KerbalTime.hmsString(hour, min, Math.round(sec))}"

  toDurationString: (t) ->
    [years, days, hours, mins, secs] = @ydhms()
    result = ""
    result += years + "年 " if years > 0
    result += days + "日 " if years > 0 or days > 0
    result += hours + "时 " + mins + "分 " + Math.round(secs) + "秒 ";

(exports ? this).KerbalTime = KerbalTime
