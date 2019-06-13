function json2Form(json) {
    var str = [];
    for (var p in json) {
    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));
    }
    return str.join("&");

}
function convertDateToString(date) {
  if (date instanceof Date) {
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDay()
    let hour = date.getHours()
    let minute = date.getMinutes()
    let second = date.getSeconds()
    month = padZero(month)
    day = padZero(day)
    hour = padZero(hour)
    minute = padZero(minute)
    second = padZero(second)
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`
  } else if (typeof date === 'string') {
    return date
  }
}

function padZero(n) {
  return n >=10 ? '' + n : '0' + n
}
export {
  json2Form,
  convertDateToString
}
