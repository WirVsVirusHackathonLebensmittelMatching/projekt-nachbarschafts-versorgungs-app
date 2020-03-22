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
        oPlzEditInput = sap.ui.getCore().byId("plzEditInput"),
        oPasswordConfirmEditInput = sap.ui.getCore().byId("passwordConfirmEditInput");

      var bValidEdit = true;
      var requestBody = {};

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

      if (!isEmail(oEmailInput.getValue())) {
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

      if (oPasswordEditInput.getValue().length === 0 && oPasswordConfirmEditInput.getValue().length === 0) {
        oPasswordEditInput.setValueState("None");
        oPasswordConfirmEditInput.setValueState("None");
        requestBody = {
          firstName: oVornameEditInput.getValue(),
          lastName: oNachnameEditInput.getValue(),
          address: {
            street: oStreetEditInput.getValue(),
            postalCode: oPlzEditInput.getValue()
          },
          sessionToken: getCookie("sessionToken")
        };
      } else {
          requestBody = {
          password: oPasswordEditInput.getValue(),
          firstName: oVornameEditInput.getValue(),
          lastName: oNachnameEditInput.getValue(),
          address: {
            street: oStreetEditInput.getValue(),
            postalCode: oPlzEditInput.getValue()
          },
          sessionToken: getCookie("sessionToken")
        };
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
          oPasswordConfirmEditInput.setValueState("None");
        }
      }

      if (bValidEdit) {
        doWSRequest("user-patch", requestBody, function () {
          MessageToast.show("Profil erfolgreich gespeichert!");
          window.plz = oPlzEditInput.getValue();
          window.street = oStreetEditInput.getValue();
          window.history.back();
        });
      }
    };

    function createForm(data) {
      var address = data.address;
      var postalCode;
      var street;
      if (address) {
        postalCode = address.postalCode;
        street = address.street;
      }
      var oVornameEditInput = new Input({
        id: "vornameEditInput",
        maxLength: 30,
        placeholder: "Vorname",
        width: "18rem",
        value: data.firstName
      });

      var oNachnameEditInput = new Input({
        id: "nachnameEditInput",
        maxLength: 30,
        placeholder: "Nachname",
        width: "18rem",
        value: data.lastName
      });

      var oEmailEditInput = new Input({
        id: "emailEditInput",
        maxLength: 30,
        placeholder: "E-mail",
        type: library.InputType.Email,
        width: "18rem",
        value: data.mailAddress
      });

      var oPlzEditInput = new Input({
        id: "plzEditInput",
        maxLength: 5,
        placeholder: "Postleitzahl",
        width: "18rem",
        value: postalCode
      });

      var oStreetEditInput = new Input({
        id: "streetEditInput",
        maxLength: 30,
        placeholder: "Straße",
        width: "18rem",
        value: street
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

      return new VBox({
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
      }).addStyleClass("sapUiMediumMarginTop");
    }

    var container = new VBox({});

    doWSRequest("user-profile", undefined, function (data) {
      console.log(data);
      var form = createForm(data);
      container.addItem(form);
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
        container
      ]
    });
  });
});
