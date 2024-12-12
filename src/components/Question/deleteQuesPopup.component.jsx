import FormTitle from "../FormTitle/formTitle.component";
import Button from "../Button/button.component";
import WhiteTrashIcon from "../../assets/whiteTrashIcon.svg";

const DeleteQuesPopup = () => {
  return (
    <>
      <div className="border border-secondary w-[520px] min-h-[252px] h-[fit-content] rounded-lg mx-auto">
        {/* div 1 : FORM TITLE*/}
        <FormTitle title="Delete Question?" />

        {/* div 2 : CONTENT BODY */}
        <div className="flex flex-col gap-y-6 pt-3 px-5 pb-8 text-base">
          <p>This question is currently assigned to 15 assessments. Deleting it would remove this question from the aassessments</p>
          <p>This action is irreversible.</p>
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
              text="Cancel"
              /* onclick={handleCancel}  */
              icon="none"
              src=""
            />
            {/* Button comp : Add more questions div */}
            <Button
              button_type="delete"
              button_size="medium"
              text="Delete Question"
              /* onclick={handleAddQues} */
              icon="left"
              src={WhiteTrashIcon}
            />
          </div>
        </div>

      </div>
    </>
  );
};

export default DeleteQuesPopup;
