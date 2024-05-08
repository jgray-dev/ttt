// This function was created by Claude (AI) to take seconds as an argument and return the time in days/months/years, etc for readability.
// It was modified by Jackson so the argument is instead the last_updated time of a thread

export function getTime(updatedTime) {
  const seconds = (parseInt(Date.now() / 1000) - updatedTime)
  const minute = 60;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;
  const month = day * 30;
  const year = day * 365;

  if (seconds < minute) {
    return seconds === 1 ? "1 second" : `${seconds} seconds`;
  } else if (seconds < hour) {
    const minutes = Math.floor(seconds / minute);
    return minutes === 1 ? "1 minute" : `${minutes} minutes`;
  } else if (seconds < day) {
    const hours = Math.floor(seconds / hour);
    return hours === 1 ? "1 hour" : `${hours} hours`;
  } else if (seconds < week) {
    const days = Math.floor(seconds / day);
    return days === 1 ? "1 day" : `${days} days`;
  } else if (seconds < month) {
    const weeks = Math.floor(seconds / week);
    return weeks === 1 ? "1 week" : `${weeks} weeks`;
  } else if (seconds < year) {
    const months = Math.floor(seconds / month);
    return months === 1 ? "1 month" : `${months} months`;
  } else {
    const years = Math.floor(seconds / year);
    return years === 1 ? "1 year" : `${years} years`;
  }
}

//Return our cookies as an object
export function readCookie() {
  let cookies = document.cookie.split("; ");
  let cookieObject = {};
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].split("=");
    cookieObject[cookie[0]] = cookie[1];
  }
  return cookieObject;
}


//Debug to print all our cookies
export function printAllCookies() {
  let cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    let eqPos = cookie.indexOf("=");
    let name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
    if (name !== "undefined") {
      console.log(cookie)
    }
  }
}

//Deletes all saved cookies
export function deleteAllCookies() {
  let cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    let eqPos = cookie.indexOf("=");
    let name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
    if (name !== "undefined") {
      document.cookie =
        name + "=; SameSite=Strict; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  }
}

//Sets our cookie
export function updateCookie(username, id) {
  console.log("UPDATE: ", username, id)
  const date = new Date();
  date.setFullYear(date.getFullYear() + 1);
  document.cookie = `username=${username}; SameSite=Strict; Expires=${date.toUTCString()}`;
  document.cookie = `id=${id}; SameSite=Strict; Expires=${date.toUTCString()}`;
}


