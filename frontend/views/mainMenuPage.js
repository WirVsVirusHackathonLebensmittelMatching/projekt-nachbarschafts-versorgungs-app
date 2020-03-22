

sap.ui.require([
  "sap/m/Page",
  "sap/m/Button",
  "sap/m/VBox",
  "sap/m/MessageStrip"
], function (Page, Button, VBox, MessageStrip) {
  oGlobalEventBus.subscribeOnce("create-mainMenuPage", function () {
    // - Controller -

    var handleCreateShoppingListPress = function () {
      window.location.hash = "#ListeErstellen";
    };

    var handleClickShoppingListsButton = function () {
      window.location.hash = "#EinkaufslistenUebersicht";
    };

    var handleClickMyShoppingListsButton = function () {
      window.location.hash = "#EinkaufslistenEigene";
    };

    var handleClickEducationButton = function () {
      window.location.hash = "#Selbstschutz";
    };

    var handleClickSettingsButton = function () {
      window.location.hash = "#Einstellungen";
    };

    var handleClickLogoutButton = function () {
      window.location.hash = "";
    };

    // - View -

    return new Page({
      id: "mainMenuPage",
      title: "Übersichtsmenü",
      titleAlignment: "Center",
      content: [
        new MessageStrip({
          visible: {
            parts: [
              "/plz",
              "/street"
            ],
            formatter: function (sPLZ, sStreet) {
              return !sPLZ.length || !sStreet.length;
            }
          },
          type: "Warning",
          showIcon: true,
          text: "Hinweis: Um alle Funktionen zu benutzen wird eine Postleitzahl benötigt. Diese kann in den Einstellungen eingetragen werden."
        }).addStyleClass("sapUiTinyMarginTopBottom sapUiSmallMarginBeginEnd"),
        new VBox({
          justifyContent: "Center",
          alignItems: "Center",
          items: [
            new Button({
              id: "createShoppingListButton",
              text: "Eine neue Einkaufliste erstellen",
              icon: "sap-icon://add-activity-2",
              width: "18rem",
              enabled: {
                parts: [
                  "/plz",
                  "/street"
                ],
                formatter: function (sPLZ, sStreet) {
                  return !!sPLZ.length && !!sStreet.length;
                }
              },
              press: handleCreateShoppingListPress
            }).addStyleClass("sapUiTinyMarginTop"),
            new Button({
              id: "viewShoppingListsButton",
              text: "Offene Einkaufslisten anzeigen",
              icon: "sap-icon://show-edit",
              width: "18rem",
              enabled: {
                parts: [
                  "/plz",
                  "/street"
                ],
                formatter: function (sPLZ, sStreet) {
                  return !!sPLZ.length && !!sStreet.length;
                }
              },
              press: handleClickShoppingListsButton
            }).addStyleClass("sapUiSmallMarginTop"),
            new Button({
              id: "viewMyShoppingListsButton",
              text: "Meine Einkaufslisten anzeigen",
              icon: "sap-icon://activity-individual",
              width: "18rem",
              enabled: {
                parts: [
                  "/plz",
                  "/street"
                ],
                formatter: function (sPLZ, sStreet) {
                  return !!sPLZ.length && !!sStreet.length;
                }
              },
              press: handleClickMyShoppingListsButton
            }).addStyleClass("sapUiSmallMarginTop"),
            new Button({
              id: "viewEducationButton",
              text: "Informationen zum Selbstschutz",
              icon: "sap-icon://warning2",
              width: "18rem",
              press: handleClickEducationButton
            }).addStyleClass("sapUiSmallMarginTop"),
            new Button({
              id: "viewSettingsButton",
              text: "Einstellungen",
              icon: "sap-icon://user-edit",
              width: "18rem",
              press: handleClickSettingsButton
            }).addStyleClass("sapUiSmallMarginTop"),
            new Button({
              id: "viewLogoutButton",
              text: "Abmelden",
              icon: "sap-icon://log",
              width: "18rem",
              press: handleClickLogoutButton
            }).addStyleClass("sapUiSmallMarginTop")
          ]
        })
      ]
    });
  });
});
