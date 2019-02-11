import * as React from "react";
import "./AudioUpload.css";
import API from "../../../util/api";
import AudioItem from "../AudioItem/AudioItem";
import { isNullOrUndefined } from "util";

export interface IAudioUploadProps { }

export interface IAudioUploadState {
  performanceId: number,

  languages: {
    id: number,
    name: string
  }[],

  speeches: {
    id: number,
    text?: string,
    isNew?: boolean,
    onDelete: (index: number) => void,
    onTextChange: (string: string, index: number) => void
    onFileChange: (string: string, index: number, speechIndex: number) => void
  }[],

  fileToBeUploadData: {
    audioId?: number,
    fileName: any,
    languageId: number,
    speechIndex: number
  }[]
}

export default class AudioUpload extends React.Component<IAudioUploadProps, IAudioUploadState> {
  child = React.createRef<AudioItem>();

  constructor(props: IAudioUploadProps) {
    super(props);


    this.state = {
      performanceId: -1,
      languages: [],
      speeches: [],
      fileToBeUploadData: []
    }

    this.addItemHandler = this.addItemHandler.bind(this);
    this.deleteItemHandler = this.deleteItemHandler.bind(this);
    this.uploadHandler = this.uploadHandler.bind(this);
    this.textChangeHandler = this.textChangeHandler.bind(this);
  }

  private addItemHandler = () => {
    let speeches = this.state.speeches;

    let speechItem = {
      id: this.state.speeches.length,
      languages: this.state.languages,
      isNew: true,
      onDelete: this.deleteItemHandler,
      onTextChange: this.textChangeHandler,
      onFileChange: this.onFileChange
    };

    speeches.push(speechItem);

    this.setState({
      speeches: speeches
    });
  }

  private deleteItemHandler = async (index: number) => {
    if (this.state.performanceId == -1) {
      let speeches = this.state.speeches.filter(obj => {
        return obj.id != index;
      });

      this.setState({
        speeches: speeches
      });
    } else {
      if (isNullOrUndefined(this.state.speeches[index])) {
        let removeResponse = await API.delete("speech/" + index)
        if (removeResponse.status == 200) {
          let speeches = this.state.speeches.filter(obj => {
            return obj.id != index;
          });

          this.setState({
            speeches: speeches
          });
        }
      } else {
        let speeches = this.state.speeches.filter(obj => {
          return obj.id != index;
        });

        this.setState({
          speeches: speeches
        });
      }
    }
  }

  onFileChange = (fileName: string, languageId: number, speechIndex: number) => {
    let filesToBeUploadData = [...this.state.fileToBeUploadData];
    console.log("filesToBeUploadData");
    console.log(filesToBeUploadData);
    console.log("fileName, languageId, speechIndex");
    console.log(fileName, languageId, speechIndex);

    if (this.state.fileToBeUploadData.length > 0) {
      for (let i = 0; i < filesToBeUploadData.length; i++) {
        if (filesToBeUploadData[i].speechIndex == speechIndex && filesToBeUploadData[i].languageId == languageId) {
          console.log("in update if");
          filesToBeUploadData[i].fileName = fileName;

          this.setState({
            fileToBeUploadData: filesToBeUploadData
          });

          console.log(filesToBeUploadData);
          return;
        }
      }
    }
    let item = {
      fileName: fileName,
      languageId: languageId,
      speechIndex: speechIndex
    }

    filesToBeUploadData.push(item);

    console.log("after for");
    console.log(filesToBeUploadData);

    this.setState({
      fileToBeUploadData: filesToBeUploadData
    });
  }

  private textChangeHandler = (string: string, index: number) => {
    let speeches = [...this.state.speeches];

    for (let i = 0; i < speeches.length; i++) {
      if (speeches[i].id == index) {
        speeches[i].text = string;
      }
    }

    this.setState({
      speeches: speeches
    });
  }

