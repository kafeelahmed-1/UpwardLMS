import { useState } from 'react';

const InputField = () =>
{
    const [ input , setInput ] = useState(''); 

    const handleInput = (e) =>
    {
      let value = e.target.value;
      console.log(value.length);

   /*    if ( value.length > 20 )
      {
        alert('gg gb jj');
      } */

      setInput(value);
    }

    const input_type_classes = {
      default:'input-default',
      disabled:'input-disabled',
      readonly:'input-readonly'
    }

    return(
        <>
         <div className="input-container">
            <div className="input-default">
              <label>Title <span className="text-red-700">*</span></label>
              <span>{input.length}/250</span>
            </div>
            <input type="text" placeholder="Input Text" value={input}  onChange={handleInput} className="border w-full p-3 rounded-lg text-base text-textPrimary font-normal" maxLength="250" />
            <div className="input-default">
              <p>Assertive Text</p>
              <p className='text-link underline'><a href="#">Help Link</a></p>
            </div>
         </div>
        </>
    );
}

export default InputField;