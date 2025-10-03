import React, { useState, useRef } from 'react';
import { Text } from 'react-konva';

export default function KonvaText({ demo, shape, onChange, handleDragStart, handleDrag, scale }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draftText, setDraftText] = useState(shape.text || "");
  const textRef = useRef(null);
  const handleTextDblClick = (e) => {
    setIsEditing(true);
    setDraftText(shape.text || "");
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

    // Do NOT push edits to parent while typing; avoid undo/redo pollution
    function removeTextarea() {
      setIsEditing(false);
      // Commit once on finish
      onChange({
        ...shape,
        text: textarea.value
      });
      setTimeout(() => {
        if (textarea && demo.current.contains(textarea)) {
          demo.current.removeChild(textarea);
        }
      }, 0);
    }
    textarea.addEventListener('input', function (e) {
      textarea.style.height = 'auto';
      setDraftText(e.target.value);
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
      // Hide Konva text while editing to avoid duplicate visual (no attrs change)
      visible={shape.visible && !isEditing}
      // Show live draft while editing without committing to parent
      text={isEditing ? draftText : shape.text}
      onDblClick={handleTextDblClick}
      name="shape"
      onDragEnd={((e) => {
        onChange({
          ...shape,
          height: 'auto',
          x: e.target.x(),
          y: e.target.y()
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
          width: Math.max(5, node.width() * scaleX)
        });
      }}

    />
  );
};