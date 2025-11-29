import React, { useEffect } from "react";
import $ from "jquery";
import pageTurnSound from "/assets/page-turn02-103822.mp3";
function Turn({
  style = {},
  className = "",
  width,
  height,
  pageType,
  children,
  myRef,
  visibilitySettings,
  isDisabled = false,
  setCurrentPages,
  isAutoFlipping = false
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
            setCurrentPages($(this).turn("view"));
          },
          turning: function (e, page, view) {
            // console.log("Turning to: ", page);
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
      $(flipbookEL).turn("direction", visibilitySettings?.rightToLeftOrientation ? "rtl" : "ltr");
      // $(flipbookEL).turn("peel", start 
      // $(flipbookEL).turn("peel", "br", true);
      $(flipbookEL).off('turning').on('turning', function (e, page, view) {
        $(flipbookEL).turn("peel", false, true); // stop peel
        if (visibilitySettings?.flipSound) {
          audio.currentTime = 0;
          audio.play().catch(error => {
            console.log("Audio playback error:", error);
          });
        }
      });
    }
  }, [width, height, visibilitySettings?.flipSound, visibilitySettings?.rightToLeftOrientation]);

  useEffect(() => {
    const flipbookEL = myRef.current;
    let autoPlayInterval = null;

    if (flipbookEL && visibilitySettings?.automaticTransition && isAutoFlipping) {
      autoPlayInterval = setInterval(function () {
        const $flipbook = $(flipbookEL);
        if ($flipbook.turn('page') == $flipbook.turn('pages')) {
          $flipbook.turn('page', 1);
        } else {
          $flipbook.turn('next');
        }
      }, (visibilitySettings.automaticTransitionDelay || 4) * 1000);
    }

    return () => {
      if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
      }
    };
  }, [visibilitySettings?.automaticTransition, visibilitySettings?.automaticTransitionDelay, isAutoFlipping]);

  useEffect(() => {
    const flipbookEL = myRef.current;
    if (flipbookEL) {
      if (isDisabled) {
        $(flipbookEL).turn("disable", true);
      } else {
        $(flipbookEL).turn("disable", false);
      }
    }
  }, [isDisabled]);
  return (
    <div className={className} style={{ ...style }} ref={myRef}>
      {children}
    </div>
  );
}

export default Turn;