import FormTitle from "../FormTitle/formTitle.component";
import PlusBig from "../../assets/PlusBig.svg";
import Button from "../Button/button.component";

const MoreQuesPopup = () => {
  return (
    <>
      <div className="border border-secondary min-w-[520px] w-[fit-content] min-h-[252px] h-[fit-content] rounded-lg mx-auto">

        {/* div 1 : FORM TITLE*/}
        <FormTitle title="Add More Questions?" />

        {/* div 2 : CONTENT BODY */}
        <div className="flex flex-col gap-y-6 pt-3 px-5 pb-8 text-base">
          <p>Would you like to add more questions?</p>
          <div className="flex gap-x-2 items-center">
            <input
              type="checkbox"
              className="w-5 h-5 border-2 border-secondary"
            />
            <label>Don't Ask again</label>
          </div>
        </div>

        {/*  DIV 3 : BUTTONS DIV */}
        <div className="w-[520px] h-[84px] p-5 flex justify-end">
          <div className="flex gap-x-4">
            {/* Button comp : cancel button*/}
            <Button
              button_type="tertiary"
              button_size="medium"
              text="No, Cancel"
              /* onclick={handleCancel}  */
              icon="none"
              src=""
            />
            {/* Button comp : Add more questions div */}
            <Button
              button_type="primary"
              button_size="medium"
              text="Add More Questions"
              /* onclick={handleAddQues} */
              icon="left"
              src={PlusBig}
            />
          </div>
        </div>

      </div>
    </>
  );
};

export default MoreQuesPopup;
