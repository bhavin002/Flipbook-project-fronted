import React, { useEffect, useState, useRef } from "react";
import { Group, Image, Rect, Text } from "react-konva";

export default function ShopButton({ mainStage, selectedIndex, shape, handleDragStart, handleDrag, onSelect,
    index, imageLoadCounterPageWise, setImageLoadCounterPageWise,
    ...props }) {
    const [image, setImage] = useState(null);
    const [colors, setColors] = useState({
        labelColor: shape?.htmlData?.customizeButton?.labelColor || '#ffffff',
        buttonColor: shape?.htmlData?.customizeButton?.buttonColor || '#000000',
    });

    const [dimensions, setDimensions] = useState({
        width: shape.width || 150,
        height: shape.height || 40,
        scaleX: shape.scaleX || 1,
        scaleY: shape.scaleY || 1,
    });
    const [textWidth, setTextWidth] = useState(0);
    const groupRef = useRef();
    const textRef = useRef();

    useEffect(() => {
        const newShape = mainStage[selectedIndex]?.shapes?.find(ele => ele.id === shape.id);
        if (newShape?.htmlData?.customizeButton) {
            setColors({
                labelColor: newShape.htmlData.customizeButton.labelColor || '#ffffff',
                buttonColor: newShape.htmlData.customizeButton.buttonColor || '#000000',
            });
        }
    }, [mainStage, selectedIndex, shape.id]);

    const [svgContent, setSvgContent] = useState(null);

    const randomizeColors = (svgString) => {
        return svgString.replace(/fill="(.*?)"|stroke="(.*?)"/g, (match, fill, stroke) => {
            if (fill) {
                return `fill="${colors.labelColor}"`;
            } else if (stroke) {
                return `stroke="${colors.labelColor}"`;
            }
            return match;
        });
    };

    useEffect(() => {
        let isActive = true;
        const fetchSvg = async () => {
            if (!shape.src) return;

            // Handle inline SVG
            if (shape.src.trim().startsWith('<svg')) {
                if (isActive) setSvgContent(shape.src);
                return;
            }

            // Handle URL
            setImageLoadCounterPageWise((prev) => ({
                ...prev,
                [index]: (prev[index] || 0) + 1,
            }));

            try {
                const response = await fetch(shape.src);
                const text = await response.text();
                // Simple check if it's an SVG
                if (isActive) {
                    if (text.trim().startsWith('<svg')) {
                        setSvgContent(text);
                    } else {
                        // Not an SVG (e.g. PNG), load as standard image
                        const img = new window.Image();
                        img.src = shape.src;
                        img.crossOrigin = 'Anonymous';
                        img.onload = () => {
                            if (isActive) setImage(img);
                        };
                    }
                }
            } catch (error) {
                console.error("Error loading image/svg", error);
                // Fallback attempt
                if (isActive) {
                    const img = new window.Image();
                    img.src = shape.src;
                    img.crossOrigin = 'Anonymous';
                    img.onload = () => {
                        if (isActive) setImage(img);
                    };
                }
            } finally {
                if (isActive) {
                    setImageLoadCounterPageWise((prev) => ({
                        ...prev,
                        [index]: (prev[index] || 1) - 1,
                    }));
                }
            }
        };

        fetchSvg();

        return () => {
            isActive = false;
        };
    }, [shape.src, index, setImageLoadCounterPageWise]);

    // Effect to colorize SVG when content or color changes
    useEffect(() => {
        if (svgContent) {
            const modifiedSvg = randomizeColors(svgContent);
            const blob = new Blob([modifiedSvg], { type: 'image/svg+xml' });
            const url = URL.createObjectURL(blob);

            const img = new window.Image();
            img.src = url;
            img.crossOrigin = 'Anonymous';
            img.onload = () => {
                setImage(img);
                URL.revokeObjectURL(url);
            };
        }
    }, [svgContent, colors.labelColor]);

    // Measure text width for centering
    useEffect(() => {
        if (textRef.current) {
            setTextWidth(textRef.current.width());
        }
    }, [shape.htmlData?.customizeButton?.buttonLabel, dimensions.height]);

    const handleGroupClick = (e) => {
        e.cancelBubble = true;
        if (onSelect) {
            onSelect(e.currentTarget, e);
        }
    };

    const handleTransform = (e) => {
        const node = e.currentTarget;
        setDimensions({
            width: node.width(),
            height: node.height(),
            scaleX: node.scaleX(),
            scaleY: node.scaleY()
        });
    };

    // Layout calculations (relative to base dimensions)
    const baseWidth = dimensions.width;
    const baseHeight = dimensions.height;
    const labelText = shape?.htmlData?.customizeButton?.buttonLabel || "Shop this item";

    const iconSize = baseHeight * 0.45;
    const fontSize = baseHeight * 0.32;
    const gap = baseHeight * 0.1;
    const cornerRadius = 10;

    // Total width of content (icon + gap + text)
    const contentWidth = iconSize + gap + textWidth;
    const startX = (baseWidth - contentWidth) / 2;

    return (
        <Group
            ref={groupRef}
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDrag}
            onClick={handleGroupClick}
            onTap={handleGroupClick}
            onTransform={handleTransform}
            onTransformEnd={handleTransform}
            {...props}
            {...shape}
            name="shape"
        >
            {/* Button Background */}
            <Rect
                fill={colors.buttonColor}
                x={0}
                y={10}
                width={Math.max(0, baseWidth)}
                height={Math.max(0, baseHeight) - 18}
                cornerRadius={cornerRadius}
                shadowBlur={5}
                shadowOpacity={0.1}
                shadowOffset={{ x: 0, y: 2 }}
            />

            {/* Container for Icon + Text to center them together */}
            <Group x={startX} y={0}>
                {image && (
                    <Image
                        image={image}
                        x={0}
                        y={(baseHeight - iconSize) / 2}
                        width={iconSize}
                        height={iconSize}
                    />
                )}
                <Text
                    ref={textRef}
                    text={labelText}
                    x={iconSize + gap}
                    y={(baseHeight - fontSize + 8) / 2}
                    fontSize={fontSize}
                    fill={colors.labelColor}
                    // fontStyle="bold"
                    // fontFamily="Inter, Roboto, sans-serif"
                    verticalAlign="middle"
                />
            </Group>
        </Group>
    );
}
