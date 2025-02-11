document.addEventListener("DOMContentLoaded", function () {
    const gainSlider = document.getElementById("gain");
    const bandwidthSlider = document.getElementById("bandwidth");
    const gainValue = document.getElementById("gainValue");
    const bandwidthValue = document.getElementById("bandwidthValue");
    const voltageSwing = document.getElementById("voltageSwing");
    const powerDissipation = document.getElementById("powerDissipation");
    const slewRate = document.getElementById("slewRate");
    const canvas = document.getElementById("circuitCanvas");
    const ctx = canvas.getContext("2d");

    canvas.width = 300;
    canvas.height = 200;

    function updateValues() {
        let gain = parseFloat(gainSlider.value);
        let bandwidth = parseFloat(bandwidthSlider.value);

        gainValue.textContent = gain;
        bandwidthValue.textContent = bandwidth;

        let swing = (gain / 10).toFixed(2);
        let power = (gain * bandwidth / 100).toFixed(2);
        let slew = (bandwidth / gain).toFixed(2);

        voltageSwing.textContent = swing;
        powerDissipation.textContent = power;
        slewRate.textContent = slew;

        drawCircuit(gain, bandwidth);
    }

    function drawCircuit(gain, bandwidth) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#000";
        ctx.fillRect(50, 90, 200, 20);
        ctx.beginPath();
        ctx.arc(50, 100, 10, 0, 2 * Math.PI);
        ctx.arc(250, 100, 10, 0, 2 * Math.PI);
        ctx.fill();

        ctx.strokeStyle = "#007bff";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(100, 100);
        ctx.lineTo(150, 50 + (50 - gain / 2));
        ctx.lineTo(200, 100);
        ctx.stroke();

        ctx.font = "14px Arial";
        ctx.fillStyle = "#007bff";
        ctx.fillText(`Gain: ${gain} dB`, 10, 20);
        ctx.fillText(`BW: ${bandwidth} MHz`, 10, 40);
    }

    gainSlider.addEventListener("input", updateValues);
    bandwidthSlider.addEventListener("input", updateValues);

    updateValues();
});
