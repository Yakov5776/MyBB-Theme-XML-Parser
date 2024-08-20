# MyBB Theme XML Parser

This Node.js script parses a `mybb_theme.xml` file and extracts the stylesheets and templates, saving them as individual `.css` and `.html` files in organized directories.

## Features

- **XML Parsing**: Uses the `xml2js` library to parse the MyBB theme XML file.
- **Automatic Directory Creation**: Creates directories based on the theme name, with separate folders for stylesheets and templates.
- **File Output**: Saves each stylesheet as a `.css` file and each template as an `.html` file.