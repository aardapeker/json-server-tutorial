export function writeFullDate(time) {
  let date = new Date(time)
  let year = date.getFullYear()
  let month = date.getMonth()
  let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  let monthName = months[month]
  let day = date.getDate()
  if (day < 10) {
    day = '0' + day
  }
  let hour = date.getHours()
  if (hour < 10) {
    hour = '0' + hour
  }
  let minutes = date.getMinutes()
  if (minutes < 10) {
    minutes = '0' + minutes
  }
  return `${day}/${monthName}/${year} ${hour}:${minutes}`
}