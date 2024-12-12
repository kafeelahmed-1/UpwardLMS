const Option = ({ img, option }) =>
{
  return (
    <>
      <div className="flex gap-x-3 py-3 px-5">
        <img src={img} className="h-6 w-6" />
        <p>{option}</p>
      </div>
    </>
  );
};

export default Option;
