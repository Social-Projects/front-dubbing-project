import * as React from "react";
import "./AudioItem.css";
import API from "../../../util/api";
import reducer from "../../../store/reducers/streamReducer";

export interface IAudioItemProps {
  id: number,
  text?: string,
  
  languages: {
    id: number,
    name: string
  }[],

  onDelete: (index: number) => void,
  onTextChange: (string: string, index: number) => void
}

interface IAudioItemState {}

export default class AudioItem extends React.Component<IAudioItemProps, IAudioItemState> {  
  constructor(props: IAudioItemProps) {
    super(props);

    this.handleBlur = this.handleBlur.bind(this);
    this.fileUploadHandler = this.fileUploadHandler.bind(this);
    this.deleteHandler = this.deleteHandler.bind(this);
  }

  private fileUploadHandler = async (event: any, speechId?: string ) => {
    const audioFile = event.target.files[0];
    const languageId = event.target.id;

    if(speechId === undefined) {
      speechId = '1';
    }

    if (audioFile != null) {
      let formData = new FormData();

      formData = new FormData();

      formData.append("AudioFile", audioFile);
      formData.append("LanguageId", languageId.toString());
      formData.append("SpeechId", speechId);

      await API.post("audio/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
    }
  }

  private handleBlur = (event: any) => {
    let trimedString = event.target.value.trim();
    let index = event.target.id;

    if (trimedString !== "") {
      this.props.onTextChange(trimedString, index);
    } else {
      event.target.value = '';
    }
  }
  
  private deleteHandler = (event: any) => {
    const deleteItemId = event.target.id;
    this.props.onDelete(deleteItemId);
  }

  render() {
    const languages = [...this.props.languages];
    const langList = languages.map(item => (
      <div key={item.id}>
        <span>{item.name}: </span>

        <input
          className="choose-audio-btn"
          id={item.id.toString()}
          type="file"
          accept="audio/*"
          onChange={this.fileUploadHandler}
        />
      </div>
    ));


    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-11">
            <button onClick={this.deleteHandler} className="btn-audio-item-delete">
              <i id={this.props.id.toString()} className="fas fa-times" ></i>
            </button>
          </div>
          <div className="col-sm-11 audio-item">
            <div className="col-sm-12">
              <textarea
                id={this.props.id.toString()}
                onBlur={this.handleBlur}
                className="audio-text"
                placeholder="Введіть оригінал тексту до аудіо."
                defaultValue={this.props.text}
              />
            </div>
            <div className="col-sm-7">

              {langList.length > 0 ? langList : <p style={{color: "red"}}>Can't connect to server</p>}

            </div>
          </div>
        </div>
      </div>
    );
  }
}
