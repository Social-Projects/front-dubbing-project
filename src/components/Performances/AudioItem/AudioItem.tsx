import * as React from "react";
import { Tooltip, Button } from "reactstrap";
import API from "../../../util/api";
import "./AudioItem.css";

export interface IAudioItemProps {
  id: number;
  order: number;
  text?: string;

  languages: Array<{
    id: number,
    name: string,
  }>;

  fileToBeUploadData: Array<{
    audioId?: number,
    fileName: any,
    languageId: number,
    speechIndex: number,
  }>;

  onDelete: (index: number) => void;
  onTextChange: (str: string, index: number) => void;
  onFileChange: (fileName: string, languageId: number, speechIndex: number) => void;
  handleChangeOrder: (newOrder: number, oldOrder: number) => void;

}

interface IAudioItemState {
  tooltipRemoveOpen: boolean;
  order: number;
}

export default class AudioItem extends React.Component<IAudioItemProps, IAudioItemState> {
  constructor(props: IAudioItemProps) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.deleteHandler = this.deleteHandler.bind(this);
    this.tooltipRemoveToggle = this.tooltipRemoveToggle.bind(this);
    this.state = {
      tooltipRemoveOpen: false,
      order: this.props.order,
    };
  }

  public handleUploadClick(event: any) {
    const parent = event.target.parentElement.parentElement as HTMLElement;
    const ch = parent.getElementsByClassName("choose-audio-btn").namedItem(event.target.id.toString()) as HTMLElement;
    ch.click();
  }

  public tooltipRemoveToggle() {
    this.setState({
      tooltipRemoveOpen: !this.state.tooltipRemoveOpen,
    });
  }

  public render() {
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

        {filesToUpload.map((file) => {
          if (file.speechIndex === this.props.id && file.languageId === item.id) {
            return <span key={file.speechIndex}>{file.fileName}</span>;
          }
        })}
      </div>
    ));


    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-11">
            <button onClick={this.deleteHandler} className="btn-audio-item-delete" id={"removeButton" + this.props.id}>
              <i id={this.props.id.toString()} className="fas fa-times" ></i>
            </button>
            <Tooltip placement="left" isOpen={this.state.tooltipRemoveOpen} autohide={true} target={"removeButton" + this.props.id} toggle={this.tooltipRemoveToggle}>
              Видалити фразу </Tooltip>
          </div>
          <div className="col-sm-11 audio-item">
            <div className="col-sm-12">
              <div className="spanOrder">№ - {this.props.order}</div>
              <textarea
                id={this.props.id.toString()}
                onChange={this.handleChange}
                className="audio-text"
                placeholder="Введіть оригінал тексту до аудіо."
                value={this.props.text}
              />
            </div>
            <div className="col-sm-7" id={this.props.id.toString()}>

              {langList.length > 0 ? langList : <p style={{ color: "red" }}>Can't connect to server</p>}
              <Button outline color="primary" size="sm" onClick={() => {
                this.props.handleChangeOrder(this.state.order, this.props.order);
              }}>Змістити в</Button>
              <input className="inputOrder" type="number" pattern="[0-9]*" onInput={this.onChangeOrderState.bind(this)}  />

            </div>

          </div>
        </div>
      </div>
    );
  }

  private onChangeOrderState = (event: any) => {
    this.setState({
      order: parseInt(event.target.value, 10)
    }
    );
  }

  private onChange = async (event: any) => {
    const audio = event.target.files[0];
    const languageId = parseInt(event.target.id, undefined);
    const speechIndex = parseInt(event.target.parentNode.parentNode.id, undefined);

    let formData = new FormData();

    formData = new FormData();

    formData.append("File", audio);

    await API.post("audio/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    this.props.onFileChange(audio.name, languageId, speechIndex);
  }

  private handleChange = (event: any) => {
    this.props.onTextChange(event.target.value, parseInt(event.target.id, undefined));
  }

  private deleteHandler = (event: any) => {
    const deleteItemId = parseInt(event.target.id, undefined);
    this.props.onDelete(deleteItemId);
  }
}
