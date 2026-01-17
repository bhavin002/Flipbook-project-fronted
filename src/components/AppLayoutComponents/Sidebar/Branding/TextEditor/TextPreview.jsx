export default function TextPreview({ config }) {
    const getHeadingClasses = () => {
        let classes = "text-5xl";

        if (config.fontWeight === 'bold') {
            classes += " font-bold";
        }

        // classes += ` font-${config.fontFamily.split(' ').join('-').toLowerCase()}`;

        if (config.alignment === 'center') classes += ' text-center';
        else if (config.alignment === 'right') classes += ' text-right';
        else if (config.alignment === 'justify') classes += ' text-justify';

        return classes;
    };

    const getHeadingStyles = () => {
        const styles = {
            fontFamily: config.fontFamily || 'Arial',
            color: config.textColor || '#000000',
            fontSize: `${config.fontSize || 16}px`,
            letterSpacing: `${(config.letterSpacing || 0) / 100}em`,
            lineHeight: config.lineHeight || 1.2,
        };

        if (config.textCase === 'uppercase') styles.textTransform = 'uppercase';
        else if (config.textCase === 'lowercase') styles.textTransform = 'lowercase';
        else if (config.textCase === 'capitalize') styles.textTransform = 'capitalize';

        const configStyles = config.styles || [];
        if (configStyles.includes('italic')) styles.fontStyle = 'italic';
        if (configStyles.includes('underline')) styles.textDecoration = 'underline';
        if (configStyles.includes('strikethrough')) styles.textDecoration = 'line-through';
        if (configStyles.includes('underline') && configStyles.includes('strikethrough')) {
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
