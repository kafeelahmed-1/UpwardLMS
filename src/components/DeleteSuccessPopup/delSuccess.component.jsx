const DelSuccess = ({title}) => {
    return(
        <> 
        <div className="border border-secondary w-[520px] min-h-[180px] h-[fit-content] rounded-lg mx-auto bg-white">
          {/* div 1 : FORM TITLE*/}
          <div className="w-[520px] h-[60px] py-3 px-5 bg-default border border-b-successBorder bg-successLight  rounded-t-lg">
            <p className="self-center text-xl font-semibold">Success!</p>
          </div>
  
          {/* div 2 : CONTENT BODY */}
          <div className="flex flex-col gap-y-2 pt-3 px-5 pb-8 text-base">
            <p>The delete was successful. </p> 
            <p>This {title} is no longer available</p>
          </div>
  
        </div>
        </>
    );
}

export default DelSuccess;