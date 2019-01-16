import React from 'react';
import './Play.css';
import SelectLang from '../SelectLang/SelectLang'


interface PlayState{
    isMusicPlaying:boolean;
}

class Play extends React.Component<{}, PlayState>{
    constructor(props:any) {
        super(props);
        this.state = { isMusicPlaying: false };
      }
      handleClick() {
        if (this.state.isMusicPlaying) {
            this.setState({ isMusicPlaying: false });
          } else {
            this.setState({ isMusicPlaying: true });
          }
      };
      render() {
       
        let status = this.state.isMusicPlaying 
        ? 'PAUSE' 
        : 'PLAY';
        return (
          <div>
            <p className="text-center">Spectacle Name</p>
            <button className={status}  onClick={this.handleClick.bind(this)}>
           { status }</button>   
          <SelectLang /* isEnabled={this.state.isMusicPlaying} *//> 
          </div>
        );
      }
}


  export default Play;