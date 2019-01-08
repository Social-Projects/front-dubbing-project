import * as React from 'react';
import './AudioItem.css';

export interface Porps {
    id: number;
    name: string;
    onDelete?: () => void;
}

// Audio item
export default function AudioItem (id, name, onDelete) {
    return (
        <div className="container">
            <div className="row" >
                <div className="col-xs-11" >
                    <button className="btn-audio-item-delete" >
                        <i onClick={onDelete} className="fas fa-times" ></i>
                    </button></div>
                <div className="col-xs-11 audio-item" >
                    <div className="col-xs-4" >
                        <label>№{id} {name}</label>
                    </div>
                    <div className="col-xs-8" >
                        <textarea className="audio-text" placeholder="Введіть оригінал тексту до аудіо."></textarea>
                    </div>
                </div>
            </div>
        </div>
    );
}