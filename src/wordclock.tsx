import * as React from 'react';

// Creating proper interface types
interface LineProps {
    minutes : number;
    hours : number;
}
type HelperProps = {children : string};
type MinuteLineProps = Omit<LineProps, 'hours'>
type HourLineProps = Omit<LineProps, 'minutes'>

// Instantiating constant value(s)
const timeThreshold : number = 2.5; // determines range for time classification such as "half past five"

// Helper function that determines if a time falls within a range
// Example: For "quarter" range: Determines 
// if the minutes fall within the first quarter
// or last quarter of the hour.
function withinMinutes(currentTime : number, minutes : number, threshold : number): boolean{
    return (Math.abs(currentTime - minutes) < threshold) || (Math.abs(currentTime - (60-minutes)) < threshold);
}


// Additional components:

// Highlights text and preserves whitespace
function Highlight({children} : HelperProps){
    return <div className="highlighted"><pre>{children}</pre></div>
}

// Dims text and preserves whitespace
function Dim({children} : HelperProps){
    return <div className="dimmed"><pre>{children}</pre></div>
}

// If switched, then children are highlighted, else dimmed.
function ClockSwitch({switched, children} : HelperProps & {switched: boolean}){
    if (switched){
        return <Highlight children={children}/>
    } else {
        return <Dim children={children}/>
    }
}

// Makes text from different helper components passed to it as children
// appear on 1 line.
// TODO: need to figure out type of children here
function LineContainer({children}: any){
    return <div className="line-container">{children}</div>
}

// Always is highlighted to say "IT IS..."
function Line1() : React.ReactElement{
    return (<LineContainer>
        <Highlight>I T </Highlight>
        <Dim>K </Dim>
        <Highlight>I S </Highlight>
        <Dim>L D F X L C </Dim>
    </LineContainer>);
}

// Determines if minutes is in first quarter or last quarter of hour (quarter range) and renders appropriately
function Line2({minutes} : MinuteLineProps) : React.ReactElement{
    const withinQuarter = withinMinutes(minutes, 15, timeThreshold);
    return (<LineContainer>
        <ClockSwitch switched={withinQuarter}>A </ClockSwitch>
        <Dim>V </Dim>
        <ClockSwitch switched={withinQuarter}>Q U A R T E R </ClockSwitch>
        <Dim>M Y </Dim>
    </LineContainer>)
}

// Determines if minutes is in 25, 5, or 20 range of hour and renders appropriately
function Line3({minutes} : MinuteLineProps) : React.ReactElement{
    const withinTwenty : boolean = withinMinutes(minutes, 20, timeThreshold);
    const withinTwentyFive : boolean = withinMinutes(minutes, 25, timeThreshold);
    const withinFive : boolean = withinMinutes(minutes, 5, timeThreshold);
    let finalElement: React.ReactElement = <></>;
    if (withinTwenty) {
        finalElement = <><Highlight>T W E N T Y </Highlight><Dim>F I V E Z </Dim></>
    } else if(withinTwentyFive) {
        finalElement = <><Highlight>T W E N T Y F I V E </Highlight><Dim>Z </Dim></>
    } else if(withinFive) {
        finalElement = <><Dim>T W E N T Y </Dim><Highlight>F I V E </Highlight><Dim>Z </Dim></>
    } else {
        finalElement = <><Dim>T W E N T Y F I V E Z </Dim></>
    }
    return (<LineContainer>
        {finalElement}
    </LineContainer>)
}

// Determines if minutes is in 10 minute range, and also whether the clock should render
// word "to" for phrases like "10 to 2"
function Line4({minutes} : MinuteLineProps) : React.ReactElement{
    const withinHalf : boolean = withinMinutes(minutes, 30, timeThreshold);
    const withinTen : boolean = withinMinutes(minutes, 10, timeThreshold);
    const secondHalf : boolean = minutes >= 30 && !withinHalf && minutes !== 0;
    return (<LineContainer>
        <ClockSwitch switched={withinHalf}>H A L F </ClockSwitch>
        <Dim>J </Dim>
        <ClockSwitch switched={withinTen}>T E N </ClockSwitch>
        <Dim>G </Dim>
        <ClockSwitch switched={secondHalf}>T O </ClockSwitch>
    </LineContainer>)
}

