import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [report, setReport] = useState(null);
  const [ipAddress, setIpAddress] = useState("");
  const [error, setError] = useState(null);
  const { validaInput, setValidaInput } = useState("");
  const [ip, setIp] = useState("");
  const [valid, setValid] = useState(null);

  const [colorAbuse1, setColorAbuse1] = useState("bg-black");
  const [colorAbuse2, setColorAbuse2] = useState("bg-black");
  const [colorAbuse3, setColorAbuse3] = useState("bg-black");
  const [colorAbuse4, setColorAbuse4] = useState("bg-black");

  //bg-indigo-900

  const fetchData = async (ip) => {
    try {
      const response = await axios.get(`http://localhost:3000/abuseip/${ip}`);
      console.log(response.data);
      setReport(response.data);
      setColorAbuse1("bg-indigo-900");
    } catch (err) {
      setError(err);
    }
  };

  const handleSubmit = (ipAddress) => {
    fetchData(ipAddress);
  };

  const validateIp = (e) => {
    e.preventDefault();

    const regex =
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

    if (regex.test(ipAddress) == true) {
      setValid(regex.test(ipAddress));
      handleSubmit(ipAddress);
    } else {
      console.log("not ip");
    }
  };

  return (
    <>
      <div className="flex h-screen">
        <form onSubmit={validateIp}>
          <div className="fixed w-full h-full flex items-center justify-center">
            <div className="flex items-center">
              <input
                type="text"
                className="bg-white p-4 rounded-lg text-gray-700 mr-4"
                placeholder="search by hostname or IP"
                value={ipAddress}
                onChange={(e) => setIpAddress(e.target.value)}
              />
              <button class="bg-blue-500 text-white p-4 rounded-lg">Go!</button>
            </div>
          </div>
        </form>
        <div className="w-1/2 h-full bg-gray-400">
          <div className="flex flex-col h-full">
            <div className={`w-full h-1/2 ${colorAbuse1} p-4 pt-10`}>
              {report && (
                <div>
                  <h1 className="text-white">Square 1</h1>
                  <p className="text-white pl-4">
                    <p>
                      Abuse Confidence Score: {report.data.abuseConfidenceScore}
                    </p>
                    <p> {report.data.ipAddress}</p>
                    <p> {report.data.domain}</p>
                    <p> {report.data.isp}</p>
                    <p> {report.data.usageType}</p>
                    <p> {report.data.countryCode}</p>

                    <p>Is Listed: {report.data.isListed ? "Yes" : "No"}</p>
                  </p>
                </div>
              )}
            </div>
            <div className={`w-full h-1/2 ${colorAbuse2} p-4`}>
              {report && (
                <div>
                  <h3 className="text-white"></h3>
                  <p className="text-white pl-4"></p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="w-1/2 h-full bg-gray-600">
          <div className="flex flex-col h-full">
            <div className={`w-full h-1/2 ${colorAbuse3} p-4`}>
              <h3 className="text-white"></h3>
              <p className="text-white pl-4"></p>
            </div>
            <div className={`w-full h-1/2 ${colorAbuse4} p-4`}>
              <h3 className="text-white"></h3>
              <p className="text-white pl-4"></p>
            </div>
          </div>
        </div>
      </div>
    </>

    /*     <div class="flex h-screen justify-center items-center">
      <form onSubmit={validateIp} class="bg-white p-6 shadow-md">
        <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2" for="name">
            Name
          </label>
          <input
            class="w-full border border-gray-400 p-2"
            type="text"
            id="name"
            name="name"
            value={ipAddress}
            onChange={(e) => setIpAddress(e.target.value)}
          />
        </div>
        <button class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
          Submit
        </button>
      </form>
      {report && (
        <div>
          <h2>IP Report</h2>
          <p>IP Address: {ipAddress}</p>
          <p>Abuse Confidence Score: {report.data.abuseConfidenceScore}</p>
          <p>Is Listed: {report.data.isListed ? "Yes" : "No"}</p>
        </div>
      )}
    </div> */
  );
}

export default App;
