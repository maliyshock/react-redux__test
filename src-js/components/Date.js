import React, { Component, PropTypes } from 'react'

export default class Date extends Component {
    constructor(props) {
        super(props);
        this.state = {
            day: '',
            month: '',
            year: ''
        };
    }

    executeDateHandler(key, value) {
        this.props.handler(
            {
                name: this.props.name,
                value: {[key]: value},
                step: this.props.step
            }
        )
    }

    handleChange(event) {
        const obj = event.target;
        const value = obj.value;
        const inputName = obj.getAttribute('name');
        const maxLength = parseInt(obj.getAttribute('maxLength'), 10);

        if(value <= maxLength) {
            if (inputName === 'day') {
                this.executeDateHandler('day', value);
            } else if (inputName === 'month') {
                this.executeDateHandler('month', value);
            } else if (inputName === 'year') {
                this.executeDateHandler('year', value);
            }

            this.setState({
                [inputName]: value,
            });
        }
    }

    render() {
        let wrapperClassNames =  'input-wrapper';
        let title = this.props.title ? <h3 className='form__title'>{this.props.title}</h3> : '';

        if(this.props.input && this.props.input.isCorrect === false) {
            wrapperClassNames = 'input-wrapper input-wrapper--has-error '
        }

        return (
            <div className={wrapperClassNames}>
                {title}
                <div className='form__date'>
                    <input name='day'
                           type='number'
                           className='form__input'
                           placeholder='DD'
                           onChange={::this.handleChange}
                           maxLength='31'
                           value={this.state.day}
                           tabIndex='-1'
                    />
                    <input name='month'
                           type='number'
                           className='form__input'
                           placeholder='MM'
                           onChange={::this.handleChange}
                           maxLength='12'
                           value={this.state.month}
                           tabIndex='-1'
                    />
                    <input name='year'
                           type='number'
                           className='form__input'
                           placeholder='YYYY'
                           onChange={::this.handleChange}
                           maxLength='9999'
                           value={this.state.year}
                           tabIndex='-1'
                    />
                </div>
            </div>
        )
    }
}


Date.PropTypes = {
    step: PropTypes.number.isRequired,
    input: PropTypes.object.isRequired,
    handler: PropTypes.func.isRequired,
    title: PropTypes.string,
    name: PropTypes.string.isRequired
}
