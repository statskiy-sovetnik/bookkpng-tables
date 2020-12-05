import React from 'react';

export default class PrependInput extends React.Component {
    render() {
        let extra_classes = this.props.className ? ' ' + this.props.className : '';

        return (
            <div className={"prepend-input input-group input-group-sm" + extra_classes}>
                <div className="input-group-prepend">
                    <span className="prepend-input__prepend-text input-group-text" id={this.props.label_id}>{this.props.prepend}</span>
                </div>
                <input id={this.props.id} type="text" className="form-control prepend-input__input" placeholder="" aria-label=""
                       aria-describedby={this.props.label_id}/>
            </div>
        )
    }
}