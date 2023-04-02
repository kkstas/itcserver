import PDFDocument from "pdfkit";
import { IBuildCashOutPDF } from "../types";

/**
 * @param data dane transakcji CashOut
 * @param dataCallback callback wykorzystywany przez Controllera do streamoania danych
 * @param endCallback callback wykorzystywany przez Controllera przy zakończeniu streamu danych
 */
export const buildCashOutPDF: IBuildCashOutPDF = (
    data,
    dataCallback,
    endCallback
) => {
    const doc = new PDFDocument({ size: "A4" });

    doc.on("data", dataCallback);
    doc.on("end", endCallback);

    // wysokość na której ma się zaczynać pierwsza część potwierdzenia
    const areaOneStartHeight = 250; // czyli data transakcji, terminal, lokalizacja itd.

    // wysokość na której ma się zaczynać druga część potwierdzenia
    const areaTwoStartHeight = 460; // czyli nr karty, kwota transakcji

    const footerStartHeight = 620; // wysokość na której ma się zaczynać footer z numerem infolinii, adresem strony planetcash i tekstem "dziękujemy..."

    // odległość od lewej krawędzi dla całej zawartości pliku
    const leftRowMargin = 44;

    // dosunięcie do prawej krawędzi dla całej zawartości pliku
    const rightRowMargin = 350;

    const denominationMargin = 353; // dosunięcie denomination do prawej części
    const denominationStartHeight = 530; // wysokość na której znajduje się denominacja
    const denominationRowSpacing = 15; // wysokość jednego wiersza, każdy kolejny wiersz jest mnożony przez swoją kolejkę razy ta wartość

    const currentWorkingDirectory = process.cwd();

    const planetCashLogoPath = `${currentWorkingDirectory}/static/images/planet-cash-logo-color.png`; // Link do głównego logo na górze pokwitowania

    // --------------------------- linki do fontów --------------------------- //
    const montserratRegularPath = `${currentWorkingDirectory}/static/fonts/Montserrat-Regular.ttf`;
    const montserratMediumPath = `${currentWorkingDirectory}/static/fonts/Montserrat-Medium.ttf`;
    const montserratBoldPath = `${currentWorkingDirectory}/static/fonts/Montserrat-Bold.ttf`;
    const robotoMonoBoldPath = `${currentWorkingDirectory}/static/fonts/RobotoMono-Bold.ttf`;
    const robotoMonoRegularPath = `${currentWorkingDirectory}/static/fonts/RobotoMono-Regular.ttf`;
    // ----------------------------------------------------------------------- //

    // ------------------------------------------------------------------------//
    // -------------------------- STYLING DOKUMENTU: ------------------------- //

    // ----------------------------------------------------------------------- //
    // ----------- ROW Z INFO O LOKALIZACJI, DACIE, NR TRX etc. -------------- //
    doc.image(planetCashLogoPath, leftRowMargin, 60, {
        fit: [200, 250],
    });

    doc.font(montserratRegularPath, 14);
    doc.text("Data i czas", leftRowMargin, areaOneStartHeight, {
        width: 200,
        align: "left",
    });
    doc.font(montserratMediumPath, 14);
    doc.text(
        data.transactionStartDateTime, // 12.11.2023 18:15:13
        rightRowMargin,
        areaOneStartHeight,
        {
            width: 200,
            align: "right",
        }
    );
    // row 2
    doc.font(montserratRegularPath, 14);
    doc.text("Terminal", leftRowMargin, areaOneStartHeight + 25, {
        width: 200,
        align: "left",
    });
    doc.font(montserratMediumPath, 14);
    doc.text(
        data.deviceName, // RNET6338
        rightRowMargin,
        areaOneStartHeight + 25,
        {
            width: 200,
            align: "right",
        }
    );
    // row 3
    doc.font(montserratRegularPath, 14);
    doc.text("Nr transakcji", leftRowMargin, areaOneStartHeight + 50, {
        width: 200,
        align: "left",
    });
    doc.font(montserratMediumPath, 14);
    doc.text(
        data.transactionID, // 02C5C7223161I0004812
        rightRowMargin,
        areaOneStartHeight + 50,
        {
            width: 200,
            align: "right",
        }
    );
    //row 4

    doc.font(montserratRegularPath, 14);
    doc.text("Lokalizacja", leftRowMargin, areaOneStartHeight + 75, {
        width: 200,
        align: "left",
    });
    // lokalizacja - linia 1
    doc.font(montserratMediumPath, 14);
    doc.text(
        data.localizationName, // Biedronka
        rightRowMargin,
        areaOneStartHeight + 75,
        {
            width: 200,
            align: "right",
        }
    );
    // lokalizacja - linia 2
    doc.text(
        data.localizationStreet, // Zwycięska 9-23
        rightRowMargin,
        areaOneStartHeight + 95,
        {
            width: 200,
            align: "right",
        }
    );
    // lokalizacja - linia 3
    doc.text(
        data.localizationCity, // Wrocław
        rightRowMargin,
        areaOneStartHeight + 115,
        {
            width: 200,
            align: "right",
        }
    );
    // ----------- KONIEC ROW Z INFO  ------------------------------ //
    // ----------- O LOKALIZACJI, DACIE, NR TRX etc. --------------- //
    // ------------------------------------------------------------- //

    doc.font(montserratRegularPath, 4);
    doc.text(
        "____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________",
        leftRowMargin,
        areaTwoStartHeight - 30,
        {
            width: 505,
            align: "center",
        }
    );

    // ------------------------------------------------------------- //
    // ----------- ROW Z INFO O NR KARTY I KWOCIE WYPŁATY ---------- //

    // NR KARTY

    doc.font(montserratRegularPath, 14);
    doc.text("Numer karty:", leftRowMargin, areaTwoStartHeight, {
        width: 200,
        align: "left",
    });

    doc.font(montserratMediumPath, 16);
    doc.text(
        data.tempcardNumberFormatted, // 40 56** **** ** *532
        rightRowMargin,
        areaTwoStartHeight,
        {
            width: 200,
            align: "right",
        }
    );
    // KWOTA WYPŁATY
    doc.font(montserratMediumPath, 16);
    doc.text("WYPŁATA:", leftRowMargin, areaTwoStartHeight + 25, {
        width: 200,
        align: "left",
    });
    doc.font(montserratMediumPath, 30);
    doc.text(
        `${data.amountValue},00 ${data.currency}`, // 200,00 PLN
        rightRowMargin - 197,
        areaTwoStartHeight + 25,
        {
            width: 400,
            align: "right",
        }
    );

    // --------- KONIEC ROW Z INFO O NR KARTY I KWOCIE ------------- //
    // ------------------------------------------------------------- //

    // ------------------------------------------------------------- //
    // ----------------------- FOR LOOP ---------------------------- //
    // ------------- DO WYŚWIETLANIA DENOMINACJI ------------------- //
    // ------------------------------------------------------------- //

    let rowCounter = 0; // służy do określenia pozycji wiersza
    for (const row of data.denomination) {
        doc.font(robotoMonoRegularPath, 12);
        doc.text(
            `${row.denom},00 ${data.currency}`,
            denominationMargin,
            denominationStartHeight + rowCounter * denominationRowSpacing,
            {
                width: 140,
                align: "left",
            }
        );
        doc.text(
            "*",
            denominationMargin + 80,
            denominationStartHeight + rowCounter * denominationRowSpacing,
            {
                width: 40,
            }
        );
        doc.text(
            `${row.count}`,
            denominationMargin + 62,
            denominationStartHeight + rowCounter * denominationRowSpacing,
            {
                width: 40,
                align: "right",
            }
        );
        doc.text(
            "=",
            denominationMargin + 108,
            denominationStartHeight + rowCounter * denominationRowSpacing,
            {
                width: 40,
                align: "left",
            }
        );
        doc.text(
            `${row.denom * row.count},00 ${data.currency}`,
            denominationMargin + 115,
            denominationStartHeight + rowCounter * denominationRowSpacing,
            {
                width: 80,
                align: "right",
            }
        );
        rowCounter++;
    }
    // --------------- KONIEC FOR LOOPA DO DENOMINACJI ---------------- //
    // ---------------------------------------------------------------- //

    doc.font(montserratRegularPath, 4);
    doc.text(
        "____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________",
        leftRowMargin,
        footerStartHeight + 20,
        {
            width: 505,
            align: "center",
        }
    );

    // ---------------------------------------------------------------- //
    // ------------------------- STOPKA ------------------------------- //
    doc.font(montserratRegularPath, 10)
        .fillColor("#000000")
        .text("TEL. 801 501 601", 0, footerStartHeight + 64, {
            link: "tel:+48801-501-601",
            underline: false,
            align: "center",
            width: 600,
        });
    doc.fontSize(12)
        .fillColor("#004c98")
        .text("www.planetcash.pl", 0, footerStartHeight + 80, {
            link: "http://planetcash.pl/",
            underline: true,
            align: "center",
            width: 600,
        });

    doc.fontSize(14)
        .fillColor("#000000")
        .text("Dziękujemy i zapraszamy ponownie!", 0, footerStartHeight + 100, {
            align: "center",
            width: 600,
        });

    // ---------------------------------------------------------------- //
    // --------------------- KONIEC STOPKI ---------------------------- //

    // --------------------- KONIEC STYLINGU -------------------------- //
    // ----------------------- DOKUMENTU ------------------------------ //

    doc.end();
};
