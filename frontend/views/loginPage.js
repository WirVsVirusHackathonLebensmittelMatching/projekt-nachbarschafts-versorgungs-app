sap.ui.require([
  "sap/m/Button",
  "sap/m/Input",
  "sap/m/VBox",
  "sap/m/HBox",
  "sap/m/library",
  "sap/m/Page",
  "sap/m/MessageToast",
  "sap/m/Image"
], function (Button, Input, VBox, HBox, library, Page, MessageToast, Image) {

  oGlobalEventBus.subscribeOnce("create-loginPage", function () {
    // - Controller -

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
          var data = {};

          data.firstName = oVornameInput.getValue();
          data.lastName = oNachnameInput.getValue();
          data.password = oPasswordInput.getValue();
          data.mailAddress = oEmailInput.getValue();

          const registerSuccessHandler = function (response) {
            setCookie("userId", response.userId);
            MessageToast.show("Registrierungsmail wurde verschickt!");
            oVornameInput.setVisible(false);
            oNachnameInput.setVisible(false);
            oPasswordConfirmInput.setVisible(false);
          };

          doWSRequest("user-register", data, registerSuccessHandler);
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

      if (bValid) {
		    var data = {};
        data.password = oPasswordInput.getValue();
        data.mailAddress = oEmailInput.getValue();

        const loginSuccessHandler = function (response) {
          setCookie("userId", response.userId);
          setCookie("sessionToken", response.sessionToken);
        };

        doWSRequest("user-login", data, loginSuccessHandler);

        // Only for development. But this line into the loginSuccessHandler
        window.location.hash = "#Menue";

      }
    };

    // - View -

    return new Page({
      id: "loginPage",
      title: "Anmeldung",
      titleAlignment: "Center",
      content: [
        new VBox({
          justifyContent: "Center",
          alignItems: "Center",
          items: [
            new Image({
              src: "./images/HOMEPICK.png",
              width: "10rem"
            }).addStyleClass("sapUiLargeMarginTopBottom"),
            new Input({
              id: "vornameInput",
              maxLength: 30,
              placeholder: "Vorname",
              visible: false,
              width: "18rem"
            }),
            new Input({
              id: "nachnameInput",
              maxLength: 30,
              placeholder: "Nachname",
              visible: false,
              width: "18rem"
            }),
            new Input({
              id: "emailInput",
              maxLength: 30,
              placeholder: "E-mail",
              type: library.InputType.Email,
              width: "18rem"
            }),
            new Input({
              id: "plzInput",
              maxLength: 5,
              placeholder: "Postleitzahl",
              visible: false,
              width: "18rem"
            }),
            new Input({
              id: "passwordInput",
              maxLength: 30,
              placeholder: "Passwort",
              type: "Password",
              width: "18rem"
            }),
            new Input({
              id: "passwordConfirmInput",
              maxLength: 30,
              placeholder: "Passwort wiederholen",
              type: "Password",
              visible: false,
              width: "18rem"
            }),
            new HBox({
              justifyContent: "SpaceBetween",
              items: [
                new Button({
                  id: "loginButton",
                  text: "Anmelden",
                  type: "Emphasized",
                  press: handleLoginPress
                }),
                new Button({
                  id: "registerButton",
                  text: "Registieren",
                  press: handleRegisterPress
                })
              ],
              width: "18rem"
            })
          ]
        })
      ]
    });
  });
});
