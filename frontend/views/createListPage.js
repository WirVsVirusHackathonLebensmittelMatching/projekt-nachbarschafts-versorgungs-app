sap.ui.require([
  "sap/m/Page",
  "sap/m/Input",
  "sap/m/Button",
  "sap/m/DateTimePicker",
  "sap/m/CheckBox",
  "sap/m/VBox",
  "sap/m/HBox",
  "sap/m/List",
  "sap/ui/model/json/JSONModel",
  "sap/m/CustomListItem",
  "sap/m/MessageToast",
], function (Page, Input, Button, DateTimePicker, CheckBox, VBox, HBox, List, JSONModel, CustomListItem, MessageToast) {
  oGlobalEventBus.subscribeOnce("create-createListPage", function () {
    var oModel = new JSONModel({
      products: []
    });

    var handleSubmitShoppingListPress = function () {
      console.log(oModel.getProperty("/products"));
      console.log("Premium: " + sap.ui.getCore().byId("buyPremiumItem").getSelected());
      MessageToast.show("Die neue Einkaufsliste wurde erstellt.");
      $(".sapMMessageToast").addClass("sapMMessageToastSuccess ");
      window.history.back();
    };

    var handleAddItemPress = function () {
      var oldProducts = oModel.getProperty("/products");
      var newProducts = oldProducts.concat({ itemName: "", itemQuantity: "", itemComment: "" });
      oModel.setProperty("/products", newProducts);
    };

    var productTemplate = new CustomListItem({
      content: [
        new HBox({
          items: [
            (new Input({ placeholder: "Wieviel?", value: "{itemQuantity}", valueLiveUpdate: true })),
            (new Input({ placeholder: "Was?", value: "{itemName}", valueLiveUpdate: true })),
            (new Input({ placeholder: "Kommentar?", value: "{itemComment}", valueLiveUpdate: true }))
          ]
        })
      ]
    });

    var itemList = new List({
      noDataText: "Bitte fügen Sie Produkte zu Ihrer Einkaufsliste hinzu.",
      items: {
        path: "/products",
        template: productTemplate
      },
    }).setModel(oModel);

    var addItemButton = new Button({
      text: "Neues Produkt hinzufügen",
      icon: "sap-icon://add-product",
      press: handleAddItemPress
    });

    var buyPremiumItemButton = new CheckBox({
      id: "buyPremiumItem",
      text: "Premium Produkte erwünscht",
    });

    var latestDeliveryDate = new DateTimePicker({
      id: "latestDeliveryDate",
    });

    var submitShoppingListButton = new Button({
      text: "Einkaufliste speichern",
      icon: "sap-icon://message-success",
      press: handleSubmitShoppingListPress
    });

    return new Page({
      id: "createListPage",
      title: "Neue Einkaufsliste erstellen",
      titleAlignment: "Center",
      showNavButton: true,
      navButtonPress: function () {
        window.history.back();
      },
      content: [
        new VBox({
          justifyContent: "Center",
          alignItems: "Center",
          items: [
            itemList,
            addItemButton,
            buyPremiumItemButton,
            latestDeliveryDate,
            submitShoppingListButton,
          ]
        })
      ]
    });
  });
});
