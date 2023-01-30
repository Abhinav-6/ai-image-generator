import React from "react";
import { useRef } from "react";
import { useState } from "react";
import axios from "axios";
import Button from "../components/Button";
import Loader from "../components/Loader";
import { getRandomPrompts } from "../utils";
import Showcase from "./Showcase";
import { useEffect } from "react";

const Home = () => {
  const [imgArr, setImgArr] = useState(null);
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);
  const [randomPrompt, setRandomPrompt] = useState(getRandomPrompts());
  const promptRef = useRef(null);
  const [generatingError, setGeneratingError] = useState(false);
  const [uploadError, setUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);

  function submitHandler() {
    setGeneratingError(false);
    setLoading(true);
    if (promptRef.current.value == null) return;
    if (promptRef.current.value.length == 0) return;

    const options = {
      method: "POST",
      url: "http://localhost:3001/v1/create",
      data: { prompt: promptRef.current.value },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        setImg(response.data.img);
        setLoading(false);
        getUploadedImages();
      })
      .catch(function (error) {
        setLoading(false);
        setGeneratingError(true);
        console.error(error);
      });
  }

  function surpriseMeHandler() {
    setRandomPrompt(getRandomPrompts());
    promptRef.current.value = randomPrompt;
  }

  async function getUploadedImages() {
    const response = await fetch("http://localhost:3001/images");
    const data = await response.json();
    setImgArr(data);
    console.log(data.reverse());
  }

  function showCase(e) {
    e.preventDefault();
    setUploadError(false);
    setUploading(true);
    const options = {
      method: "POST",
      url: "http://localhost:3001/upload/",
      data: {
        prompt: promptRef.current.value,
        image: img,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        getUploadedImages();
        setUploading(false);
      })
      .catch(function (error) {
        console.error(error);
        setUploading(false);
        setUploadError(true);
      });
  }

  useEffect(() => {
    if (imgArr !== null) return;
    getUploadedImages();
  }, []);

  return (
    <section>
      {" "}
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
          {generatingError && (
            <p className="text-sm text-red-500">Something went wrong.</p>
          )}
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
                <div>
                  {uploadError && (
                    <p className="text-sm text-red-500">
                      Something went wrong.
                    </p>
                  )}
                  <button
                    onClick={showCase}
                    className="px-2 md:px-4 py-2 font-inter font-normal md:font-medium rounded text-center cursor-pointer bg-gray-200"
                  >
                    Showcase
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </section>
      {imgArr && (
        <section>
          <Showcase images={imgArr.reverse()} />
        </section>
      )}
    </section>
  );
};

export default Home;
