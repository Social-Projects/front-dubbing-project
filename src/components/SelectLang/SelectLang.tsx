import React from 'react';
import './SelectLang.css';


interface EnableState{
  isEnable: boolean;
} 

class SelectLang extends React.Component<{}, EnableState>{
  constructor(props:any) {
    super(props);
    this.state = { isEnable: false };
  }
render(){

  const status = this.state.isEnable 
  ? '' 
  : 'disabled';

return(

  <div className="dropdown">
  <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" disabled={status=="disabled"} aria-haspopup="true" aria-expanded="false">
ENGLISH
</button>
<div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
<a className="dropdown-item btn btn-success" href="#">ENGLISH</a>
<a className="dropdown-item btn btn-success" href="#">POLSKI</a>
</div>
</div>
)
}
}

export default SelectLang;