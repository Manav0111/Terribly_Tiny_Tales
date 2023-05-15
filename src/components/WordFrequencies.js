import { useState } from "react";
  import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
  } from "recharts";
  import { CSVLink } from "react-csv";
  
  const headers = [
    { label: "Word", key: "word" },
    { label: "Count", key: "count" },
  ];

const WordFrequencies = () => {
    const [isContent, setIsContent] = useState("");
    const [maxword, setMaxword] = useState([]);
  
    function compare(first, second) {
      return second.count - first.count;
    }
  
    async function fetchData() {
      const response = await fetch("https://www.terriblytinytales.com/test.txt");
      const data = await response.text();
      setIsContent(data);
      const temp = data.split("\n");
      let temp2 = [];
      temp.forEach((ele) => {
        ele.split(" ").map((e) => {
          if (
            e[e.length - 1] === "?" ||
            e[e.length - 1] === "." ||
            e[e.length - 1] === "," ||
            e[e.length - 1] === ";" ||
            e[e.length - 1] === "," ||
            e[e.length - 1] === ")"
          ) {
            e = e.substring(0, e.length - 1);
          } else if (e !== "," && e !== "." && e !== "/" && e !== "")
            temp2.push(e);
        });
      });
  
      // console.log(temp2);
      const Split = temp2.map((ele) => ele.toLowerCase());
      const map = {};
  
      Split.forEach((ele) => {
        map[ele] = 0;
      });
  
      Split.forEach((ele) => {
        map[ele]++;
      });
  
      // console.log("Hasmap: ", map);
  
      const histogram = [];
  
      Object.keys(map).forEach((word) => {
        histogram.push({ word: word, count: map[word] });
      });
  
      // console.log(histogram);
  
      const actualdata = histogram.sort(compare);
      // console.log(actualdata);
  
      actualdata.splice(20, actualdata.length - 1);
      // console.log(actualdata);
      setMaxword(actualdata);
    }
  
    return (
      <div className="py-4 ">
        <button
          className="px-4 py-2 bg-[#dc2626] rounded-lg font-sans text-lg text-white"
          type="button"
          onClick={() => {
            fetchData();
          }}
          style={{ marginRight: "20px", marginLeft: "30px" }}
        >
          Submit
        </button>
        <CSVLink
          data={maxword}
          headers={headers}
          filename="Terribly_Tiny_Tales"
        >
          <button className=" ml-2 px-4 py-2  bg-[#15803d] rounded-lg font-sans text-lg text-white" type="button">
            Export
          </button>
        </CSVLink>
  
        {isContent ? (
          <div style={{ marginLeft: "200px", marginTop: "100px" }}>
            <h1 className=" text-3xl font-bold mb-12 ">
              <span className="ml-4">Terribly Tiny Tales:{" "}</span>
              <span  className="text-2xl text-[#0ea5e9] text-3xl font-bold ">Word Analysis Project</span>
            </h1>
            <ResponsiveContainer className="mb-3 mt-4" width="80%" aspect={3}>
              <BarChart data={maxword} width={400} height={400}>
                <XAxis dataKey="word" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#0ea5e9" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }

export default WordFrequencies;

  