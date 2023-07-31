const fs = require("fs");

const inputUrl = process.argv[2];

function createReportCopy(filePath) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Errore durante la lettura del file', err);
            return;
        }

        const reportFilePath = filePath.replace('.txt', '_report.txt');

        fs.writeFile(reportFilePath, data, (err) => {
            if (err) {
                console.error('Errore durante la scrittura del file', err);
                return;
            }

            console.log('Copia con report creata con successo');

            const dataArray = data.split(' ');
            console.log('Numero di parole:', countWord(dataArray));
            console.log('Numero di caratteri:', countChar(dataArray));
            console.log('Parola più usata:', findmostUsedWord(dataArray));
        });
    });
}

if (!inputUrl) {
    console.error('Per favore, digita il percorso corretto.');
} else {
    createReportCopy(inputUrl);
}

function countChar(dataArray) {
    const countCharsString = dataArray.join('').length;
    return countCharsString;
}

function countWord(dataArray) {
    return dataArray.length;
}

function findmostUsedWord(wordsArray) {
    const wordFrequencyMap = {};

    for (const word of wordsArray) {
        wordFrequencyMap[word] = (wordFrequencyMap[word] || 0) + 1;
    }

    let mostUsedWord = '';
    let highestFrequency = 0;


    for (const word in wordFrequencyMap) {
        if (wordFrequencyMap[word] > highestFrequency) {
            mostUsedWord = word;
            highestFrequency = wordFrequencyMap[word];
        }
    }

    return mostUsedWord;
}
