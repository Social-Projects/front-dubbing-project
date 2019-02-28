import * as React from "react";
import { Tooltip } from "reactstrap";
import { isNullOrUndefined } from "util";
import API from "../../../util/api";
import AudioItem from "../AudioItem/AudioItem";
import "./AudioUpload.css";

export interface IAudioUploadProps { }

export interface IAudioUploadState {
  performanceId: number;

  languages: Array<{
    id: number,
    name: string,
  }>;

  speeches: Array<{
    id: number,
    text?: string,
    isNew?: boolean,
    onDelete: (index: number) => void,
    onTextChange: (str: string, index: number) => void
    onFileChange: (str: string, index: number, speechIndex: number) => void,
  }>;

  fileToBeUploadData: Array<{
    audioId?: number,
    fileName: any,
    languageId: number,
    speechIndex: number,
  }>;
  tooltipAddOpen: boolean;
}

export default class AudioUpload extends React.Component<IAudioUploadProps, IAudioUploadState> {
  public child = React.createRef<AudioItem>();

  constructor(props: IAudioUploadProps) {
    super(props);

    this.state = {
      performanceId: -1,
      languages: [],
      speeches: [],
      fileToBeUploadData: [],
      tooltipAddOpen: false,
    };

    this.addItemHandler = this.addItemHandler.bind(this);
    this.deleteItemHandler = this.deleteItemHandler.bind(this);
    this.uploadHandler = this.uploadHandler.bind(this);
    this.textChangeHandler = this.textChangeHandler.bind(this);
    this.tooltipAddToggle = this.tooltipAddToggle.bind(this);

  }

  public onFileChange = (fileName: string, languageId: number, speechIndex: number) => {
    const filesToBeUploadData = [...this.state.fileToBeUploadData];

    if (this.state.fileToBeUploadData.length > 0) {
      for (let i = 0; i < filesToBeUploadData.length; i++) {
        if (filesToBeUploadData[i].speechIndex === speechIndex && filesToBeUploadData[i].languageId === languageId) {
          filesToBeUploadData[i].fileName = fileName;

          this.setState({
            fileToBeUploadData: filesToBeUploadData,
          });

          return;
        }
      }
    }
    const item = {
      fileName,
      languageId,
      speechIndex,
    };

    filesToBeUploadData.push(item);

    this.setState({
      fileToBeUploadData: filesToBeUploadData,
    });
  }

