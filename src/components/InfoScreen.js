import React from 'react';
import Button from '../components/Button';

const JS_LOADER = '[js-loader]';
let loadTimeout;

class InfoScreen extends React.Component {
    constructor(props) {
        super(props);

        this.InfoScreen = React.createRef();
        if(this.props.source){
            this.sourceName = new URL(this.props.source).hostname.replace('www.', '');
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.InfoScreen.current.classList.add('info-screen--active');
            this.loader = this.InfoScreen.current.querySelector(JS_LOADER);
            document.documentElement.classList.add('has--modal');

            this.countShow(0);
        }, 100);
    }

    countShow(width) {
        this.loader.style.width = `${width}%`;

        if (width < 100) {
            loadTimeout = setTimeout(() => {
                this.countShow(width + 1);
            }, 100);
        } else {
            this.props.toggleInfoScreen(false);
        }
    }

    render() {
        const {
            title,
            body,
            date,
            source,
            buttonText,
            buttonIcon,
            toggleInfoScreen
        } = this.props;

        return (
            <div className="c-info-screen" ref={this.InfoScreen}>
                <div className="info-screen__inner">
                    <div className="c-loader" js-loader=""></div>
                    <h2 className="info-screen__header">{title}</h2>
                    {date &&
                        <div className="info-screen__date">{date}</div>
                    }
                    <p>{body}</p>
                </div>
                <div className="info-screen__inner info-screen__menu">
                    <div className="info-screen__row">
                        {source &&
    <a href={source} target="_blank" className="c-source"><i className="u-icon icon--link"></i> Bron: {this.sourceName}</a>
                        }
                    </div>
                    <div className={`info-screen__row`}>
                        <Button
                            color='blue'
                            icon={buttonIcon}
                            text={buttonText}
                            onClick={() => { clearTimeout(loadTimeout); toggleInfoScreen(false) }} />
                    </div>
                </div>
            </div>
        )
    }
}

export default InfoScreen;