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
          document.cookie = "userId=" + parsedResponse.userId;
          break;
        case "user-login":
          document.cookie = "userId=" + parsedResponse.userId;
          document.cookie = "sessionToken=" + parsedResponse.sessionToken;
          break;
        default:
          handleResponse(parsedResponse);
          break;
      }
    };
    xhr.send(json);

  }
}
