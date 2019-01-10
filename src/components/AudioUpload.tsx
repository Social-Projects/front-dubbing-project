import * as React from 'react';
import axios from 'axios';
import AudioItem from "./AudioItem";
import './AudioUpload.css';
import API from '../util/api';

export interface IAudioUploadProps { }

export interface IAudioUploadState {
  filesToBeUpload: []
}

export default class AudioUpload extends React.Component<IAudioUploadProps, IAudioUploadState> {
  constructor(props : IAudioUploadProps) {
  
    super(props);

    this.state = {
      filesToBeUpload: [] 
    }
  }

  private fileChangedHandler = (event) => {
    // Saving files to 'filesToBeUpload' state
    this.setState({
      filesToBeUpload: event.target.files
    });
  }

  fileDeleteHandler = (event) => {
    const fileToDeleteId = event.target.id;

    let files = [...this.state.filesToBeUpload]
    files.splice(fileToDeleteId, 1);

    this.setState({
      filesToBeUpload: files
    });
  }

  fileUploadHandler = () => {
    // Checking if file array is empty
    if (this.state.filesToBeUpload.length > 0) {

      //Geting text from textarea
      const textToAudioArray = document.getElementsByClassName('audio-text');

      let filesArray = this.state.filesToBeUpload;

      let formData = new FormData();

      for (var i = 0; i < filesArray.length; i++) {
        // Adding data to formData element
        formData = new FormData();
        formData.append("AudioFile", filesArray[i]);
        formData.append("Text", textToAudioArray[i].value);

        // Sending post requset to server
        API.post('upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }
    }
    else {
      alert("Select audio files");
    }
  }

  render() {

    // Mapping selected files
    const filesToBeUpload = [...this.state.filesToBeUpload];
    const filesList = filesToBeUpload.map((item, index) => <AudioItem 
                                                              key={item.name} 
                                                              name={item.name} 
                                                              id={index} 
                                                              onDelete={this.fileDeleteHandler}/>);

    return (
      <div className="audio-upload-section">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 audio-header">
              <label>Аудіо</label>

              <input
                style={{ display: 'none' }}
                type="file"
                accept="audio/*"
                onChange={this.fileChangedHandler}
                ref={fileInput => this.fileInput = fileInput}
                multiple />

              <button id="btn-audio-add" onClick={() => this.fileInput.click()}><i className="fas fa-plus-circle"></i></button>
              <button id="btn-audio-upload" onClick={this.fileUploadHandler}><i className="fas fa-upload"></i> Завантажити</button>
            </div>
          </div>
        </div>

        {/* Files to be upload list */}
        <div className="container">
          <div id="audio-container" className="row">

            {filesList}

          </div>
        </div>
      </div>
    );
  }
}