  // Uploading speeches and file data. Very massive and probably needs
  uploadHandler = async (performanceId: number, update: boolean) => {
    if (update) {
      for (let i = 0; i < this.state.speeches.length; i++) {
        let speech = {
          id: this.state.speeches[i].id,
          text: this.state.speeches[i].text,
          isNew: this.state.speeches[i].isNew,
          performanceId: performanceId
        }

        // Cheking for new speeches
        if (!speech.isNew) {
          let speechResponse = await API.put("speech", speech, {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*"
            }
          });

          // Uploading audio file data
          if (this.state.fileToBeUploadData.length > 0) {
            for (let j = 0; j < this.state.fileToBeUploadData.length; j++) {
              // Cheking old file data to update
              if (this.state.fileToBeUploadData[j].speechIndex == this.state.speeches[i].id) {
                let item = {
                  fileName: this.state.fileToBeUploadData[j].fileName,
                  languageId: this.state.fileToBeUploadData[j].languageId,
                  speechId: speechResponse.data.id,
                  id: this.state.fileToBeUploadData[j].audioId
                }

                await API.put("audio", item, {
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                  }
                });
              }
            }
          }
        } else { // if speeches is new just uploading them
          let speechResponse = await API.post("speech", speech, {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*"
            }
          });

          // Uploading audio file data to speeches
          console.log(this.state.fileToBeUploadData);
          for (let j = 0; j < this.state.fileToBeUploadData.length; j++) {
            // Checking the audio file data is the same index that speechId
            if (this.state.fileToBeUploadData[j].speechIndex == i) {
              let item = {
                fileName: this.state.fileToBeUploadData[j].fileName,
                languageId: this.state.fileToBeUploadData[j].languageId,
                speechId: speechResponse.data.id
              }

              await API.post("audio", item, {
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  "Access-Control-Allow-Origin": "*"
                }
              });
            }
          }
        }
      }
    } else { // if it's not an update just uploading the speeches
      for (let i = 0; i < this.state.speeches.length; i++) {
        let speech = {
          id: 0,
          text: this.state.speeches[i].text,
          performanceId: performanceId
        }

        let speechResponse = await API.post("speech", speech, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        });

        console.log(this.state.fileToBeUploadData);
        // Uploading audio files data. This uploads need move to another method
        for (let j = 0; j < this.state.fileToBeUploadData.length; j++) {
          if (this.state.fileToBeUploadData[j].speechIndex == i) {
            let item = {
              fileName: this.state.fileToBeUploadData[j].fileName,
              languageId: this.state.fileToBeUploadData[j].languageId,
              speechId: speechResponse.data.id
            }

            await API.post("audio", item, {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
              }
            });
          }
        }
      }
    }
  }

  // Getting all data. (languages, speeches to performance and audios to speeches)
  async audioComponentDidMount(performanceId: number) {
    const languagesResponse = await API.get("language");
    if (languagesResponse.status == 200) {
      this.setState({
        languages: languagesResponse.data
      });
    }
    if (performanceId != -1){

    const performanceSpeechesResponse = await API.get("performance/" + performanceId + "/speeches");
    if (performanceSpeechesResponse.status == 200) {
      let speeches = [];
      for (let i = 0; i < performanceSpeechesResponse.data.length; i++) {
        let speechItem = {
          id: performanceSpeechesResponse.data[i].id,
          text: performanceSpeechesResponse.data[i].text,
          languages: this.state.languages,
          onDelete: this.deleteItemHandler,
          onTextChange: this.textChangeHandler,
          onFileChange: this.onFileChange
        }

        speeches.push(speechItem);
      }

      this.setState({
        performanceId: performanceSpeechesResponse.data.performanceId,
        speeches: speeches
      });
    }
    

    let files = [];
    for (let i = 0; i < performanceSpeechesResponse.data.length; i++) {
      const audiosToSpeech = await API.get("speech/" + performanceSpeechesResponse.data[i].id + "/audios");
      console.log(audiosToSpeech);

      for (let j = 0; j < audiosToSpeech.data.length; j++) {
        let item = {
          audioId: audiosToSpeech.data[j].id,
          fileName: audiosToSpeech.data[j].fileName,
          languageId: audiosToSpeech.data[j].languageId,
          speechIndex: audiosToSpeech.data[j].speechId
        };

        files.push(item);
      }
    }
    console.log(files);
    this.setState({
      fileToBeUploadData: files
    });
  }
  }

  render() {
    const items = [...this.state.speeches];

    const itemsList = items.map((item, index) => (
      <AudioItem
        key={index}
        id={item.id}
        text={item.text}
        languages={this.state.languages}
        onDelete={item.onDelete}
        fileToBeUploadData={this.state.fileToBeUploadData}
        onTextChange={item.onTextChange}
        onFileChange={item.onFileChange}
        ref={this.child}
      />
    ));

    return (
      <div className="audio-upload-section">
        <div className="col-sm-12 audio-header">
          <label>Аудіо</label>

          <button className="fas fa-plus-circle btn-audio-add" onClick={this.addItemHandler} />
        </div>
        <div id="audio-container" className="row">
          {itemsList}
        </div>
      </div>
    );
  }
}
