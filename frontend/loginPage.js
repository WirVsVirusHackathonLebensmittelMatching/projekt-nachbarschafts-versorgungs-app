
sap.ui.require([
  "sap/m/Button",
  "sap/m/Input",
  "sap/m/VBox",
  "sap/m/HBox",
  "sap/m/library",
  "sap/m/Page",
  "sap/m/MessageToast",
], function (Button, Input, VBox, HBox, library, Page, MessageToast,) {

  var handleRegisterPress = function () {
    var oVornameInput = sap.ui.getCore().byId("vornameInput"),
      oNachnameInput = sap.ui.getCore().byId("nachnameInput"),
      oEmailInput = sap.ui.getCore().byId("emailInput"),
      oPasswordInput = sap.ui.getCore().byId("passwordInput"),
      oPasswordConfrimInput = sap.ui.getCore().byId("passwordConfirmInput");

    if (!oVornameInput.getVisible()) {
      oVornameInput.setVisible(true);
      oNachnameInput.setVisible(true);
      oPasswordConfrimInput.setVisible(true);
    } else {
      var bValid = true;

      if (oVornameInput.getValue().length < 3) {
        bValid = false;
        oVornameInput.setValueState("Error");
        oVornameInput.setValueStateText("Bitte gebe einen Vornamen ein.");
      } else {
        oVornameInput.setValueState("None");
      }

      if (oNachnameInput.getValue().length < 3) {
        bValid = false;
        oNachnameInput.setValueState("Error");
        oNachnameInput.setValueStateText("Bitte gebe einen Nachnamen ein.");
      } else {
        oNachnameInput.setValueState("None");
      }

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

      if (oPasswordConfrimInput.getValue() !== oPasswordInput.getValue()) {
        bValid = false;
        oPasswordConfrimInput.setValueState("Error");
        oPasswordConfrimInput.setValueStateText("Passwörter stimmen nicht überein!");
      } else {
        oPasswordInput.setValueState("None");
      }

      if (bValid) {
        MessageToast.show("RegistierungsMail wurde verschickt!");
        oVornameInput.setVisible(false);
        oNachnameInput.setVisible(false);
        oPasswordConfrimInput.setVisible(false);
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

      if (bValid && true) { // ask backend
        sap.ui.getCore().byId("app").to("overviewPage");
      }
  }

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
    content: [
      new VBox({
        justifyContent: "Center",
        alignItems: "Center",
        items: [
          oVornameInput,
          oNachnameInput,
          oEmailInput,
          oPasswordInput,
          oPasswordConfirmInput,
          new HBox({
            // alignContent: "SpaceBetween",
            // alignItems: "Stretch",
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
