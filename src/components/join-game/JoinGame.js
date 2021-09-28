import PropTypes from "prop-types";
import React from "react";
import {getGamePin, saveGamePin} from "../../state/local-storage";
import {randomPin} from "../../utils/pin-generator"

JoinGame.propTypes = {
    redirect: PropTypes.func.isRequired
}

function JoinGame(props) {

    const options ={
        newGame: {
            pinInputLabel: 'NEW PIN',
            pinDisabled: true,
            passInputLabel: 'SET PASS',
            goBtnLabel: 'GO!',
            switchBtnLabel: 'JOIN EXISTING',
            switchBtnFn: () => switchMode(false),
        },
        existingGame: {
            pinInputLabel: 'PIN',
            pinDisabled: false,
            passInputLabel: 'PASS',
            goBtnLabel: 'GO!',
            switchBtnLabel: 'CREATE NEW',
            switchBtnFn: () => switchMode(true),
        }
    }

    const [tempGamePin, setTempGamePin] = React.useState(getGamePin());
    const [tempGamePass, setTempGamePass] = React.useState('');
    const [mode,setMode] = React.useState(options.existingGame);

    function handleSubmit(event) {
        // TODO sprawdzic czy taka gra istnieje lub stworzyc nowa
        event.preventDefault();
        saveGamePin(tempGamePin);
        props.redirect();
    }

    function setTempPin(event) {
        setTempGamePin(event.target.value);
    }

    function setTempPass(event) {
        setTempGamePass(event.target.value);
    }

    function switchMode(isNewGame) {
        setMode(isNewGame ? options.newGame : options.existingGame);
        setTempGamePin(isNewGame ? randomPin() : '');
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="gamePin">{mode.pinInputLabel}</label>
            <input id="gamePin" type="text" onChange={setTempPin} disabled={mode.pinDisabled} value={tempGamePin}/>
            <label htmlFor="gamePass">{mode.passInputLabel}</label>
            <input id="gamePass" type="text" onChange={setTempPass} value={tempGamePass}/>
            <button type="submit">{mode.goBtnLabel}</button>
            <button type="button" onClick={mode.switchBtnFn}>{mode.switchBtnLabel}</button>
        </form>
    )
}

export default JoinGame;
