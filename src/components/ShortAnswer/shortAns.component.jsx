import { useState , useEffect} from 'react';

const ShortAns = ({correct_ans_from_child , id_}) => {

  console.log("Short Ans comp");
  //USE STATE HOOK
  const [ correctAns , setCorrectAns ] = useState('');
  /* console.log("CORRECT ANS :" , correctAns); */

  //USE EFFECT HOOK
  useEffect(() => {
  
    fetch(`${process.env.REACT_APP_BASE_URL}/api/Question/${id_}`)
    .then((response) => response.json())
    .then((data) => setCorrectAns(data.data.correctAnswer))
    .catch((error) => console.error("Error:", error.message));

  }, []);

  //FUNCTION
  const handleCorrectAns = (e) =>
  {
    let answer = e.target.value;
    correct_ans_from_child(answer);
    setCorrectAns(answer);
  }
  

  return (
    <>
      <textarea
        className="w-[480px] h-[120px] border border-secondary rounded-lg py-3 px-4 outline-none resize-none text-sm text-textSecondary"
        placeholder="Correct Answer"
        value={correctAns}
        onChange={handleCorrectAns}
      ></textarea>
    </>
  );
};

export default ShortAns;