  // Uploading speeches and file data. Very massive and probably needs
  public uploadHandler = async (performanceId: number, update: boolean) => {
    const reqCount = this.state.speeches.length * this.state.languages.length;
    const actualCount = this.state.fileToBeUploadData.length;

    if (reqCount !== actualCount) {
      return -1;
    }

    if (update) {
      for (let i = 0; i < this.state.speeches.length; i++) {
        const speech = {
          id: this.state.speeches[i].id,
          text: this.state.speeches[i].text,
          isNew: this.state.speeches[i].isNew,
          performanceId,
        };

        if (isNullOrUndefined(this.state.speeches[i].text) || this.state.speeches[i].text === "") {
          return -2;
        }

        // Cheking for new speeches
        if (!speech.isNew) {
          await API.put("speech", speech, {
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          });

          // Uploading audio file data
          if (this.state.fileToBeUploadData.length > 0) {
            for (let j = 0; j < this.state.fileToBeUploadData.length; j++) {
              // Cheking old file data to update
              if (this.state.fileToBeUploadData[j].speechIndex === this.state.speeches[i].id) {
                const item = {
                  fileName: this.state.fileToBeUploadData[j].fileName,
                  languageId: this.state.fileToBeUploadData[j].languageId,
                  speechId: speech.id,
                  id: this.state.fileToBeUploadData[j].audioId,
                };

                await API.put("audio", item, {
                  headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                  },
                });
              }
            }
          }
        } else { // if speeches is new just uploading them
          const speechResponse = await API.post("speech", speech, {
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          });

          // Uploading audio file data to speeches
          for (let j = 0; j < this.state.fileToBeUploadData.length; j++) {
            // Checking the audio file data is the same index that speechId
            if (this.state.fileToBeUploadData[j].speechIndex === i) {
              const item = {
                fileName: this.state.fileToBeUploadData[j].fileName,
                languageId: this.state.fileToBeUploadData[j].languageId,
                speechId: speechResponse.data.id,
              };

              await API.post("audio", item, {
                headers: {
                  "Accept": "application/json",
                  "Content-Type": "application/json",
                  "Access-Control-Allow-Origin": "*",
                },
              });
            }
          }
        }
      }
    } else { // if it's not an update just uploading the speeches
      for (let i = 0; i < this.state.speeches.length; i++) {
        const speech = {
          id: 0,
          text: this.state.speeches[i].text,
          performanceId,
        };

        if (isNullOrUndefined(this.state.speeches[i].text)) {
          return -2;
        }

        const speechResponse = await API.post("speech", speech, {
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        });

        // Uploading audio files data. This uploads need move to another method
        for (let j = 0; j < this.state.fileToBeUploadData.length; j++) {
          if (this.state.fileToBeUploadData[j].speechIndex === i) {
            const item = {
              fileName: this.state.fileToBeUploadData[j].fileName,
              languageId: this.state.fileToBeUploadData[j].languageId,
              speechId: speechResponse.data.id,
            };

            await API.post("audio", item, {
              headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
              },
            });
          }
        }
      }
    }
  }

  // Getting all data. (languages, speeches to performance and audios to speeches)
  public async audioComponentDidMount(performanceId: number) {
    const languagesResponse = await API.get("language");
    if (languagesResponse.status === 200) {
      this.setState({
        languages: languagesResponse.data,
      });
    }
    if (performanceId !== -1) {

    const performanceSpeechesResponse = await API.get("performance/" + performanceId + "/speeches");
    if (performanceSpeechesResponse.status === 200) {
      const speeches = [];
      for (let i = 0; i < performanceSpeechesResponse.data.length; i++) {
        const speechItem = {
          id: performanceSpeechesResponse.data[i].id,
          text: performanceSpeechesResponse.data[i].text,
          languages: this.state.languages,
          onDelete: this.deleteItemHandler,
          onTextChange: this.textChangeHandler,
          onFileChange: this.onFileChange,
        };

        speeches.push(speechItem);
      }

      this.setState({
        performanceId: performanceSpeechesResponse.data.performanceId,
        speeches,
      });
    }

    const files = [];
    for (let i = 0; i < performanceSpeechesResponse.data.length; i++) {
      const audiosToSpeech = await API.get("speech/" + performanceSpeechesResponse.data[i].id + "/audios");
      console.log(audiosToSpeech);

      for (let j = 0; j < audiosToSpeech.data.length; j++) {
        const item = {
          audioId: audiosToSpeech.data[j].id,
          fileName: audiosToSpeech.data[j].fileName,
          languageId: audiosToSpeech.data[j].languageId,
          speechIndex: audiosToSpeech.data[j].speechId,
        };

        files.push(item);
      }
    }
    console.log(files);
    this.setState({
      fileToBeUploadData: files,
    });
  }
  }

   public tooltipAddToggle() {
        this.setState({
            tooltipAddOpen: !this.state.tooltipAddOpen,
        });
    }

  public render() {
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
    console.log(itemsList);

    return (
      <div className="audio-upload-section">
        <div className="col-sm-12 audio-header">
          <label>Фраза</label>

          <button className="fas fa-plus-circle btn-audio-add" onClick={this.addItemHandler} id={"addBtn"}/>
          <Tooltip placement="right" isOpen={this.state.tooltipAddOpen} autohide={false} target={"addBtn"} toggle={this.tooltipAddToggle}>
            Додати фразу </Tooltip>
        </div>
        <div id="audio-container" className="row">
          {itemsList}
        </div>
      </div>
    );
  }

  private addItemHandler = () => {
    const speeches = this.state.speeches;

    const speechItem = {
      id: this.state.speeches.length,
      languages: this.state.languages,
      isNew: true,
      onDelete: this.deleteItemHandler,
      onTextChange: this.textChangeHandler,
      onFileChange: this.onFileChange,
    };

    speeches.push(speechItem);

    this.setState({
      speeches,
    });
  }

  private deleteItemHandler = async (index: number) => {
    if (this.state.performanceId === -1) {
      const speeches = this.state.speeches.filter((obj) => {
        return obj.id !== index;
      });
      const audios = this.state.fileToBeUploadData.filter((obj) => {
        return obj.speechIndex !== index;
      });
      this.setState({
        speeches,
        fileToBeUploadData : audios,
      });
    } else {
      if (isNullOrUndefined(this.state.speeches[index])) {
        const removeResponse = await API.delete("speech/" + index);
        if (removeResponse.status === 204) {
          const speeches = this.state.speeches.filter((obj) => {
            return obj.id !== index;
          });
          const audios = this.state.fileToBeUploadData.filter((obj) => {
            return obj.speechIndex !== index;
          });
          this.setState({
            speeches,
            fileToBeUploadData : audios,
          });
        }
      } else {
        const speeches = this.state.speeches.filter((obj) => {
          return obj.id !== index;
        });

        this.setState({
          speeches,
        });
      }
    }
  }

  private textChangeHandler = (str: string, index: number) => {
    const speeches = [...this.state.speeches];

    for (let i = 0; i < speeches.length; i++) {
      if (speeches[i].id === index) {
        speeches[i].text = str;
      }
    }

    this.setState({
      speeches,
    });
  }
}
