import styled from "styled-components";

const HabitsCalendarContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    .react-calendar {
        display: flex;
        flex-direction: column;
        width: 90vw;
        height: 60vh;
        max-width: 100%;
        background: white;
        font-family: Arial, Helvetica, sans-serif;
        line-height: 1.125em;
        margin-bottom: 30px;
        box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.15);
        border-radius: 10px;
    }

    .react-calendar--doubleView {
        width: 700px;
    }
    .react-calendar--doubleView .react-calendar__viewContainer {
        display: flex;
        margin: -0.5em;
    }

    .react-calendar__viewContainer {
        display: flex;
        flex-grow: 1;
    }
    .react-calendar--doubleView .react-calendar__viewContainer > * {
        width: 50%;
        margin: 0.5em;
    }
    .react-calendar,
    .react-calendar *,
    .react-calendar *:before,
    .react-calendar *:after {
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
    }
    .react-calendar button {
        margin: 0;
        border: 0;
        outline: none;
    }
    .react-calendar button:enabled:hover {
        cursor: pointer;
    }
    .react-calendar__navigation {
        height: 44px;
        margin-bottom: 1em;
    }
    .react-calendar__navigation button {
        min-width: 44px;
        background: none;
    }
    .react-calendar__navigation button:enabled:hover,
    .react-calendar__navigation button:enabled:focus {
        background-color: #e6e6e6;
    }
    .react-calendar__navigation button[disabled] {
        background-color: #f0f0f0;
    }
    .react-calendar__month-view__weekdays {
        text-align: center;
        text-transform: uppercase;
        font-weight: bold;
        font-size: 0.75em;
    }
    .react-calendar__month-view__weekdays__weekday {
        padding: 0.5em;
    }
    .react-calendar__month-view__weekNumbers {
        font-weight: bold;
    }
    .react-calendar__month-view__weekNumbers .react-calendar__tile {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.75em;
        padding: calc(0.75em / 0.75) calc(0.5em / 0.75);
    }
    .react-calendar__month-view > div,
    .react-calendar__month-view > div > div {
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    .react-calendar__month-view__days {
        flex: 1 1 auto;
        align-items: space-between;
    }
    .react-calendar__month-view__days__day--weekend {
        color: #d10000;
    }
    .react-calendar__month-view__days__day--neighboringMonth {
        color: #757575;
    }
    .react-calendar__year-view .react-calendar__tile,
    .react-calendar__decade-view .react-calendar__tile,
    .react-calendar__century-view .react-calendar__tile {
        padding: 2em 0.5em;
    }
    .react-calendar__tile {
        height: 40px;
        width: 40px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        max-width: 100%;
        text-align: center;
        padding: 0.75em 0.5em;
        background: none;
    }
    .react-calendar__tile:disabled {
        background-color: #f0f0f0;
    }
    .react-calendar__tile:enabled:hover,
    .react-calendar__tile:enabled:focus {
        background-color: #e6e6e6;
        border-radius: 50%;
    }
    .react-calendar__tile--now {
        background: #ffff76;
    }
    .react-calendar__tile--now:enabled:hover,
    .react-calendar__tile--now:enabled:focus {
        background: #ffffa9;
    }
    .react-calendar__tile--hasActive {
        background: #76baff;
        border-radius: 50%;
    }
    .react-calendar__tile--hasActive:enabled:hover,
    .react-calendar__tile--hasActive:enabled:focus {
        background: #a9d4ff;
        border-radius: 50%;
    }

    .react-calendar--selectRange .react-calendar__tile--hover {
        background-color: #e6e6e6;
    }
`;

export { HabitsCalendarContainer };
