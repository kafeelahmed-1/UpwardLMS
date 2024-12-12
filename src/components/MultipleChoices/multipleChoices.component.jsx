import DragIcon from "../../assets/dragIcon.svg";
import DeleteIcon from "../../assets/deleteIcon.svg";
import { useState, useEffect } from "react";

const MultipleChoices = ({ options_from_child_to_parent, id_ }) => {
  console.log("mcqs comp");
  // console.log('this is mcq comp id :' , id_);
  const [option, setOption] = useState("");
  // console.log("option :", option);

  // const [ editOption , setEditOption ] = useState("");

  const [choices, setChoices] = useState([{ answerText: "Option 1" }]);
  // console.log("choices :", choices);

  //USE EFFECT HOOK
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/api/Question/${id_}`)
      .then((response) => response.json())
      .then((data) => setChoices(data.data.avlAnswer))
      .catch((error) => console.error("Error:", error.message));
  }, []);

  const onInputChanges = (e) => {
    let value = e.target.value;
    setOption(value);
  };

  //plain add option
  const onEnter = (e) => {
    /* console.log('e' , e.key); */
    if (e.key === "Enter") {
      setChoices([...choices, { answerText: option }]);
      setOption("");
    }
  };

  const on_send_options_to_parent = () => {
    options_from_child_to_parent(choices);
  };

  return (
    <>
      {choices.map((item) => {
        return (
          <>
            {/* main conatiner : displaying all options*/}
            <div className="w-[480px] h-[44px] flex gap-x-4">

              {/* sub container 1 */}
              <div className="flex">
                {/*  drag icon */}
                <div className="w-[44px] self-center">
                  <img src={DragIcon} className="block mx-auto" />
                </div>
                {/* option input */}
                <input
                  id={item.id}
                  type="text"
                  placeholder="Add Option"
                  value={item.answerText}
                  className="w-[335px] h-[40px] py-[10px] px-3 rounded-lg border border-secondary mt-[2px] text-sm outline-none"
                  /* onChange={onEditOption} */
                  /*  onFocus={onInputFocus}
                  onChange={onInputChanges} */
                />
                {/* radio for choosing the correct option */}
                <div className="w-[44px] self-center">
                  <input
                    type="radio"
                    name="options"
                    className="block mx-auto h-[20.25px] w-[20.25px]"
                  />
                </div>
              </div>

              {/* sub container 2 */}
              {/* delete icon */}
              <div className="self-center w-[44px]">
                <img src={DeleteIcon} className="block mx-auto" />
              </div>
            </div>
          </>
        );
      })}


    {/*   xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
 */}

      {/* main conatiner : for adding a new option*/}
      <div className="w-[480px] h-[44px] flex gap-x-4">
        {/* sub container 1 */}
        <div className="flex">
          <div className="w-[44px] self-center">
            <img
              src={DragIcon}
              className="block mx-auto"
              style={{ display: "none" }}
            />
          </div>
          <input
            type="text"
            placeholder="Add Option"
            value={option}
            className="w-[335px] h-[40px] py-[10px] px-3 rounded-lg border border-secondary mt-[2px] text-sm outline-none"
            onChange={onInputChanges}
            onKeyDown={onEnter}
            onBlur={on_send_options_to_parent}
          />
          <div className="w-[44px] self-center">
            <input
              type="radio"
              name="options"
              className="block mx-auto h-[20.25px] w-[20.25px]"
              style={{ display: "none" }}
            />
          </div>
        </div>

        {/* sub container 2 */}
        <div className="self-center w-[44px]">
          <img
            src={DeleteIcon}
            className="block mx-auto"
            style={{ display: "none" }}
          />
        </div>
      </div>
    </>
  );
};

export default MultipleChoices;
