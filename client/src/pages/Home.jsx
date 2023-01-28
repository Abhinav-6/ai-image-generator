import React from "react";
import { useRef } from "react";
import { useState } from "react";
import axios from "axios";
import Button from "../components/Button";
import Loader from "../components/Loader";
import { getRandomPrompts } from "../utils";

const Home = () => {
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);
  const [randomPrompt, setRandomPrompt] = useState(getRandomPrompts());
  const promptRef = useRef(null);

  function submitHandler() {
    if (promptRef.current.value == null) return;
    const options = {
      method: "POST",
      url: "http://localhost:3001/v1/create",
      data: { prompt: promptRef.current.value },
    };
    setLoading(true);
    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        setImg(response.data.img);
        setLoading(false);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  function surpriseMeHandler() {
    setRandomPrompt(getRandomPrompts());
    promptRef.current.value = randomPrompt;
  }

  return (
    <section className="text-center font-mono max-w-screen-lg m-auto">
      <h2 className="text-3xl">Explore the world of Imagination</h2>
      <p className="text-gray-500 pt-2">
        Give your imagination some colors with help of Dall-E-2. Dive in the
        world of imaginations.
      </p>

      <form className="p-4 flex items-center flex-col justify-center mt-4">
        <div className="focus-within:border-2 focus-within:border-gray-700 border-2 border-gray-100 rounded-md flex text-center w-full p-3 bg-gray-100">
          <input
            type="text"
            id="promptField"
            placeholder={randomPrompt}
            className="border-0 bg-transparent w-full focus:outline-none"
            ref={promptRef}
          />
          <label htmlFor="promptField"></label>
        </div>
        <div className="flex gap-2 m-4">
          <Button
            primary={false}
            text="Surprise me"
            clickHandler={surpriseMeHandler}
          />
          <Button primary={true} text="Create" clickHandler={submitHandler} />
        </div>
      </form>
      {loading ? (
        <Loader />
      ) : (
        <>
          {img && (
            <div className="flex justify-center items-center p-2 md:p-4 flex-col gap-4">
              <img src={img} className="w-11/12 max-w-xs rounded-md" />
              <a
                href={img}
                download
                className="px-2 md:px-4 py-2 text-white font-inter font-normal md:font-medium rounded text-center cursor-pointer bg-purple-500"
              >
                Download
              </a>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default Home;
