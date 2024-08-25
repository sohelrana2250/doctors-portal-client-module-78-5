import React, { useState } from "react";

const Bipolar = () => {
  const [level, setLevel] = useState("");
  const [comment, setComment] = useState("");
  const [color, setcolor] = useState("");
  const [score, setscore] = useState(0);

  const handleForm = (event) => {
    event.preventDefault();

    const form = event.target;

    const one = parseInt(form.one.value);
    const two = parseInt(form.two.value);
    const three = parseInt(form.three.value);
    const four = parseInt(form.four.value);
    const five = parseInt(form.five.value);
    const six = parseInt(form.six.value);
    const seven = parseInt(form.seven.value);
    const eight = parseInt(form.eight.value);
    const nine = parseInt(form.nine.value);
    const ten = parseInt(form.ten.value);
    const eleven = parseInt(form.eleven.value);
    const twelve = parseInt(form.twelve.value);
    const thirteen = parseInt(form.thirteen.value);

    const total =
      one +
      two +
      three +
      four +
      five +
      six +
      seven +
      eight +
      nine +
      ten +
      eleven +
      twelve +
      thirteen;

    form.reset();

    setcolor("");
    if (total >= 0 && total <= 3) {
      setLevel("Highly unlikely bipolar disorder");
      setscore(0);
    } else if (total >= 4 && total <= 6) {
      setLevel("Not very likely to have bipolar disorder.");
      setscore(2);
    } else if (total >= 7 && total <= 9) {
      setLevel("Moderately likely to have bipolar disorder !");
      setComment("You have a possible clinically significant condition !");
      setcolor("red");
      setscore(4);
    } else if (total >= 10 && total <= 13) {
      setLevel("Highly Likely bipolar disorder !");
      setcolor("red");
      setComment("Your Treatment probably warranted !");
      setscore(5);
    } else {
      setLevel("Likelihood not specified");
    }
  };

  return (
    <div style={{ backgroundColor: "#111827" }}>
      <div className="min-h-screen p-6  flex items-center justify-center mb-1 pb-20">
        <div className="container max-w-screen-lg mx-auto">
          <h2 className="font-serif text-center text-3xl mb-1 text-white">
            Screening of Bipolar Disorder
          </h2>
          <p className="text-yellow-300 text-center font-serif mb-6">
            Instruction: Over the last 2 weeks, how often have you been bothered
            by any of the following problems?
          </p>

          <div className="bg-gradient-to-b from-gray-800 to-black w-full   rounded shadow-lg p-4 px-4 md:p-8 mb-6 mt-10">
            <form
              onSubmit={handleForm}
              className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-8 text-left"
            >
              <div className="mt-10 md:col-span-8">
                <label htmlFor="address" className="text-base text-white">
                  Has there ever been a period of time when you felt so good or
                  hyper that other people thought you were not your normal self
                  or were so hyper that you got into trouble?
                </label>
                <select
                  name="one"
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  required
                >
                  <option value="">Please select one…</option>
                  <option value="1">Yes</option>
                  <option value="0">No</option>
                </select>
              </div>

              <div className="mt-10 md:col-span-8">
                <label htmlFor="address" className="text-base text-white">
                  Has there ever been a period of time when you were so
                  irritable that you shouted at people or started fights or
                  arguments?
                </label>
                <select
                  name="two"
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  required
                >
                  <option value="">Please select one…</option>
                  <option value="1">Yes</option>
                  <option value="0">No</option>
                </select>
              </div>

              <div className="mt-10 md:col-span-8">
                <label htmlFor="address" className="text-base text-white">
                  Has there ever been a period of time when you felt much more
                  self-confident than usual?{" "}
                </label>
                <select
                  name="three"
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  required
                >
                  <option value="">Please select one…</option>
                  <option value="1">Yes</option>
                  <option value="0">No</option>
                </select>
              </div>

              <div className="mt-10 md:col-span-8">
                <label htmlFor="address" className="text-base text-white">
                  Has there ever been a period of time when you got much less
                  sleep than usual and found you didn’t really miss it?
                </label>
                <select
                  name="four"
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  required
                >
                  <option value="">Please select one…</option>
                  <option value="1">Yes</option>
                  <option value="0">No</option>
                </select>
              </div>

              <div className="mt-10 md:col-span-8">
                <label htmlFor="address" className="text-base text-white">
                  {" "}
                  Has there ever been a period of time when you were much more
                  talkative or spoke much faster than usual?
                </label>
                <select
                  name="five"
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  required
                >
                  <option value="">Please select one…</option>
                  <option value="1">Yes</option>
                  <option value="0">No</option>
                </select>
              </div>

              <div className="mt-10 md:col-span-8">
                <label htmlFor="address" className="text-base text-white">
                  {" "}
                  Has there ever been a period of time when you thoughts raced
                  through your head or you couldn’t slow your mind down?
                </label>
                <select
                  name="six"
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  required
                >
                  <option value="">Please select one…</option>
                  <option value="1">Yes</option>
                  <option value="0">No</option>
                </select>
              </div>

              <div className="mt-10 md:col-span-8">
                <label htmlFor="address" className="text-base text-white">
                  {" "}
                  Has there ever been a period of time when you were so easily
                  distracted by things around you that you had trouble
                  concentrating or staying on track?
                </label>
                <select
                  name="seven"
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  required
                >
                  <option value="">Please select one…</option>
                  <option value="1">Yes</option>
                  <option value="0">No</option>
                </select>
              </div>

              <div className="mt-10 md:col-span-8">
                <label htmlFor="address" className="text-base text-white">
                  {" "}
                  Has there ever been a period of time when you had much more
                  energy than usual?
                </label>
                <select
                  name="eight"
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  required
                >
                  <option value="">Please select one…</option>
                  <option value="1">Yes</option>
                  <option value="0">No</option>
                </select>
              </div>

              <div className="mt-10 md:col-span-8">
                <label htmlFor="address" className="text-base text-white">
                  {" "}
                  Has there ever been a period of time when you were much more
                  active or did many more things than usual?
                </label>
                <select
                  name="nine"
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  required
                >
                  <option value="">Please select one…</option>
                  <option value="1">Yes</option>
                  <option value="0">No</option>
                </select>
              </div>

              <div className="mt-10 md:col-span-8">
                <label htmlFor="address" className="text-base text-white">
                  {" "}
                  Has there ever been a period of time when you you were much
                  more social or outgoing than usual, for example, you
                  telephoned friends in the middle of the night?
                </label>
                <select
                  name="ten"
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  required
                >
                  <option value="">Please select one…</option>
                  <option value="1">Yes</option>
                  <option value="0">No</option>
                </select>
              </div>

              <div className="mt-10 md:col-span-8">
                <label htmlFor="address" className="text-base text-white">
                  {" "}
                  Has there ever been a period of time when you you were much
                  more interested in sex than usual?
                </label>
                <select
                  name="eleven"
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  required
                >
                  <option value="">Please select one…</option>
                  <option value="1">Yes</option>
                  <option value="0">No</option>
                </select>
              </div>

              <div className="mt-10 md:col-span-8">
                <label htmlFor="address" className="text-base text-white">
                  {" "}
                  Has there ever been a period of time when you you did things
                  that were unusual for you or that other people might have
                  thought were excessive, foolish, or risky?
                </label>
                <select
                  name="twelve"
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  required
                >
                  <option value="">Please select one…</option>
                  <option value="1">Yes</option>
                  <option value="0">No</option>
                </select>
              </div>

              <div className="mt-10 md:col-span-8">
                <label htmlFor="address" className="text-base text-white">
                  Has there ever been a period of time when you spending money
                  got you or your family into trouble?
                </label>
                <select
                  name="thirteen"
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  required
                >
                  <option value="">Please select one…</option>
                  <option value="1">Yes</option>
                  <option value="0">No</option>
                </select>
              </div>

              <div className="md:col-span-9 mx-auto mt-10">
                <button className="px-5 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-base font-bold rounded-full transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg">
                  Submit
                </button>
              </div>
            </form>
          </div>

          <h2 className="font-semibold text-2xl font-serif text-white mt-10">
            Your Result
          </h2>
          <p className="text-gray-300 mb-6 font-serif">
            Fell free to ask us any question.
            <span className="underline text-blue-300">Click here</span>
          </p>

          <div className="w-3/5 text-white font-semibold bg-gradient-to-b from-gray-800 to-black  h-52 rounded-md shadow-lg p-3  mb-6">
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

export default Bipolar;
