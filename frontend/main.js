sap.ui.getCore().attachInit(function () {
  sap.ui.require([
    "sap/m/Button",
    "sap/m/Dialog",
    "sap/m/Input",
    "sap/m/Label",
    "sap/m/VBox",
    "sap/m/library",
    "sap/ui/layout/form/SimpleForm",
  ], function (Button, Dialog, Input, Label, VBox, library, SimpleForm) {


    var oVornameInput = new Input({
      required: true
    });

    var oNachnameInput = new Input({
      required: true
    });

    var oDialog = new Dialog({
      title: "Registierung",
      content: [
        new Label({
          text: "Vorname:",
          labelFor: oVornameInput
        }),
        oVornameInput,
        new Label({
          text: "Nachname:",
          labelFor: oNachnameInput
        }),
        oNachnameInput,
        new Label({
          text: "Email:"
        }),
        new Input()
      ],
      beginButton: [
        new Button({
          text: "Registieren",
          type: "Emphasized",
          press: function () {
            oDialog.close();
          }
        })
      ],
      endButton: [
        new Button({
          text: "Schließen",
          press: function () {
            oDialog.close();
          }
        }),
      ]
    });

    var oRegistrationButton = new Button({
      text: "Registieren",
      press: function () {
        oDialog.open();
      }
    });

    var oLoginButton = new Button({
      text: "Login",
      type: "Accept",
    });

    var oEmailLoginInput = new Input({ required: true, type: library.InputType.Email });
    var oEmailLoginLabel = new Label({
      text: "Email:",
      labelFor: oEmailLoginInput
    });
    var oPasswordLoginInput = new Input({ required: true, type: "Password" });
    var oPasswordLoginLabel = new Label({
      text: "Password:",
      labelFor: oPasswordLoginInput
    });

    var oForm = new SimpleForm({
      layout: "ColumnLayout",
      columnsXL: 2,
      emptySpanXL:0,
      content:
        [
          oEmailLoginLabel,
          oEmailLoginInput,
          oPasswordLoginLabel,
          oPasswordLoginInput,
          oLoginButton,
          oRegistrationButton
        ],
    });

    oForm.placeAt("content");

  });
});
