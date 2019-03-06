import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Dispatch } from "redux";

import Aux from "../../../hoc/Auxiliary";
import * as actionCreators from "../../../store/actions/index";
import apiManager from "../../../util/apiManager";
import LanguageSelectionPopup from "../../LanguageSelectionPopup/LanguageSelectionPopup";
import Spinner from "../../UI/Spinner/Spinner";
import Performance from "../Performance/Performance";

import "./PerformanceList.css";

interface IPerformanceState {
    performances: Array<{
        id: number,
        title: string,
        description: string,
    }>;
    isLoading: boolean;
}

interface IPerformanceProps {
    performances: [];
    onChangeCurrentTabId: Function;
}

class PerformanceList extends Component<IPerformanceProps, IPerformanceState> {
    public apimanager = new apiManager();

    constructor(props: any) {
        super(props);
        this.state = {
            performances: [],
            isLoading: true,
        };
        this.removePerformance = this.removePerformance.bind(this);
    }

    public getPerformances = async () => {
        const resp = await this.apimanager.getPerformances();
        if (resp.status === 200) {
            const data = await resp.json();
            this.setState({
                performances: data,
            });
        } else if (resp.status === 500) {
            alert("Виникла помилка на сервері.");
        } else {
            alert("Не вдалось підключитись до серверу. Перевірте з'єднання з сервером.");
        }
    }

    public async removePerformance(index: number) {
        const resp = await this.apimanager.removePerformance(index);
        if (resp.status === 204) {
            const arr = this.state.performances.filter((obj) => {
                return obj.id !== index;
            });

            this.setState({
                performances: arr,
            });
        } else {
            this.getPerformances();
        }
    }

    public render() {
        return (
            <Aux>
                <Spinner isShow={this.state.isLoading} />
                <div className="perfomanceList">
                    <div className="header">
                        <p>Вистави</p>
                        <Link to="/performance/new" >
                            <button className="addButton"><div className="addImage" />Додати виставу</button>
                        </Link>
                    </div>
                    {/* popup for language management. Created by reactstrap. Props here https://reactstrap.github.io/components/modals/ */}
                    <LanguageSelectionPopup
                        buttonLabel="Керувати мовами дубляжу"></LanguageSelectionPopup>
                    {
                        this.state.performances.map((item) => {
                            return <Performance deleteMethod={this.removePerformance} index={item.id} key={item.id} title={item.title} description={item.description} />;
                        },
                        )}
                </div>
            </Aux>
        );
    }

    public async componentDidMount() {
        await this.getPerformances();
        this.setState({
            isLoading: false,
        });

        this.props.onChangeCurrentTabId(0);
    }

    public componentWillUnmount() {
        console.log("[Performance List]: Component will unmount");
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        onChangeCurrentTabId: (nextId: number) => dispatch(actionCreators.changeCurrentTabId(nextId)),
    };
};

export default connect(null, mapDispatchToProps)(PerformanceList);
