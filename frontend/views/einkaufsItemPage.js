sap.ui.require([
  "sap/f/DynamicPage",
  "sap/f/DynamicPageTitle",
  "sap/f/DynamicPageHeader",
  "sap/m/Page",
  "sap/m/List",
  "sap/m/Title",
  "sap/m/Label",
  "sap/m/Button",
  "sap/m/OverflowToolbar",
  "sap/m/StandardListItem",
  "sap/m/ObjectAttribute",
  "sap/m/ObjectStatus",
  "sap/ui/layout/HorizontalLayout",
  "sap/ui/layout/VerticalLayout",
  "sap/ui/model/json/JSONModel"
], function (
  DynamicPage,
  DynamicPageTitle,
  DynamicPageHeader,
  Page,
  List,
  Title,
  Label,
  Button,
  OverflowToolbar,
  StandardListItem,
  ObjectAttribute,
  ObjectStatus,
  HorizontalLayout,
  VerticalLayout,
  JSONModel
) {

  var oModel = new JSONModel({
    items: [
      {
        itemCount: 3,
        itemTitle: "Milch",
        itemComment: "3,5% Fett",
        checked: false
      },
      {
        itemCount: 1,
        itemTitle: "Brot",
        itemComment: "Geschnitten und ohne Körner",
        checked: false
      },
      {
        itemCount: 1,
        itemTitle: "Nussnugat Creame",
        itemComment: "",
        checked: false
      },
      {
        itemCount: 2,
        itemTitle: "Orangensaft",
        itemComment: "nur wenn er im Angebot ist!",
        checked: false
      }
    ]
  });

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
  }

  return new Page({
    id: "einkaufsItemPage",
    title: "EinkaufsItem",
    titleAlignment: "Center",
    showNavButton: true,
    navButtonPress: function () {
      window.location.hash = "#Menue";
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
        content: [
          new OverflowToolbar(),
          new List({
            id: "einkaufsListe",
            itemPress: onItemPress,
            items: {
              path: "/items",
              factory: itemFactory
            }
          })
        ]
      })
    ]
  }).setModel(oModel)
});
