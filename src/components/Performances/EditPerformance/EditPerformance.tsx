import React, { Component } from "react";
import { Link } from "react-router-dom";
import apiManager from "../../../util/apiManager";
import history from "../../../util/history";
import Spinner from "../../UI/Spinner/Spinner";
import AudioUpload from "../AudioUpload/AudioUpload";
import "./EditPerformance.css";

interface IEditPerformanceState {
    id: number;
    title: string;
    description: string;
    isShow: boolean;
}

interface IEditPerformanceProps {
    match: {
        params: {
            number: any,
        },
    };

    upload: any;
}

class EditPerformance extends Component<IEditPerformanceProps, IEditPerformanceState> {
    public child = React.createRef<AudioUpload>();

    public apimanager = new apiManager();
    constructor(props: IEditPerformanceProps) {
        super(props);
        this.state = {
            id: -1,
            title: "",
            description: "",
            isShow: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    public handleChange(e: any) {
        const val = e.target.value;

        if (e.target.name === "title") {
            this.setState({
                title: val,
            });
        } else if (e.target.name === "description") {
            this.setState({
                description: val,
            });
        }
    }

    public async handleSave() {
        this.setState({
            isShow: true,
        });

        if (this.state.id !== -1) {
            const resp = await this.apimanager.updatePerformance(JSON.stringify(this.state), this.state.id);

            if (resp.status === 204) {
                if (!this.child.current) {
                    return;
                }

                const result = await this.child.current.uploadHandler(this.state.id, true);

                if (result === -1 || result === -2) {
                    this.setState({
                        isShow: false,
                    });

                    result === -1 ? alert("Завантажте всі аудіо!") : alert("Введіть текст фрази!");
                    return;
                }

                this.setState({
                    isShow: false,
                });

                history.push("/performance/" + this.state.id);
                await this.loadData();

            } else {
                console.log(resp.status);
            }
        } else {
            const performance = {
                title: this.state.title,
                description: this.state.description,
            };
            const resp = await this.apimanager.createPerformance(JSON.stringify(performance));

            if (resp.status === 201) {
                const JSONObj = await resp.json();

                if (!this.child.current) {
                    return;
                }

                const result = await this.child.current.uploadHandler(JSONObj.id, false);

                if (result === -1 || result === -2) {
                    this.setState({
                        isShow: false,
                    });

                    result === -1 ? alert("Завантажте всі аудіо!") : alert("Введіть текст фрази!");
                    return;
                }

                history.push("/performance/" + JSONObj.id);
                await this.loadData();
            } else {
                console.log(resp.status);
            }
        }

        this.setState({
            isShow: false,
        });
    }

    public async loadData() {
        if (this.props.match.params.number !== "new") {
            const resp = await this.apimanager.getPerformanceById(this.props.match.params.number);

            if (resp.status === 200) {
                const data = await resp.json();
                this.setState({
                    id: data.id,
                    title: data.title,
                    description: data.description,
                });

                if (!this.child.current) {
                    return;
                }

                this.child.current.audioComponentDidMount(data.id);
            } else {
                console.log(resp.status);
            }
        } else {
            if (!this.child.current) {
                return;
            }

            this.child.current.audioComponentDidMount(this.state.id);
        }
    }

    public componentDidMount() {
      this.loadData();
    }

    public render() {

        return (
            <div className="editForm">
                <Spinner isShow={this.state.isShow} />

                <div className="formHeader">
                    <p>{this.props.match.params.number === "new" ? "Створення вистави" : "Редагування вистави"}</p>
                    <div className="text-right">
                        <button className="saveButton" onClick={this.handleSave} ><i className="fas fa-check-circle saveIcon"></i>Зберегти</button>
                        <Link to="/performance/">
                            <button className="cancelButton">
                                <i className="fas fa-times-circle saveIcon"></i>Вiдмiна
                            </button>
                        </Link>
                    </div>
                </div>

                <input type="hidden" readOnly={true} value={this.state.id} />
                <p className="formTitles">Назва вистави</p>
                <input type="text" name="title" onChange={this.handleChange} value={this.state.title} />
                <p className="formTitles">Опис вистави</p>
                <textarea className="descrField" name="description" onChange={this.handleChange} value={this.state.description} />

                <AudioUpload ref={this.child}></AudioUpload>
            </div>
        );
    }
}

export default EditPerformance;
