sap.ui.getCore().attachInit(function () {
  sap.ui.require([
    "sap/m/App"
  ], function (App) {
    window.location.hash = "";

    oGlobalEventBus.publish("create-loginPage");
    var oApp = new App({
      pages: [
        sap.ui.getCore().byId("loginPage")
      ]
    });

    oApp.placeAt("content");

    window.addEventListener("hashchange", function () {
      var mPages = {
        "#Menue": "mainMenuPage",
        "#ListeErstellen": "createListPage",
        "#EinkaufslistenUebersicht": "overviewPage",
        "#EinkaufslistenEigene": "myListsPage",
        "#Selbstschutz": "educationPage",
        "#Einstellungen": "settingsPage",
        "#EinkaufsItem": "einkaufsItemPage"
      }

      var sId = mPages[window.location.hash] || "loginPage";
      oGlobalEventBus.publish("create-" + sId);
      var oPage = sap.ui.getCore().byId(sId);
      if (oApp.indexOfPage(oPage) === -1) {
        oApp.addPage(oPage);
      }
      oApp.to(sId);
    }, false);
  });
});
