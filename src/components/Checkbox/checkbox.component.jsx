const Checkbox = () =>
{
    const checkbox_size_classes = 
    {
      small:'checkbox-small',
      regualr:'checkbox-regular'
    }

    return(
        <>
        <p> this is checkbox comp !</p>
        <div className="border flex checkbox-small">
           <input type="checkbox" className="border text-secondary h-5 w-5"/>
           <label className="border self-center">Label</label>
        </div>
        </>
    );
}

export default Checkbox;