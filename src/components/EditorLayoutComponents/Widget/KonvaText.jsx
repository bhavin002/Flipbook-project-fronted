import React, { useState, useRef } from 'react';
import { Text } from 'react-konva';

export default function KonvaText({ demo, shape, onChange, handleDragStart, handleDrag, scale }) {
  const [isEditing, setIsEditing] = useState(false);
  const textRef = useRef(null);
  const [lastVisible, setLastVisible] = useState(shape.visible);
  const handleTextDblClick = (e) => {
    // Always set lastVisible to true when starting to edit, regardless of current state
    setLastVisible(true);
    setIsEditing(true);
    const textNode = e.target;
    const textPosition = textNode.absolutePosition();
    const areaPosition = {
      x: textPosition.x,
      y: textPosition.y,
    };

    const textarea = document.createElement('textarea');
    demo.current.appendChild(textarea);

    textarea.value = textNode.text();
    textarea.style.position = 'absolute';
    textarea.style.top = areaPosition.y + 'px';
    textarea.style.left = areaPosition.x + 'px';
    textarea.style.width = (textNode.width() - textNode.padding() * 2) + 'px';
    textarea.style.height = textNode.height() + 'px';
    textarea.style.fontSize = textNode.fontSize() + 'px';
    textarea.style.transform = "scale(" + scale.scaleX + "," + scale.scaleY + ")";
    textarea.style.border = 'none';
    textarea.style.padding = '0px';
    textarea.style.margin = '0px';
    textarea.style.overflow = 'hidden';
    textarea.style.background = 'none';
    textarea.style.outline = 'none';
    textarea.style.resize = 'none';
    textarea.style.zIndex = 1;
    textarea.style.lineHeight = textNode.lineHeight();
    textarea.style.fontFamily = textNode.fontFamily();
    textarea.style.transformOrigin = 'left top';
    textarea.style.textAlign = textNode.align();
    textarea.style.fontWeight = textNode.attrs?.fontStyle?.split(" ").includes("bold") ? "bold" : "normal";
    textarea.style.fontStyle = textNode.attrs?.fontStyle?.split(" ").includes("italic") ? "italic" : "normal";
    textarea.style.letterSpacing = textNode.attrs.letterSpacing  + "px";
    textarea.style.lineHeight = textNode.attrs.lineHeight;
    textarea.style.textDecoration = textNode.attrs.textDecoration;
    textarea.style.color = textNode.fill();

    let rotation = textNode.rotation();
    var transform = '';
    if (rotation) {
      transform += 'rotateZ(' + rotation + 'deg)';
    }

    var px = 0;
    var isFirefox =
      navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
    if (isFirefox) {
      px += 2 + Math.round(textNode.fontSize() / 20);
    }


    textarea.focus();

    onChange({
      ...shape,
      height: textarea.scrollHeight
    })
    function removeTextarea() {
      setIsEditing(false);
      // Always restore visibility to true when finishing edit, preserving current text
      onChange({
        ...shape,
        text: textarea.value,
        visible: true
      });
      setTimeout(() => {
        if (textarea && demo.current.contains(textarea)) {
          demo.current.removeChild(textarea);
        }
      }, 0);
    }
    textarea.addEventListener('input', function (e) {
      textarea.style.height = 'auto';
      onChange({
        ...shape,
        text: e.target.value,
        height: textarea.scrollHeight,
        visible: true
      })
      textarea.style.height = textarea.scrollHeight + 'px';
    });


    textarea.addEventListener('blur', () => {
      delete shape.height;
      removeTextarea();
    });
    textarea.addEventListener('keydown', (e) => {
      if (e.keyCode === 13 && !e.shiftKey) {
        e.preventDefault(); // Prevent the default Enter behavior (newline insertion)
        textarea.value = textarea.value.trim();
        removeTextarea();
      }
      if (e.keyCode === 27) {
        e.target.value = e.target.value.trim();
        removeTextarea();
      }
    });
  };

  if (shape.type !== 'text') return null;
  console.log(shape);

  return (
    <Text
      ref={textRef}
      {...shape}
      visible={shape.visible && !isEditing}
      onDblClick={handleTextDblClick}
      name="shape"
      onDragEnd={((e) => {
        onChange({
          ...shape,
          height: 'auto',
          x: e.target.x(),
          y: e.target.y(),
          visible: true
        });
      }, handleDrag)}
      onDragStart={handleDragStart}

      onTransform={(e) => {
        const node = textRef.current;
        const scaleX = node.scaleX();
        node.scaleX(1);
        node.scaleY(1);
        onChange({
          ...shape,
          x: node.x(),
          y: node.y(),
          height: 'auto',
          width: Math.max(5, node.width() * scaleX),
          visible: true
        });
      }}

    />
  );
};