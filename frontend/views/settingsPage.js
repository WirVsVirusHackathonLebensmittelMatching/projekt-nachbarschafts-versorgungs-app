sap.ui.require([
  "sap/m/Button",
  "sap/m/RadioButton",
  "sap/m/Input",
  "sap/m/VBox",
  "sap/m/HBox",
  "sap/m/library",
  "sap/m/Page",
  "sap/m/MessageToast",
], function (Button, RadioButton, Input, VBox, HBox, library, Page, MessageToast) {

  oGlobalEventBus.subscribeOnce("create-settingsPage", function () {
    var handleProfileEditPress = function () {
      var oVornameEditInput = sap.ui.getCore().byId("vornameEditInput"),
        oNachnameEditInput = sap.ui.getCore().byId("nachnameEditInput"),
        oEmailEditInput = sap.ui.getCore().byId("emailEditInput"),
        oPasswordEditInput = sap.ui.getCore().byId("passwordEditInput"),
        oStreetEditInput = sap.ui.getCore().byId("streetEditInput"),
        oPasswordConfirmEditInput = sap.ui.getCore().byId("passwordConfirmEditInput");

      if (!oVornameEditInput.getVisible()) {
        oVornameEditInput.setVisible(true);
        oNachnameEditInput.setVisible(true);
        oPasswordConfirmEditInput.setVisible(true);
      } else {
        var bValidEdit = true;

        if (oVornameEditInput.getValue().length < 3) {
          bValidEdit = false;
          oVornameEditInput.setValueState("Error");
          oVornameEditInput.setValueStateText("Bitte gebe Sie Ihren Vornamen ein.");
        } else {
          oVornameEditInput.setValueState("None");
        }

        if (oNachnameEditInput.getValue().length < 3) {
          bValidEdit = false;
          oNachnameEditInput.setValueState("Error");
          oNachnameEditInput.setValueStateText("Bitte gebe Sie Ihren Nachnamen ein.");
        } else {
          oNachnameEditInput.setValueState("None");
        }

        if (oEmailEditInput.getValue().length < 3) {
          bValidEdit = false;
          oEmailEditInput.setValueState("Error");
          oEmailEditInput.setValueStateText("Bitte geben Sie Ihre Email Adresse ein.");
        } else {
          oEmailEditInput.setValueState("None");
        }

        if (oPlzEditInput.getValue().length < 4 || isNaN(parseInt(oPlzEditInput.getValue(), 10))) {
          bValidEdit = false;
          oPlzEditInput.setValueState("Error");
          oPlzEditInput.setValueStateText("Bitte geben eine gültige Postleitzahl ein.");
        } else {
          oPlzEditInput.setValueState("None");
        }

        if (oPasswordEditInput.getValue().length < 6) {
          bValidEdit = false;
          oPasswordEditInput.setValueState("Error");
          oPasswordEditInput.setValueStateText("Bitte gebe eine Passwort ein welches länger als 6 Zeichen ist!");
        } else {
          oPasswordEditInput.setValueState("None");
        }

        if (oPasswordConfirmEditInput.getValue() !== oPasswordEditInput.getValue()) {
          bValidEdit = false;
          oPasswordConfirmEditInput.setValueState("Error");
          oPasswordConfirmEditInput.setValueStateText("Die Passwörter müssen übereinstimmen!");
        } else {
          oPasswordEditInput.setValueState("None");
        }

        if (bValidEdit) {
          MessageToast.show("Profil erfolgreich gespeichert!");
          window.plz = oPlzEditInput.getValue();
          window.street = oStreetEditInput.getValue();
          window.history.back();
        }
      }
    };

    var oVornameEditInput = new Input({
      id: "vornameEditInput",
      maxLength: 30,
      placeholder: "Vorname",
      width: "18rem"
    });

    var oNachnameEditInput = new Input({
      id: "nachnameEditInput",
      maxLength: 30,
      placeholder: "Nachname",
      width: "18rem"
    });

    var oEmailEditInput = new Input({
      id: "emailEditInput",
      maxLength: 30,
      placeholder: "E-mail",
      type: library.InputType.Email,
      width: "18rem"
    });

    var oPlzEditInput = new Input({
      id: "plzEditInput",
      maxLength: 5,
      placeholder: "Postleitzahl",
      width: "18rem"
    });

    var oStreetEditInput = new Input({
      id: "streetEditInput",
      maxLength: 30,
      placeholder: "Straße",
      width: "18rem"
    });

    var oPasswordEditInput = new Input({
      id: "passwordEditInput",
      maxLength: 30,
      placeholder: "Passwort",
      type: "Password",
      width: "18rem"
    });

    var opasswordConfirmEditInput = new Input({
      id: "passwordConfirmEditInput",
      maxLength: 30,
      placeholder: "Passwort wiederholen",
      type: "Password",
      width: "18rem"
    });

    var oSellerEditInput = new RadioButton({
    id: "sellerEditInput",
    text: "Lieferant",
    groupName: "buyerSellerRadioButton",
      width: "9rem"
    });

    var oBuyerEditInput = new RadioButton({
    id: "buyerEditInput",
    text: "Besteller",
    groupName: "buyerSellerRadioButton",
      width: "9rem"
    });

    var oEditButton = new Button({
      id: "editProfileButton",
      text: "Speichern",
      type: "Emphasized",
      press: handleProfileEditPress
    });

    return new Page({
      id: "settingsPage",
      title: "Einstellungen",
      showNavButton: true,
      navButtonPress: function () {
        window.history.back();
      },
      titleAlignment: "Center",
      content: [
        new VBox({
          justifyContent: "Start",
          alignItems: "Center",
          items: [
            oVornameEditInput,
            oNachnameEditInput,
            oEmailEditInput,
            oPlzEditInput,
            oStreetEditInput,
            oPasswordEditInput,
            opasswordConfirmEditInput,
            // oSellerEditInput,
            // oBuyerEditInput,
            oEditButton
          ]
        }).addStyleClass("sapUiMediumMarginTop")
      ]
    });
	
	var responeJSON = JSON.parse(doWSRequest("user-profile"));

  });
});
