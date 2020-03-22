sap.ui.require([
  "sap/f/DynamicPage",
  "sap/f/DynamicPageTitle",
  "sap/f/DynamicPageHeader",
  "sap/m/Page",
  "sap/m/List",
  "sap/m/Title",
  "sap/m/Label",
  "sap/m/Button",
  "sap/m/VBox",
  "sap/m/OverflowToolbar",
  "sap/m/ToolbarSpacer",
  "sap/m/MessageBox",
  "sap/m/MessageToast",
  "sap/m/StandardListItem",
  "sap/m/ObjectAttribute",
  "sap/m/ObjectStatus",
  "sap/ui/layout/HorizontalLayout",
  "sap/ui/layout/VerticalLayout"
], function (
  DynamicPage,
  DynamicPageTitle,
  DynamicPageHeader,
  Page,
  List,
  Title,
  Label,
  Button,
  VBox,
  OverflowToolbar,
  ToolbarSpacer,
  MessageBox,
  MessageToast,
  StandardListItem,
  ObjectAttribute,
  ObjectStatus,
  HorizontalLayout,
  VerticalLayout
) {
  oGlobalEventBus.subscribeOnce("create-einkaufsItemPage", function () {
    var iconFormatter = function (bChecked) {
      return bChecked ? "sap-icon://accept" : "sap-icon://circle-task";
    };

    var itemFactory = function (sId) {
      return new StandardListItem({
        id: sId,
        title: "{itemTitle}",
        counter: "{itemCount}",
        type: "Active",
        iconInset: false,
        icon: {
          path: "checked",
          formatter: iconFormatter
        },
        description: "{itemComment}"
      });
    };

    var onItemPress = function (oEvent) {
      var oItem = oEvent.getParameter("listItem");
          oContext = oItem.getBindingContext(),
          oModel = oContext.getModel(),
          sPath = oContext.getPath(),
          bChecked = oModel.getProperty(sPath + "/checked");

      oModel.setProperty(sPath + "/checked", !bChecked);

      aItems = oModel.getProperty("/products").filter(function (oItem) {
        return !oItem.checked;
      });

      sap.ui.getCore().byId("confirmBuying").setType(aItems.length ? "Default" : "Emphasized");
    }

    var formatterConfirmBuying = function (aItems) {
      aItems = aItems.filter(function (oItem) {
        return !oItem.checked;
      });

      return aItems.length ? "Default" : "Emphasized";
    }

    var onEndShoppingPress = function () {
      var oPage = sap.ui.getCore().byId("einkaufsItemPage"),
        aItems = oPage.getModel().getProperty("/products");

      var aCheckedItems = aItems.filter(function (oItem) {
        return !oItem.checked;
      });

      if (aCheckedItems.length) {
        MessageBox.show("Einige der Produkte sind noch nicht abgehakt, möchten Sie troztdem den Einkauf abschließen?", {
          icon: MessageBox.Icon.WARNING,
          title: "Warnung",
          actions: [MessageBox.Action.YES, MessageBox.Action.ABORT],
          emphasizedAction: MessageBox.Action.YES,
          onClose: function (oAction) {
            if (oAction === MessageBox.Action.YES) {
              sap.ui.getCore().byId("einkaufsListe").setBlocked(true);
              sap.ui.getCore().byId("confirmBuying").setVisible(false);
            }
          }
        });
      } else {
        sap.ui.getCore().byId("einkaufsListe").setBlocked(true);
        sap.ui.getCore().byId("confirmBuying").setVisible(false);
      }
    }

    var onDeletePress = function () {
      MessageToast.show("Die Einkaufsliste wurde gelöscht.");
      window.aFakeItems = window.aFakeItems.filter(function (oFakeItem) {
        return window.oItemContext.id !== oFakeItem.id;
      });
      window.oItemContext = null;
      window.history.back();
    };

    var onEditPress = function () {
      console.log("Edit pressed!");
    };

    return new Page({
      id: "einkaufsItemPage",
      title: "EinkaufsItem",
      titleAlignment: "Center",
      showNavButton: true,
      navButtonPress: function () {
        window.history.back();
      },
      content: [
        new DynamicPage({
          id: "dynamicPageId",
          headerExpanded: "{/headerExpanded}",
          toggleHeaderOnTitleClick: "{/titleClickable}",
          title: new DynamicPageTitle({
            heading: new Title({
              text: "Header Title"
            }),
            expandedContent: new Label({
              text: "This is a expanded subheading"
            }),
            snappedContent: new Label({
              text: "This is a snapped subheading"
            }),
            snappedTitleOnMobile: new Title({
              text: "Header Title On Phone"
            }),
            navigationActions: [
              new Button({
                icon: "sap-icon://map",
                tooltip: "Adresse"
              }),
              new Button({
                icon: "sap-icon://call",
                tooltip: "Anrufen"
              }),
              new Button({
                icon: "sap-icon://comment",
                tooltip: "Chat"
              })
            ]
          }),
          header: new DynamicPageHeader({
              pinnable: true,
              content: new HorizontalLayout({
                content: [
                  new VerticalLayout({
                    content: [
                      new ObjectAttribute({
                        title: "Location",
                        text: "Warehouse A"
                      }),
                      new ObjectAttribute({
                        title: "Halway",
                        text: "23L"
                      }),
                      new ObjectAttribute({
                        title: "Rack",
                        text: "34"
                      })
                    ]
                  }),
                  new VerticalLayout({
                    content: [
                      new ObjectAttribute({
                        title: "Availability"
                      }),
                      new ObjectStatus({
                        text: "In Stock",
                        state: "Success"
                      })
                    ]
                  })
                ]
              })
          }),
          content: new VBox ({
            items: [
              new OverflowToolbar({
                design: "Solid",
                content: [
                  new ToolbarSpacer(),
                  new Button({
                    id: "editList",
                    text: "Ändern",
                    press: onEditPress
                  }),
                  new Button({
                    id: "deleteList",
                    text: "Löschen",
                    press: onDeletePress
                  }),
                  new Button({
                    id: "confirmBuying",
                    text: "Einkauf abschließen",
                    type: {
                      path: "/products",
                      formatter: formatterConfirmBuying
                    },
                    press: onEndShoppingPress
                  })
                ]
              }),
              new List({
                id: "einkaufsListe",
                itemPress: onItemPress,
                items: {
                  path: "/products",
                  factory: itemFactory
                }
              })
            ]
          })
        })
      ]
    })
  });
});
