const Dropdown = ({icon , item}) =>
{
    return(
        <>
        <div className="w-[fit-content] h-[fit-content] rounded-lg border border-secondary bg-[#F3F4F6] flex flex-col">
          <div className="flex gap-x-3 py-2 px-5">
            <img src={icon} className="h-6 w-6" />
            <p>{item}</p>
          </div>
        </div>
        </>
    );
}

export default Dropdown;