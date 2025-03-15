export default function TextPreview({ config }) {
    const getHeadingClasses = () => {
        let classes = "text-5xl";

        if (config.fontWeight === 'bold') {
            classes += " font-bold";
        }

        classes += ` ${config.fontFamily}`;

        if (config.alignment === 'center') classes += ' text-center';
        else if (config.alignment === 'right') classes += ' text-right';
        else if (config.alignment === 'justify') classes += ' text-justify';

        return classes;
    };

    const getHeadingStyles = () => {
        const styles = {
            color: config.textColor,
            fontSize: `${config.fontSize}px`,
            letterSpacing: `${config.letterSpacing / 100}em`,
            lineHeight: config.lineHeight,
        };

        if (config.textCase === 'uppercase') styles.textTransform = 'uppercase';
        else if (config.textCase === 'lowercase') styles.textTransform = 'lowercase';
        else if (config.textCase === 'capitalize') styles.textTransform = 'capitalize';

        if (config.styles.includes('italic')) styles.fontStyle = 'italic';
        if (config.styles.includes('underline')) styles.textDecoration = 'underline';
        if (config.styles.includes('strikethrough')) styles.textDecoration = 'line-through';
        if (config.styles.includes('underline') && config.styles.includes('strikethrough')) {
            styles.textDecoration = 'underline line-through';
        }

        if (config.textWrap === 'nowrap') styles.whiteSpace = 'nowrap';

        return styles;
    };

    return (
        <h1 className={getHeadingClasses()} style={getHeadingStyles()}>
            {config.description}
        </h1>
    );
};
