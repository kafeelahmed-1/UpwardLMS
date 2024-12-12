import React, { useState , useEffect } from 'react';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-textmate';

const CodeSnippet = ({correct_ans_from_child , id_}) => {
  console.log("code snippet comp");
  //USE STATE HOOK
  const [code, setCode] = useState('// Your initial code here');
  /* console.log('code initially :' , code); */


  //USE EFFECT HOOK
  useEffect(() => {
  
    fetch(`${process.env.REACT_APP_BASE_URL}/api/Question/${id_}`)
    .then((response) => response.json())
    .then((data) => setCode(data.data.correctAnswer))
    .catch((error) => console.error("Error:", error.message));

  }, []);


  const handleChange = (newCode) => {
    setCode(newCode);
    correct_ans_from_child(newCode);
  };
  

  return (
    <div className="w-[480px] min-h-[180px] h-[fit-content] p-0">
      <AceEditor
        mode="javascript"
        /* html={codeDB.correctAnswer} */
        theme="textmate"
        onChange={handleChange}
        name="code-editor"
        setOptions={{ useWorker: false }}
        editorProps={{ $blockScrolling: true }}
        value={code}
        width="fitContent"
        height="180px"
        fontSize="12px"
        className='border border-secondary rounded-lg'   
      />
    </div>
  );
};

export default CodeSnippet;

