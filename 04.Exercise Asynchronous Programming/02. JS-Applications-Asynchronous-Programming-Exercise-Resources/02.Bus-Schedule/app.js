function solve() {

    const departBtn = document.getElementById('depart');
    const arriveBtn = document.getElementById('arrive');
    const lable = document.querySelector('#info span');

    let stop = {
        next: 'depot'
    };

    async function depart() {
        departBtn.disabled = true;
        const url = `http://localhost:3030/jsonstore/bus/schedule/${stop.next}`;
        const res = await fetch(url);
        stop = await res.json();
        lable.textContent = `Next stop ${stop.name}`;
        arriveBtn.disabled = false;
    }

    function arrive() {
        lable.textContent = `Arriving at ${stop.name}`;
        departBtn.disabled = false;
        arriveBtn.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();