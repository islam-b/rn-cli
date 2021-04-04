

function parseSentence(words) {
    console.log(words);
    var sentence = "";
    for (var i = 1; i < words.length; i++) {
        sentence = sentence + words[i] + " ";
    }
}

function showHelp() {                                                             
    
    console.log('\nOptions:\r')  
    console.log('    -b, --base-url\t' + '      ' + 'Base url of the abp project.' + '\t\t' + '[string]\r')  
    console.log('    -m, --module\t' + '      ' + 'Taret modu00le.' + '\t\t' + '[string]\r')  
    console.log('    -r, --rootnamespace\t' + '      ' + 'Root namespace.' + '\t\t' + '[string]\r')  
    console.log('    -t, --target\t' + '      ' + 'Target folder to copy files.' + '\t\t' + '[string]\r')  
    console.log('\t--help\t\t      ' + 'Show help.' + '\t\t\t' + '[string]\n')  
}

module.exports = { parseSentence:parseSentence  , showHelp :showHelp  };