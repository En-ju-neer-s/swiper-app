import React from 'react';

class Progress extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { swipestotal } = this.props;

        return (
            <div className="progress__container">
                <div className="progress">
                    <div className="progress__markers">
                        <div className="progress__marker" style={{ left: "22%" }}>
                            {(swipestotal >= 25 && swipestotal < 50) && <span className="progress__marker-text">Contributor</span>}
                            <div className="progress__marker-line"></div>
                        </div>
                        <div className="progress__marker" style={{ left: "47%" }}>
                            {(swipestotal >= 50 && swipestotal < 100) && <span className="progress__marker-text">Special thanks!</span>}
                            <div className="progress__marker-line"></div>
                        </div>
                        <div className="progress__marker" style={{ left: "97%", textAlign: "right" }}>
                            {swipestotal >= 100 && <span className="progress__marker-text" style={{ left: "-100px" }}>Hero!</span>}
                            <div className="progress__marker-line"></div>
                        </div>
                    </div>
                    <div className="progress__bar">
                        <div className="progress__bar-inner" style={{ width: swipestotal + "%" }}>
                            <div className="progress__bar-color"></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Progress;