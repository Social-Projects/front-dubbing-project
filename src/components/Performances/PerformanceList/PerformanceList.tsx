import React, { Component } from "react";
import Performance from "../Performance/Performance"
import apiManager from "../../../util/apiManager";

import { Link } from "react-router-dom";
import "./PerformanceList.css"
import LanguageSelectionPopup from "../../LanguageSelectionPopup/LanguageSelectionPopup";

interface performanceState {
    performances: {
        id: number,
        title: string,
        description: string
    }[]
}

interface performanceProps {
    performances: []
}

class PerformanceList extends Component<performanceProps, performanceState>
{
    apimanager = new apiManager();

    constructor(props: any) {
        super(props);
        this.state = {
            performances: []
        }
        this.removePerformance = this.removePerformance.bind(this);
    }

    getPerformances = async () => {
        const resp = await this.apimanager.getPerformances();
        const data = await resp.json();
        this.setState(
            {
                performances: data
            });

    }
    async removePerformance(index: number) {

        const resp = await this.apimanager.removePerformance(index);
        if (resp.status == 200) {
            const arr = this.state.performances.filter(obj => {
                return obj.id !== index;
            })

            this.setState(
                {
                    performances: arr
                });
        }
        else {
            this.getPerformances();
            console.log(resp.status);
        }


    }
    componentDidMount() {
        this.getPerformances();
    }
    render() {

        return (
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
                    }
                    )}
            </div>
        );
    }
}
export default PerformanceList