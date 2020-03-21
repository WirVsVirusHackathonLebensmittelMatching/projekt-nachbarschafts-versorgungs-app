sap.ui.require([
  "sap/m/Page",
  "sap/m/Table",
  "sap/m/OverflowToolbar",
  "sap/m/OverflowToolbarLayoutData",
  "sap/m/ToolbarSpacer",
  "sap/m/SearchField",
  "sap/m/Button",
  "sap/m/Text",
  "sap/m/Column",
  "sap/m/library",
  "sap/m/ObjectIdentifier",
  "sap/m/ColumnListItem",
  "sap/ui/core/Icon",
  "sap/ui/model/json/JSONModel"
], function (
  Page,
  Table,
  OverflowToolbar,
  OverflowToolbarLayoutData,
  ToolbarSpacer,
  SearchField,
  Button,
  Text,
  Column,
  library,
  ObjectIdentifier,
  ColumnListItem,
  Icon,
  JSONModel
) {

  var onItemPress = function (oEvent) {
    console.log("Item pressed fired!");
  };

  var onTableUpdate = function (oEvent) {
    console.log("Table update fired!");
  };

  var onSearch = function (oEvent) {
    console.log("Search fired!");
  };

  var onAdd = function (oEvent) {
    console.log("Einkaufsliste erstellen fired!");
  };

  var showViewSettingsDialog = function (sAction, oEvent) {
    console.log("Sortieren / Filtern / Gruppieren!");
  };

  var mTypes = {
    Lebensmitteleinkauf: "Lebensmitteleinkauf",
    Apothekeneinkauf: "Apothekeneinkauf"
  };

  var oModel = new JSONModel({
    busy: false,
    items: [
      {
        type: mTypes.Lebensmitteleinkauf,
        street: "Bäckerstraße",
        state: "RheinLand-Pfalz",
        plz: 55128,
        city: "Mainz",
        price: "15,00 €",
        createdAt: "vor 2 Tagen"
      },
      {
        type: mTypes.Apothekeneinkauf,
        street: "Unter den Linden",
        state: "Berlin",
        plz: 12345,
        city: "Berlin",
        price: "9,56 €",
        createdAt: "vor 16 Stunden"
      },
      {
        type: mTypes.Lebensmitteleinkauf,
        street: "Oppenhoffallee",
        state: "Nordrhein-Westfalen",
        plz: 52078,
        city: "Aachen",
        price: "72,60 €",
        createdAt: "vor 5 Minuten"
      },
      {
        type: "",
        street: "An der Frauenkirche",
        state: "Sachsen",
        plz: 1127,
        city: "Desden",
        price: "27,30 €",
        createdAt: "vor wenigen Sekunden"
      }
    ]
  });

  var itemFactory = function (sId, oContext) {
    var oItemData = oContext.getModel().getProperty(oContext.getPath());

    var sType = oItemData.type,
      sIconUrl = "sap-icon://activities";

    switch (oItemData.type) {
        case mTypes.Lebensmitteleinkauf:
          sIconUrl = "sap-icon://nutrition-activity";
          break;
        case mTypes.Apothekeneinkauf:
          sIconUrl = "sap-icon://pharmacy";
          break;
        default:
          sType = "Anderer Einkauf";
    }

    return new ColumnListItem ({
      type: "Navigation",
      cells: [
        new Icon({
          src: sIconUrl
        }),
        new ObjectIdentifier({
          title: sType,
          text: "{street}"
        }),
        new ObjectIdentifier({
          title: "{state}",
          text: "{plz}" + " / "  + "{city}"
        }),
        new ObjectIdentifier({
          title: "{price}",
          text: "{createdAt}"
        })
      ]
    })
  };

  return new Page({
    id: "overviewPage",
    title: "Übersicht",
    showNavButton: true,
    navButtonPress: function () {
      window.history.back();
    },
    content: [
      new Table({
        id: "table",
        busy: "{/busy}",
        itemPress: onItemPress,
        updateFinished: onTableUpdate,
        sticky: [library.Sticky.ColumnHeaders],
        noDataText: "Es wurden keine Einkaufslisten gefunden.",
        headerToolbar: new OverflowToolbar({
          id: "overflowToolbar",
          design: "Solid",
          content: [
            new ToolbarSpacer({
              id: "toolbarSpacer"
            }),
            new SearchField({
              id: "searchField",
              showRefreshButton: false,
              tooltip: "Suche",
              search: onSearch,
              width: "auto",
              layoutData: new OverflowToolbarLayoutData({
                moveToOverflow: false
              })
            }),
            new Button({
              id: "addButton",
              text: "Einkaufsliste erstellen",
              type: "Transparent",
              press: onAdd
            }),
            new Button({
              id: "sortButton",
              tooltip: "Sortieren",
              icon: "sap-icon://sort",
              type: "Transparent",
              press: showViewSettingsDialog.bind(this, "sort")
            }),
            new Button({
              id: "filterButton",
              tooltip: "Filteren",
              icon: "sap-icon://filter",
              type: "Transparent",
              press: showViewSettingsDialog.bind(this, "filter")
            }),
            new Button({
              id: "groupButton",
              tooltip: "Gruppieren",
              icon: "sap-icon://group-2",
              type: "Transparent",
              press: showViewSettingsDialog.bind(this, "group")
            })
          ]
        }),
        infoToolbar: new OverflowToolbar({
          id: "infoFilterBar",
          visible: false,
          active: true,
          press: showViewSettingsDialog.bind(this, "filter"),
          content: [
            new Text({
              id: "infoFilterLabel"
            })
          ]
        }),
        columns: [
          new Column({
            width: "10%"
          }),
          new Column({
            id: "columnType",
            header: new ObjectIdentifier({
              title: "Einkaufslistentyp",
              text: "Straße"
            })
          }),
          new Column({
            id: "columnPLZ",
            header: new ObjectIdentifier({
              title: "BundesLand",
              text: "PLZ / Stadt"
            }),
          }),
          new Column({
            id: "columnPrice",
            header: new ObjectIdentifier({
              title: "Warenwert",
              text: "Erstellt vor"
            }),
            width: "25%"
          })
        ],
        items: {
          path: "/items",
          factory: itemFactory
        },
      }).setModel(oModel)
    ]
  }).addStyleClass("sapUiResponsiveContentPadding");
});
