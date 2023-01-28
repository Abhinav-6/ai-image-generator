import React from "react";
import { useRef } from "react";
import { useState } from "react";
import axios from "axios";
import Button from "../components/Button";
import { getRandomPrompts } from "../utils";

const Home = () => {
  const [img, setImg] = useState("");
  const [randomPrompt, setRandomPrompt] = useState(getRandomPrompts());
  const promptRef = useRef(null);

  function submitHandler() {
    const options = {
      method: "POST",
      url: "http://localhost:3001/v1/create",
      data: { prompt: "an armchair in the shape of an avocado" },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        setImg(response.data.img);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  function surpriseMeHandler() {
    setRandomPrompt(getRandomPrompts());
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
      {img && <img src={img} />}
    </section>
  );
};

export default Home;
