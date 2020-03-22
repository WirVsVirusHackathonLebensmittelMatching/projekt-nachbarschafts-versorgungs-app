function doWSRequest(action, data = {} ) {
	
	var wsMethod = "POST";
	var wsUrl = "http://localhost:8080";
	var wsEndpoint = "";
	var wsResponse = "";
	var exitfunction = false;
	
	switch(action) {
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
		default:
			exitfunction = true;
			break;
	}
	
	if(!exitfunction) {
		var json = JSON.stringify(data);
		var xhr = new XMLHttpRequest();
		var requestSuccessful = false;
		
		xhr.open(wsMethod, wsUrl + wsEndpoint, true);
		xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
		xhr.onload = function () {
			if (xhr.readyState == 4 && xhr.status < 400) {
				response = JSON.parse(xhr.response);
				requestSuccessful = true;
				console.log("Success!");
				return true;
			} else {
				console.log("Error!");
				return false;
			}
		}
		xhr.send(json);
		
		if(requestSuccessful) {
			switch(action) {
				case "user-register":
					document.cookie = "userId="+response.userId;
					break;
				case "user-login":
					document.cookie = "userId="+response.userId;
					document.cookie = "sessionToken="+response.sessionToken;
					break;
				case "user-profile":
					return xhr.response;
					break;
				default:
					exitfunction = true;
					break;
			}
		}
	}
};