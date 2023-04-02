"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildCashOutPDF = void 0;
const pdfkit_1 = __importDefault(require("pdfkit"));
const buildCashOutPDF = (dataCallback, endCallback) => {
    const doc = new pdfkit_1.default();
    doc.on("data", dataCallback);
    doc.on("end", endCallback);
    const areaOneStartHeight = 250;
    const areaTwoStartHeight = 460;
    const footerStartHeight = 570;
    const leftRowMargin = 90;
    const rightRowMargin = 320;
    const denominationMargin = 322;
    const denominationStartHeight = 520;
    const denominationRowSpacing = 15;
    const planetCashLogoPath = `${process.cwd()}/static/images/planet-cash-logo-color.png`;
    // const monoPath = `${process.cwd()}/static/fonts/MesloLGS-NF-Bold.ttf`;
    const montserratRegularPath = `${process.cwd()}/static/fonts/Montserrat-Regular.ttf`;
    const montserratMediumPath = `${process.cwd()}/static/fonts/Montserrat-Medium.ttf`;
    const montserratBoldPath = `${process.cwd()}/static/fonts/Montserrat-Bold.ttf`;
    const robotoMonoBoldPath = `${process.cwd()}/static/fonts/RobotoMono-Bold.ttf`;
    const robotoMonoRegularPath = `${process.cwd()}/static/fonts/RobotoMono-Regular.ttf`;
    // styling dokumentu:
    doc.image(planetCashLogoPath, leftRowMargin, 60, {
        fit: [200, 250],
    });
    doc.font(montserratRegularPath, 12);
    doc.text("Data i czas", leftRowMargin, areaOneStartHeight, {
        width: 200,
        align: "left",
    });
    doc.text("03.04.2023, 11:29", rightRowMargin, areaOneStartHeight, {
        width: 200,
        align: "right",
        indent: 30,
    });
    // row 2
    doc.text("Terminal", leftRowMargin, areaOneStartHeight + 25, {
        width: 200,
        align: "left",
    });
    doc.text("RNET6338", rightRowMargin, areaOneStartHeight + 25, {
        width: 200,
        align: "right",
    });
    // row 3
    doc.text("Nr transakcji", leftRowMargin, areaOneStartHeight + 50, {
        width: 200,
        align: "left",
    });
    doc.text("023402375203984723", rightRowMargin, areaOneStartHeight + 50, {
        width: 200,
        align: "right",
    });
    //row 4
    doc.text("Lokalizacja", leftRowMargin, areaOneStartHeight + 75, {
        width: 200,
        align: "left",
    });
    // lokalizacja linia 1
    doc.text("ITCARD", rightRowMargin, areaOneStartHeight + 75, {
        width: 200,
        align: "right",
    });
    // lokalizacja linia 2
    doc.text("ul. Zwycięska 43", rightRowMargin, areaOneStartHeight + 95, {
        width: 200,
        align: "right",
    });
    // lokalizacja linia 3
    doc.text("Wrocław", rightRowMargin, areaOneStartHeight + 115, {
        width: 200,
        align: "right",
    });
    doc.text("_______________________________________________________________________", leftRowMargin, areaTwoStartHeight - 30, {
        width: 435,
        align: "justify",
    });
    // cash etc
    // row 1 card number
    doc.text("Numer karty:", leftRowMargin, areaTwoStartHeight, {
        width: 200,
        align: "left",
    });
    doc.font(montserratMediumPath, 14);
    doc.text("4056**7323", rightRowMargin, areaTwoStartHeight, {
        width: 200,
        align: "right",
    });
    // row 2 cashout
    doc.font(montserratMediumPath, 14);
    doc.text("WYPŁATA:", leftRowMargin, areaTwoStartHeight + 25, {
        width: 200,
        align: "left",
    });
    // doc.font(robotoMonoRegularPath, 20);
    doc.font(montserratMediumPath, 22);
    doc.text("500.00 PLN", rightRowMargin, areaTwoStartHeight + 25, {
        width: 200,
        align: "right",
    });
    ////////////////////////////////////////////////////
    ////// DENOMINATION ROW START /////////////////////////////
    doc.font(robotoMonoRegularPath, 10);
    doc.text("50.00 PLN", denominationMargin, denominationStartHeight, {
        width: 200,
        align: "left",
    });
    doc.text("*", denominationMargin + 72, denominationStartHeight, {
        width: 30,
    });
    doc.text("2", denominationMargin + 72, denominationStartHeight, {
        width: 28,
        align: "right",
    });
    doc.text("=", denominationMargin + 115, denominationStartHeight, {
        width: 30,
        align: "left",
    });
    doc.text("200.00 PLN", denominationMargin + 115, denominationStartHeight, {
        width: 80,
        align: "right",
    });
    //// DENOMINATION ROW END ////////////
    ////////////////////////////////////////////////////
    ////// DENOMINATION ROW START /////////////////////////////
    doc.font(robotoMonoRegularPath, 10);
    doc.text("100.00 PLN", denominationMargin, denominationStartHeight + denominationRowSpacing, {
        width: 200,
        align: "left",
    });
    doc.text("*", denominationMargin + 72, denominationStartHeight + denominationRowSpacing, {
        width: 30,
    });
    doc.text("1", denominationMargin + 72, denominationStartHeight + denominationRowSpacing, {
        width: 28,
        align: "right",
    });
    doc.text("=", denominationMargin + 115, denominationStartHeight + denominationRowSpacing, {
        width: 30,
        align: "left",
    });
    doc.text("100.00 PLN", denominationMargin + 115, denominationStartHeight + denominationRowSpacing, {
        width: 80,
        align: "right",
    });
    //// DENOMINATION ROW END ////////////
    ////////////////////////////////////////////////////
    ////// DENOMINATION ROW START /////////////////////////////
    doc.font(robotoMonoRegularPath, 10);
    doc.text("200.00 PLN", denominationMargin, denominationStartHeight + 2 * denominationRowSpacing, {
        width: 200,
        align: "left",
    });
    doc.text("*", denominationMargin + 72, denominationStartHeight + 2 * denominationRowSpacing, {
        width: 30,
    });
    doc.text("1", denominationMargin + 72, denominationStartHeight + 2 * denominationRowSpacing, {
        width: 28,
        align: "right",
    });
    doc.text("=", denominationMargin + 115, denominationStartHeight + 2 * denominationRowSpacing, {
        width: 30,
        align: "left",
    });
    doc.text("200.00 PLN", denominationMargin + 115, denominationStartHeight + 2 * denominationRowSpacing, {
        width: 80,
        align: "right",
    });
    //// DENOMINATION ROW END ////////////
    doc.font(montserratRegularPath, 12);
    doc.text("_______________________________________________________________________", leftRowMargin, footerStartHeight + 20, {
        width: 435,
        align: "justify",
    });
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
exports.buildCashOutPDF = buildCashOutPDF;
