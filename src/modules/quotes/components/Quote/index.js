import React from 'react';
import './style.css';

const Quote = ({ text = '', author = '' }) => (
    <div className="quote">
        { text &&
            <div className="quote__text">{text}</div>
        }
        { author &&
            <div className="quote__authorContainer">
                <span className="quote__authorName">{author}</span>
            </div>
        }
    </div>
);

export default Quote;
