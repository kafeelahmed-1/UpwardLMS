
const Radio = ({ radioSize, label, group, on_quesType_from_child_to_parent , id , selectedTypeId}) => {


/*   console.log('id from ques type radio :' , id);
 */  /* console.log('selected ques Type :' , selectedTypeId); */

  const handleQuesType = (e) => {
    let type = e.target.value;
    /* console.log('Ques Type from child :' , type); */
    let typeId = e.target.id;
   /*  console.log('Ques Type Id from child :' , typeId); */
    on_quesType_from_child_to_parent(type , typeId);
  }

  const radio_style_classes = {
    small: "radio-small",
    regular: "radio-regular",
    smallRight: "radio-small-right",
    regularRight: "radio-regular-right",
  };

  const radio_btn_style = {
    small: "radio-btn-small",
    regular: "radio-btn-regular",
    smallRight: "radio-btn-small",
    regularRight: "radio-btn-regular",
  };

  return (
    <>
      <div
        className={`flex h-5 ${radio_style_classes[radioSize]} items-center gap-x-2`}
      >
        <input
          type="radio"
          className={`${radio_btn_style[radioSize]} font-normal`}
          name={group}
          id={id}
          value={label}
          onChange={handleQuesType}
          checked={selectedTypeId === id ? true : false}
        />
        <span></span>
        <label className="cursor-pointer" htmlFor={id}>
          {label}
        </label>
      </div>
    </>
  );
};

export default Radio;
