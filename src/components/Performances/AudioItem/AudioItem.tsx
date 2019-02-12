import * as React from "react";
import "./AudioItem.css";
import API from "../../../util/api";
import reducer from "../../../store/reducers/streamReducer";
import { fileURLToPath } from "url";
import { Tooltip } from 'reactstrap';

export interface IAudioItemProps {
  id: number,
  text?: string,

  languages: {
    id: number,
    name: string
  }[],

  fileToBeUploadData: {
    audioId?: number,
    fileName: any,
    languageId: number,
    speechIndex: number
  }[]

  onDelete: (index: number) => void,
  onTextChange: (string: string, index: number) => void
  onFileChange: (fileName: string, languageId: number, speechIndex: number) => void
}

interface IAudioItemState {
  tooltipRemoveOpen: boolean,
 }

export default class AudioItem extends React.Component<IAudioItemProps, IAudioItemState> {
  constructor(props: IAudioItemProps) {
    super(props);

    this.handleBlur = this.handleBlur.bind(this);
    this.deleteHandler = this.deleteHandler.bind(this);
    this.tooltipRemoveToggle = this.tooltipRemoveToggle.bind(this);
    this.state = {
            tooltipRemoveOpen: false
        };
  }

  private onChange = async (event: any) => {
    const audio = event.target.files[0];
    const languageId = event.target.id;
    const speechIndex = event.target.parentNode.parentNode.id;

    let formData = new FormData();

    formData = new FormData();

    formData.append("AudioFile", audio);

    await API.post("audio/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
    console.log("SI:" + speechIndex);
    this.props.onFileChange(audio.name, languageId, speechIndex);
  }

  private handleBlur = (event: any) => {
    console.log("blur");
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
  handleUploadClick(event:any)
  {
    let parent = event.target.parentElement.parentElement as HTMLElement;
    let ch = parent.getElementsByClassName('choose-audio-btn').namedItem(event.target.id.toString())  as HTMLElement;
 
    console.log(ch);
  
    ch.click();
    
  }

  tooltipRemoveToggle() {
        this.setState({
            tooltipRemoveOpen: !this.state.tooltipRemoveOpen
        });
  }

  render() {
    const languages = [...this.props.languages];
    const filesToUpload = [...this.props.fileToBeUploadData];

    const langList = languages.map((item, index) => (
      <div key={item.id} id={index.toString()}>
        <span>{item.name}: </span>

        <input
          key={index}
          className="choose-audio-btn"
          id={item.id.toString()}
          type="file"
          accept="audio/*"
          onChange={this.onChange}
        />

        <button id={item.id.toString()} className="btn-audio-upload" onClick={this.handleUploadClick}>Завантажити</button>

        {filesToUpload.map(file => {
          if(file.speechIndex == this.props.id && file.languageId == item.id)
          {
            return <span>{file.fileName}</span>
          }
        })}
      </div>   
    ));

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-11">
           
            <button onClick={this.deleteHandler} className="btn-audio-item-delete" id={this.props.id.toString() }>
              <i id={this.props.id.toString()} className="fas fa-times" ></i>
            </button>
          </div>
          <div className="col-sm-11 audio-item">
            <div className="col-sm-12">
              <textarea
                id={this.props.id.toString()}
                onChange={this.handleBlur}
                className="audio-text"
                placeholder="Введіть оригінал тексту до аудіо."
                value={this.props.text}
              />
            </div>
            <div className="col-sm-7" id={this.props.id.toString()}>

              {langList.length > 0 ? langList : <p style={{ color: "red" }}>Can't connect to server</p>}

            </div>
          </div>
        </div>
      </div>
    );
  }
}
