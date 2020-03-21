sap.ui.require([
  "sap/m/Page",
  "sap/m/List",
  "sap/m/StandardListItem"
], function (Page, List, StandardListItem) {

  return new Page({
    id: "overviewPage",
    title: "Übersicht",
    content: [
      new List({
        noDataText: "Es wurden keine Einkaufslisten gefunden.",
        items: [
          new StandardListItem({
            icon: "sap-icon://nutrition-activity",
            title: "Lebensmitteleinkauf",
            description: "O-Saft, Brötchen, Wurst",
            type: "Navigation",
            iconInset: false,
            info: "vor 2 Tagen"
          }),
          new StandardListItem({
            icon: "sap-icon://pharmacy",
            title: "Apoteheneinkauf",
            description: "Desinfektionsmittel, Hustenbonbons",
            type: "Navigation",
            iconInset: false,
            info: "vor 16 Stunden"
          }),
          new StandardListItem({
            icon: "sap-icon://nutrition-activity",
            title: "Lebensmitteleinkauf",
            description: "Kornflakes, Milch, Kakao",
            type: "Navigation",
            iconInset: false,
            info: "vor 5 Minuten"
          }),
          new StandardListItem({
            icon: "sap-icon://activities",
            title: "Anderer Einkauf",
            description: "Katzenfutter, Katzenstreu",
            type: "Navigation",
            iconInset: false,
            info: "vor wenigen Sekunden"
          })
        ]
      })
    ]
  });
});
