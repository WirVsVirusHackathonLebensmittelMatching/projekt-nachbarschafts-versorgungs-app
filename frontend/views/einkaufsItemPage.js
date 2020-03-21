sap.ui.require([
  "sap/m/Page"
], function (Page) {
  return new Page({
    id: "einkaufsItemPage",
    title: "EinkaufsItem",
    titleAlignment: "Center",
    showNavButton: true,
    navButtonPress: function () {
      window.history.back();
    },
    content: []
  })
});
