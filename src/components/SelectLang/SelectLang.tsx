import React from 'react';
import './SelectLang.css';

class SelectLang extends React.Component{

render(){
return(

  <div className="dropdown">
  <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
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