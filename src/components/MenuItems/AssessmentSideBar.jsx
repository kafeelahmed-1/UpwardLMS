import dashboardIcon from "../../assets/dashboard.svg";
import accountsIcon from "../../assets/accounts.svg";
import assessmentIcon from "../../assets/Notepad.svg";
import questionIcon from "../../assets/Question.svg";
import UpwardsLogo from "../../assets/logo.svg";
import { Link } from "react-router-dom";

const AssessmentSideBar = () => {
  let menuItems = [
    {
      //   item: "Dashboard",
      icon: dashboardIcon,
      link: "dashboard",
    },
    {
      //   item: "Questions",
      icon: questionIcon,
      link: "questions",
    },
    {
      //   item: "Accounts",
      // item: "Accounts",
      icon: accountsIcon,
      link: "accounts",
    },

    {
      //   item: "Assessments",
      icon: assessmentIcon,
      link: "assessment",
    },
  ];

  return (
    <>
      {/* menu container */}
      <div className="h-[fit-content] flex flex-col gap-y-10 ">
        {/* item 1 : LOGO */}
        <span className="py-0 px-6">
          <img src={UpwardsLogo} alt="logo" />
        </span>
        {/* item 2 : MENU ITEMS */}
        <div className="py-0 px-5 al">
          <ul>
            {menuItems.map((items, i) => {
              return (
                <>
                  <Link to={items.link}>
                    <div className="flex py-5 pe-3 ps-0 gap-x-2" key={i}>
                      <img
                        src={items.icon}
                        alt="icon"
                        style={{
                          width: 25,
                          height: 25,
                        }}
                      />
                      {/* <li>{items.item}</li> */}
                    </div>
                  </Link>
                </>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default AssessmentSideBar;
