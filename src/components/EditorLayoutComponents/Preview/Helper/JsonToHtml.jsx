const JsonToHtml = (pageData) => {
    if (!pageData) return [];
    const parseData = pageData.map((page) => convertToHtml(JSON.parse(page.pageData), page._id));
    return parseData;
};

function convertToHtml(page, pageId) {
    return {
        pageId: pageId,
        pageData: page.shapes.map((shape) => { return { shape } }),
        background: page.background,
        width: page.CANVAS_WIDTH,
        height: page.CANVAS_HEIGHT,
    }

}
export default JsonToHtml;