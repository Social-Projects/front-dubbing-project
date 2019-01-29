import * as React from "react";
import AudioItem from "../AudioItem/AudioItem";
import "./AudioUpload.css";
import API from "../../../util/api";

export interface IAudioUploadProps { }

export interface IAudioUploadState {
  filesToBeUpload: any[];
  textToAudioFiles: string[];
}

export default class AudioUpload extends React.Component<IAudioUploadProps, IAudioUploadState> {
  constructor(props: IAudioUploadProps) {
    super(props);

    this.state = {
      filesToBeUpload: [],
      textToAudioFiles: []
    };

    this.fileChangedHandler = this.fileChangedHandler.bind(this);
    this.fileDeleteHandler = this.fileDeleteHandler.bind(this);
    this.fileUploadHandler = this.fileUploadHandler.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
  }

  private fileChangedHandler = (event: any) => {
    this.setState({
      filesToBeUpload: event.target.files
    });
  };

  fileDeleteHandler = (event: any) => {
    const fileToDeleteId = event.target.id;
    const textToDeleteId = event.target.id;

    let textArr = [...this.state.textToAudioFiles];
    let files = [...this.state.filesToBeUpload];
    files.splice(fileToDeleteId, 1);
    textArr.splice(textToDeleteId, 1);

    this.setState({
      filesToBeUpload: files,
      textToAudioFiles: textArr
    });
  };

  fileUploadHandler = async (performanceId: number) => {
    if (this.state.filesToBeUpload.length > 0) {
      let formData = new FormData();

      for (var i = 0; i < this.state.filesToBeUpload.length; i++) {
        let speech = {
          text: this.state.textToAudioFiles[i],
          performanceId: performanceId,
          id: 0
        };

        let textResponse = await API.post("speech", speech, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        });

        formData = new FormData();

        formData.append("AudioFile", this.state.filesToBeUpload[i]);
        formData.append("SpeechId", textResponse.data["id"]);
        formData.append("LanguageId", "1");

        await API.post("audio/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
      }
    } else {
      alert("Select audio files");
    }
  };

  onTextChange = (text: string) => {
    let textArr = [...this.state.textToAudioFiles];

    if (!textArr.includes(text)) {
      textArr.push(text);

      this.setState({
        textToAudioFiles: textArr
      });
    } else {
      alert("Two similar strings");
    }
  };

  render() {
    const filesToBeUpload = [...this.state.filesToBeUpload];
    const filesList = filesToBeUpload.map((item, index) => (
      <AudioItem
        key={item.name}
        name={item.name}
        id={index}
        audio={item.audio}
        onDelete={this.fileDeleteHandler}
        onTextChange={this.onTextChange.bind(this)}
      />
    ));

    return (
      <div className="audio-upload-section">
        <div className="col-sm-12 audio-header">
          <label>Аудіо</label>
  
          <input
            style={{ display: "none" }}
            id="file-1"
            type="file"
            accept="audio/*"
            onChange={this.fileChangedHandler}
            multiple
          />
  
          <label htmlFor="file-1" className="fas fa-plus-circle btn-audio-add" />
        </div>
        <div id="audio-container" className="row">
          {filesList}
        </div>
      </div>
    );
  }
}
