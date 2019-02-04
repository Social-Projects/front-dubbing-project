import * as React from "react";
import "./AudioUpload.css";
import API from "../../../util/api";
import AudioItem from "../AudioItem/AudioItem";

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
  }[]
}

export default class AudioUpload extends React.Component<IAudioUploadProps, IAudioUploadState> {
  constructor(props: IAudioUploadProps) {
    super(props);

    this.state = {
      performanceId: -1,
      languages: [],
      speeches: []
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
      onTextChange: this.textChangeHandler
    };

    speeches.push(speechItem);

    this.setState({
      speeches: speeches
    });
  }

  private deleteItemHandler = async (index: number) => {
    if(this.state.performanceId == -1) {
      let speeches = this.state.speeches.filter(obj => {
        return obj.id != index;
      });

      this.setState({
        speeches: speeches
      });
    } else {
      let removeResponse = await API.delete("speech/" + index)
      if(removeResponse.status == 200) {
        let speeches = this.state.speeches.filter(obj => {
          return obj.id != index;
        });

        this.setState({
          speeches: speeches
        });
      }
    }
  }

  private textChangeHandler = (string: string, index: number) => {
    let speeches = [...this.state.speeches];

    for(let i = 0; i < speeches.length; i++) { 
      if(speeches[i].id == index) {
        speeches[i].text = string;  
      } 
    }

    this.setState({
      speeches: speeches
    });
  }

  uploadHandler = async (performanceId: number, update: boolean) => {
    if(update){
      for(let i = 0; i < this.state.speeches.length; i++) {
        let speech = {
          id: this.state.speeches[i].id,
          text: this.state.speeches[i].text,
          isNew: this.state.speeches[i].isNew,
          performanceId: performanceId
        }

        if(!speech.isNew) {
          await API.put("speech", speech, {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*"
            }
          });
        } else {
          await API.post("speech", speech, {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*"
            }
          });
        }
      }
    } else {
      for(let i = 0; i < this.state.speeches.length; i++) {
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
      }
    }
  }

  async audioComponentDidMount(performanceId: number) {
    const languagesResponse = await API.get("language");
    if (languagesResponse.status == 200) {
      this.setState({
        languages: languagesResponse.data
      });
    }

    const performanceSpeechesResponse = await API.get("performance/" + performanceId + "/speeches");
    if (performanceSpeechesResponse.status == 200) {
      let speeches = [];
      for (let i = 0; i < performanceSpeechesResponse.data.length; i++) {
        let speechItem = {
          id: performanceSpeechesResponse.data[i].id,
          text: performanceSpeechesResponse.data[i].text,
          languages: this.state.languages,
          onDelete: this.deleteItemHandler,
          onTextChange: this.textChangeHandler
        }

        speeches.push(speechItem);
      }

      this.setState({
        performanceId: performanceSpeechesResponse.data.performanceId,
        speeches: speeches
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
        onTextChange={item.onTextChange}
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
