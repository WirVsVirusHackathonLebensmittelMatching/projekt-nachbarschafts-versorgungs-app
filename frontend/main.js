sap.ui.getCore().attachInit(function () {
  sap.ui.require([
    "sap/m/App",
    "sap/ui/model/json/JSONModel"
  ], function (App, JSONModel) {
    oGlobalEventBus.publish("create-loginPage");
    var oApp = new App({
      pages: [
        sap.ui.getCore().byId("loginPage")
      ]
    });

    var bLoadedOwnOnce = false,
      bLoadedAllOnce = false;

    oApp.placeAt("content");

    var onHashChange = function () {
      var mPages = {
        "#Menue": "mainMenuPage",
        "#ListeErstellen": "createListPage",
        "#EinkaufslistenUebersicht": "overviewPage",
        "#EinkaufslistenEigene": "overviewPage",
        "#Selbstschutz": "educationPage",
        "#Einstellungen": "settingsPage",
        "#EinkaufsItem": "einkaufsItemPage",
        "#Chat": "chatPage"
      }

      var sId = mPages[window.location.hash] || "loginPage";
      oGlobalEventBus.publish("create-" + sId);
      var oPage = sap.ui.getCore().byId(sId);

      if (window.location.hash === "#EinkaufslistenEigene") {
        if (!bLoadedOwnOnce) {
          oPage.setModel(new JSONModel({
            title: "Meine Einkaufslisten",
            busy: true,
            items: [],
            own: true
          }));
          window.setTimeout(function () {
            oPage.getModel().setProperty("/busy", false);
            oPage.getModel().setProperty("/items", window.aFakeItems.filter(function (oItem) {
              return oItem.own || oItem.state !== "open";
            }));
          }, 2000);
          bLoadedOwnOnce = true;
        } else {
          oPage.setModel(new JSONModel({
            title: "Meine Einkaufslisten",
            busy: true,
            items: window.aFakeItems.filter(function (oItem) {
              return oItem.own || oItem.state !== "open";;
            }),
            own: true
          }));
          window.setTimeout(function () {
            oPage.getModel().setProperty("/busy", false);
          }, 2000);
        }
      } else if (window.location.hash === "#EinkaufslistenUebersicht") {
        if (!bLoadedAllOnce) {
          oPage.setModel(new JSONModel({
            title: "Offene Einkaufslisten",
            busy: true,
            items: [],
            own: false
          }));
          window.setTimeout(function () {
            oPage.getModel().setProperty("/busy", false);
            oPage.getModel().setProperty("/items", window.aFakeItems.filter(function (oItem) {
              return oItem.state === "open";
            }));
          }, 2000);
          bLoadedAllOnce = true;
        } else {
          oPage.setModel(new JSONModel({
            title: "Offene Einkaufslisten",
            busy: true,
            items: window.aFakeItems.filter(function (oItem) {
              return oItem.state === "open";
            }),
            own: false
          }));
          window.setTimeout(function () {
            oPage.getModel().setProperty("/busy", false);
          }, 2000);
        }
      } else if (window.location.hash === "#EinkaufsItem") {
        if (!window.oItemContext) {
          window.history.back();
          return;
        } else {
          oPage.setModel(new JSONModel(window.oItemContext));
        }
      } else if (window.location.hash === "#ListeErstellen") {
        if (!window.oItemContext) {
          oPage.setModel(new JSONModel({
            products: [],
            type: "",
            neededTill: "",
            price: "",
            title: "Neue Einkaufsliste erstellen"
          }));
        } else {
          window.oItemContext.title = "Einkaufsliste editieren"
          oPage.setModel(new JSONModel(JSON.parse(JSON.stringify(window.oItemContext))));
        }
      } else if (window.location.hash === "#Menue") {
        oPage.setModel(new JSONModel({
          plz: window.plz,
          street: this.window.street
        }));
      }

      if (oApp.indexOfPage(oPage) === -1) {
        oApp.addPage(oPage);
      }
      oApp.to(sId);
    };

    if (window.location.hash.length) {
      onHashChange();
    }

    window.addEventListener("hashchange", onHashChange, false);
  });
});
