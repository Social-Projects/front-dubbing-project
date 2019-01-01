import React from 'react';
import PerfomanceHead from '../PerfomanceHead/PerfomanceHead';
import PerfomanceItem from '../PerfomanceItem/PerfomanceItem';
import './Perfomance.css';

class Perfomance extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            perfomances: [
                { 
                    title: "Вистава 1",
                    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." +
                          "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s," + 
                          "when an unknown printer took a galley of type and scrambled it to make a type" + 
                          "specimen book."
                },
                {
                    title: "Вистава 2",
                    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." +
                          "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s," + 
                          "when an unknown printer took a galley of type and scrambled it to make a type" + 
                          "specimen book."
                }
            ]
        };
    }

    render() {
        return (
            <div className="perfomance">
                <PerfomanceHead text="Вистави" />
                <PerfomanceItem
                    title={this.state.perfomances[0].title}
                    text={this.state.perfomances[0].text}/>
                <PerfomanceItem
                    title={this.state.perfomances[1].title}
                    text={this.state.perfomances[1].text}/>
            </div>
        )
    }
}

export default Perfomance;