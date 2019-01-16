import * as React from "react";
import "./AudioItem.css";

export interface IAudioItemProps {
  id: number;
  name: string;
  audio: Blob;
  onDelete: (event: any) => void;
  onTextChange: (event: string) => void;
}

export default class AudioItem extends React.Component<IAudioItemProps, any> {
  constructor(props: IAudioItemProps) {
    super(props);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleBlur = (event: any) => {
    let trimedString = event.target.value.trim();

    if(trimedString !== "") {
      this.props.onTextChange(trimedString);
    }
    else{
      alert("You enter empty string or only white space!");
      event.target.value = '';
    }
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-11">
            <button  className="btn-audio-item-delete">
              <i id={this.props.id.toString()} onClick={this.props.onDelete} className="fas fa-times" ></i>
            </button>
          </div>
          <div className="col-xs-11 audio-item">
            <div className="col-xs-4">
              <label>
                №{this.props.id + 1} {this.props.name}
              </label>
            </div>
            <div className="col-xs-8">
              <textarea
                onBlur={this.handleBlur}
                className="audio-text"
                placeholder="Введіть оригінал тексту до аудіо."
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
