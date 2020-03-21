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
        sap.ui.getCore().byId("createListPage")
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
          case "#Aufklaeung":
            oApp.to("educationPage");
            break;
          default:
            oApp.to("loginPage");
      }
    }, false);
  });
});
