sap.ui.require([
  "sap/m/Button",
  "sap/m/RadioButton",
  "sap/m/TextArea",
  "sap/m/Input",
  "sap/m/VBox",
  "sap/m/HBox",
  "sap/m/library",
  "sap/m/Page",
  "sap/m/MessageToast",
], function (Button, RadioButton, TextArea, Input, VBox, HBox, library, Page, MessageToast) {

	oGlobalEventBus.subscribeOnce("create-chatPage", function () {
		var handleSendMessagePress = function () {
			var bValidChat;
			var oChatMessageInput = sap.ui.getCore().byId("chatMessageInput");
			if (oChatMessageInput.getValue().length == 0) {
			  bValidChat = false;
			  oChatMessageInput.setValueState("Error");
			  oChatMessageInput.setValueStateText("Bitte gebe Sie eineNachricht ein.");
			} else {
			  oChatMessageInput.setValueState("None");
			  bValidChat = true;
			}

			if (bValidChat) {
			  MessageToast.show("Nachricht gesendet!");
			}
		}

    var oChatWindowInput = new TextArea({
      id: "chatAreatInput",
	  height: "80vh",
      maxLength: 30,
      width: "18rem"
    });

    var oChatMessageInput = new Input({
      id: "chatMessageInput",
      maxLength: 30,
      placeholder: "Nachricht",
      width: "18rem"
    });

    var oSendButton = new Button({
      id: "sendChatMessageButton",
      text: "Senden",
      type: "Emphasized",
      press: handleSendMessagePress
    });

    return new Page({
      id: "chatPage",
      title: "Chat",
      showNavButton: true,
      navButtonPress: function () {
        window.history.back();
      },
      titleAlignment: "Center",
      content: [
        new VBox({
          justifyContent: "Start",
          alignItems: "Center",
          items: [
            oChatWindowInput,
            oChatMessageInput,
            oSendButton
          ]
        }).addStyleClass("sapUiMediumMarginTop")
      ]
    });
	
	var responeJSON = JSON.parse(doWSRequest("send-chatmessage"));

  });
});
