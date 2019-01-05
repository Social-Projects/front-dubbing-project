import React from 'react';
import './AudioItem.css';

// item
const AudioItem = (props) => {
    return (
        <div className="container">
            <div className="row" >
                <div className="col-xs-11" >
                    <button className="btn-audio-item-delete" >
                        <i className="fas fa-times" ></i>
                    </button></div>
                <div className="col-xs-11 audio-item" >
                    <div className="col-xs-4" >
                        <label>№{props.id} {props.name}</label>
                    </div>
                    <div className="col-xs-8" >
                        <textarea className="audio-text" placeholder="Введіть оригінал тексту до аудіо."></textarea>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AudioItem;