import {Asset} from "expo-asset";

export const fetchCsvData = async () => {
    const asset = Asset.fromModule(require('../assets/wienerlinien-ogd-haltestellen.csv'));
    await asset.downloadAsync();

    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', asset.uri, true);
        xhr.responseType = 'text';

        xhr.onload = () => {
            const text = xhr.responseText;
            resolve(text);
        };

        xhr.onerror = () => {
            reject(xhr.statusText);
        };

        xhr.send();
    });
}