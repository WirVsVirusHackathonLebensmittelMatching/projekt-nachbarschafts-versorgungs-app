sap.ui.require([
  "sap/m/Page",
  "sap/m/Input",
  "sap/m/Button",
  "sap/m/VBox",
  "sap/m/HBox",
  "sap/m/List",
  "sap/ui/model/json/JSONModel",
  "sap/m/CustomListItem"
], function (Page, Input, Button, VBox, HBox, List, JSONModel, CustomListItem) {

  const oModel = new JSONModel({
    products: []
  });

  const handleSubmitShoppingListPress = function () {
    console.log(oModel.getProperty("/products"));
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
    type: "Neutral",
    press: handleAddItemPress
  });

  const submitShoppingListButton = new Button({
    text: "Einkaufliste speichern",
    type: "Neutral",
    press: handleSubmitShoppingListPress
  });

  return new Page({
    id: "createListPage",
    title: "Neue Einkaufsliste erstellen",
    content: [
      new VBox({
        justifyContent: "Center",
        alignItems: "Center",
        items: [
          itemList,
          addItemButton,
          submitShoppingListButton,
        ]
      })
    ]
  });
});
