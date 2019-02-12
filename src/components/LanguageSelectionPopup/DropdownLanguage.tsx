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
            currentLanguage: { id: 0, name: 'Мова' }
        };
    }

    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    changeCurrentLanguageHandler = (lang: any) => {
        const curLang = lang;
        this.props.updateCurrentLang(curLang);
        this.setState(state => ({
            currentLanguage: curLang
        }));
    }

    compare(a : any,b : any) {
        if (a.name < b.name)
          return -1;
        if (a.name > b.name)
          return 1;
        return 0;
      }

    public render() {
        let language = null;
        var sortable = this.props.languages.sort(this.compare);

        language = (
            <div>
                {sortable.map((lang, index) => {
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