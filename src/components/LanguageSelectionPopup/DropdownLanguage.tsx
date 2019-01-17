import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

interface stateDropdownLanguage {
    dropdownOpen: boolean,
    currentLanguage: {
        id: number,
        name: string
    }
}
interface propsDropdownLanguage {
    updateCurrentLang: any,
    languages: {
        id: number,
        name: string
    }[]
}

export default class DropdownLanguage extends React.Component<propsDropdownLanguage, stateDropdownLanguage> {
    constructor(props: any) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false,
            currentLanguage:  { id: 0, name: 'Мова' }
        };
    }

    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    changeCurrentLanguageHandler = (lang:any) => {
        const curLang = lang;
        this.props.updateCurrentLang(curLang);
        this.setState(state => ({
            currentLanguage: curLang
        }));
    }

    public render() {
        let language = null;
        language = (
            <div>
                {this.props.languages.map((lang, index) => {
                    index = lang.id;
                    return <DropdownItem key={index} onClick={() => this.changeCurrentLanguageHandler(lang)}>{lang.name}</DropdownItem>
                })}
            </div>
        );

        return (
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle caret>
                    {this.state.currentLanguage.name}
                </DropdownToggle>
                <DropdownMenu>
                    {language}
                </DropdownMenu>
            </Dropdown>
        );


    }
}