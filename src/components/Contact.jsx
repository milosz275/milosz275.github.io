import React, { useState } from "react";
import Title from "./Title";

function Contact() {
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
      formData.append("name", name);
      formData.append("email", email);
      formData.append("message", message);
  
      const response = await fetch("https://getform.io/f/navvrgqa", {
        method: "POST",
        body: formData
      });
  
      if (response.ok) {
        alert("Your message has been sent successfully!");
      } else {
        alert("There was an error sending your message:( Please try again.");
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
          onSubmit={handleSubmit}>
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
        </form>
      </div>
    </div>
  );
}

export default Contact;
