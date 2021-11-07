import styled from "styled-components";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import calcProgress from "../scripts/calcProgress";

export default function BottomBar({ todayList }) {
    const [percentage, setPercentage] = useState(0);

    useEffect(() => {
        setPercentage(() => calcProgress(todayList));
    }, [todayList]);

    return (
        <BottomBarContainer>
            <Link to="/habits">
                <p>Habits</p>
            </Link>

            <ProgressBarContainer>
                <Link to="/today">
                    <CircularProgressbar
                        value={percentage}
                        text="Today"
                        strokeWidth={12}
                        styles={buildStyles({
                            textColor: "white",
                            pathColor: "white",
                            trailColor: "transparent",
                        })}
                    />
                </Link>
            </ProgressBarContainer>

            <Link to="/history">
                <p>History</p>
            </Link>
        </BottomBarContainer>
    );
}

const BottomBarContainer = styled.div`
    height: 70px;
    width: 100%;
    background-color: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10%;

    a {
        text-decoration: none;
    }

    p {
        color: #52b6ff;
    }
`;

const ProgressBarContainer = styled.div`
    position: absolute;
    width: 97px;
    height: 97px;
    background-color: #52b6ff;
    border-radius: 50%;
    padding: 7px;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
`;
