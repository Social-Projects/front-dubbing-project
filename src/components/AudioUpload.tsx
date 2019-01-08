import * as React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import AudioItem from "./AudioItem";
import './AudioUpload.css';

export interface Props { }

export default class AudioUpload extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      filesToBeUpload: [] 
    }
  }

  fileChangedHandler = event => {
    let files = event.target.files;

    this.clearAudioList();
    this.showAudioFiles(files);

    // Saving files to 'filesToBeUpload' state
    this.setState({
      filesToBeUpload: event.target.files
    });
  }

  showAudioFiles = (files) => {
    // Displaing all selected files
    let audioContainer = document.getElementById("audio-container")

    for (let i = 0; i < files.length; i++) {
      // Creating unique div elements to avoid replacing them by ReactDOM.render
      let id: string;
      id = (i + 1).toString();
      const audioItemContainer = document.createElement("div")
      audioItemContainer.id = id;
      audioContainer.appendChild(audioItemContainer)

      // Rendering each selected audio item
      ReactDOM.render(<AudioItem name={ files[i].name } id={id} onDelete={ this.fileDeleteHandler }/>, document.getElementById(id))
    }
  }

  clearAudioList = () => {
    // Removing all child elements in 'audio-container'
    let myNode = document.getElementById("audio-container");
    while (myNode.firstChild) {
      myNode.removeChild(myNode.firstChild);
    }
  }

  fileDeleteHandler = (event) => {
    // Getting file index
    const fileToDelteId = event.target.id - 1; 

    let files = [...this.state.filesToBeUpload]
    files.splice(fileToDelteId, 1);

    this.setState({
      filesToBeUpload: files
    });

    this.clearAudioList();
    this.showAudioFiles(files);
  }

  fileUploadHandler = (event) => {
    // Do we need hard code URL? 
    const apiBaseUrl = "https://localhost:44323/api/upload";

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
        axios.post(apiBaseUrl, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }
    }
    else {
      alert("Select audio files");
    }
  }

  render() {
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

          </div>
        </div>
      </div>
    );
  }
}