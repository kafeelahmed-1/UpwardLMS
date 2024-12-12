import triangleDown from '../../assets/triangle-down.svg';
import triangleUp from '../../assets/triangle-up.svg';

const RichTooltip = ({heading , text , btn1 , btn2 , position}) =>
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
        <div className='w-[335px] h-[104px] ms-2 flex flex-col'>
            {(position === 'topLeft') || (position === 'topCenter') || (position === 'topRight')  ?
             (
              <>
               <img src={triangleUp} className={`px-4 ${tooltip_position[position]}`} />
               <div className="w-[335px] h-[104px] rounded-lg bg-[#394150] py-2 px-3 text-white shadow-[0_12px_12px_-6px_rgba(0,0,0,0.15)] flex flex-col gap-y-2">

                 {/* div for heading and text */}
                 <div className='gap-y-0.5 w-[311px] h-[38px]'>
                    <p className='leading-5 tracking-[-0.25px] text-sm font-semibold'>{heading}</p>
                    <p className='leading-5 tracking-[-0.25px] text-xs'>{text}</p>
                 </div>

                 {/* div containing primary and secondary buttons */}
                 <div className='gap-x-4 flex'>
                   {/*  btn1 */}
                    <div className='w-[147.5px] h-9 rounded-lg'>
                      <button className='w-[103px] h-9 block mx-auto text-sm text-center'>{btn1}</button>
                    </div>
                    {/* btn2 */}
                    <div className='w-[147.5px] h-9 rounded-lg bg-white'>
                      <button className='w-[103px] h-9 block mx-auto text-sm text-textPrimary font-semibold text-center'>{btn2}</button>
                    </div>
                 </div>

               </div>
              </>
             )
             : 
             ( 
              <>
               <div className="w-[335px] h-[104px] rounded-lg bg-[#394150] py-2 px-3 text-white shadow-[0_12px_12px_-6px_rgba(0,0,0,0.15)] flex flex-col gap-y-2">

                  {/* div for heading and text */}
                  <div className='gap-y-0.5 w-[311px] h-[38px]'>
                    <p className='leading-5 tracking-[-0.25px] text-sm font-semibold'>{heading}</p>
                    <p className='leading-5 tracking-[-0.25px] text-xs'>{text}</p>
                  </div>

                  {/* div containing primary and secondary buttons */}
                  <div className='gap-x-4 flex'>
                    {/*  btn1 */}
                    <div className='w-[147.5px] h-9 rounded-lg'>
                        <button className='w-[103px] h-9 block mx-auto text-sm text-center'>{btn1}</button>
                    </div>
                    {/* btn2 */}
                    <div className='w-[147.5px] h-9 rounded-lg bg-white'>
                        <button className='w-[103px] h-9 block mx-auto text-sm text-textPrimary font-semibold text-center'>{btn2}</button>
                    </div>
                  </div>

                </div>    
              <img src={triangleDown} className={`px-4 ${tooltip_position[position]}`} />
              </>
             )
             }
        </div>
        </>
    );
}

export default RichTooltip;