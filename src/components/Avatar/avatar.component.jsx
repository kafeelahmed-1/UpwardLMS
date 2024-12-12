 
const Avatar = ({image , size , shape , alt}) =>
{

    const avatar_size = 
    {
        large:'profile-large',
        medium:'profile-medium',
        small:'profile-small',
        extraSmall:'profile-xs'
    }

    const avatar_shape = 
    {
        rounded:'profile-rounded',
        square:'profile-square'
    }

    const no_image_styles =
    {
        large:'profile-dummy-text-large',
        medium:'profile-dummy-text-medium',
        small:'profile-dummy-text-small',
        extraSmall:'profile-dummy-text-Xsmall'
    }

    return(
        <>
        {image === '' ?
        (
          <div className={`${avatar_size[size]} flex items-center bg-slate-200 ${avatar_shape[shape]} `}>
            <p className={`w-[fit-content] mx-auto ${no_image_styles[size]}`}>R</p>
          </div>
        )
        :
        (
         <img src={image} alt={alt} className={`${avatar_size[size]} object-cover ${avatar_shape[shape]} `} />
        )
        }
        </>
    );
}

export default Avatar;