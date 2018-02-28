const functions = {}
export default functions
functions.getUrlParameter = sParam => {
  var i, sPageURL, sParameterName, sURLVariables
  sPageURL = decodeURIComponent(window.location.search.substring(1))
  sURLVariables = sPageURL.split('&')
  sParameterName = void 0
  i = void 0
  i = 0
  while (i < sURLVariables.length) {
    sParameterName = sURLVariables[i].split('=')
    if (sParameterName[0] === sParam) {
      if (sParameterName[1] === void 0) {
        return true
      } else {
        return sParameterName[1]
      }
    }
    i++
  }
}
functions.openCustomURLinIFrame = src => {
  var iframe
  iframe = document.createElement('IFRAME')
  iframe.setAttribute('src', src)
  document.documentElement.appendChild(iframe)
  iframe.parentNode.removeChild(iframe)
  iframe = null
}
functions.isEmpty = obj => {
  if (obj == null) {
    return true
  }
  if (obj.length > 0) {
    return false
  }
  if (obj.length === 0) {
    return true
  }
  for (var key in obj) {
    if (hasOwnProperty.call(obj, key)) return false
  }
  return true
}
