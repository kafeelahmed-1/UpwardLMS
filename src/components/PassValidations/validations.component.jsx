const Validations = ({label , radioSize}) => {
    
  const radio_style_classes = {
    small: "validation-radio-small",
    regular: "validation-radio-regular",
    smallRight: "validation-radio-small-right",
    regularRight: "validation-radio-regular-right",
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
          /* id={id} */
         /*  name={group} */
          value={label}
        /*   onChange={handleQuesType} */
        />
        <label className="cursor-pointer"/*  htmlFor={id} */>
          {label}
        </label>
      </div>
    </>
  );
};

export default Validations;
