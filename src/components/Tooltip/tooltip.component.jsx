import triangleDown from '../../assets/triangle-down.svg';
import triangleUp from '../../assets/triangle-up.svg';

const Tooltip = ({text , position}) =>
{
    const tooltip_position = {
        bottomLeft:'tooltip-bottom-left',
        bottomCenter:'tooltip-bottom-center',
        bottomRight:'tooltip-bottom-right',
        topLeft:'tooltip-top-left',
        topCenter:'tooltip-top-center',
        topRight:'tooltip-top-right',    
    };

    return(
        <>
    
        <div className='w-[81px] h-8 ms-2 flex flex-col'>
            {(position === 'topLeft') || (position === 'topCenter') || (position === 'topRight')  ?
             (
              <>
               <img src={triangleUp} className={`px-4 ${tooltip_position[position]}`} />
               <div className="w-[81px] h-8 rounded-lg bg-[#394150] py-2 px-3 text-sm text-white leading-4 tracking-[-0.25px] shadow-[0_12px_12px_-6px_rgba(0,0,0,0.15)]">
                 {text}
               </div>
              </>
             )
             : 
             ( 
              <>
              <div className="w-[81px] h-8 rounded-lg bg-[#394150] py-2 px-3 text-sm text-white leading-4 tracking-[-0.25px] shadow-[0_12px_12px_-6px_rgba(0,0,0,0.15)]">
                {text}
              </div>       
              <img src={triangleDown} className={`px-4 ${tooltip_position[position]}`} />
              </>
             )
             }
        </div>
        </>
    );

}

export default Tooltip;