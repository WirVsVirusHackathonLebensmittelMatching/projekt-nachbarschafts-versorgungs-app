sap.ui.getCore().attachInit(function () {
  sap.ui.require([
    "sap/m/App"
  ], function (App) {
    window.location.hash = "";

    var oApp = new App({
      id: "app",
      pages: [
        sap.ui.getCore().byId("loginPage"),
        sap.ui.getCore().byId("overviewPage"),
        sap.ui.getCore().byId("mainMenuPage"),
        sap.ui.getCore().byId("createListPage"),
        sap.ui.getCore().byId("educationPage"),
        sap.ui.getCore().byId("settingsPage"),
        sap.ui.getCore().byId("einkaufsItemPage")
      ]
    });

    oApp.placeAt("content");

    window.addEventListener("hashchange", function () {
      switch (window.location.hash) {
          case "#Menue":
            oApp.to("mainMenuPage");
            break;
          case "#ListeErstellen":
            oApp.to("createListPage");
            break;
          case "#EinkaufslistenUebersicht":
            oApp.to("overviewPage");
            break;
          case "#EinkaufslistenEigene":
            oApp.to("myListsPage");
            break;
          case "#Selbstschutz":
            oApp.to("educationPage");
            break;
          case "#Einstellungen":
            oApp.to("settingsPage");
            break;
          case "#EinkaufsItem":
            oApp.to("einkaufsItemPage");
            break;
          default:
            oApp.to("loginPage");
      }
    }, false);
  });
});
