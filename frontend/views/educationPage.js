sap.ui.require([
    "sap/m/Page",
    "sap/m/Text",
    "sap/m/Title",
    "sap/m/VBox",
    "sap/m/HBox",
    "sap/ui/model/json/JSONModel",
    "sap/m/Image"
], function (Page, Text, Title, VBox, HBox, JSONModel, Image) {
    oGlobalEventBus.subscribeOnce("create-educationPage", function () {

        var oModel = new JSONModel({
            phone: sap.ui.Device.system.phone
        });

        var formatterImageWidth = function (bPhone) {
            return bPhone ? "18rem" : "auto";
        };

        var sText1 = "Liebe/r Helfer/in,\n\n"+
		"es ist schön zu sehen, dass so viele Menschen sich in ganz Deutschland freiwillig melden, um Bedürftige zu unterstützen.\n"+
		"Wir wollen mit dieser App unseren Anteil dazu beitragen.\n\n"+
		"Um die Zahl der Infektionen möglichst gering zu halten, gibt es einige ganz einfache aber sehr wirkungsvolle Tipps und Informationen.";

        var sText2 = "Der aktuelle SARS-CoV-2 Erreger verbreitet sich über Tröpfchen- oder Schmierinfektionen.\n"+
        "Die Infektion über Tröpfchen entsteht durch Viren, die sich noch in der Luft halten, wenn eine infizierte Person z.B. Hustet.\n"+
        "Die Schmierinfektionen breiten sich über Flächen aus, wenn sich also jemand beim Husten oder Niesen die Hand vor den Mund hält und dann z.B. eine Türklinke berührt, In diesem Fall können dort Viren zurückbleiben, die jemand anderes aufnimmt.\n"+
        "Das größte Problem dabei, ist die schnelle Ausbreitung des Virus, dazu gibt es unten noch eine Erklärung.";

        var sText3 = "Hände waschen:\n"+
        "Händewaschen ist einer der einfachsten Wege die Verbreitung zu verlangsamen. Um die nötige Länge einzuhalten kann man z.B. 2 mal Happy Birthday singen. "+
		"Dazu solltet ihr ausreichend Seife benutzen und die Handgelenke nicht vergessen. Eine genau Beschreibung findet ihr hier.\n"+
        "Damit könnt Ihr das Risiko für Schmierinfektionen deutlich schmälern.\n\n"+

        "Richtig Niesen und Husten:\n"+
        "Ein weiterer wichtiger Punkt ist das richtige Niesen und Husten. Dabei solltet Ihr in euren Ellenbogen husten und euch von anderen Personen wegdrehen. "+
		"Dadurch werden die Tröpfcheninfektionen durch Viren in der Luft stark reduziert. Außerdem gibt es auch weniger Schmierinfektionen, als wenn Ihr euch die Hand vor den Mund haltet, "+
		"da dabei viele Keime an euren Handflächen zurückbleiben und über Gegenstände weitergegeben werden können\n\n"+

        "Abstand halten:\n"+
        "Die nächste Regel ist ebenso einfach und simpel.\n"+
        "Haltet Abstand. Damit minimiert Ihr das Risiko einer Tröpfcheninfektion durch Niesen, Husten oder Tröpfchen, die allgemein beim atmen und sprechen eurer mitmenschen ausgestoßen werden.\n\n"+

        "Sozialkontakte reduzieren:\n"+
        "Das bedeutet vereinfacht, dass Ihr nur noch wenn es nötig ist aus dem Haus geht.Wenn Ihr zum Arzt müsst, oder einkaufen müsst.\n"+
        "Das reduzieren der Sozialkontakte ist eine der wichtigsten Maßnahme überhaupt. Denn wo es keinen Kontakt gibt, kann sich auch niemand anstecken.\n\n"+

        "Ins Gesicht fassen:\n"+
        "Dies bedeutet ganz einfach, dass Ihr darauf achten solltet, euch nicht in euer Gesicht zu fassen. Das macht man oft ganz unbewusst. Ein Kratzen an der Nase zum Beispiel. "+
		"Dabei können allerdings Viren von der Hand an Schleimhäute und somit in euren Körper kommen.";

        var sText4 = "\"Die größte Beschränktheit der menschlichen Spezies\", behauptete der verstorbene US-Physiker Al Bartlett, \"ist ihre Unfähigkeit, die Exponentialfunktion zu verstehen\"\n\n"+

        "Wir tun uns wirklich schwer damit, die Zahlen zu erahnen, die durch ein exponentielles Wachstum entstehen können. Dazu gibt es hier einen Artikel, aus dem auch das Zitat oben stammt.\n\n"+

        "In dem Artikel geht um eine Legende, in der der Erfinder des Schachspiels eine Belohnung vom König Indiens bekommen soll. "+
		"Er wünscht sich 1 Reiskorn auf dem ersten Feld eines Schachbretts und auf jedes weitere Feld sollen doppelt so viele Reiskörner wie auf das vorherige Feld gelegt werden. \n\n"+

        "Wie viele Reiskörner es für die 64 Felder werden? 18 Trillionen bzw. 500 Milliarden Tonnen.\n\n"+

        "Darum ist es wichtig, dass jeder sein Bestes gibt, um die Ausbreitung zu verlangsamen.\n"+
        "Das ist zum Glück durch die oben genannten Maßnahmen einfacher, als man es vermutet. Die Tabelle unten zeigt, was man allein durch eine reduktion der Sozialkontakte erreichen kann.";
        return new Page({
            id: "educationPage",
            title: "Informationen zum Sebstschutz und Schutz von Anderen",
            titleAlignment: "Center",
            showNavButton: true,
            navButtonPress: function () {
                window.history.back();
            },
            content: [
                new VBox({
                    justifyContent: "SpaceBetween",
                    items: [
                        new Text({
                            text: sText1
                        }).addStyleClass("sapUiSmallMarginBottom"),
                        new Title({
                            text: "Wie verbreitet sich das Coronavirus?",
                            titleStyle: "H3",
                            wrapping: true,
                            wrappingType: "Hyphenated"
                        }).addStyleClass("sapUiSmallMarginBottom"),
                        new Text({
                            text: sText2
                        }).addStyleClass("sapUiSmallMarginBottom"),
                        new Title({
                            text: "Maßnahmen zur Eindämmung des Virus",
                            titleStyle: "H3",
                            wrapping: true,
                            wrappingType: "Hyphenated"
                        }).addStyleClass("sapUiSmallMarginBottom"),
                        new Text({
                            text: sText3
                        }).addStyleClass("sapUiSmallMarginBottom"),
                        new Title({
                            text: "Exponentielles Wachstum - was ist das und warum ist es ein Problem?",
                            titleStyle: "H3",
                            wrapping: true,
                            wrappingType: "Hyphenated"
                        }).addStyleClass("sapUiSmallMarginBottom"),
                        new Text({
                            text: sText4
                        }).addStyleClass("sapUiSmallMarginBottom"),
                        new HBox({
                            justifyContent: "Center",
                            items: [
                                new Image({
                                    id: "image",
                                    src: "./images/ExponentiellesWachstum.png",
                                    width: {
                                        path: "/phone",
                                        formatter: formatterImageWidth
                                    }
                                })
                            ]
                        })
                    ]
                }).addStyleClass("sapUiSmallMarginTop")
            ]
        }).setModel(oModel).addStyleClass("sapUiContentPadding");
    });
});