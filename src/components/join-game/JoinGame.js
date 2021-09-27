// import React from "react";
//
// function JoinGame() {
//
//     const [gamePin, setGamePin] = useLocalStorageState('gamePin');
//     const [gamePass, setGamePass] = useLocalStorageState('gamePass');
//
//     function handleSubmit(event) {
//         event.preventDefault()
//         // TODO reguqest z zapisem
//         // TODO obsluga bledow
//         // TODO reditect
//     }
//
//     const handlePassChange = event => setGamePass(event.target.value);
//     const handlePinChange = event => setGamePin(event.target.value);
//
//     return (
//         <form onSubmit={handleSubmit}>
//             <label htmlFor="gamePin">PIN</label>
//             <input id="gamePin" type="text" onChange={handlePinChange} value={gamePin}/>
//             <label htmlFor="gamePass">PASS</label>
//             <input id="gamePass" type="text" onChange={handlePassChange} value={gamePass}/>
//             <button type="submit">GO!</button>
//             <button type="button">NEW</button>
//         </form>
//
//     )
// }
