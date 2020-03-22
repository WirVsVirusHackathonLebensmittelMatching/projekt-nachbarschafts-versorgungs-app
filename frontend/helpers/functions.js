function doWSRequest(action, data = {}, handleSuccessResponse = function () {}) {
  var wsMethod = "";
  var wsUrl = "https://webservice.homepick.de";
  var wsEndpoint = "";
  var exitfunction = false;

  switch (action) {
    case "user-register":
      wsMethod = "PUT";
      wsEndpoint = "/user-service/v1/users";
      break;
    case "user-login":
      wsMethod = "POST";
      wsEndpoint = "/user-service/v1/users";
      break;
    case "user-profile":
      wsMethod = "GET";
      wsEndpoint = "/user-service/v1/users/" + getCookie("userId");
      break;
    case "user-patch":
      wsMethod = "PATCH";
      wsEndpoint = "/user-service/v1/users/" + getCookie("userId");
      break;
    case "order-create":
      wsMethod = "PUT";
      wsEndpoint = "/order-service/v1/orders";
      break;
    case "order-get":
      wsMethod = "GET";
      wsEndpoint = "/order-service/v1/orders";
      break;
    default:
      exitfunction = true;
      break;
  }

  if (!exitfunction) {
    var json = JSON.stringify(data);
    var xhr = new XMLHttpRequest();

    xhr.open(wsMethod, wsUrl + wsEndpoint, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
    xhr.setRequestHeader("X-Session-Token", getCookie("sessionToken"));
    xhr.onload = function() {
      if (xhr.readyState !== 4 || xhr.status >= 400) {
        console.log("Error in request!");
        return false;
      }
      console.log("Successful request!");

      var parsedResponse = undefined;
      if (xhr.response && xhr.response.length > 0) {
        parsedResponse = JSON.parse(xhr.response);
      }
      handleSuccessResponse(parsedResponse);
    };
    xhr.send(json);
  }
}

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function deleteCookie(cname) {
  document.cookie = cname + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
