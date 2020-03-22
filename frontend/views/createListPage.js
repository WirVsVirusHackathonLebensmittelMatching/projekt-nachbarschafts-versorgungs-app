sap.ui.require([
  "sap/m/Page",
  "sap/m/Input",
  "sap/m/Button",
  "sap/m/DateTimePicker",
  "sap/m/Select",
  "sap/m/VBox",
  "sap/m/List",
  "sap/m/Title",
  "sap/m/Dialog",
  "sap/ui/core/Item",
  "sap/ui/model/json/JSONModel",
  "sap/m/StandardListItem",
  "sap/m/MessageToast",
], function (
  Page,
  Input,
  Button,
  DateTimePicker,
  Select,
  VBox,
  List,
  Title,
  Dialog,
  Item,
  JSONModel,
  StandardListItem,
  MessageToast
) {
  oGlobalEventBus.subscribeOnce("create-createListPage", function () {

    // - Controller -

    var oModel = new JSONModel({
      products: [],
      type: "",
      neededTill: "",
      price: ""
    });

    var handleSubmitShoppingListPress = function () {
      // oModel.setProperty("/products", aProducts);
      // console.log(oModel.getData());

      var products = oModel.getProperty("/products");

      window.aFakeItems.push({
        id: Date.now(),
        type: oModel.getProperty("/type"),
        street: "BeispielStraße",
        plz: "12345",
        city: "Berlin",
        price: oModel.getProperty("/price"),
        neededTill: oModel.getProperty("/neededTill"),
        products,
        own: true
      });

      var order = {
        orderedItems:
          products.map(product => ({
            name: product.itemName,
            quantity: product.itemQuantity,
            comment: product.itemComment
          })),
        latestDeliveryWished: oModel.getProperty("/neededTill"),
        sessionToken: getCookie("sessionToken")
      };

      doWSRequest("order-create", order, function (res) {
        console.log("Test Response " + JSON.stringify(res))
      });
      MessageToast.show("Die neue Einkaufsliste wurde erstellt.");
      window.history.back();
    };

    var handleAddItemPress = function () {
      var oDialog = sap.ui.getCore().byId("createProductDialog");
      if (oDialog) {
        oProductNameInput = sap.ui.getCore().byId("productNameInput").setValue("");
        oProductCounterInput = sap.ui.getCore().byId("productCounterInput").setValue("");
        oProductCommentInput = sap.ui.getCore().byId("productCommentInput").setValue("");
        oDialog.open();
      } else {
        oDialog = new Dialog({
          id: "createProductDialog",
          title: "Produkt Hinzufügen",
          titleAlignment: "Center",
          content: [
            new Input({
              id: "productNameInput",
              maxLength: 40,
              placeholder: "Produktname"
            }),
            new Input({
              id: "productCounterInput",
              maxLength: 3,
              placeholder: "Anzahl"
            }),
            new Input({
              id: "productCommentInput",
              maxLength: 300,
              placeholder: "Zusätzliches Kommentar"
            })
          ],
          beginButton: new Button({
            id: "addProductDialogButton",
            icon: "sap-icon://add",
            text: "Hinzufügen",
            press: function () {
              var oProductNameInput = sap.ui.getCore().byId("productNameInput"),
                oProductCounterInput = sap.ui.getCore().byId("productCounterInput"),
                iCounter = parseInt(oProductCounterInput.getValue(), 10),
                oProductCommentInput = sap.ui.getCore().byId("productCommentInput"),
                bValid = true;

              if (oProductNameInput.getValue().length < 3) {
                bValid = false;
                oProductNameInput.setValueState("Error");
                oProductNameInput.setValueStateText("Bitte geben Sie einen Produkttitel an.");
              } else {
                oProductNameInput.setValueState("None");
              }

              if (isNaN(iCounter) || iCounter < 1) {
                bValid = false;
                oProductCounterInput.setValueState("Error");
                oProductCounterInput.setValueStateText("Bitte geben Sie die gewünschte Produktanzahl an.");
              } else {
                oProductCounterInput.setValueState("None");
              }

              if (bValid) {
                var aProducts = oModel.getProperty("/products");
                aProducts.push({
                  itemName: oProductNameInput.getValue(),
                  itemQuantity: iCounter,
                  itemComment: oProductCommentInput.getValue(),
                  checked: false
                });
                oModel.setProperty("/prodcuts", aProducts);
                oDialog.close();
              }
            }
          }),
          endButton: new Button({
            text: "Abbrechen",
            press: function () {
              oDialog.close();
            }
          })
        });

        oDialog.open();
      }
    };

    // - View -

    return new Page({
      id: "createListPage",
      title: "Neue Einkaufsliste erstellen",
      titleAlignment: "Center",
      showNavButton: true,
      navButtonPress: function () {
        window.history.back();
      },
      content: [
        new Title({
          text: "Einkaufsliste:"
        }).addStyleClass("sapUiSmallMarginTopBottom sapUiSmallMarginBegin"),
        new List({
          noDataText: "Bitte fügen Sie Produkte zu Ihrer Einkaufsliste hinzu.",
          items: {
            path: "/products",
            template: new StandardListItem({
              title: "{itemName}",
              description: "{itemComment}",
              counter: "{itemQuantity}"
            })
          },
        }).addStyleClass("sapUiSmallMarginBottom"),
        new VBox({
          alignItems: "Center",
          items: [
            new Button({
              text: "Neues Produkt hinzufügen",
              icon: "sap-icon://add-product",
              press: handleAddItemPress
            })
          ]
        }),
        new Title({
          text: "Einkaufslisten Typ:"
        }).addStyleClass("sapUiSmallMarginTopBottom sapUiSmallMarginBegin"),
        new VBox({
          alignItems: "Center",
          items: [
            new Select({
              forceSelection: false,
              selectedKey: "{/type}",
              items: [
                new Item({
                  text: "Lebensmitteleinkauf",
                  key: "Lebensmitteleinkauf"
                }),
                new Item({
                  text: "Apothekeneinkauf",
                  key: "Apothekeneinkauf"
                }),
                new Item({
                  text: "Sonstiges",
                  key: "Sonstiges"
                })
              ]
            })
          ]
        }),
        new Title({
          text: "Benötigt bis:"
        }).addStyleClass("sapUiSmallMarginTopBottom sapUiSmallMarginBegin"),
        new VBox({
          alignItems: "Center",
          items: [
            new DateTimePicker({
              value: "{/neededTill}"
            })
          ]
        }),
        new Title({
          text: "Erwarteter Gesamtpreis:"
        }).addStyleClass("sapUiSmallMarginTopBottom sapUiSmallMarginBegin"),
        new VBox({
          alignItems: "Center",
          items: [
            new Input({
              value: "{/price}"
            }),
            new Button({
              text: "Einkaufliste speichern",
              icon: "sap-icon://message-success",
              press: handleSubmitShoppingListPress
            }).addStyleClass("sapUiSmallMaringTop")
          ]
        })
      ]
    }).setModel(oModel);
  });
});
