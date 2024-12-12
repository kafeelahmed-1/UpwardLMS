import GetData from "../../components/UserData/userData.component";
import MainHeading from "../../components/Header/header.component";
import Aos from "aos";
import "aos/dist/aos.css";

const Accounts = () => {
  return (
    <>
      <div className="flex flex-col gap-y-4 py-10">
        <MainHeading title="Accounts" />
        <GetData />
      </div>
    </>
  );
};

export default Accounts;
