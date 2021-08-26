export function checkURL(url) {
  var regexp =
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
  if (regexp.test(url)) {
    return true;
    // return console.log('::: valid URL :::')
  } else {
    return false;
    // return console.log('::: invalid URL :::')
  }
}
