import React, { useState } from "react";

const Anxiety = () => {
  const [level, setLevel] = useState("");
  const [comment, setComment] = useState("");
  const [color, setcolor] = useState("");
  const [score, setscore] = useState(0);

  const handleForm = (event) => {
    event.preventDefault();

    const form = event.target;

    const Feeling = parseInt(form.Feeling.value);
    const worrying = parseInt(form.worrying.value);
    const worrying2 = parseInt(form.worrying2.value);
    const restless = parseInt(form.restless.value);
    const annoyed = parseInt(form.annoyed.value);
    const afraid = parseInt(form.afraid.value);
    form.reset();

    const total = Feeling + worrying + worrying2 + restless + annoyed + afraid;

    setcolor("");
    if (total >= 1 && total <= 4) {
      setLevel("No anxiety");
      setscore(0);
    } else if (total >= 5 && total <= 9) {
      setLevel("Mild anxiety");
      setComment("You need to Monitor");
      setscore(1);
    } else if (total >= 10 && total <= 14) {
      setLevel("Moderate anxiety !");
      setComment("You have a possible clinically significant condition !");
      setcolor("red");
      setscore(3);
    } else if (total >= 15) {
      setLevel("Severevere Active anxiety !");
      setComment("Your Treatment probably warranted !");
      setcolor("red");
      setscore(5);
    } else {
      setLevel("Severity not specified");
    }
  };

  console.log(level);

  return (
    <div style={{ backgroundColor: "#111827" }}>
      <div className="min-h-screen p-6  flex items-center justify-center mb-1 pb-20">
        <div className="container max-w-screen-lg mx-auto">
          <h2 className="font-serif text-3xl mb-1 text-center text-white">
            Generalized Anxiety Disorder (GAD-7)
          </h2>
          <p className="text-yellow-300 mb-6 text-center">
            Instruction: Over the last 2 weeks, how often have you been bothered
            by any of the following problems?
          </p>

          <div className="bg-gradient-to-b from-gray-800 to-black w-full rounded shadow-lg p-4 px-4 md:p-8 mb-6 mt-10">
            <form
              onSubmit={handleForm}
              className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-8 text-left"
            >
              <div className="mt-10 md:col-span-4">
                <label htmlFor="address" className="text-base text-white">
                  Feeling nervous, anxious, or on edge{" "}
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
                  Not being able to stop or control worrying{" "}
                </label>
                <select
                  name="worrying"
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
                  Worrying too much about different things{" "}
                </label>
                <select
                  name="worrying2"
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
                  Trouble relaxing{" "}
                </label>
                <select
                  name="relaxing"
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
                  Being so restless that it's hard to sit still.
                </label>
                <select
                  name="restless"
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
                  Becoming easily annoyed or irritable{" "}
                </label>
                <select
                  name="annoyed"
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
                  Feeling afraid as if something awful might happen{" "}
                </label>
                <select
                  name="afraid"
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

          <h2 className="font-serif text-2xl text-white mt-10">Your Result</h2>
          <p className="text-gray-300 mb-6 font-serif">
            Fell free to ask us any question.{" "}
            <span className="underline text-blue-300">Click here</span>
          </p>

          <div className="w-3/5 text-white font-serif bg-gradient-to-b from-gray-800 to-black  h-52 rounded-md shadow-lg p-3  mb-6">
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

            {/* {level && <h1 className='text-2xl'>You have {level.split(' ')}</h1>} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Anxiety;
