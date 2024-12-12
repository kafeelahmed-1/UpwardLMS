import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EditIcon from "../../assets/editIcon.svg";
import TrashIcon from "../../assets/trash.svg";
import ArrowDown from "../../assets/arrowDown.svg";
import SearchField from "../SearchField/searchField.component";
import FilterIcon from "../../assets/filterIcon.svg";
import PlusBig from "../../assets/PlusBig.svg";
import Button from "../Button/button.component";
import AddUser from "./addUser.component";
import Modal from "react-modal";
import Aos from "aos";
import "aos/dist/aos.css";

const GetData = () => {
  var token = localStorage.getItem("token");

  /*  const [ data , setData ] = useState([]); */
  const [info, setInfo] = useState([]);
  console.log("users :", info);

  const [searchedValue, setSearchedValue] = useState("");
  /* console.log('searched value :' , searchedValue); */

  const [displayAddUserModal, setDisplayAddUserModal] = useState(false);

  useEffect(() => {
    /*   fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => console.error('Error:', error)); */

    fetch(
      `${process.env.REACT_APP_BASE_URL}/api/Users?pageIndex=0&pageSize=123`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => setInfo(data.data))
      .catch((error) => console.error("Error:", error));
  }, []);

  let tableHead = ["Email", "Role", "Status", "Actions"];

  const handleSearch = (value) => {
    setSearchedValue(value);
  };

  const handleCloseModal = (value) => {
    /*  console.log('valuee' , value); */
    setDisplayAddUserModal(value);
  };

  const customStyles = {
    overlay: {
      background: "rgb(0, 0, 0, 0.4)",
    },
    content: {
      width: "fit-content",
      /* height:'fit-content', */
      marginLeft: "auto",
      marginRight: "auto",
      background: "transparent",
      border: "none",
      padding: "0px 1px 0px 0px",
    },
  };

  return (
    <>
      {/*  section 1 */}
      <div
        className="flex justify-between"
        data-aos="fade-up"
        data-aos-duration="200"
      >
        <SearchField onSearch={handleSearch} />
        <div className="flex gap-x-4">
          <img src={FilterIcon} /*  onClick={() => { setFilter(!filter) }} */ />
          <Link to="addUser">
            <Button
              button_type="primary"
              button_size="medium"
              text="Add Account"
              icon="left"
              src={PlusBig}
              onclick={() => {
                setDisplayAddUserModal(true);
              }}
            />
          </Link>
        </div>
      </div>

      <Modal
        isOpen={displayAddUserModal}
        style={customStyles}
        height="400px"
        width="fitContent"
      >
        <AddUser displayModalValue={handleCloseModal} ariaHideApp={false} />
      </Modal>

      <table
        className="border border-secondary rounded-lg"
        data-aos="fade-up"
        data-aos-duration="220"
      >
        {/*  iterating table head values */}
        <thead className="border-b border-secondary">
          <tr className="text-left bg-snowWhite">
            {tableHead.map((headings, i) => {
              return (
                <>
                  <td
                    className="py-3 px-2 text-sm text-textPrimary font-semibold"
                    key={i}
                  >
                    <div className="flex gap-x-2">
                      <p> {headings}</p>
                      <img src={ArrowDown} />
                    </div>
                  </td>
                </>
              );
            })}
          </tr>
        </thead>

        <tbody className="text-slate-700">
          {info
            .filter((item) => {
              return searchedValue.toLowerCase() === ""
                ? item
                : item.name
                    .toLowerCase()
                    .includes(searchedValue?.toLowerCase());
            })
            .map((item, i) => {
              return (
                <>
                  <tr
                    className="text-sm text-sm text-textPrimary font-normal"
                    style={{
                      backgroundColor: i % 2 == 0 ? "transparent" : "#F3F4F6",
                    }}
                    key={i}
                  >
                    <td className="p-2"> {item.userEmail}</td>
                    <td className="p-2">Student</td>
                    <td className="p-2">{item.userStatus}</td>
                    <td className="flex gap-x-2">
                      <Link to={`editUser/${item.id}`}>
                        <img src={EditIcon} className="p-2" />
                      </Link>
                      <Link to={`deleteUser/${item.id}`}>
                        <img src={TrashIcon} className="p-2" />
                      </Link>
                    </td>
                  </tr>
                </>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

export default GetData;
