import React from 'react';
import SlideShow from "../Widget/SlideShow.jsx";
import AudioButton from "../Widget/AudioButton.jsx";
import GoToUrl from "../Widget/GoToUrl.jsx";
import GoToButtonLink from "../Widget/goToButtonLink.jsx";
import Tag from "../Widget/Tag.jsx";
import SquareCaption from "../Widget/SquareCaption.jsx";
import VideoButton from "../Widget/VideoButton.jsx";
import ProductTag from "../Widget/ProductTag.jsx";
import ShopArea from "../Widget/ShopArea.jsx";
import ShopButton from "../Widget/ShopButton.jsx";
import Quiz from "../Widget/Quiz.jsx";
import Question from "../Widget/Question.jsx";
import ContactForm from "../Widget/ContactForm.jsx";
import GoToPreviousPage from '../Widget/GoToPreviousPage';
import GoToNextPage from '../Widget/GoToNextPage';
import GoToPage from '../Widget/GoToPage';
import GoToFirstPage from '../Widget/GoToFirstPage';
import GoToLastPage from '../Widget/GoToLastPage';
import EmbedCode from '../Widget/EmbedCode';
import PopupSlideShow from '../Widget/PopupSlideShow';
import VideoEmbed from '../Widget/VideoEmbed';
import Text from '../Widget/Text';
import StockPhoto from '../Widget/StockPhoto';
import StockVideo from '../Widget/StockVideo';
import StockGif from '../Widget/StockGif';
import StockSticker from '../Widget/StockSticker';
import ShapeWidget from '../Widget/ShapeWidget';
import MaskedImageWidget from '../Widget/MaskedImageWidget';

const COMPONENT_MAP = {
    'slideshow': SlideShow,
    'audio-button': AudioButton,
    'link-area': GoToUrl,
    'go-to-button-link': GoToButtonLink,
    'link-tag': Tag,
    'square-caption': SquareCaption,
    'video-button': VideoButton,
    'product-tag': ProductTag,
    'shop-area': ShopArea,
    'shop-button': ShopButton,
    'quiz': Quiz,
    'question': Question,
    'contact-form': ContactForm,
    'go-to-previous-page': GoToPreviousPage,
    'go-to-next-page': GoToNextPage,
    'go-to-page': GoToPage,
    'go-to-first-page': GoToFirstPage,
    'go-to-last-page': GoToLastPage,
    'embed-code': EmbedCode,
    'popup-slideshow': PopupSlideShow,
    'video-embed': VideoEmbed,
    'text': Text,
    'upload-photo': StockPhoto,
    'stock-photo': StockPhoto,
    'stock-video': StockVideo,
    'stock-gif': StockGif,
    'stock-sticker': StockSticker,
    'shape-widget': ShapeWidget,
    'masked-image': MaskedImageWidget,
    'masked-gif': MaskedImageWidget,
    'masked-sticker': MaskedImageWidget,
};

const PageContentRenderer = ({ data, index, visibilitySettings, flipbookRef, flipbookId }) => {
    const htmlType = data?.shape?.htmlType;
    const Component = COMPONENT_MAP[htmlType];

    if (Component) {
        const props = {
            shape: data.shape,
            visibilitySettings,
            ...(flipbookRef && { flipbookRef }),
            ...(data.shape?.id && { key: data.shape.id }),
            ...(flipbookId && { flipbookId })
        };
        return <div style={{ 'cursor': 'pointer' }}> <Component {...props} /> </div>;
    }

    // Default case for HTML content
    return (
        <div
            key={index}
            style={{ 'cursor': 'pointer' }}
            title={data.shape?.htmlData?.tooltip || ''}
            dangerouslySetInnerHTML={{ __html: data.html }}
        />
    );
};

export default PageContentRenderer; 