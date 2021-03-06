require('simplemde/dist/simplemde.min.css');
const Simplemde = require('simplemde/dist/simplemde.min');

const defaultOpt = {
    autoDownloadFontAwesome: false,
    promptURLs: true,
    showIcons: ['code', 'table'],
    spellChecker: false,
	status: ["autosave", "lines", "words", "cursor"], 
}

export default addOpt => {
    const config = Object.assign({}, defaultOpt, typeof addOpt === 'object' && addOpt);
    return new Simplemde(config);
}

