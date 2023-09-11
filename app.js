const textDiv = document.getElementById('text-space');
const charCountElement = document.getElementById('char-count');
const wordCountElement = document.getElementById('word-count');
const converter = new showdown.Converter();
let isHtml = false;

// Tema
function changeTheme() {
    document.body.classList.toggle('dark');
    document.body.classList.toggle('light');
    console.log(document.body.className);
}

// Local Storage
function saveTextToLocalStorage() {
    const textDivContent = textDiv.innerText;
    localStorage.setItem('textContent', textDivContent);
}

function loadTextFromLocalStorage() {
    const savedText = localStorage.getItem('textContent');
    if (savedText) {
        textDiv.innerText = savedText;
    }
}

// Conteggio caratteri
function countChars() {
    const textDivContent = textDiv.innerText;
    const trimmedText = textDivContent.trim();
    return trimmedText.length;
}

function updateCharCount() {
    const count = countChars();
    charCountElement.textContent = `Numero di caratteri: ${count}`;
}

// Conteggio parole
function countWords() {
    const textDivContent = textDiv.innerText;
    const dataArray = textDivContent.trim().split(/\s+/);
    const wordArray = dataArray.filter(word => word !== '');
    return wordArray.length;
}

function updateWordCount() {
    const count = countWords();
    wordCountElement.textContent = `Numero di parole: ${count}`;
}

// Conversione Markdown/HTML
function toggleConversion() {
    const textContent = textDiv.textContent.trim();
    const markdownText = isHtml ? converter.makeHtml(textContent) : converter.makeMarkdown(textContent);
    textDiv.innerHTML = markdownText;
    isHtml = !isHtml;
}

// Download testo
function downloadText() {
    const textDivContent = textDiv.innerText;
    const blob = new Blob([textDivContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = 'new-document.txt';

    document.body.appendChild(downloadLink);
    downloadLink.click();

    URL.revokeObjectURL(url);
    document.body.removeChild(downloadLink);
}

// Inizializzazione
document.addEventListener('DOMContentLoaded', () => {
    loadTextFromLocalStorage();
    updateCharCount();
    updateWordCount();
});

// Event Listeners
document.getElementById('theme-btn').addEventListener('click', changeTheme);
document.getElementById('download-btn').addEventListener('click', downloadText);
document.getElementById('markdown-btn').addEventListener('click', toggleConversion);

textDiv.addEventListener('input', () => {
    saveTextToLocalStorage();
    updateCharCount();
    updateWordCount();
});
