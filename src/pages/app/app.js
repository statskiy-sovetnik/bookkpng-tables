import React from 'react';
import {connect} from 'react-redux';
import {Provider} from 'react-redux';
import mapDispatchToProps from "../../store/mapDispatchToProps";
import mapStateToProps from "../../store/mapStateToProps";

/*___ Blocks________________*/
import Menu from '../../blocks/menu/menu'
import {JOURNAL_AREA_W as JournalArea} from '../../blocks/table-area/table-area'

/*___ Libs _________________*/
import '../../../node_modules/bootstrap/dist/js/bootstrap.bundle'

class App extends React.Component {
    render() {
        return(
            <div>
                <Menu/>
                <JournalArea data={'journal'}/>
            </div>
        )
    }
}

const APP_W = connect(mapStateToProps('App'), mapDispatchToProps('App'))(App);
export default APP_W;