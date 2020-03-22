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

    var bLoadedAllOnce = false;

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
        var aItems = [
          { type: "", street: "An der Frauenkirche", plz: "1127", city: "Desden", price: "27,30 €", neededTill: "in 42 Minuten" },
          { type: "Lebensmitteleinkauf", street: "Oppenhoffallee", plz: "52078", city: "Aachen", price: "72,60 €", neededTill: "in 2 Stunden" },
          { type: "Apothekeneinkauf", street: "Unter den Linden", plz: "12345", city: "Berlin", price: "9,56 €", neededTill: "in 14 Stunden" },
          { type: "Lebensmitteleinkauf", street: "Bäckerstraße", plz: "55128", city: "Mainz", price: "15,00 €", neededTill: "in 2 Tagen" }
        ];

        if (!bLoadedAllOnce) {
          oPage.setModel(new JSONModel({
            title: "Offene Einkaufslisten",
            busy: true,
            items: [],
            own: false
          }));
          window.setTimeout(function () {
            oPage.getModel().setProperty("/busy", false);
            oPage.getModel().setProperty("/items", aItems);
          }, 2000);
          bLoadedAllOnce = true;
        } else {
          oPage.setModel(new JSONModel({
            title: "Offene Einkaufslisten",
            busy: true,
            items: aItems,
            own: false
          }));
          window.setTimeout(function () {
            oPage.getModel().setProperty("/busy", false);
          }, 2000);
        }
      }

      if (oApp.indexOfPage(oPage) === -1) {
        oApp.addPage(oPage);
      }
      oApp.to(sId);
    }, false);
  });
});
