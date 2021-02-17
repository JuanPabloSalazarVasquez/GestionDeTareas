import React from "react";
import { withRouter } from "react-router-dom";

import Lista from "../components/lista";

class lista extends React.Component {
    render() {
        return (
            <>
                <Lista />
            </>
        );
    }
}

export default withRouter(lista);