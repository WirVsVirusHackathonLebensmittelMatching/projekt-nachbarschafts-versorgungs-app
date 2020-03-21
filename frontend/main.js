sap.ui.getCore().attachInit(function () {
  sap.ui.require([
    "sap/m/App"
  ], function (App) {

    var oApp = new App({
      id: "app",
      pages: [
        sap.ui.getCore().byId("loginPage"),
        sap.ui.getCore().byId("overviewPage")
      ]
    });

    oApp.placeAt("content");

  });
});
