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
};

const PageContentRenderer = ({ data, index, visibilitySettings, flipbookRef }) => {
    const htmlType = data?.shape?.htmlType;
    const Component = COMPONENT_MAP[htmlType];

    if (Component) {
        const props = {
            shape: data.shape,
            visibilitySettings,
            ...(flipbookRef && { flipbookRef }),
            ...(data.shape?.id && { key: data.shape.id })
        };
        return <Component {...props} />;
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