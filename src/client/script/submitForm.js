const axios = require("axios");

export async function submitForm(event) {
  event.preventDefault();

  const Eval = document.getElementById("evaluating");
  const pol = document.getElementById("polarity");
  const agr = document.getElementById("agreement");
  const subj = document.getElementById("subjectivity");
  const conf = document.getElementById("confidence");
  const irony = document.getElementById("irony");
  const data = document.getElementById("data");

  //hide old data after every new submit till new data is sent
  data.style.display = "none";

  let url = document.getElementById("form").value;

  //   console.log("::: Form Submitted ::: URL: ", url);

  Eval.innerHTML = "Evaluating...";

  const normalize = (word) => {
    if (word) {
      return word.charAt(0) + word.substring(1).toLowerCase();
    } else {
      return null;
    }
  };

  const polarity = (score) => {
    if (score === "P" || score === "P+") {
      return "Positive";
    } else if (score === "NEU") {
      return "Neutral";
    } else if (score === "N" || score === "N+") {
      return "Negative";
    } else if (score === "NONE") {
      return "Without polarity";
    }
  };

  if (Client.checkURL(url)) {
    axios
      .post("http://localhost:8081/add", { url })

      .then((res) => {
        Eval.innerHTML = null;
        pol.innerHTML = `Polarity: ${polarity(res.data.polarity)}.`;
        agr.innerHTML = `Agreement: ${normalize(res.data.agreement)}.`;
        subj.innerHTML = `Subjectivity: ${normalize(res.data.subjectivity)}.`;
        conf.innerHTML = `Confidence: ${res.data.confidence}%`;
        irony.innerHTML = `Irony: ${normalize(res.data.irony)}.`;
        // console.log(res.data);

        //for returned undefined data since I'm allowing for a wide range of accepted urls
        {
          !res.data.polarity
            ? (data.style.display = "none")
            : (data.style.display = "block");
        }
        {
          !res.data.polarity
            ? (Eval.innerHTML = "The URL entered is incorrect!")
            : (data.style.display = "block");
        }
      })
      .catch((error) => console.log("ERROR: ", error));
  } else {
    Eval.innerHTML = "Not a valid URL!";
  }
}
