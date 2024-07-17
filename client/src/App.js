import { useEffect, useState } from "react";
import "./App.css";
import axios, { Axios } from "axios";

function App() {
  const [password, setPassword] = useState("");
  const [website, setWebsite] = useState("");
  const [passwordList, setPasswordList] = useState([]);
  const [ans, setAns] = useState("Your ans");

  const addPassword = () => {
    axios.post("http://localhost:3001/addpassword", {
      password: password,
      website: website,
    });
  };

  const decryptPassword = (pass, iv) => {
    axios
      .post("http://localhost:3001/decryptpassword", {
        password: pass,
        iv: iv,
      })
      .then((response) => {
        setAns(response.data);
        console.log(response.data);
      });
  };

  // const handleClick = (data1, data2) => {
  //   console.log(data1, data2);
  // };

  useEffect(() => {
    axios.get("http://localhost:3001/showpasswords").then((response) => {
      setPasswordList(response.data);
    });
  }, []);

  // console.log(password);
  return (
    <div className="App">
      <div className="AdddingPassword">
        <input
          type="text"
          placeholder="Ex. 123456"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="facebook.com"
          onChange={(e) => setWebsite(e.target.value)}
        />
        <button onClick={addPassword}>Add Password</button>
      </div>

      <h2>{ans}</h2>

      <div className="Passwords">
        {passwordList.map((data, key) => {
          return (
            <div
              className="password"
              onClick={() => decryptPassword(data.password, data.iv)}
              key={key}
            >
              <h3>{data.website}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
