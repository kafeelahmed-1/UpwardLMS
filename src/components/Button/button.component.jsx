const Button = ({ button_type, button_size, text, onclick, icon, src }) => {
  const button_type_classes = {
    primary: "primary-btn",
    secondary: "secondary-btn",
    tertiary: "tertiary-btn",
    delete:"delete-btn"
  };

  const button_size_classes = {
    large: "large-btn",
    medium: "medium-btn",
    small: "small-btn",
  };

  return (
    <>
      {icon === "none" && (
        <button
          className={`btn ${button_type_classes[button_type]} ${button_size_classes[button_size]}`}
          onClick={onclick}
        >
          {text}
        </button>
      )}

      {icon === "left" && (
        <>
          <button
            className={`btn ${button_type_classes[button_type]} ${button_size_classes[button_size]}`}
            onClick={onclick}
          >
            <img src={src} /> {text}
          </button>
        </>
      )}

      {icon === "right" && (
        <button
          className={`btn ${button_type_classes[button_type]} ${button_size_classes[button_size]}`}
          onClick={onclick}
        >
          {text} <img src={src} />
        </button>
      )}

      {/*  paddings? */}
      {/*  icon */}
    </>
  );
};

export default Button;
