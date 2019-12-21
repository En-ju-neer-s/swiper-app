import React from 'react';

const JS_LOADER = '[js-loader]';

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

            if(this.props.countInfoShow) {
                this.props.countInfoShow(0, this.loader);
            }
        }, 100);
    }

    render() {
        const {
            title,
            body,
            date,
            source,
            buttonText,
            buttonIcon,
            loadTimeout,
            toggleInfoScreen
        } = this.props;

        return (
            <div className="c-info-screen" ref={this.InfoScreen}>
                <div className="info-screen__inner">
                    <div className="c-loader" js-loader=""></div>
                    <h2 className="info-screen__header">{title}</h2>
                    {body &&
                        <p>{body}</p>
                    }
                    <div className="info-screen__row">
                        {date &&
                            <div className="info-screen__date">{date}</div>
                        }
                        <div className="info-screen__source">
                            {source &&
        <a href={source} target="_blank" className="c-source"><i className="u-icon icon--link"></i> Bron: {this.sourceName}</a>
                            }
                        </div>
                    </div>
                    <i className={`info-screen__close u-icon icon--cancel`} onClick={() => { clearTimeout(loadTimeout); toggleInfoScreen(false) }}></i>
                </div>
            </div>
        )
    }
}

export default InfoScreen;