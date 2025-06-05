import React, { useEffect} from "react";
import $ from "jquery";
import pageTurnSound from "/src/assets/page-turn02-103822.mp3";

function Turn({
  style = {},
  className = "",
  width,
  height,
  pageType,
  children,
  myRef
}) {
  const audio = new Audio(pageTurnSound);
  useEffect(() => {
    const flipbookEL = myRef.current;

    if (flipbookEL) {
      const handleResize = () => {
        flipbookEL.style.width = "";
        flipbookEL.style.height = "";
        $(flipbookEL).turn(
          "size",
          flipbookEL.clientWidth,
          flipbookEL.clientHeight
        );
      };

      window.addEventListener("resize", handleResize);

      const isTouch = 'ontouchstart' in window;
      $(flipbookEL).turn({
        width: width,
        autoCenter: true,
        height: height,
        display: pageType,
        turnCorners: 'bl,br',
        gradients: true,
        cornerSize: 100,
        duration: 1200,
        corners: {
          backward: ['bl', 'tl'],
          forward: ['br', 'tr'],
          all: ['tl', 'bl', 'tr', 'br', 'l', 'r']
        },
        when: {
          turned: function (e, page) {
            console.log("Current view: ", $(this).turn("view"));
          },
          turning: function (e, page, view) {
            console.log("Turning to: ", page);
            audio.currentTime = 0;
            audio.play().catch(error => {
              console.log("Audio playback error:", error);
            });
          },
        },
      });

      return () => {
        window.removeEventListener("resize", handleResize);
        $(flipbookEL).turn("destroy").remove();
      };
    }
  }, []);
  useEffect(() => {
    const flipbookEL = myRef.current;
    if (flipbookEL) {
      $(flipbookEL).turn("size", width, height);
      $(flipbookEL).turn("display", pageType);
    }
  }, [width, height]);
  return (
    <div className={className} style={{ ...style }} ref={myRef}>
      {children}
    </div>
  );
}

export default Turn;
