import { useState , useEffect } from 'react';

const Tabs = (props) =>
{
/*    console.log('props :' , props);
 */
    const total_tabs = 
    {
        two:'two',
        three:'three',
        four:'four'
    };

    var items = [];
    
    if (props.controls === 'two')
    {
        items.push(props.text1 , props.text2);

    }

    if (props.controls === 'three')
    {
        items.push(props.text1 , props.text2 , props.text3);
    }

    if (props.controls === 'four')
    {
        items.push(props.text1 , props.text2 , props.text3 , props.text4);
    }



/*     console.log('ATUMS:' , items);
 */
    return(
        <>
       
        <div className="flex w-[fit-content]">
            {items.map((text) =>
            {
                return(
                    <>
                     <button className={`first:text-primary first:border-b-2 first:border-b-primary text-sm text-center py-1 text-textSecondary ${total_tabs[props.controls]}`}>
                        {/* <p className={` ${total_tabs[props.controls]}`}> */}
                        {text}
                     </button>
                    </>
                );
            })}
        </div>
        </>
    );
}

export default Tabs;
