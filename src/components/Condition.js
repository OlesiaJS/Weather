import { BsSun } from "react-icons/bs";
import { BsCloudSun } from "react-icons/bs";
import { BsFillCloudHailFill } from "react-icons/bs";
import { CiCloudMoon } from "react-icons/ci";

function GetSvgCondition({ myCondition }) {
    let myConditional = myCondition;
    console.log(myConditional);
    let ConditionSVG = '';
    switch (true) {
        case (myConditional === 'Sunny' || myConditional === 'Clear'):
            ConditionSVG = < BsSun />;
            break;
        case (myConditional === 'Partly cloudy' || myConditional === 'cloudy'):
            ConditionSVG = < BsCloudSun />;
            break;
        case (myConditional === 'Rain'):
            ConditionSVG = < BsFillCloudHailFill />;
            break;
        default:
            ConditionSVG = < CiCloudMoon />;
            break;
    }
    return ConditionSVG;
}

export default GetSvgCondition;