import React from "react";
import { withRouter } from "react-router-dom";

import Lista from "../components/lista";

class lista extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            items:[],
            currentItem:{
              text:'',
              key:''
            }
          }
    }

    render() {
        return (
            <>
                <Lista items={this.state.items}/>
            </>
        );
    }
}

export default withRouter(lista);