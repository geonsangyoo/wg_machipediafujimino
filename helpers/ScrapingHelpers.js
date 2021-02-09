const ScrapingHelpers = {
    getTagAttribute: (html, tagName, attribute) => {
        let startIndex = html.indexOf(`<${tagName}`);
        let attributeStartIndex = html.indexOf(`${attribute}=`, startIndex) + String(attribute).length + 1;
        let attributeEndIndex = html.indexOf("\"", attributeStartIndex + 1);

        return html.slice(attributeStartIndex + 1, attributeEndIndex);
    },
    getTagValue: (html, tagName, startClassName, className) => {
        let startIndex = ( startClassName === '' ) ? 0 : html.indexOf(`<${tagName}`, html.indexOf(startClassName));
        let classStartIndex = html.indexOf(`class="${className}">`, startIndex) + String(className).length + 9;
        let classEndIndex = html.indexOf("<", classStartIndex + 1);

        return html.slice(classStartIndex, classEndIndex);
    },
    getTagValueWithoutClass: (html, tagName, startSearch = 0) => {
        let startIndex = html.indexOf(`<${tagName}`, startSearch);
        let startEndTagIndex = html.indexOf(">", startIndex + 1);
        let endIndex = html.indexOf("<", startEndTagIndex + 1);

        return {
            string: html.slice(startEndTagIndex + 1, endIndex),
            endIndex: endIndex
        };
    },
};

export default ScrapingHelpers;
