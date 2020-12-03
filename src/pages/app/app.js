import React from 'react';
import {connect} from 'react-redux';
import {Provider} from 'react-redux';
import mapDispatchToProps from "../../store/mapDispatchToProps";
import mapStateToProps from "../../store/mapStateToProps";

/*___ Blocks________________*/
import Menu from '../../blocks/menu/menu'
import TableArea from '../../blocks/table-area/table-area'

class App extends React.Component {
    render() {
        return(
            <div>
                <Menu/>
                <TableArea data={'journal'}/>
            </div>
        )
    }
}

const APP_W = connect(mapStateToProps('App'), mapDispatchToProps('App'))(App);
export default APP_W;