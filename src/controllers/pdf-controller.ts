import { RequestHandler } from "express";
import { buildCashOutPDF } from "../service/pdf-service";
import { getExampleCashOutTrxData } from "../utils/exampleData";

export const pdfController: RequestHandler = (req, res, next) => {
    const data = getExampleCashOutTrxData();

    // przy 'Content-Disposition' określasz czy jako attachment ma się pobierać czy ma się wyświetlić w oknie przeglądarki
    const contentDispositionString =
        "attachment;filename=planet-cash-receipt-" +
        new Date().toISOString() +
        ".pdf";
    const stream = res.writeHead(200, {
        "Content-Type": "application/pdf",
        "Content-Disposition": contentDispositionString,
    });

    buildCashOutPDF(
        data, // dane do pokwitowania
        (chunk) => stream.write(chunk),
        () => stream.end()
    );
};

// const queryString = "?a=12:24:43&b=RNET6338&c=asldkfjwod fw&d=ITCARD&e=ul. Zwycięska 43&f=Wrocław&g=234234*******3242342&h=200,00 PLN";
