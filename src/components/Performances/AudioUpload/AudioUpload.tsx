import * as React from "react";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap";
import { Tooltip } from "reactstrap";

import API from "../../../util/api";
import Spinner from "../../UI/Spinner/Spinner";
import AudioItem from "../AudioItem/AudioItem";
import "./AudioUpload.css";

enum HttpMethods {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

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
  dropdownOpen: boolean;
  selectedLanguage?: {
    id: number,
    name: string,
  };
  tooltipUploadBatch: boolean;
  isLoading: boolean;
}

export default class AudioUpload extends React.Component<IAudioUploadProps, IAudioUploadState> {
  public child = React.createRef<AudioItem>();
  private usedLanguages: Array<{id: number, name: string}> = [];
  private isFirstLanguage: boolean = true;

  constructor(props: IAudioUploadProps) {
    super(props);

    this.state = {
      performanceId: -1,
      languages: [],
      speeches: [],
      fileToBeUploadData: [],
      tooltipAddOpen: false,
      dropdownOpen: false,
      selectedLanguage: undefined,
      tooltipUploadBatch: false,
      isLoading: true,
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
    // checking if number of real loaded audios equals expected loaded audios
    const reqCount = this.state.speeches.length * this.state.languages.length;
    const actualCount = this.state.fileToBeUploadData.length;
    if (reqCount !== actualCount) {
      return {
        errorCode: -1,
        errorMessage: "Завантажте аудіо до всіх мов!",
      };
    }

    // checking if text any speech is empty
    let isSomeSpeechNullOrEmpty = false;
    this.state.speeches.filter((s) => {
      if (s.text === undefined || s.text === null || s.text === "") {
        isSomeSpeechNullOrEmpty = true;
      }
    });

    if (isSomeSpeechNullOrEmpty) {
      return {
        errorCode: -2,
        errorMessage: "Введіть текст до всіх фраз!",
      };
    }

    // @ts-ignore
    let isError: Error = null;
    // if evertything is OK then upload
    if (update) {
      for (let i = 0; i < this.state.speeches.length; i++) {
        const speech = {
          id: this.state.speeches[i].id,
          text: this.state.speeches[i].text,
          isNew: this.state.speeches[i].isNew,
          performanceId,
        };

        // Cheking for new speeches
        if (!speech.isNew) {
          // updating speech and relative to him audios
          await API.put("speech/" + speech.id, speech, {
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }).then(async (response) => {
            await this.uploadAndSaveAudioAsync(speech.id, i, HttpMethods.PUT)
                      .catch((error) => {
                        console.log(`[uploadAndSaveAudioAsync]: ${error}`);
                        isError = error;
                      });
          })
          .catch((error) => {
            console.log(`[uploadHandler] ${error}`);
            isError = error;
          });

        } else { // if speeches is new just uploading them
          // creating speech and relative to him audios
          await API.post("speech", speech, {
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }).then(async (response) => {
            await this.uploadAndSaveAudioAsync(response.data.id, this.state.speeches[i].id, HttpMethods.POST)
                      .catch((error) => {
                        console.log(`[uploadAndSaveAudioAsync]: ${error}`);
                        isError = error;
                      });
          }).catch((error) => {
            console.log(`[uploadHandler] ${error}`);
            isError = error;
          });

        }

        if (isError !== null) {
          return {
            errorCode: -3,
            errorMessage: isError.message,
          };
        }
      }
    } else { // if it's not an update just uploading the speeches
      for (let i = 0; i < this.state.speeches.length; i++) {
        const speech = {
          id: 0,
          text: this.state.speeches[i].text,
          performanceId,
        };

        // creating speech and relative to him audios
        await API.post("speech", speech, {
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }).then(async (response) => {
          await this.uploadAndSaveAudioAsync(response.data.id, i, HttpMethods.POST)
                    .catch((error) => {
                      console.log(`[uploadAndSaveAudioAsync]: ${error}`);
                      isError = error;
                    });
        }).catch((error) => {
          console.log(`[uploadHandler] ${error}`);
          isError = error;
        });

        if (isError !== null) {
          return {
            errorCode: -3,
            errorMessage: isError.message,
          };
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
      this.setState({
        fileToBeUploadData: files,
      });
    }

    this.setState({
      isLoading: false,
    });
  }

  public tooltipAddToggle() {
      this.setState({
          tooltipAddOpen: !this.state.tooltipAddOpen,
      });
  }

  // For batch uploading
  public toggleDropdown = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  public toggleSelectedLanguage = (id: number) => {
    if (this.state.selectedLanguage === undefined || this.state.selectedLanguage.id !== id) {
      const language = this.state.languages.find((l) => l.id === id);

      this.setState({
        selectedLanguage: language,
      });
    }
  }

  public tooltipUploadBatchOpen = () => {
    this.setState({
      tooltipUploadBatch: !this.state.tooltipUploadBatch,
    });
  }

  // triggered when click on fake upload button
  public onBatchUpload = (event: any) => {
    event.preventDefault();
    if (this.state.selectedLanguage !== undefined) {
      const input = document.querySelector("#batchUpload") as HTMLInputElement;
      if (input !== null) {
        input.click();
      }
    } else {
      alert("Будь ласка виберіть мову, а тоді вже завантажте файли!");
    }
  }

  public batchUpload = async (event: any) => {
    this.setState({
      isLoading: true,
    });

    const files = event.target.files as FileList;
    // @ts-ignore
    if (this.isFirstLanguage || this.state.selectedLanguage.id === this.usedLanguages[0].id) {
      for (let i = 0; i < files.length; i++) {
        this.onBatchAddItem(files[i]);
      }

      this.isFirstLanguage = false;
      this.usedLanguages.push(this.state.selectedLanguage as {id: number, name: string});
    } else {
        this.onBatchUpdateItems(files);
    }

    this.setState({
      isLoading: false,
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

    let batchUploading = null;
    if (this.state.performanceId === -1) {
      const languages = this.state.languages.map((lang) => {
        return (
          <DropdownItem
            key={lang.id}
            onClick={() => this.toggleSelectedLanguage(lang.id)}>{lang.name}</DropdownItem>
        );
      });

      const selectedLanguage = this.state.selectedLanguage === undefined
                                ? "Виберіть мову..." : this.state.selectedLanguage.name;
      const isDisabledBatchUpload = this.state.selectedLanguage === undefined ? true : false;
      batchUploading = (
        <div>
            <label>Пакетом: </label>

            <Dropdown
              className="dropdown-toggle-language"
              isOpen={this.state.dropdownOpen}
              toggle={() => this.toggleDropdown()}
              size="sm">
              <DropdownToggle caret>
                {selectedLanguage}
              </DropdownToggle>
              <DropdownMenu>
                {languages}
              </DropdownMenu>
            </Dropdown>
            <input multiple id="batchUpload" className="inputFile" type="file" onChange={this.batchUpload}/>
            <button
              id={"batchUploadBtn"}
              className={"fas fa-plus-circle btn-audio-add " + (isDisabledBatchUpload ? "disabled-btn-audio-add" : "")}
              onClick={this.onBatchUpload}/>
            <Tooltip placement="right" isOpen={this.state.tooltipUploadBatch} autohide={false} target={"batchUploadBtn"} toggle={this.tooltipUploadBatchOpen}>
              Завантажити аудіо</Tooltip>
          </div>
      );
    }

    return (
      <div className="audio-upload-section">
        <Spinner isShow={this.state.isLoading}/>
        <div className="col-sm-12 audio-header">
          <div>
            <label>Вручну: </label>

            <button className="fas fa-plus-circle btn-audio-add" onClick={this.addItemHandler} id={"addBtn"} />
            <Tooltip placement="right" isOpen={this.state.tooltipAddOpen} autohide={false} target={"addBtn"} toggle={this.tooltipAddToggle}>
              Додати фразу </Tooltip>
          </div>

          {batchUploading}
        </div>
        <div id="audio-container" className="row">
          {itemsList}
        </div>
      </div>
    );
  }

  // Uploading audio files and creating records in database which contain data about them
  private uploadAndSaveAudioAsync = async (speechIdentifier: number, speechIndex: number, method: HttpMethods) => {
    for (let j = 0; j < this.state.fileToBeUploadData.length; j++) {
      if (this.state.fileToBeUploadData[j].speechIndex === this.state.speeches[speechIndex].id) {
        if (method === HttpMethods.POST) {
          const item = {
            fileName: this.state.fileToBeUploadData[j].fileName,
            languageId: this.state.fileToBeUploadData[j].languageId,
            speechId: speechIdentifier,
          };

          await API.post("audio", item, {
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          });
        } else if (method === HttpMethods.PUT) {
          const item = {
            fileName: this.state.fileToBeUploadData[j].fileName,
            languageId: this.state.fileToBeUploadData[j].languageId,
            speechId: speechIdentifier,
            id: this.state.fileToBeUploadData[j].audioId,
          };

          await API.put("audio/" + item.id, item, {
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

  private onBatchAddItem = async (file: File) => {
    const speechItem = this.addItemHandler();
    const audio = file;

    const formData = new FormData();
    formData.append("File", audio);
    await API.post("audio/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then(() => {
      // @ts-ignore
      this.onFileChange(audio.name, this.state.selectedLanguage.id, speechItem.id);
    }).catch(() => {
      alert("Sorry! Some error was occured!");
      return;
    });
  }

  private onBatchUpdateItems = async (files: FileList) => {
    const neededFiles = this.state.fileToBeUploadData
    // @ts-ignore
                                  .filter((f) => f.languageId === this.state.selectedLanguage.id)
                                  .map((f) => f.speechIndex);
    const neededSpeeches = this.state.speeches.filter((s) => {
      return !neededFiles.includes(s.id);
    });

    if (files.length <= neededSpeeches.length) {
      for (let i = 0; i < files.length; i++) {
        const audio = files[i];

        const formData = new FormData();
        formData.append("File", audio);

        await API.post("audio/upload", formData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        // @ts-ignore
        .then(() => this.onFileChange(audio.name, this.state.selectedLanguage.id, neededSpeeches[i].id))
        .catch(() => alert("Sorry, some error occured..."));
      }
    } else {
      alert("Некоретна вибрана кількість файлів.");
    }
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

    return speechItem;
  }

  private deleteItemHandler = async (index: number) => {
    this.setState({
      isLoading: true,
    });

    const neededSpeech = this.state.speeches.find((s) => s.id === index);
    // if (neededSpeech) {
    //   console.log(`Needed speech id: ${neededSpeech.id}`);
    // }
    // console.log(`Actual Id: ${index}`);

    if (neededSpeech !== undefined) {
      if (this.state.performanceId === -1) {
        await this.removeLocalSpeechesAsync(index);
      } else {
        if (!neededSpeech.isNew) {
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
          await this.removeLocalSpeechesAsync(index);
        }
      }
    }

    this.setState({
      isLoading: false,
    });
  }

  private removeLocalSpeechesAsync = async (index: number): Promise<void> => {
    const speeches = this.state.speeches.filter((obj) => {
      return obj.id !== index;
    });

    const mustToBeDeletedAudios: string[] = [];
    const audios = this.state.fileToBeUploadData.filter((obj) => {
      if (obj.speechIndex !== index) {
        return obj;
      } else {
        mustToBeDeletedAudios.push(obj.fileName);
      }
    });

    await this.unloadFilesAsync(mustToBeDeletedAudios);

    this.setState({
      speeches,
      fileToBeUploadData : audios,
    });
  }

  private unloadFilesAsync = async (mustToBeDeletedAudios: string[]) => {
    if (mustToBeDeletedAudios.length > 0) {
      let query = "?";
      for (const audio of mustToBeDeletedAudios) {
        query += `files=${audio}&`;
      }
      query.slice(query.length - 1, 1);

      await API.delete("/audio/unload/" + query);
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
