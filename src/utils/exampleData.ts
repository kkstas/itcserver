import { CashOutTrxData } from "../types";

export const exampleCashOutTrxData: CashOutTrxData = {
    transactionStartDateTime: "04.04.2023 12:15:13",
    deviceName: "RNET6338",
    transactionID: "02C5C7223161I0004812",
    localizationName: "ITCARD",
    localizationStreet: "ul. Zwycięska 43",
    localizationCity: "Wrocław",
    tempcardNumberFormatted: "4056 ** **** *632",
    amountValue: 500,
    currency: "PLN",
    denomination: [
        {
            denom: 50,
            count: 4,
        },
        {
            denom: 100,
            count: 1,
        },
        {
            denom: 200,
            count: 1,
        },
    ],
};
