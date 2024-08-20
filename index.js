const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');

const writeFile = (dir, filename, content) => {
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(path.join(dir, filename), content ? content : '');
};

const parseMyBBTheme = (xmlFile) => {
    fs.readFile(xmlFile, 'utf8', (err, data) => {
        if (err) {
            console.error("Failed to read file:", err);
            return;
        }
        
        xml2js.parseString(data, (err, result) => {
            if (err) {
                console.error("Failed to parse XML:", err);
                return;
            }

            const themeName = result.theme.$.name.replace(/\s+/g, '_').toLowerCase();
            const baseDir = path.join(__dirname, themeName);

            // Parse and save stylesheets
            if (result.theme.stylesheets && result.theme.stylesheets[0].stylesheet) {
                result.theme.stylesheets[0].stylesheet.forEach((stylesheet) => {
                    const name = stylesheet.$.name;
                    const content = stylesheet._;
                    writeFile(path.join(baseDir, 'stylesheets'), `${name}.css`, content);
                });
            }

            // Parse and save templates
            if (result.theme.templates && result.theme.templates[0].template) {
                result.theme.templates[0].template.forEach((template) => {
                    const name = template.$.name;
                    const content = template._;
                    writeFile(path.join(baseDir, 'templates'), `${name}.html`, content);
                });
            }

            console.log(`Templates and stylesheets have been saved to the '${themeName}' directory.`);
        });
    });
};

const showHelp = () => {
    console.log(`
Usage: node script.js <path-to-mybb_theme.xml>

Options:
  --help          Show this help message and exit
`);
};

// Process command-line arguments
const args = process.argv.slice(2);

if (args.length > 0) {
    if (args.includes('--help')) {
        showHelp();
        process.exit(0);
    } else {
        const xmlFile = args[0];
        parseMyBBTheme(xmlFile);
    }
} else {
    console.error("Error: No XML file provided.");
    showHelp();
    process.exit(1);
}