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

    const areaOneStartHeight = 250;
    const areaTwoStartHeight = 460;
    const footerStartHeight = 620;
    const leftRowMargin = 90;
    const rightRowMargin = 320;
    const denominationMargin = 322;
    const denominationStartHeight = 520;
    const denominationRowSpacing = 15;

    const currentWorkingDirectory = process.cwd();
    const planetCashLogoPath = `${currentWorkingDirectory}/static/images/planet-cash-logo-color.png`;
    const montserratRegularPath = `${currentWorkingDirectory}/static/fonts/Montserrat-Regular.ttf`;
    const montserratMediumPath = `${currentWorkingDirectory}/static/fonts/Montserrat-Medium.ttf`;
    const montserratBoldPath = `${currentWorkingDirectory}/static/fonts/Montserrat-Bold.ttf`;
    const robotoMonoBoldPath = `${currentWorkingDirectory}/static/fonts/RobotoMono-Bold.ttf`;
    const robotoMonoRegularPath = `${currentWorkingDirectory}/static/fonts/RobotoMono-Regular.ttf`;
    // styling dokumentu:

    doc.image(planetCashLogoPath, leftRowMargin, 60, {
        fit: [200, 250],
    });

    doc.font(montserratRegularPath, 12);
    doc.text("Data i czas", leftRowMargin, areaOneStartHeight, {
        width: 200,
        align: "left",
    });
    doc.text(
        data.transactionStartDateTime, // 12.11.2023 18:15:13
        rightRowMargin,
        areaOneStartHeight,
        {
            width: 200,
            align: "right",
            indent: 30,
        }
    );
    // row 2
    doc.text("Terminal", leftRowMargin, areaOneStartHeight + 25, {
        width: 200,
        align: "left",
    });
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
    doc.text("Nr transakcji", leftRowMargin, areaOneStartHeight + 50, {
        width: 200,
        align: "left",
    });
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
    doc.text("Lokalizacja", leftRowMargin, areaOneStartHeight + 75, {
        width: 200,
        align: "left",
    });
    // lokalizacja - linia 1
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

    doc.text(
        "_______________________________________________________________________",
        leftRowMargin,
        areaTwoStartHeight - 30,
        {
            width: 435,
            align: "justify",
        }
    );

    // row 1 - card number
    doc.text("Numer karty:", leftRowMargin, areaTwoStartHeight, {
        width: 200,
        align: "left",
    });

    doc.font(montserratMediumPath, 14);
    doc.text(
        data.tempcardNumberFormatted, // 40 56** **** ** *532
        rightRowMargin,
        areaTwoStartHeight,
        {
            width: 200,
            align: "right",
        }
    );
    // row 2 - cashout
    doc.font(montserratMediumPath, 14);
    doc.text("WYPŁATA:", leftRowMargin, areaTwoStartHeight + 25, {
        width: 200,
        align: "left",
    });
    doc.font(montserratMediumPath, 22);
    doc.text(
        `${data.amountValue} ${data.currency}`, // 200,00 PLN
        rightRowMargin,
        areaTwoStartHeight + 25,
        {
            width: 200,
            align: "right",
        }
    );

    let rowCounter = 0;
    for (const row of data.denomination) {
        doc.font(robotoMonoRegularPath, 10);
        doc.text(
            `${row.denom} ${data.currency}`,
            denominationMargin + 20,
            denominationStartHeight + rowCounter * denominationRowSpacing,
            {
                width: 100,
                align: "left",
            }
        );
        doc.text(
            "*",
            denominationMargin + 82,
            denominationStartHeight + rowCounter * denominationRowSpacing,
            {
                width: 20,
            }
        );
        doc.text(
            `${row.count}`,
            denominationMargin + 82,
            denominationStartHeight + rowCounter * denominationRowSpacing,
            {
                width: 30,
                align: "right",
            }
        );
        doc.text(
            "=",
            denominationMargin + 135,
            denominationStartHeight + rowCounter * denominationRowSpacing,
            {
                width: 20,
                align: "left",
            }
        );
        doc.text(
            `${row.denom * row.count} ${data.currency}`,
            denominationMargin + 115,
            denominationStartHeight + rowCounter * denominationRowSpacing,
            {
                width: 80,
                align: "right",
            }
        );
        rowCounter++;
    }
    doc.font(montserratRegularPath, 12);
    doc.text(
        "_______________________________________________________________________",
        leftRowMargin,
        footerStartHeight + 20,
        {
            width: 435,
            align: "justify",
        }
    );
    doc.fontSize(10)
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

    doc.end();
};
