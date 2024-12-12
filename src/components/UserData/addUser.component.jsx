import FormTitle from '../FormTitle/formTitle.component';
import Label from "../Label/label.component";
import Button from "../Button/button.component";
import Validations from "../PassValidations/validations.component";
import Chips from "../Chips/chips.component";
import Toggle from "../Toggle/toggle.component";
import PlusBig from "../../assets/PlusBig.svg";

const AddUser = ({displayModalValue}) =>
{
    const onClose = (value) =>
    {
      //value from child to parent
      console.log('boolean value from form title is :' , value);
      displayModalValue(value);
    }

    return (
      <>
        {/*  form div starts here */}
        <div className="form-container-styles">
          {/* form title comp */}
          <FormTitle title="Add User" formClosed={onClose}/>

          {/*  actual form */}
          <form className="form-styles">
            {/* FULL NAME DIV */}
            <div className="input-div-styles">
              <Label label="Full Name" />
              <input
                type="text"
                placeholder="Full Name"
                className="input-styles"
                /*  onChange={handleQuestionTitle} */
              />
            </div>
            {/*  EMAIL ADDRESS DIV */}
            <div className="input-div-styles">
              <Label label="Email Address" />
              <input
                type="email"
                placeholder="Email Address"
                className="input-styles"
                /*  onChange={handleQuestionTitle} */
              />
            </div>
            {/*  PASSWORD DIV */}
            <div className="flex flex-col gap-y-2">
                <div className="input-div-styles">
                    <Label label="Password" />
                    <input
                        type="password"
                        placeholder="Password"
                        className="input-styles"
                        /*  onChange={handleQuestionTitle} */
                    />
                </div>
                 {/*  PASSWORD VALIDATION DIV */}
                <div className="min-h-[76px] h-[fit-content] flex flex-col gap-y-1">
                    <Validations label="Password must have atleast 6 characters" radioSize="small" />
                    <Validations label="Password must have at least one uppercase and one lowercase letter" radioSize="small" />
                    <Validations label="Password must have at least one number" radioSize="small" />
                    <Validations label="Password must have at least one special character (!, @, #, or $)" radioSize="small" />
                </div>
            </div>
            {/* USER ROLE DIV */}
            <div className="flex flex-col gap-y-2">
                <div className="input-div-styles">
                    <Label label="Role" />
                    <select className="input-styles" /* onChange={handleSubject} */>
                        <option> </option>
                        <option>A</option>
                        <option>B</option>
                    </select>
                </div>
                <div className="flex gap-x-2">
                <Chips text="Admin" />
                <Chips text="Teacher" />
                </div>
            </div>
            {/*  USER ACTIVE STATUS */}
            <div className="flex flex-col gap-y-1">
                <Label label="Status" />
                <Toggle />
            </div>

          </form>

          {/*  xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}

          {/*  BUTTONS DIV */}
          {/*  div for cancel and add ques button */}
          <div className="w-[520px] h-[84px] p-5 flex justify-end">
            <div className="flex gap-x-4">
              {/*   Button comp */}
              <Button
                button_type="tertiary"
                button_size="medium"
                text="Cancel"
                /* onclick={handleCancel}  */
                icon="none"
                src=""
              />
              <Button
                button_type="primary"
                button_size="medium"
                text="Add User"
                /*  onclick={handleAddQues} */
                icon="left"
                src={PlusBig}
              />
            </div>
          </div>

          {/*   xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}
        </div>
      </>
    );
}


export default AddUser