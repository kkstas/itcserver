"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pdfController = void 0;
const pdf_service_1 = require("../service/pdf-service");
const pdfController = (req, res, _next) => {
    // const data = getExampleCashOutTrxData();
    const reqData = {
        transactionStartDateTime: `${req.query.a}`,
        // deviceName: `${req.query.b}`,
        deviceName: `TWROHYO4`,
        transactionID: `${req.query.c}`,
        // localizationName: `${req.query.d}`,
        localizationName: "Pasaż Handlowy",
        // localizationStreet: `${req.query.e}`,
        localizationStreet: "Fieldorfa 2",
        // localizationCity: `${req.query.f}`,
        localizationCity: "Gdańsk",
        tempcardNumberFormatted: `${req.query.g}`,
        amountValue: Number(req.query.h),
        currency: `${req.query.i || "PLN"}`,
    };
    // przy 'Content-Disposition' określasz czy jako attachment ma się pobierać czy ma się wyświetlić w oknie przeglądarki
    const contentDispositionString = "attachment;filename=planet-cash-receipt-" +
        new Date().toISOString() +
        ".pdf";
    const stream = res.writeHead(200, {
        "Content-Type": "application/pdf",
        "Content-Disposition": contentDispositionString,
    });
    (0, pdf_service_1.buildCashOutPDF)(reqData, // dane do pokwitowania
    (chunk) => stream.write(chunk), () => stream.end());
};
exports.pdfController = pdfController;
// const queryString = "?a=12:24:43&b=RNET6338&c=asldkfjwod fw&d=ITCARD&e=ul. Zwycięska 43&f=Wrocław&g=234234*******3242342&h=200,00 PLN";
