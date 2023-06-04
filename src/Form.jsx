import "./Form.scss";
import { useState } from "react";

const Form = () => {
  const [percentage, setPercentage] = useState(0);

  return (
    <main className={"container"}>
      <h1 className={"title"}>Sign Up</h1>

      <form action="" className={"form"}>
        <label className={'label'} htmlFor="login">Login</label>
        <input className={'input'} type="text" id={"login"} />

        <label className={'label'} htmlFor="password">Password</label>
        <input className={'input'} type="password" id={"password"} />

        <button type={"submit"} className={"btn"}>
          Submit
        </button>
      </form>
    </main>
  );
};

export default Form;
