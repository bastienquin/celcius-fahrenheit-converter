import './App.css';
import React from "react";

function toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
    const input = parseFloat(temperature);
    if (Number.isNaN(input)) {
        return '';
    }
    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
}

class Converter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            temperature: '',
            scale: 'c'
        };
        this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
        this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    }

    handleCelsiusChange(temperature) {
        this.setState({scale: 'c', temperature});
    }

    handleFahrenheitChange(temperature) {
        this.setState({scale: 'f', temperature});
    }

    render() {

        const celcius = this.state.scale === 'f' ? tryConvert(this.state.temperature, toCelsius) : this.state.temperature;
        const fahrenheit = this.state.scale === 'c' ? tryConvert(this.state.temperature, toFahrenheit) : this.state.temperature;

        return(
            <div>
                <InlineTitle name="C°" />
                <TemperatureInput scale="c" temperature={celcius} placeholder="20" onTemperatureChange={this.handleCelsiusChange} />
                <TemperatureInput scale="f" temperature={fahrenheit} placeholder="68" onTemperatureChange={this.handleFahrenheitChange} />
                <InlineTitle name="F°" />
            </div>
        );
    }

}

class TemperatureInput extends React.Component {

    constructor(props) {
        super(props);
        this.onTemperatureChange = this.onTemperatureChange.bind(this);
    }

    onTemperatureChange(e) {
        this.props.onTemperatureChange(e.target.value);
    }

    render() {
        return(
            <input className={"input-t input-" + this.props.scale} value={this.props.temperature} onChange={this.onTemperatureChange} placeholder={this.props.placeholder} />
        );
    }

}

class InlineTitle extends React.Component {

    render() {
        return(
            <div className="inline-title">{this.props.name}</div>
        );
    }

}

function App() {
    return (
        <div className="App">
              <header className="App-header">
                  <h1>Celcius - Fahrenheit Converter</h1>
                  <Converter />
              </header>
        </div>
    );
}

export default App;
