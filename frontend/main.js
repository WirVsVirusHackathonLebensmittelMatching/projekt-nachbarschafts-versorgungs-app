sap.ui.getCore().attachInit(function () {
  sap.ui.require([
    "sap/m/App",
    "sap/ui/model/json/JSONModel"
  ], function (App, JSONModel) {
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
        "#EinkaufslistenEigene": "overviewPage",
        "#Selbstschutz": "educationPage",
        "#Einstellungen": "settingsPage",
        "#EinkaufsItem": "einkaufsItemPage"
      }

      var sId = mPages[window.location.hash] || "loginPage";
      oGlobalEventBus.publish("create-" + sId);
      var oPage = sap.ui.getCore().byId(sId);

      if (window.location.hash === "#EinkaufslistenEigene") {
        oPage.setModel(new JSONModel({
          title: "Meine Einkaufslisten",
          busy: true,
          items: [],
          own: true
        }));
        window.setTimeout(function () {
          oPage.getModel().setProperty("/busy", false);
        }, 2000);
      } else if (window.location.hash === "#EinkaufslistenUebersicht") {
        oPage.setModel(new JSONModel({
          title: "Offene Einkaufslisten",
          busy: true,
          items: [],
          own: false
        }));
        window.setTimeout(function () {
          oPage.getModel().setProperty("/busy", false);
          oPage.getModel().setProperty("/items", [
            { type: "Lebensmitteleinkauf", street: "Bäckerstraße", plz: "55128", city: "Mainz", price: "15,00 €", createdAt: "vor 2 Tagen" },
            { type: "Apothekeneinkauf", street: "Unter den Linden", plz: "12345", city: "Berlin", price: "9,56 €", createdAt: "vor 16 Stunden" },
            { type: "Lebensmitteleinkauf", street: "Oppenhoffallee", plz: "52078", city: "Aachen", price: "72,60 €", createdAt: "vor 5 Minuten" },
            { type: "", street: "An der Frauenkirche", plz: "1127", city: "Desden", price: "27,30 €", createdAt: "vor wenigen Sekunden" }
          ]);
        }, 2000);
      }

      if (oApp.indexOfPage(oPage) === -1) {
        oApp.addPage(oPage);
      }
      oApp.to(sId);
    }, false);
  });
});
