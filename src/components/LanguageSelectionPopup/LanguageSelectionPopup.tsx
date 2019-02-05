import React,{Dispatch} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Tooltip } from 'reactstrap';
import DropdownLanguage from "./DropdownLanguage";
import { Form, FormGroup, Label, Input } from 'reactstrap';
import "./LanguageSelectionPopup.css";
import apiManager from "./apiManagerLanguage";
import PopupConfirmationDialog from "../PopupConfirmationDialog/PopupConfirmationDialog"
interface languageState {
    modal: boolean,
    radioState: string,
    currentLang: {
        id: number,
        name: string
    },
    languages: {
        id: number,
        name: string
    }[]
}

interface languageProps {
    buttonLabel: string
}

export default class LanguageSelectionPopup extends React.Component<languageProps, languageState> {
    apiManager = new apiManager();
    child = React.createRef<PopupConfirmationDialog>();

    constructor(props: any) {
        super(props);
        this.state = {
            modal: false,
            radioState: "",
            currentLang: { id: -1, name: "" },
            languages: [
            ],
        };
        this.toggle = this.toggle.bind(this);
    }

    getLang = async () => {
        const resp = await this.apiManager.getLang();
        const data = await resp.json();
        this.setState(
            {
                languages: data
            });
    }

    onAddLang = async (lang: any) => {
        const resp = await this.apiManager.createLang(JSON.stringify(lang));
        this.getLang();
    }

    onDelLang = async (lang: any) => {
        const resp = await this.apiManager.removeLang(lang.id);
        this.getLang();
    }

    onUpdateLang = async (lang: any) => {
        const resp = await this.apiManager.updateLang(JSON.stringify(lang));
        this.getLang();
    }

    toggle() {
        this.setState({
            modal: !this.state.modal,
            radioState: "",
            currentLang: { id: -1, name: "" }
        });
    }

    radioHandler = (event: any) => {
        const radioState = event.target.value;
        this.setState({ radioState: radioState });
    }

    updateCurrentLang = (value: any) => {
        this.setState({ currentLang: value })
    }

    nameUpdateHandler = () => {
        this.onUpdateLang(this.state.currentLang);
        this.setState({
            currentLang: { id: -1, name: "" }
        });
        this.toggle();
    }

    nameChangedHandler = (event: any) => {
        this.setState({ currentLang: { id: this.state.currentLang.id, name: event.target.value } })
    }

    languageDeleteHandler = () => {
        this.onDelLang(this.state.currentLang);
        this.setState({
            currentLang: { id: -1, name: "" }
        });
        this.toggle();
    }

    languageAddHandler = () => {
        const newLanguage = {
            id: 0,
            name: this.state.currentLang.name
        };
        this.onAddLang(newLanguage);
        this.toggle();
    }

    toggleChildComponent = async (e: any) => {
        if (!this.child.current) {
            return;
        }
        this.child.current.toggle();
    }


    componentDidMount() {
        this.getLang();
    }

    public render() {
        
        var currentLangName = this.state.currentLang.name;
        let inputs = null
        if (this.state.radioState === "add") {
            inputs = (
                <div>
                    <Form>
                        <Label >Введіть назву мови щоб додати</Label>
                        <Input
                            className="inputLang"
                            placeholder="Назва мови"
                            onChange={this.nameChangedHandler} /><br />
                        <Button
                            color="primary"
                            onClick={() => this.languageAddHandler()} >Додати мову</Button>
                    </Form>
                </div>
            );
        }
        else if (this.state.radioState === "update") {
            var inputLang;
            inputs = (
                <div>
                    <DropdownLanguage
                        updateCurrentLang={this.updateCurrentLang}
                        languages={this.state.languages}></DropdownLanguage> <br></br>
                    <Form >
                        <Label >Оберіть мову для редагування</Label>
                        <Input
                            className="inputLang"
                            defaultValue={currentLangName}
                            onChange={this.nameChangedHandler}
                        /><br />
                        <Button
                            color="primary"
                            onClick={() => this.nameUpdateHandler()} >Редагувати</Button>
                    </Form>
                </div>
            );
        }
        else if (this.state.radioState === "delete") {
            inputs = (
                <div>
                    <DropdownLanguage
                        updateCurrentLang={this.updateCurrentLang}
                        languages={this.state.languages}></DropdownLanguage> <br></br>
                    <Form>
                        <Button
                            color="danger"
                            onClick={this.toggleChildComponent} >Видалити мову</Button><br />
                        <PopupConfirmationDialog
                            removeMethod={this.languageDeleteHandler.bind(this)}
                            message="Видалення мови приведе до видалення усіх аудіозаписів звязаних з цією мовою. Ви дійсно хочете видалити виставу?"
                            labelDangerButton="Видалити"
                            labelPrimaryButton="Відмінити"
                            ref={this.child}
                        />
                    </Form>
                </div>
            );
        }

        return (

            <div className="languageButton">
                <Button
                    color="primary"
                    onClick={this.toggle}>{this.props.buttonLabel}</Button>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}>
                    <ModalHeader
                        toggle={this.toggle}
                        className="popupHeader">Керування мовами дубляжу</ModalHeader>
                    <ModalBody className="popupBody">
                        <div>
                            <FormGroup tag="fieldset">
                                <FormGroup check>
                                    <Label check>
                                        <Input type="radio" name="radioLang" value="add" onChange={this.radioHandler} />{' '}
                                        Додати нову мову дубляжу</Label>
                                </FormGroup>
                                <FormGroup check>
                                    <Label check>
                                        <Input type="radio" name="radioLang" value="update" onChange={this.radioHandler} />{' '}
                                        Змінити назву мови дубляжу</Label>
                                </FormGroup>
                                <FormGroup check >
                                    <Label check>
                                        <Input type="radio" name="radioLang" value="delete" onChange={this.radioHandler} />{' '}
                                        Видалити мову дубляжу</Label>
                                </FormGroup>
                            </FormGroup>
                        </div>
                        {inputs}
                    </ModalBody>
                    <ModalFooter className="popupHeader">
                        <Button color="secondary" onClick={this.toggle}>Закрити</Button>
                    </ModalFooter>
                </Modal>
            </div >
        );
    }
}
