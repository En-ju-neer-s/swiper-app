import React from 'react';
import Button from '../components/Button';

const JS_LOADER = '[js-loader]';
let loadTimeout;

class InfoScreen extends React.Component {
    constructor(props) {
        super(props);

        this.InfoScreen = React.createRef();
    }

    componentDidMount() {
        setTimeout(()=>{
            this.InfoScreen.current.classList.add('info-screen--active');
            this.loader = this.InfoScreen.current.querySelector(JS_LOADER);
            document.documentElement.classList.add('has--modal');

            this.countShow(0);
        }, 100);
    }

    countShow(width) {
        this.loader.style.width = `${width}%`;

        if(width < 100) {
            loadTimeout = setTimeout(()=>{
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
                    <h2>{title}</h2>
                    <p>{body}</p>
                </div>
                <div className="info-screen__inner info-screen__menu">
                    <div className="info-screen__column">
                        {date &&
                            <span>{date}</span>
                        }
                        {source &&
                            <a href={source} target="_blank" className="c-source"><i class="u-icon icon--link"></i> Bron</a>
                        }
                    </div>
                    <div className={`info-screen__column`}>
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