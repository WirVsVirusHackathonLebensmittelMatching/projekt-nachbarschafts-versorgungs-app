sap.ui.require([
  "sap/m/Page",
  "sap/m/Input",
  "sap/m/Button",
  "sap/m/CheckBox",
  "sap/m/VBox",
  "sap/m/HBox",
  "sap/m/List",
  "sap/ui/model/json/JSONModel",
  "sap/m/CustomListItem",
  "sap/m/MessageToast",
], function (Page, Input, Button, CheckBox, VBox, HBox, List, JSONModel, CustomListItem, MessageToast) {

  const oModel = new JSONModel({
    products: []
  });

  const handleSubmitShoppingListPress = function () {
    console.log(oModel.getProperty("/products"));
    MessageToast.show("Die neue Einkaufsliste wurde erstellt.");
    window.location.hash = "#Menue";
  };

  const handleAddItemPress = function () {
    const oldProducts = oModel.getProperty("/products");
    const newProducts = oldProducts.concat({ itemName: "", itemQuantity: "", itemComment: "" });
    oModel.setProperty("/products", newProducts);
  };

  const productTemplate = new CustomListItem({
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

  const itemList = new List({
    noDataText: "Bitte fügen Sie Produkte zu Ihrer Einkaufsliste hinzu.",
    items: {
      path: "/products",
      template: productTemplate
    },
  }).setModel(oModel);

  const addItemButton = new Button({
    text: "Neues Produkt hinzufügen",
    icon: "sap-icon://add-product",
    press: handleAddItemPress
  });
  
  const buyPremiumItemButton = new CheckBox({
	id: "buyPremiumItem",
    text: "Premium Produkte erwünscht",
  });

  const submitShoppingListButton = new Button({
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
          submitShoppingListButton,
        ]
      })
    ]
  });
});
