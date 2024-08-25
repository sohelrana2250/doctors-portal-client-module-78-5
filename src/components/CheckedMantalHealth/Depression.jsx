import React, { useContext, useState } from "react";

const Depression = () => {
  const [level, setLevel] = useState("");
  const [score, setscore] = useState(0);
  const [comment, setComment] = useState("");
  const [color, setcolor] = useState("");

  const handleForm = (event) => {
    event.preventDefault();

    const form = event.target;

    const Feeling = parseInt(form.Feeling.value);
    const sleep = parseInt(form.sleep.value);
    const energy = parseInt(form.energy.value);
    const criticize = parseInt(form.criticize.value);
    const speaking = parseInt(form.speaking.value);
    const concentration = parseInt(form.concentration.value);
    const suicide = parseInt(form.suicide.value);
    const interest = parseInt(form.interest.value);
    const appetite = parseInt(form.appetite.value);
    form.reset();

    const total =
      Feeling +
      sleep +
      energy +
      criticize +
      speaking +
      concentration +
      suicide +
      interest +
      appetite;

    if (total >= 1 && total <= 4) {
      setLevel("Minimal Depression");
      setscore(1);
    } else if (total >= 5 && total <= 9) {
      setLevel("Mild Depression");
      setComment("You need to Monitor");
      setscore(2);
    } else if (total >= 10 && total <= 14) {
      setLevel("Moderate Depression !");
      setComment("You have a possible clinically significant condition !");
      setcolor("red");
      setscore(3);
    } else if (total >= 15 && total <= 19) {
      setLevel("Moderately Severe Depression !");
      setComment("Your Treatment probably warranted !");
      setcolor("red");
      setscore(4);
    } else if (total >= 20 && total <= 27) {
      setLevel("Severe Depression !");
      setComment("Your Treatment probably warranted !");
      setcolor("red");
      setscore(5);
    } else {
      setLevel("no depression");
    }
  };

  return (
    <div style={{ backgroundColor: "#111827" }}>
      <div className="min-h-screen p-6  flex items-center justify-center mb-1 pb-20">
        <div className="container max-w-screen-lg mx-auto">
          <h2 className="font-serif text-3xl mb-1 text-white text-center">
            Screening of depression Questionnaire (PHQ-9)
          </h2>
          <p className="text-yellow-300 mb-6 text-center font-serif">
            Instruction: Over the last 2 weeks, how often have you been bothered
            by any of the following problems?
          </p>

          <div className="bg-gradient-to-b from-gray-800 to-black w-full  rounded shadow-lg p-4 px-4 md:p-8 mb-6 mt-10">
            <form
              onSubmit={handleForm}
              className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-8 text-left"
            >
              <div className="mt-10 md:col-span-4">
                <label htmlFor="address" className="text-base text-white">
                  Feeling down, depressed or hopeless
                </label>
                <select
                  name="Feeling"
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  required
                >
                  <option value="">Please select one…</option>
                  <option value="0">Not at all</option>
                  <option value="1">Several days</option>
                  <option value="2">More than half the days</option>
                  <option value="3">Nearly every day</option>
                </select>
              </div>

              <div className="mt-10 md:col-span-4">
                <label htmlFor="address" className="text-base text-white">
                  Trouble falling or staying asleep
                </label>
                <select
                  name="sleep"
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  required
                >
                  <option value="">Please select one…</option>
                  <option value="0">Not at all</option>
                  <option value="1">Several days</option>
                  <option value="2">More than half the days</option>
                  <option value="3">Nearly every day</option>
                </select>
              </div>

              <div className="mt-10 md:col-span-4">
                <label htmlFor="address" className="text-base text-white">
                  Feeling tired or having little energy
                </label>
                <select
                  name="energy"
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  required
                >
                  <option value="">Please select one…</option>
                  <option value="0">Not at all</option>
                  <option value="1">Several days</option>
                  <option value="2">More than half the days</option>
                  <option value="3">Nearly every day</option>
                </select>
              </div>

              <div className="mt-10 md:col-span-4">
                <label htmlFor="address" className="text-base text-white">
                  Poor appetite or overeating
                </label>
                <select
                  name="appetite"
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  required
                >
                  <option value="">Please select one…</option>
                  <option value="0">Not at all</option>
                  <option value="1">Several days</option>
                  <option value="2">More than half the days</option>
                  <option value="3">Nearly every day</option>
                </select>
              </div>

              <div className="mt-10 md:col-span-8">
                <label htmlFor="address" className="text-base text-white">
                  Feeling bad about yourself-or that you are a failure or have
                  let yourself or your family down{" "}
                </label>
                <select
                  name="criticize"
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  required
                >
                  <option value="">Please select one…</option>
                  <option value="0">Not at all</option>
                  <option value="1">Several days</option>
                  <option value="2">More than half the days</option>
                  <option value="3">Nearly every day</option>
                </select>
              </div>

              <div className="mt-10 md:col-span-4">
                <label htmlFor="address" className="text-base text-white">
                  {" "}
                  Trouble concentrating on things
                </label>
                <select
                  name="concentration"
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  required
                >
                  <option value="">Please select one…</option>
                  <option value="0">Not at all</option>
                  <option value="1">Several days</option>
                  <option value="2">More than half the days</option>
                  <option value="3">Nearly every day</option>
                </select>
              </div>

              <div className="mt-10 md:col-span-4">
                <label htmlFor="address" className="text-base text-white">
                  {" "}
                  Little interest or pleasure in doing things
                </label>
                <select
                  name="interest"
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  required
                >
                  <option value="">Please select one…</option>
                  <option value="0">Not at all</option>
                  <option value="1">Several days</option>
                  <option value="2">More than half the days</option>
                  <option value="3">Nearly every day</option>
                </select>
              </div>

              <div className="mt-10 md:col-span-8">
                <label htmlFor="address" className="text-base text-white">
                  {" "}
                  Moving or speaking so slowly that other people could have
                  noticed
                </label>
                <select
                  name="speaking"
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  required
                >
                  <option value="">Please select one…</option>
                  <option value="0">Not at all</option>
                  <option value="1">Several days</option>
                  <option value="2">More than half the days</option>
                  <option value="3">Nearly every day</option>
                </select>
              </div>

              <div className="mt-10 md:col-span-8">
                <label htmlFor="address" className="text-base text-white">
                  Thoughts that you would be better off dead, or of hurting
                  yourself
                </label>
                <select
                  name="suicide"
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  required
                >
                  <option value="">Please select one…</option>
                  <option value="0">Not at all</option>
                  <option value="1">Several days</option>
                  <option value="2">More than half the days</option>
                  <option value="3">Nearly every day</option>
                </select>
              </div>

              <div className="md:col-span-9 mx-auto mt-10">
                <button className="px-5 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-base font-bold rounded-full transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg">
                  Submit
                </button>
              </div>
            </form>
          </div>

          <h2 className="font-semibold text-2xl text-white mt-10">
            Your Result
          </h2>
          <p className="text-gray-300 mb-6">
            Fell free to ask us any question.
            <span className="underline text-blue-300">Click here</span>
          </p>

          <div className="w-3/5 text-white font-serif bg-gradient-to-b from-gray-800 to-black   h-52 rounded-md shadow-lg p-3  mb-6">
            <h1 className="mt-2 text-2xl text-left">Total Level : 5</h1>
            <h1 className="mt-2 text-2xl text-left">Your Level : {score}</h1>
            {level && (
              <h1
                className={`mt-2 text-left text-2xl text-${
                  color ? color : ""
                }-400`}
              >
                You have {level}
              </h1>
            )}
            {comment && (
              <h1 className="mt-2 text-left text-2xl text-red-400">
                {comment}
              </h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Depression;
