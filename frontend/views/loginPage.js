
sap.ui.require([
  "sap/m/Button",
  "sap/m/Input",
  "sap/m/VBox",
  "sap/m/HBox",
  "sap/m/library",
  "sap/m/Page",
  "sap/m/MessageToast",
  "sap/ui/core/Icon"
], function (Button, Input, VBox, HBox, library, Page, MessageToast, Icon) {

  var handleRegisterPress = function () {
    var oVornameInput = sap.ui.getCore().byId("vornameInput"),
      oNachnameInput = sap.ui.getCore().byId("nachnameInput"),
      oEmailInput = sap.ui.getCore().byId("emailInput"),
      oPasswordInput = sap.ui.getCore().byId("passwordInput"),
      oPasswordConfirmInput = sap.ui.getCore().byId("passwordConfirmInput");

    if (!oVornameInput.getVisible()) {
      oVornameInput.setVisible(true);
      oNachnameInput.setVisible(true);
      oPasswordConfirmInput.setVisible(true);
	  oPlzInput.setVisible(true);
    } else {
      var bValid = true;

      if (oVornameInput.getValue().length < 3) {
        bValid = false;
        oVornameInput.setValueState("Error");
        oVornameInput.setValueStateText("Bitte gebe Sie Ihren Vornamen ein.");
      } else {
        oVornameInput.setValueState("None");
      }

      if (oNachnameInput.getValue().length < 3) {
        bValid = false;
        oNachnameInput.setValueState("Error");
        oNachnameInput.setValueStateText("Bitte gebe Sie Ihren Nachnamen ein.");
      } else {
        oNachnameInput.setValueState("None");
      }

      if (oEmailInput.getValue().length < 3) {
        bValid = false;
        oEmailInput.setValueState("Error");
        oEmailInput.setValueStateText("Bitte gebe Sie Ihre Email Adresse ein.");
      } else {
        oEmailInput.setValueState("None");
      }

      if (oPlzInput.getValue().length != 5 && oPlzInput.getValue().isInteger != true) {
        bValid = false;
        oPlzInput.setValueState("Error");
        oPlzInput.setValueStateText("Bitte geben eine gültige Postleitzahl ein.");
      } else {
        oPlzInput.setValueState("None");
      }

      if (oPasswordInput.getValue().length < 6) {
        bValid = false;
        oPasswordInput.setValueState("Error");
        oPasswordInput.setValueStateText("Bitte gebe eine Passwort ein welches länger als 6 Zeichen ist!");
      } else {
        oPasswordInput.setValueState("None");
      }

      if (oPasswordConfirmInput.getValue() !== oPasswordInput.getValue()) {
        bValid = false;
        oPasswordConfirmInput.setValueState("Error");
        oPasswordConfirmInput.setValueStateText("Die Passwörter müssen übereinstimmen!");
      } else {
        oPasswordInput.setValueState("None");
      }

      if (bValid) {
		var url = "http://localhost:8080/user-service/v1/users";

		var data = {};
		data.firstName = oVornameInput.getValue();
		data.lastName  = oNachnameInput.getValue();
		data.password = oPasswordInput.getValue();
		data.mailAddress  = oEmailInput.getValue();
		var json = JSON.stringify(data);

		var xhr = new XMLHttpRequest();
		xhr.open("PUT", url, true);
		xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
		xhr.onload = function () {
			var users = JSON.parse(xhr.responseText);
			if (xhr.readyState == 4 && xhr.status == "200") {
				console.log("Success!");
			} else {
				console.log("Error!");
			}
		}
		xhr.send(json);
		  
        MessageToast.show("Registrierungsmail wurde verschickt!");
        oVornameInput.setVisible(false);
        oNachnameInput.setVisible(false);
        oPasswordConfirmInput.setVisible(false);
		oPlzInput.setVisible(false);
      }
    }
  };

  var handleLoginPress = function () {
    var oEmailInput = sap.ui.getCore().byId("emailInput"),
      oPasswordInput = sap.ui.getCore().byId("passwordInput"),
      bValid = true;

      if (oEmailInput.getValue().length < 3) {
        bValid = false;
        oEmailInput.setValueState("Error");
        oEmailInput.setValueStateText("Bitte gebe eine Email Adresse ein.");
      } else {
        oEmailInput.setValueState("None");
      }

      if (oPasswordInput.getValue().length < 6) {
        bValid = false;
        oPasswordInput.setValueState("Error");
        oPasswordInput.setValueStateText("Bitte gebe eine Password ein welches länger als 6 Zeichen ist!");
      } else {
        oPasswordInput.setValueState("None");
      }

		var url = "http://localhost:8080/user-service/v1/users";

		var data = {};
		data.firstName = oVornameInput.getValue();
		data.lastName  = oNachnameInput.getValue();
		data.password = oPasswordInput.getValue();
		data.mailAddress  = oEmailInput.getValue();
		var json = JSON.stringify(data);

		var xhr = new XMLHttpRequest();
		xhr.open("POST", url, true);
		xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
		xhr.onload = function () {
			var users = JSON.parse(xhr.responseText);
			if (xhr.readyState == 4 && xhr.status == "200") {
				if (bValid && true) {
					console.log("Redirect with Login success");
					window.location.hash = "#Menue";
				}
			} else {
				if (bValid && true) {
					console.log("Redirect with Login failure");
					window.location.hash = "#Menue";
				}
			}
		}
		xhr.send(json);
  }

  var oIcon = new Icon({
    src: "sap-icon://retail-store",
    size: "3rem"
  }).addStyleClass("sapUiLargeMarginTopBottom");

  var oVornameInput = new Input({
    id: "vornameInput",
    maxLength: 30,
    placeholder: "Vorname",
    visible: false,
    width: "18rem"
  });

  var oNachnameInput = new Input({
    id: "nachnameInput",
    maxLength: 30,
    placeholder: "Nachname",
    visible: false,
    width: "18rem"
  });

  var oEmailInput = new Input({
    id: "emailInput",
    maxLength: 30,
    placeholder: "E-mail",
    type: library.InputType.Email,
    width: "18rem"
  });
  
  var oPlzInput = new Input({
    id: "plzInput",
    maxLength: 5,
    placeholder: "Postleitzahl",
    visible: false,
    width: "18rem"
  });

  var oPasswordInput = new Input({
    id: "passwordInput",
    maxLength: 30,
    placeholder: "Passwort",
    type: "Password",
    width: "18rem"
  });

  var oPasswordConfirmInput = new Input({
    id: "passwordConfirmInput",
    maxLength: 30,
    placeholder: "Passwort wiederholen",
    type: "Password",
    visible: false,
    width: "18rem"
  });

  var oLoginButton = new Button({
    id: "loginButton",
    text: "Anmelden",
    type: "Emphasized",
    press: handleLoginPress
  });

  var oRegistrationButton = new Button({
    id: "registerButton",
    text: "Registieren",
    press: handleRegisterPress
  });

  return new Page({
    id: "loginPage",
    title: "Anmeldung",
    titleAlignment: "Center",
    content: [
      new VBox({
        justifyContent: "Center",
        alignItems: "Center",
        items: [
          oIcon,
          oVornameInput,
          oNachnameInput,
          oEmailInput,
		  oPlzInput,
          oPasswordInput,
          oPasswordConfirmInput,
          new HBox({
            justifyContent: "SpaceBetween",
            items: [
              oLoginButton,
              oRegistrationButton
            ],
            width: "18rem"
          })
        ]
      })
    ]
  });
});
