sap.ui.require([
  "sap/m/Page",
  "sap/m/Button",
  "sap/m/VBox",
], function (Page, Button, VBox) {

  const createMenuButton = function ({ id, text, press }) {
    return new Button({
      id: id,
      text: text,
      type: "Neutral",
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
    window.location.hash = "#Aufklaeung";
  };
  
  const handleClickSettingsButton = function () {
    window.location.hash = "#Settings";
  };
  
  const handleClickLogoutButton = function () {
    window.location.hash = "#Logout";
  };

  const createShoppingListButton = createMenuButton({
    id: "createShoppingListButton",
    text: "Eine neue Einkaufliste erstellen",
    press: handleCreateShoppingListPress
  });

  const viewShoppingListsButton = createMenuButton({
    id: "viewShoppingListsButton",
    text: "Offene Einkaufslisten anzeigen",
    press: handleClickShoppingListsButton
  });

  const viewMyShoppingListsButton = createMenuButton({
    id: "viewMyShoppingListsButton",
    text: "Meine Einkaufslisten anzeigen",
    press: handleClickMyShoppingListsButton
  });

  const viewEducationButton = createMenuButton({
    id: "viewEducationButton",
    text: "Aufklärung",
    press: handleClickEducationButton
  });
  
  const viewSettingsButton = createMenuButton({
    id: "viewSettingsButton",
    text: "Einstellungen",
    press: handleClickSettingsButton
  });
  
  const viewLogoutButton = createMenuButton({
    id: "viewLogoutButton",
    text: "Logout",
    press: handleClickLogoutButton
  });

  return new Page({
    id: "mainMenuPage",
    title: "Übersichtsmenü",
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
