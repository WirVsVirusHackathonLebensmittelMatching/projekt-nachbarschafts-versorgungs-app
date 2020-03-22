sap.ui.require([
  "sap/m/Page",
  "sap/m/Table",
  "sap/m/OverflowToolbar",
  "sap/m/OverflowToolbarLayoutData",
  "sap/m/ToolbarSpacer",
  "sap/m/SearchField",
  "sap/m/Button",
  "sap/m/Text",
  "sap/m/Title",
  "sap/m/Column",
  "sap/m/library",
  "sap/m/ObjectIdentifier",
  "sap/m/ColumnListItem",
  "sap/m/ViewSettingsDialog",
  "sap/m/ViewSettingsItem",
  "sap/m/ViewSettingsFilterItem",
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
  Title,
  Column,
  library,
  ObjectIdentifier,
  ColumnListItem,
  ViewSettingsDialog,
  ViewSettingsItem,
  ViewSettingsFilterItem,
  Icon,
  JSONModel,
  Filter,
  FilterOperator,
  Sorter
) {
  oGlobalEventBus.subscribeOnce("create-overviewPage", function () {
    var oSearchFilter = null,
      mViewSettingsFilters = null;

    var onItemPress = function (oEvent) {
      window.oItemContext = oEvent.getParameter("listItem").getBindingContext().getObject();
      // window.location.hash = "#EinkaufsItem?item=" + oEinkaufsListe.itemId;
      window.location.hash = "#EinkaufsItem";
    };

    var applyCombinedFilters =  function () {
      var mFilters = mViewSettingsFilters || {},
          oBinding = sap.ui.getCore().byId("table").getBinding("items"),
          aCategoryFilters = [],
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
    };

    var onSearch = function (oEvent) {
      var sSearchValue = oEvent.getSource().getValue(),
        aPropertiesToFilter = [
          "type",
          "street",
          "city",
          "plz"
        ];
        aFilters = aPropertiesToFilter.map(
            function (sPropertyToFilter) {
                return new Filter({
                    path: sPropertyToFilter,
                    operator: FilterOperator.Contains,
                    value1: sSearchValue
                });
            }
        );

      oSearchFilter = new Filter({
          filters: aFilters,
          and: false
      });

      applyCombinedFilters();
    };

    var onAdd = function () {
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
      mViewSettingsFilters = mFilters;
      applyCombinedFilters();

      // update filter bar
      sap.ui.getCore().byId("infoFilterBar").setVisible(!!Object.keys(mFilters).length);
      sap.ui.getCore().byId("infoFilterLabel").setText(mParams.filterString);
    };

    var showViewSettingsDialog = function (sAction, oEvent) {
      var oViewSettingsDialog = sap.ui.getCore().byId("viewSettingsDialog");

      if (oViewSettingsDialog) {
        oViewSettingsDialog.open(sAction);
      } else {
        // var typeFilterFactory = function (sId, oContext) {
        //   debugger;
        //   return new ViewSettingsItem({
        //     id: sId,
        //     text: "{uniqueValues>key}",
        //     key: "type___EQ___{uniqueValues>key}"
        //   });
        // };

        oViewSettingsDialog = new ViewSettingsDialog({
          id: "viewSettingsDialog",
          sortDescending: true,
          confirm: handleViewSettingsDialogConfirm,
          sortItems: [
            new ViewSettingsItem({ id: "TypeSort", text: "Einkaufstyp", key: "type" }),
            new ViewSettingsItem({ id: "StreetSort", text: "Straße", key: "street" }),
            new ViewSettingsItem({ id: "PLZSort", text: "Postleitzahl", key: "plz" }),
            new ViewSettingsItem({ id: "CitySort", text: "Stadt", key: "city" }),
            new ViewSettingsItem({ id: "PriceSort", text: "Preis", key: "price" }),
            new ViewSettingsItem({ id: "NeededTillSort", text: "Erstellt am", key: "neededTill" })
          ],
          // filterItems: [
          //   new ViewSettingsFilterItem({ id: "TypeFilter", text: "Einkaufstyp", key: "type", items: { path: "uniqueValues>/type", factory: typeFilterFactory, key: "id" } })
          // ],
          groupItems: [
            new ViewSettingsItem({ id: "TypeGroup", text: "Einkaufstyp", key: "type" }),
            new ViewSettingsItem({ id: "StreetGroup", text: "Straße", key: "street" }),
            new ViewSettingsItem({ id: "PLZGroup", text: "Postleitzahl", key: "plz" }),
            new ViewSettingsItem({ id: "CityGroup", text: "Stadt", key: "city" }),
            new ViewSettingsItem({ id: "PriceGroup", text: "Preis", key: "price" }),
            new ViewSettingsItem({ id: "NeededTillGroup", text: "Erstellt am", key: "neededTill" })

          ]
        });

        // var aItems = sap.ui.getCore().byId("table").getModel().getProperty("/items");

        // var removeDuplicates = function (aItems, sPropertyName) {
        //   var mKeys = {},
        //     aKeys = [];

        //     aItems.forEach(function (oItem) {
        //     var sName = oItem[sPropertyName];
        //     if (!mKeys[sName]) {
        //         mKeys[sName] = true;
        //         aKeys.push({ key: sName });
        //     }
        //   });

        //   return aKeys;
        // };

        // oViewSettingsDialog.setModel(new JSONModel({
        //   type: removeDuplicates(aItems, "type"),
        //   street: removeDuplicates(aItems, "street"),
        //   plz: removeDuplicates(aItems, "plz"),
        //   city: removeDuplicates(aItems, "city"),
        //   price: removeDuplicates(aItems, "price"),
        //   neededTill: removeDuplicates(aItems, "neededTill")
        // }, "uniqueValues"));

        oViewSettingsDialog.open(sAction);
      }
    };

    var mTypes = {
      Lebensmitteleinkauf: "Lebensmitteleinkauf",
      Apothekeneinkauf: "Apothekeneinkauf"
    };

    var itemFactory = function (sId, oContext) {
      var oItemData = oContext.getModel().getProperty(oContext.getPath());

      var sType = oItemData.type,
        sIconUrl = "sap-icon://activities"
        sPLZCityStreet = oItemData.plz + " / " + oItemData.city + " / " + oItemData.street;

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
        id: sId,
        type: "Navigation",
        cells: [
          new Icon({
            src: sIconUrl
          }),
          new ObjectIdentifier({
            title: sType,
            text: sPLZCityStreet
          }),
          new ObjectIdentifier({
            title: "{price}",
            text: "{neededTill}"
          })
        ]
      })
    };

    return new Page({
      id: "overviewPage",
      title: "{/title}",
      titleAlignment: "Center",
      showNavButton: true,
      navButtonPress: function () {
        window.history.back();
      },
      content: [
        new Table({
          id: "table",
          busy: "{/busy}",
          itemPress: onItemPress,
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
                visible: "{/own}",
                press: onAdd
              }),
              new Button({
                id: "sortButton",
                tooltip: "Sortieren",
                icon: "sap-icon://sort",
                type: "Transparent",
                press: showViewSettingsDialog.bind(this, "sort")
              }),
              // new Button({
              //   id: "filterButton",
              //   tooltip: "Filteren",
              //   icon: "sap-icon://filter",
              //   type: "Transparent",
              //   press: showViewSettingsDialog.bind(this, "filter")
              // }),
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
                text: "PLZ / Stadt / Straße"
              })
            }),
            new Column({
              id: "columnPrice",
              header: new ObjectIdentifier({
                title: "Budget",
                text: "Benötigt bis"
              }),
              width: "25%"
            })
          ],
          items: {
            path: "/items",
            factory: itemFactory
          },
        })
      ]
    }).addStyleClass("sapUiResponsiveContentPadding");
  });
});