// Determines if the 9 hour should be rendered, and whether the clock should render 
// word "past" for phrases like "half past 3"
function Line5({minutes, hours}: LineProps) : React.ReactElement{
    const firstHalf: boolean = minutes <= 30 + timeThreshold && minutes !== 0;
    const hourNine: boolean = hours === 9;
    return (<LineContainer>
        <Dim>D R </Dim>
        <ClockSwitch switched={firstHalf}>P A S T </ClockSwitch>
        <Dim>F </Dim>
        <ClockSwitch switched={hourNine}>N I N E </ClockSwitch>
    </LineContainer>)
}

// Determines if hours 2, 5, or 4 should be rendered
function Line6({hours}: HourLineProps): React.ReactElement{
    const hourTwo: boolean = hours === 2;
    const hourFive: boolean = hours === 5;
    const hourFour: boolean = hours === 4;
    return (<LineContainer>
        <ClockSwitch switched={hourTwo}>T W O </ClockSwitch>
        <ClockSwitch switched={hourFive}>F I V E </ClockSwitch>
        <ClockSwitch switched={hourFour}>F O U R </ClockSwitch>
    </LineContainer>)
}

// Determines if hours 1, 6, or 3 should be rendered
function Line7({hours}: HourLineProps): React.ReactElement{
    const hourOne: boolean = hours === 1;
    const hourSix: boolean = hours === 6;
    const hourThree: boolean = hours === 3;
    return (<LineContainer>
        <ClockSwitch switched={hourOne}>O N E </ClockSwitch>
        <ClockSwitch switched={hourSix}>S I X </ClockSwitch>
        <ClockSwitch switched={hourThree}>T H R E E </ClockSwitch>
    </LineContainer>)
}

// Determines if hours 8 or 11 should be rendered
function Line8({hours}: HourLineProps){
    const hourEight: boolean = hours === 8;
    const hourEleven: boolean = hours === 11;
    return (<LineContainer>
        <ClockSwitch switched = {hourEight}>E I G H T </ClockSwitch>
        <ClockSwitch switched = {hourEleven}>E L E V E N </ClockSwitch>
    </LineContainer>)
}

// Determines if hours 7 or 12 should be rendered
function Line9({hours}: HourLineProps){
    const hourSeven: boolean = hours === 7;
    const hourTwelve: boolean = hours === 0;
    return (<LineContainer>
        <ClockSwitch switched = {hourSeven}>S E V E N </ClockSwitch>
        <ClockSwitch switched = {hourTwelve}>T W E L V E </ClockSwitch>
    </LineContainer>)
}

// Determines if hour 10 should be rendered or if the 
// phrase "o'clock" should be rendered for exact hours
function Line10({minutes,hours}: LineProps){
    const hourTen: boolean = hours === 10;
    const exact: boolean = withinMinutes(minutes, 0, timeThreshold)
    return (<LineContainer>
        <ClockSwitch switched={hourTen}>T E N </ClockSwitch>
        <Dim>B </Dim>
        <ClockSwitch switched={exact}>O ' C L O C K </ClockSwitch>
    </LineContainer>)
}

// Component that gets the time, and houses all line components
function WordClock({children}: any){
    const currentTime : Date = new Date();
    const LineDateTime : LineProps = {
        minutes: currentTime.getMinutes() + currentTime.getSeconds()/60,
        hours: currentTime.getHours() % 12
    } 

    // This makes the logic for rendering phrases including "to" much easier
    if (LineDateTime.minutes >= 30 + timeThreshold){
        LineDateTime.hours = LineDateTime.hours + 1;
    }

    return (<>
            <Line1/>
            <Line2 minutes={LineDateTime.minutes}></Line2>
            <Line3 minutes={LineDateTime.minutes}></Line3>
            <Line4 minutes={LineDateTime.minutes}></Line4>
            <Line5 minutes={LineDateTime.minutes} hours={LineDateTime.hours}></Line5>
            <Line6 hours={LineDateTime.hours}></Line6>
            <Line7 hours={LineDateTime.hours}></Line7>
            <Line8 hours={LineDateTime.hours}></Line8>
            <Line9 hours={LineDateTime.hours}></Line9>
            <Line10 minutes={LineDateTime.minutes} hours={LineDateTime.hours}></Line10>
            </>);
}
export default WordClock;