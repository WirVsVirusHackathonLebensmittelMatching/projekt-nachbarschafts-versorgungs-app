function doWSRequest(action, data = {}, handleResponse = () => {
}) {

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
      wsEndpoint = "/user-service/v1/users";
      break;
    case "order-create":
      wsMethod = "PUT";
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
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.onload = function () {
      if (xhr.readyState !== 4 || xhr.status >= 400) {
        console.log("Error in request!");
        return false;
      }

      var parsedResponse = JSON.parse(xhr.response);
      console.log("Successful request!");

      switch (action) {
        case "user-register":
          setCookie("userId", parsedResponse.userId);
          return true;
        case "user-login":
          setCookie("userId", parsedResponse.userId);
          setCookie("sessionToken", parsedResponse.sessionToken);
          return true;
        default:
          handleResponse(parsedResponse);
          break;
      }
    };
    xhr.send(json);

  }
}

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
