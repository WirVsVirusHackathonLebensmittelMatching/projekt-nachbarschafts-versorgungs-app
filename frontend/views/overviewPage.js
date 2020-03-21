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
  "sap/m/ViewSettingsDialog",
  "sap/m/ViewSettingsItem",
  "sap/ui/core/Icon",
  "sap/ui/model/json/JSONModel",
  "sap/ui/model/Filter",
  "sap/ui/model/FilterOperator",
  "sap/ui/model/Sorter"
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
  ViewSettingsDialog,
  ViewSettingsItem,
  Icon,
  JSONModel,
  Filter,
  FilterOperator,
  Sorter
) {

  var oSearchFilter = null;

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
    window.location.hash = "#ListeErstellen";
  };

  var getSorters = function (mParams) {
    var aSorters = [],
      oGoupItem = mParams.groupItem;

    if (oGoupItem) {
        var sGroupPath = oGoupItem.getKey(),
            fnSorter = function (oContext) {
                var sName = oContext.getProperty(sGroupPath);
                return {
                    key: sName,
                    text: sName
                };
            };

        aSorters.push(new Sorter(sGroupPath, mParams.groupDescending, fnSorter));
    }

    if (mParams.sortItem) {
        aSorters.push(new Sorter(mParams.sortItem.getKey(), mParams.sortDescending));
    }

    return aSorters;
  };

  var getFilters = function (mParams) {
    var mFilters = {};

      mParams.filterItems.forEach(function (oItem) {
          var aSplit = oItem.getKey().split("___"),
            sPath = aSplit[0],
            sOperator = aSplit[1],
            sValue1 = aSplit[2],
            sValue2 = aSplit[3];

          if (!mFilters[sPath]) {
              mFilters[sPath] = [];
          }
          mFilters[sPath].push(new Filter(sPath, sOperator, sValue1, sValue2));
      }.bind(this));

      return mFilters;
  }

  var handleViewSettingsDialogConfirm = function (oEvent) {
    console.log("Confirm fired!");
    var mParams = oEvent.getParameters(),
      oTable = sap.ui.getCore().byId("table"),
      oBinding = oTable.getBinding("items"),
      aSorters = getSorters(mParams),
      mFilters = getFilters(mParams);

    // apply sorters
    oBinding.sort(aSorters);

    // apply filters
    var aCategoryFilters = [],
      aPropertyFilters = [];

    for (var filter in mFilters) {
        aPropertyFilters.push(
            new Filter({
                filters: mFilters[filter],
                and: false
            })
        );
    }
    aCategoryFilters = aCategoryFilters.concat(aPropertyFilters);

    if (oSearchFilter) {
        aCategoryFilters = aCategoryFilters.concat(oSearchFilter);
    }

    oBinding.filter(new Filter({
        filters: aCategoryFilters,
        and: true
    }));

    // update filter bar
    sap.ui.getCore().byId("infoFilterBar").setVisible(!!Object.keys(mFilters).length);
    sap.ui.getCore().byId("infoFilterLabel").setText(mParams.filterString);
  };

  var showViewSettingsDialog = function (sAction, oEvent) {
    var oViewSettingsDialog = sap.ui.getCore().byId("viewSettingsDialog");

    if (oViewSettingsDialog) {
      oViewSettingsDialog.open(sAction);
    } else {
      oViewSettingsDialog = new ViewSettingsDialog({
        id: "viewSettingsDialog",
        sortDescending: true,
        confirm: handleViewSettingsDialogConfirm,
        sortItems: [
          new ViewSettingsItem({ id: "TypeSort", text: "Einkaufstyp", key: "type" }),
          new ViewSettingsItem({ id: "StreetSort", text: "Straße", key: "street" }),
          new ViewSettingsItem({ id: "StateSort", text: "Bundesland", key: "state" }),
          new ViewSettingsItem({ id: "PLZSort", text: "Postleitzahl", key: "plz" }),
          new ViewSettingsItem({ id: "CitySort", text: "Stadt", key: "city" }),
          new ViewSettingsItem({ id: "PriceSort", text: "Preis", key: "price" }),
          new ViewSettingsItem({ id: "CreatedAtSort", text: "Erstellt am", key: "createdAt" })
        ]
      });

      oViewSettingsDialog.open(sAction);
    }
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
      window.location.hash = "#Menue";
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
