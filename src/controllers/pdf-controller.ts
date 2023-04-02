import { RequestHandler } from "express";
import { buildCashOutPDF } from "../service/pdf-service";
import { exampleCashOutTrxData } from "../utils/exampleData";

export const pdfController: RequestHandler = (req, res, next) => {
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
        exampleCashOutTrxData, // dane do pokwitowania
        (chunk) => stream.write(chunk),
        () => stream.end()
    );
};

// const queryString = "?a=12:24:43&b=RNET6338&c=asldkfjwod fw&d=ITCARD&e=ul. Zwycięska 43&f=Wrocław&g=234234*******3242342&h=200,00 PLN";
