function doWSRequest(action, data = {}) {
  var wsMethod = "POST";
  var wsUrl = "http://localhost:8080";
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
      if (xhr.readyState === 4 && xhr.status < 400) {
        console.log("Success!");
      } else {
        console.log("Error!");
      }
    };
    xhr.send(json);
  }
}
