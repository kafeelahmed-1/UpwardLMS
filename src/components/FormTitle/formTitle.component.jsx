import FormCross from "../../assets/form-cross.svg";
const FormTitle = ({ title, formClosed }) => {
  const handlePopups = () => {
    formClosed(false);
  };

  return (
    <>
      <div className="w-[520px] h-[60px] py-3 px-5 bg-default border border-b-secondary rounded-t-lg flex justify-between">
        <p className="self-center text-xl font-semibold">{title}</p>
        <div className="self-center cursor-pointer" onClick={handlePopups}>
          <img src={FormCross} alt="img" />
        </div>
      </div>
    </>
  );
};

export default FormTitle;
