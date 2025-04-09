export default function PanelRight({ isRightLateralCollapse, setIsRightLateralCollapse, isPageShow, setIsPageShow }) {

  const elements = [
    {
      "text": "Pages",
      "icon": `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="15" viewBox="0 0 20 15"><path fillOpacity=".87" d="M18.889 0H11.5L10 1.615 8.5 0H1.022C.459 0 0 .417 0 .93v11.027c0 .513.548 1.077 1.111 1.077.376 0 2.672-.011 6.889-.034l1 1.5h2l1-1.5c4.217.023 6.513.034 6.889.034.564 0 1.111-.564 1.111-1.077V1.077C20 .564 19.452 0 18.889 0zM11 12V3l1-1h6v9h-6l-1 1zM8 2l1 1v9l-1-1H2V2h6z"></path></svg>`,
    },
    {
      "text": "Layers",
      "icon": `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="18" viewBox="0 0 20 18"><path fillOpacity=".87" d="M0 8.986c.088-.531.254-.86.5-.986s.746-.14 1.5-.041l7.544 3.878a1 1 0 00.914 0L18 7.96c.76-.096 1.26-.082 1.501.041.24.123.407.452.5.986l-9.084 4.672a2 2 0 01-1.83 0L0 8.986zm1.734-4.977L9.085.228a2 2 0 011.83 0l7.35 3.78a1 1 0 01-.002 1.78l-7.352 3.76a2 2 0 01-1.822 0l-7.353-3.76a1 1 0 01-.002-1.78zM10 1.812L4 4.9l6 3.06 5.998-3.06L10 1.812zm.457 14.138l7.541-3.877c.536-.288 1.037-.312 1.502-.073.465.239.632.605.499 1.1l-9.084 4.672a2 2 0 01-1.83 0L0 13.1c.04-.583.207-.95.5-1.1.293-.15.793-.126 1.5.073l7.543 3.877a1 1 0 00.914 0z"></path></svg>`
    }
  ]

  return (
    <aside className="pr z-[11]">
      <div className="tabs border-l border-gray-300">

        {elements.map((element, index) => (

          <div onClick={() => {
            setIsPageShow(element.text == 'Pages');
            (isPageShow && element.text == 'Pages' || !isPageShow && element.text != 'Pages')? setIsRightLateralCollapse(!isRightLateralCollapse):setIsRightLateralCollapse(true);
          }} id={`categoryButton_${index}`} className="category-button" role="presentation">
            <div className="icon-holder">
              <div dangerouslySetInnerHTML={{ __html: element.icon }}></div>
              <div className="uploading-progress" style={{ display: "none" }}></div>
            </div>
            <span>{element.text}</span>
          </div>
        ))}

        <span className="selected-tab" style={{ width: "60px" }}></span>
      </div>
    </aside>
  );
};
