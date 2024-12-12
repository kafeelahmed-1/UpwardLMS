import McqIcon from '../../assets/mcqIcon.svg';
import CodeIcon from '../../assets/codeIcon.svg';
import ShortAnsIcon from '../../assets/sqaIcon.svg';

const Chips = ({text , size , image , state}) =>
{
   /*  console.log('text is :' , text); */
    
    const chip_style_classes = {
        small:'chip-small',
        large:'chip-large'
    }

    const chip_icon_style_classes = {
        small:'chip-sm-icon-styles',
        large:'chip-lg-icon-styles'
    }

    const chip_icon = {
        small:'chip-icon-small',
        large:'chip-icon-large'
    }

    const chip_state = {
        default:'chip-default-state',
        error:'chip-error-state',
        success:'chip-success-state',
        disabled:'chip-disabled-state',
        info:'chip-info-theme',
        warning:'chip-warning-theme'
        
    }
 

    return(
        <>
            { image?
            (
            <div className={`${chip_icon_style_classes[size]} bg-[#4D55620D] py-1.5 ps-2.5 pe-3 rounded-[56px] flex gap-x-2 items-center  w-[fit-content] ${text === 'Code Snippet' ? `${chip_state['info']}` : text === 'Multiple Choice' ? `${chip_state['success']}` : `${chip_state['warning']}` }`}>
               <img src={`${text === 'Code Snippet' ? CodeIcon : text === 'Multiple Choice' ? McqIcon : ShortAnsIcon}`} alt="" className={`${chip_icon[size]}`} />
                <p className="leading-4 text-xs text-center">{text}</p>
            </div>
            )
            :
            (
            <div className={`${chip_style_classes[size]} ${chip_state[state]} bg-[#4D55620D] py-1.5 px-3 rounded-[56px] flex gap-x-2 items-center w-[fit-content]`}>
               <p className="leading-4 text-xs text-center">{text}</p>
            </div>
            )
            }
        </>
    );
}

export default Chips;
