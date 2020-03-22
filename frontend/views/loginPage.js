sap.ui.require([
  "sap/m/Button",
  "sap/m/Input",
  "sap/m/VBox",
  "sap/m/HBox",
  "sap/m/library",
  "sap/m/Page",
  "sap/m/MessageToast",
  "sap/m/Image",
  "sap/m/Dialog",
  "sap/m/MessageStrip"
], function (Button, Input, VBox, HBox, library, Page, MessageToast, Image, Dialog, MessageStrip) {

  oGlobalEventBus.subscribeOnce("create-loginPage", function () {
    // - Controller -

    var handleRegisterPress = function () {
      var oDialog = sap.ui.getCore().byId("registerDialog");

      if (oDialog) {
        oDialog.open();
      } else {
        oDialog = new Dialog({
          id: "registerDialog",
          title: "Registrieren",
          titleAlignment: "Center",
          content: [
            new Input({
              id: "vornameInput",
              maxLength: 30,
              placeholder: "Vorname"
            }),
            new Input({
              id: "nachnameInput",
              maxLength: 30,
              placeholder: "Nachname"
            }),
            new Input({
              id: "emailRegisterInput",
              value: sap.ui.getCore().byId("emailInput").getValue(),
              maxLength: 50,
              placeholder: "E-mail",
              type: library.InputType.Email
            }),
            new Input({
              id: "passwordRegisterInput",
              maxLength: 30,
              value: sap.ui.getCore().byId("passwordInput").getValue(),
              placeholder: "Passwort",
              type: "Password"
            }),
            new Input({
              id: "passwordConfirmInput",
              maxLength: 30,
              placeholder: "Passwort wiederholen",
              type: "Password"
            })
          ],
          beginButton: new Button({
            text: "Registrieren",
            press: function () {
              var oVornameInput = sap.ui.getCore().byId("vornameInput"),
                oNachnameInput = sap.ui.getCore().byId("nachnameInput"),
                oEmailInput = sap.ui.getCore().byId("emailRegisterInput"),
                oPasswordInput = sap.ui.getCore().byId("passwordRegisterInput"),
                oPasswordConfirmInput = sap.ui.getCore().byId("passwordConfirmInput"),
                bValid = true;

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

              if (!isEmail(oEmailInput.getValue())) {
                bValid = false;
                oEmailInput.setValueState("Error");
                oEmailInput.setValueStateText("Bitte gebe eine gültige Email Adresse ein.");
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

              if (oPasswordConfirmInput.getValue().length < 6 || oPasswordConfirmInput.getValue() !== oPasswordInput.getValue()) {
                bValid = false;
                oPasswordConfirmInput.setValueState("Error");
                oPasswordConfirmInput.setValueStateText("Die Passwörter müssen übereinstimmen!");
              } else {
                oPasswordConfirmInput.setValueState("None");
              }

              if (bValid) {

                const registerSuccessHandler = function (response) {
                  setCookie("userId", response.userId);
                  MessageToast.show("Registrierungsmail wurde verschickt!");
                  oDialog.close();
                };

                doWSRequest("user-register", {
                  firstName: oVornameInput.getValue(),
                  lastName: oNachnameInput.getValue(),
                  password: oPasswordInput.getValue(),
                  mailAddress: oEmailInput.getValue()
                }, registerSuccessHandler);
              }
            }
          }),
          endButton: new Button({
            text: "Abbrechen",
            press: function () {
              oDialog.close();
            }
          })
        });

        oDialog.open();
      }
    };

    var handleLoginPress = function () {
      var oEmailInput = sap.ui.getCore().byId("emailInput"),
        oPasswordInput = sap.ui.getCore().byId("passwordInput"),
        bValid = true;

      if (!isEmail(oEmailInput.getValue())) {
        bValid = false;
        oEmailInput.setValueState("Error");
        oEmailInput.setValueStateText("Bitte gebe eine gültige Email Adresse ein.");
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
        const loginSuccessHandler = function (response) {
          setCookie("userId", response.userId);
          setCookie("sessionToken", response.sessionToken);
          window.location.hash = "#Menue";
        };

        doWSRequest("user-login", {
          password: oPasswordInput.getValue(),
          mailAddress: oEmailInput.getValue()
        }, loginSuccessHandler);
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
            }).addStyleClass("sapUiMediumMarginTopBottom"),
            new Input({
              id: "emailInput",
              maxLength: 30,
              placeholder: "E-mail",
              type: library.InputType.Email,
              width: "18rem"
            }),
            new Input({
              id: "passwordInput",
              maxLength: 30,
              placeholder: "Passwort",
              type: "Password",
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
                  text: "Registrieren",
                  press: handleRegisterPress
                })
              ],
              width: "18rem"
            }),
            new MessageStrip({
              type: "Warning",
              showIcon: true,
              text: "Hinweis: Diese App ist zur Zeit noch in der Entwicklung. Falls Sie einen Änderungswunsch haben oder einen Fehler finden. Können sie uns unter folgender E-Mail erreichen: support@homepick.de"
            }).addStyleClass("sapUiSmallMarginTop sapUiSmallMarginBeginEnd")
          ]
        })
      ]
    });
  });
});
