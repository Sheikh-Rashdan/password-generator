import { useEffect, useState } from "react";

import ProgressBar from "./ProgressBar";

import "./StrengthBar.css"

function StrengthBar({ passwordLength, useUppercase, useNumbers, useSymbols }) {
    const [strengthScore, setStrengthScore] = useState(4);
    const [barColor, setBarColor] = useState();

    useEffect(() => {
        let score = 1;
        if (useUppercase) score++;
        if (useNumbers) score++;
        if (useSymbols) score++;
        if (passwordLength > 10) score++;
        if (passwordLength > 14) score++;
        setStrengthScore(score);

        let color = "#951717";
        if (score > 2) color = "#b79a1d";
        if (score > 4) color = "#74aa1d";
        setBarColor(color);
    }, [passwordLength, useUppercase, useNumbers, useSymbols]);

    return (
        <>
            <p>Strength: {strengthScore}/6</p>
            <ProgressBar value={strengthScore} min={0} max={6} color={barColor} />
        </>
    );
}

export default StrengthBar;