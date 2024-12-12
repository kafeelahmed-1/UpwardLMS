import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import dashboardIcon from "../../assets/dashboard.svg";
import rolesIcon from "../../assets/roles.svg";
import UpwardsLogo from "../../assets/upwards.jpg";
import { FiSettings } from "react-icons/fi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const Menu = () => {
  const navigate = useNavigate();
  const [showSettings, setShowSettings] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const menuItems = [
    {
      item: "Dashboard",
      icon: dashboardIcon,
      link: "dashboard",
    },
    {
      item: "Questions",
      icon: rolesIcon,
      link: "questions",
    },
    {
      item: "Assessments",
      icon: rolesIcon,
      link: "assessment",
    },
    {
      item: "Candidate Directory",
      icon: rolesIcon,
      link: "students",
    },
    // {
    //   item: "Student DashBoard",
    //   icon: rolesIcon,
    //   link: "studentDashBoard",
    // },
    {
      item: "Enrollment",
      icon: rolesIcon,
      link: "enrollment",
    },
    {
      item: "Settings",
      icon: <FiSettings />,
      subItems: [
        { item: "Marks Categories", link: "marksCategories" },
        { item: "Batch", link: "batch" },
        { item: "Courses", link: "courses" },
        // { item: "Enrollment" , link: "enrollment" }
      ],
    },
  ];

  const toggleSettings = () => {
    setShowSettings((prev) => !prev);
  };

  return (
    <>
      <div className="w-[250px] h-[300px] flex flex-col gap-y-6">
        <Link className="flex justify-center" to={"/dashboard"}>
          <img src={UpwardsLogo} alt="upwardsLogo" />
        </Link>
        <div className="py-0 px-7">
          <ul>
            {menuItems.map((item, index) => (
              <React.Fragment key={index}>
                {item.subItems ? (
                  <>
                    <div
                      className="flex py-3  ps-0 gap-x-3 cursor-pointer"
                      onClick={toggleSettings}
                    >
                      <div style={{ margin: 5 }}> {item.icon}</div>
                      <li>{item.item}</li>
                      <div style={{ marginTop: 6, marginRight: 8 }}>
                        {showSettings ? <IoIosArrowUp /> : <IoIosArrowDown />}
                      </div>
                    </div>
                    {showSettings &&
                      item.subItems.map((subItem, subIndex) => (
                        <Link to={subItem.link} key={subIndex}>
                          <div className="flex py-3 pe-3 ps-0 gap-x-3">
                            <span></span>
                            <li>{subItem.item}</li>
                          </div>
                        </Link>
                      ))}
                  </>
                ) : (
                  <Link to={item.link} key={index}>
                    <div className="flex py-3 pe-3 ps-0 gap-x-3">
                      <img src={item.icon} alt="noIcon" />
                      <li>{item.item}</li>
                    </div>
                  </Link>
                )}
              </React.Fragment>
            ))}
          </ul>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 10,
          left: 30,
          textAlign: "center",
        }}
      >
        <button
          onClick={handleLogout}
          style={{
            backgroundColor: "#CA3A31",
            color: "#ffff",
            padding: 10,
            width: 137,
            height: 44,
            borderRadius: 8,
          }}
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default Menu;
