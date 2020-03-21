sap.ui.require([
  "sap/m/Page",
  "sap/m/Button",
  "sap/m/VBox",
], function (Page, Button, VBox) {

  const createMenuButton = function ({ id, text, press, icon }) {
    return new Button({
      id: id,
      text: text,
      icon: icon,
      width: "18rem",
      press: press
    }).addStyleClass("sapUiSmallMarginTop");
  };

  const handleCreateShoppingListPress = function () {
    window.location.hash = "#ListeErstellen";
  };

  const handleClickShoppingListsButton = function () {
    window.location.hash = "#EinkaufslistenUebersicht";
  };

  const handleClickMyShoppingListsButton = function () {
    window.location.hash = "#EinkaufslistenEigene";
  };

  const handleClickEducationButton = function () {
    window.location.hash = "#Selbstschutz";
  };

  const handleClickSettingsButton = function () {
    window.location.hash = "#Einstellungen";
  };

  const handleClickLogoutButton = function () {
    window.location.hash = "";
  };

  const createShoppingListButton = createMenuButton({
    id: "createShoppingListButton",
    text: "Eine neue Einkaufliste erstellen",
    icon: "sap-icon://add-activity-2",
    press: handleCreateShoppingListPress
  });

  const viewShoppingListsButton = createMenuButton({
    id: "viewShoppingListsButton",
    text: "Offene Einkaufslisten anzeigen",
    icon: "sap-icon://show-edit",
    press: handleClickShoppingListsButton
  });

  const viewMyShoppingListsButton = createMenuButton({
    id: "viewMyShoppingListsButton",
    text: "Meine Einkaufslisten anzeigen",
    icon: "sap-icon://activity-individual",
    press: handleClickMyShoppingListsButton
  });

  const viewEducationButton = createMenuButton({
    id: "viewEducationButton",
    text: "Informationen zum Selbstschutz",
    icon: "sap-icon://warning2",
    press: handleClickEducationButton
  });

  const viewSettingsButton = createMenuButton({
    id: "viewSettingsButton",
    text: "Einstellungen",
    icon: "sap-icon://user-edit",
    press: handleClickSettingsButton
  });

  const viewLogoutButton = createMenuButton({
    id: "viewLogoutButton",
    text: "Abmelden",
    icon: "sap-icon://log",
    press: handleClickLogoutButton
  });

  return new Page({
    id: "mainMenuPage",
    title: "Übersichtsmenü",
    titleAlignment: "Center",
    content: [
      new VBox({
        justifyContent: "Center",
        alignItems: "Center",
        items: [
          createShoppingListButton,
          viewShoppingListsButton,
          viewMyShoppingListsButton,
          viewEducationButton,
          viewSettingsButton,
          viewLogoutButton
        ]
      })
    ]
  });
});
