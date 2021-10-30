const Content = {
  /**
   *
   * @param {string} contentOrig
   * @param {string} content
   * @param {string} searchStart - search text to mark replacement start
   * @param {string} searchEnd - search text to mark replacement end
   */
  getReplaced(contentOrig, content, searchStart = "", searchEnd = "") {
    if (!contentOrig) throw new Error("replaceFileContent() error: contentOrig empty");
    if (!content) throw new Error("replaceFileContent() error: content empty");
    if (!searchStart) throw new Error("replaceFileContent() error: searchStart is required");
    if (!searchEnd) throw new Error("replaceFileContent() error: searchEnd is required");

    // regexp `g` flag must be included for `lastIndex` to work correctly
    const regStart = new RegExp(`(.*${searchStart}.*\n\w*)`, "gi");
    const regEnd = new RegExp(`.*${searchEnd}.*`, "i");
    const regStartFound = regStart.test(contentOrig);
    const regEndFound = regEnd.test(contentOrig);

    // prettier-ignore
    if (!regStartFound) throw new Error(`replaceFileContent() error: search text "${searchStart}" not found`);
    if (!regEndFound) throw new Error(`replaceFileContent() error: search text "${searchEnd}" not found`);

    // invoking `str.match(regexp)` and `regexp.test(str)` forces regexp lastIndex to walk forward
    contentOrig.match(regStart);
    regStart.test(contentOrig);
    const indexStart = regStart.lastIndex;
    const indexEnd = contentOrig.search(regEnd);

    if (indexStart > indexEnd)
      throw new Error(`replaceFileContent() error: search text "${searchStart}" appeared after ${searchEnd}`);

    const contentNew = contentOrig.substring(0, indexStart) + content + "\n" + contentOrig.substring(indexEnd);
    return contentNew;
  },
  /**
   * Get content where every line is indented by N spaces
   * @param {string} content
   * @param {number} spaces
   */
  indented(content = "", spaces = 2) {
    if (!content) return content;

    return String(content)
      .split("\n")
      .map((v) => "".padStart(spaces, " ") + v)
      .join("\n");
  },
};

module.exports.Content = Content;
