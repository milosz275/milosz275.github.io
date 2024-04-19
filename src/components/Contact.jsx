import React, { useState } from "react";
import Title from "./Title";

function Contact() {
  const [result, setResult] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (name === "" || email === "" || message === ""){
      alert("All fields must be filled out");
    }
    else {
      const formData = new FormData();
      formData.append("access_key", "22f58b82-7f86-42ec-ab01-7a82cc4f63ab");
      formData.append("name", name);
      formData.append("email", email);
      formData.append("message", message);
  
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();
  
      if (data.success) {
        setResult("Form Submitted Successfully");
        event.target.reset();
        setTimeout(() => {
          setResult("");
        }, 5000);
      }
      else {
        console.log("Error", data);
        setResult(data.message);
        setTimeout(() => {
          setResult("");
        }, 5000);
      }
  
      setName("");
      setEmail("");
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col mb-10 mx-auto ">
      <div className="flex justify-center items-center">
        <form
          id="submit-form"
          className="flex flex-col w-full md:w-7/12"
          onSubmit={handleSubmit}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              document.getElementById("submit").click();
            }
          }}>
          <Title>Contact</Title>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="placeholder-gray-500 p-2 bg-transparent border-2 rounded-md focus:outline-none border-stone-600 dark:border-white" />
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="placeholder-gray-500 my-2 p-2 bg-transparent border-2 rounded-md focus:outline-none border-stone-600 dark:border-white" />
          <textarea
            name="message"
            placeholder="Message"
            rows="10"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="placeholder-gray-500 p-2 mb-4 bg-transparent border-2 rounded-md focus:outline-none border-stone-600 dark:border-white" />
          <button
            type="submit"
            id="submit"
            className="drop-shadow-dark dark:drop-shadow-light text-center inline-block px-8 py-3 w-max text-base font-medium rounded-md text-white bg-gradient-to-r from-green-500 to-blue-500 drop-shadow-md hover:stroke-white hover:from-green-400 hover:to-blue-600 select-none">
            Work With Me
          </button>
          <span className={`h-4 text-left mt-4 text-sm text-gray-800 dark:text-gray-300 transition-opacity duration-500 ease-in-out ${result ? 'opacity-100' : 'opacity-0'}`}>
            {result}
          </span>
        </form>
      </div>
    </div>
  );
}

export default Contact;
