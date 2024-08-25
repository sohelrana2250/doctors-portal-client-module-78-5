import React, { useState } from "react";

const Suicidal = () => {
  const [level, setLevel] = useState("");
  const [comment, setComment] = useState("");
  const [color, setcolor] = useState("");
  const [totalLevel, setTotaLevel] = useState(0);

  const handleForm = (event) => {
    event.preventDefault();

    const form = event.target;

    const thought1 = parseInt(form.thought1.value);
    const thought2 = parseInt(form.thought2.value);
    const attempt = parseInt(form.attempt.value);
    const commit = parseInt(form.commit.value);
    form.reset();

    const total = thought1 + thought2 + attempt + commit;
    setTotaLevel(total);

    setcolor("");
    if (total >= 3 && total <= 6) {
      setLevel("You don't have suicide risk");
    } else if (total >= 7 && total <= 18) {
      setLevel("Higher risk for suicide !!!");
      setComment("Your Treatment probably warranted !");
      setcolor("red");
    } else {
      setLevel("Severity not specified");
    }
  };

  return (
    <div style={{ backgroundColor: "#111827" }}>
      <div className="min-h-screen p-6  flex items-center justify-center mb-1 pb-20">
        <div className="container max-w-screen-lg mx-auto">
          <h2 className="font-serif text-3xl text-center mb-1 text-white">
            Screening of suicidal behaviour (SBQ-R)
          </h2>
          <p className="text-yellow-300 font-serif text-center mb-6">
            Instruction: Over the last 2 weeks, how often have you been bothered
            by any of the following problems?
          </p>

          <div className="bg-gradient-to-b from-gray-800 to-black w-full rounded shadow-lg p-4 px-4 md:p-8 mb-6 mt-10">
            <form
              onSubmit={handleForm}
              className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-8 text-left"
            >
              <div className="mt-10 md:col-span-8">
                <label htmlFor="address" className="text-base text-white">
                  Have you ever thought about or attempted to kill yourself?{" "}
                </label>
                <select
                  name="thought1"
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  required
                >
                  <option value="0">Please select one…</option>
                  <option value="1">Never</option>
                  <option value="2">It was just a brief passing thought</option>
                  <option value="3">
                    I have had a plan at least once to kill myself but did not
                    try to do it
                  </option>
                  <option value="3">
                    I have had a plan at least once to kill myself and really
                    wanted to die
                  </option>
                  <option value="4">
                    I have attempted to kill myself‚ but did not want to die
                  </option>
                  <option value="4">
                    I have attempted to kill myself‚ and really hoped to die
                  </option>
                </select>
              </div>

              <div className="mt-10 md:col-span-8">
                <label htmlFor="address" className="text-base text-white">
                  How often have you thought about killing yourself in the past
                  year?{" "}
                </label>
                <select
                  name="thought2"
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  required
                >
                  <option value="0">Please select one…</option>
                  <option value="1">Never</option>
                  <option value="2">Rarely (1 time)</option>
                  <option value="3">Sometimes (2 times)</option>
                  <option value="4">Often (3-4 times)</option>
                  <option value="5">Very Often (5 or more times)</option>
                </select>
              </div>

              <div className="mt-10 md:col-span-8">
                <label htmlFor="address" className="text-base text-white">
                  Have you ever told someone that you were going to commit
                  suicide‚ or that you might, do it?{" "}
                </label>
                <select
                  name="commit"
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  required
                >
                  <option value="0">Please select one…</option>
                  <option value="1">No</option>
                  <option value="2">
                    Yes‚ at one time‚ but did not really want to die
                  </option>
                  <option value="2">
                    RYes‚ at one time‚ and really wanted to die
                  </option>
                  <option value="3">
                    Yes‚ more than once‚ but did not want to do it
                  </option>
                  <option value="3">
                    Yes‚ more than once‚ and really wanted to do it
                  </option>
                </select>
              </div>

              <div className="mt-10 md:col-span-8">
                <label htmlFor="address" className="text-base text-white">
                  How likely is it that you will attempt suicide someday?{" "}
                </label>
                <select
                  name="attempt"
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  required
                >
                  <option value="">Please select one…</option>
                  <option value="0">Never</option>
                  <option value="1">No chance at all</option>
                  <option value="2">Rather unlikely</option>
                  <option value="3">Unlikely</option>
                  <option value="4">Likely</option>
                  <option value="5">Rather likely</option>
                  <option value="6">Very likely</option>
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
          <p className="text-gray-300 font-serif mb-6">
            Fell free to ask us any question.{" "}
            <span className="underline text-blue-300">Click here</span>
          </p>

          <div className="w-3/5 text-white font-serif bg-gradient-to-b from-gray-800 to-black   h-40 rounded-md shadow-lg p-3  mb-6">
            <h1 className="mt-2 text-2xl text-left">
              Total Level Risk Free : 3 To 6
            </h1>
            <h1 className="mt-2 text-2xl text-left">
              Your Level : {totalLevel}
            </h1>

            {level && (
              <h1 className={`mt-2  text-2xl text-${color ? color : ""}-400`}>
                You have {level}
              </h1>
            )}
            {comment && (
              <h1 className="mt-4  text-2xl text-red-400">{comment}</h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Suicidal;
