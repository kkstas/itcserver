"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exampleCashOutTrxData = exports.getExampleCashOutTrxData = void 0;
const getExampleCashOutTrxData = () => {
    const generateDate = new Date().toISOString();
    const dateNow = generateDate.split("T")[0];
    const timeNow = generateDate.split("T")[1].split(".")[0];
    const randomData = randomExampleDataArray[Math.floor(Math.random() * randomExampleDataArray.length)];
    const newData = {
        // ...exampleCashOutTrxData,
        ...randomData,
        transactionStartDateTime: `${dateNow} ${timeNow}`,
    };
    return newData;
};
exports.getExampleCashOutTrxData = getExampleCashOutTrxData;
exports.exampleCashOutTrxData = {
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
const randomExampleDataArray = [
    {
        transactionStartDateTime: "04.04.2023 12:15:13",
        deviceName: "RNET3232",
        transactionID: "02C5W7221351I0004912",
        localizationName: "Biedronka",
        localizationStreet: "ul. Zwycięska 9-23",
        localizationCity: "Wrocław",
        tempcardNumberFormatted: "4056 ** **** *632",
        amountValue: 2200,
        currency: "EUR",
        denomination: [
            {
                denom: 50,
                count: 10,
            },
            {
                denom: 100,
                count: 9,
            },
            {
                denom: 200,
                count: 4,
            },
        ],
    },
    {
        transactionStartDateTime: "04.04.2023 12:15:13",
        deviceName: "PNET0191",
        transactionID: "12W0W2185551I0004912",
        localizationName: "Pawilon Handlowy",
        localizationStreet: "Kazimierza Wielkiego",
        localizationCity: "Pszczyna",
        tempcardNumberFormatted: "4036 ** **** *232",
        amountValue: 900,
        currency: "PLN",
        denomination: [
            {
                denom: 100,
                count: 9,
            },
        ],
    },
    {
        transactionStartDateTime: "04.04.2023 12:15:13",
        deviceName: "PNET0031",
        transactionID: "82W0W2185551I0004912",
        localizationName: "Osiedle",
        localizationStreet: "Królowej Jadwigi 2",
        localizationCity: "Będzin",
        tempcardNumberFormatted: "4099 ** **** *932",
        amountValue: 480,
        currency: "PLN",
        denomination: [
            {
                denom: 20,
                count: 4,
            },
            {
                denom: 50,
                count: 2,
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
    },
];
