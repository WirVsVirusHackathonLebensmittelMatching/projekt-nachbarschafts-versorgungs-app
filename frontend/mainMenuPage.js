sap.ui.require([
  "sap/m/Page",
  "sap/m/Button",
], function (Page, Button) {

  const handleCreateShoppingListPress = function () {
    sap.ui.getCore().byId("app").to("createListPage");
  };

  const handleClickShoppingListsButton = function () {
    sap.ui.getCore().byId("app").to("overviewPage");
  };

  const handleClickMyShoppingListsButton = function () {
    sap.ui.getCore().byId("app").to("myListsPage");
  };

  const handleClickEducationButton = function () {
    sap.ui.getCore().byId("app").to("educationPage");
  };

  const createShoppingListButton = new Button({
    id: "createShoppingListButton",
    text: "Eine neue Einkaufliste erstellen",
    type: "Neutral",
    press: handleCreateShoppingListPress
  });

  const viewShoppingListsButton = new Button({
    id: "viewShoppingListsButton",
    text: "Offene Einkaufslisten anzeigen",
    type: "Neutral",
    press: handleClickShoppingListsButton
  });

  const viewMyShoppingListsButton = new Button({
    id: "viewMyShoppingListsButton",
    text: "Meine Einkaufslisten anzeigen",
    type: "Neutral",
    press: handleClickMyShoppingListsButton
  });

  const viewEducationButton = new Button({
    id: "viewEducationButton",
    text: "Aufklärung",
    type: "Neutral",
    press: handleClickEducationButton
  });

  return new Page({
    id: "mainMenuPage",
    title: "Übersichtsmenü",
    content: [
      createShoppingListButton,
      viewShoppingListsButton,
      viewMyShoppingListsButton,
      viewEducationButton,
    ]
  });
});
