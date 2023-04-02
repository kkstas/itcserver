export interface CashOutTrxData {
    transactionStartDateTime: string; // state.transactionManager.transactionStartDateTime
    deviceName: string; // state.blockManager.deviceName
    transactionID: string; // state.transactionManager.transactionID
    localizationName: string; // state.blockManager.localizationName
    localizationStreet: string; // state.blockManager.localizationStreet
    localizationCity: string; // state.blockManager.localizationCity
    tempcardNumberFormatted: string; // tempcardNumberFormatted
    amountValue: number; // device.cashmodule.cashInExt.data.recognizedAllBanknotesAmount
    currency: string;
    denomination: { denom: number; count: number }[];
}

// buildCashOutPDF types:

type DataCallback = (...args: any[]) => void;
type EndCallback = () => void;

export type IBuildCashOutPDF = (
    data: CashOutTrxData,
    dataCallback: DataCallback,
    endCallback: EndCallback
) => void;
