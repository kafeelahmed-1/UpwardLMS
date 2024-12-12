const Label = ({ label }) => {
  return (
    <>
      <label className="text-xs text-textSecondary">
        {label}
        {label != "Note" &&  <sup className="text-red-400">*</sup>}
      </label>
    </>
  );
};

export default Label;
