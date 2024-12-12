import DefaultIcon from "../../assets/default.svg";
import SuccessIcon from "../../assets/success-subtle-false.svg";
import WarningIcon from "../../assets/warning-subtle-false.svg";
import ErrorIcon from "../../assets/error-suble-false.svg";
import InfoIcon from "../../assets/info-subtle-false.svg";
import SuccessLight from "../../assets/success-subtle-true.svg";
import WarningLight from "../../assets/warning-subtle-true.svg";
import ErrorLight from "../../assets/error-subtle-true.svg";
import InfoLight from "../../assets/info-subtle-true.svg";

const Alert = ({ alert_type, title, description }) => {
  const alert_type_classes = {
    default: "default-alert",
    success: "success-alert",
    warning: "warning-alert",
    error: "error-alert",
    info: "info-alert",
    successLight: "success-light-alert",
    warningLight: "warning-light-alert",
    errorLight: "error-light-alert",
    infoLight: "info-light-alert",
  };

  const alert_type_icons = {
    default: DefaultIcon,
    success: SuccessIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
    successLight: SuccessLight,
    warningLight: WarningLight,
    errorLight: ErrorLight,
    infoLight: InfoLight,
  };

  return (
    <>
      {/* {/   <p>Alert Comp </p> /} */}
      <div
        className={`alert ${alert_type_classes[alert_type]}  `}
        style={{ height: "auto" }}
      >
        <div className="pt-1">
          <img src={`${alert_type_icons[alert_type]}`} />
        </div>
        <div className="flex flex-col ">
          <p className="font-semibold text-base">{title}</p>
          <p className="text-sm">{description}</p>
        </div>
      </div>
    </>
  );
};

export default Alert;
