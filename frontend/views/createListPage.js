sap.ui.require([
  "sap/m/Page",
  "sap/m/Input",
  "sap/m/Button",
  "sap/m/VBox",
  "sap/m/HBox",
], function (Page, Input, Button, VBox, HBox) {

  function addNewItemRowTo(itemList) {
    const itemNameInput = new Input({ placeholder: "Was?" });
    const itemQuantityInput = new Input({ placeholder: "Wieviel?" });
    const itemCommentInput = new Input({ placeholder: "Kommentar?" });

    const itemRow = new HBox({
      items: [
        itemQuantityInput,
        itemNameInput,
        itemCommentInput
      ]
    }).addStyleClass("sapUiMediumMarginBeginEnd");

    itemList.addItem(itemRow);

    return {
      itemNameInputId: itemNameInput.getId(),
      itemQuantityInputId: itemQuantityInput.getId(),
      itemCommentInputId: itemCommentInput.getId()
    };
  }

  function mapItemInputsToRequest(itemListIds) {
    return itemListIds.map(({ itemNameInputId, itemQuantityInputId, itemCommentInputId }) => {
      const itemName = sap.ui.getCore().byId(itemNameInputId).getValue();
      const itemQuantity = sap.ui.getCore().byId(itemQuantityInputId).getValue();
      const itemComment = sap.ui.getCore().byId(itemCommentInputId).getValue();
      return { itemName, itemQuantity, itemComment }
    });
  }

  const handleSubmitShoppingListPress = function (itemListIds) {
    const requestBody = mapItemInputsToRequest(itemListIds);
    console.log(requestBody);
  };

  const handleAddItemPress = function (itemList, itemListContent) {
    const newItemIds = addNewItemRowTo(itemList);
    itemListContent.push(newItemIds);
  };

  const itemList = new VBox();
  const itemListIds = [];

  const addItemButton = new Button({
    text: "Neues Produkt hinzufügen",
    type: "Neutral",
    press: () => handleAddItemPress(itemList, itemListIds)
  });

  const submitShoppingListButton = new Button({
    text: "Einkaufliste speichern",
    type: "Neutral",
    press: () => handleSubmitShoppingListPress(itemListIds)
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
