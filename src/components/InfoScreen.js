import React from 'react';
import Button from '../components/Button';

class InfoScreen extends React.Component {
    constructor(props) {
        super(props);

        this.InfoScreen = React.createRef();
    }

    componentDidMount() {
        console.log(this.InfoScreen)
        setTimeout(()=>{
            this.InfoScreen.current.classList.add('info-screen--active');
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
            toggleInfoScreen 
        } = this.props;

        return (
            <div className="c-info-screen" ref={this.InfoScreen}>
                <div className="info-screen__inner">
                    <div className="c-loader" style={{ width: '80%' }}></div>
                    <h2>{title}</h2>
                    <p>{body}</p>
                </div>
                <div className="info-screen__inner info-screen__menu">
                    <div className="info-screen__column">
                        {date &&
                            <span>{date}</span>
                        }
                        {source &&
                            <a href={source} className="c-source">Bron</a>
                        }
                    </div>
                    <div className={`info-screen__column`}>
                        <Button 
                            color='blue' 
                            icon={buttonIcon} 
                            text={buttonText} 
                            onClick={() => { toggleInfoScreen() }} />
                    </div>
                </div>
            </div>
        )
    }
}

export default InfoScreen;