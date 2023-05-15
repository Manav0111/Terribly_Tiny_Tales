Terribly Tiny Tales Word Analysis Project -

##Live Project: https://terriblytinytalesproject.netlify.app/

This React application analyses the word frequency in the text after retrieving data from a URL. The user can also export the information in CSV format. The top 20 most frequent words are shown in a bar chart .

```
import WordFrequencies from './components/WordFrequencies';
import './App.css';

function App() {
  return (
    <div className="text-lg mx-4 my-4">
      <WordFrequencies/>
    </div>
  );
}

export default App;
```
This is App.js File which contains one component WordFrequencies.

```
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
 ```

 Importing the project's necessary dependencies is done in this piece of code. The component's state is managed via useState. The bar chart was made with the help of the recharts package, which also contains ResponsiveContainer, BarChart, Bar, XAxis, YAxis, and Tooltip. The react-csv package contains CSVLink, which is used to export the data as a CSV file.

```
 const headers = [
    { label: "Word", key: "word" },
    { label: "Count", key: "count" },
  ];
  ```

  This block of code creates an array of headers for the CSV file.

```
    const [isContent, setIsContent] = useState("");
    const [maxword, setMaxword] = useState([]);
```

The WordFrequencies component is defined in this block of code, which also uses the useState hook to initialise the state variables maxword and isContent. The array of the top 20 most frequent terms is stored in maxword, while isContent contains the text data that was retrieved from the URL.

```
    function compare(first, second) {
      return second.count - first.count;
    }
```
The function compare in this piece of code takes two objects as inputs and outputs the object which have greater count value. The array of word-count objects is sorted using this function in descending order of frequency.

```
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
```

When the component mounts, the asynchronous method fetchData defined in this piece of code is invoked. Using the fetch API, fetchData retrieves the text data from the URL and sets the state variable isContent to the obtained information. The data is further processed by being divided into an array of words, having all punctuation removed, and filtering out any empty strings or frequent stop words. After that, it creates an array of objects containing every word and its frequency count as well as a frequency count for each word using a map. The compare function is then used to sort this array in descending order of frequency before being reduced to only include the top 20 words. The state is then set using the resultant array.

```
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
  ```

  This is the return of Word Frequencies which consist the Bar Chat of top 20 most occuring words form the Api.













