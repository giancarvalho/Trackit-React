export default function calcProgress(todayList) {
    let numberTasksDone = todayList.reduce((preValue, habit) => {
        if (habit.done) return preValue + 1;

        return preValue;
    }, 0);

    return (numberTasksDone / todayList.length) * 100;
}
