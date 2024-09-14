import React, { useState } from "react";
import Title from "./Title";
import { Store } from "react-notifications-component"
import "react-notifications-component/dist/theme.css"

function Contact() {
  const [name, setName] = useState(localStorage.getItem("name") || "");
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [message, setMessage] = useState(localStorage.getItem("message") || "");

  localStorage.setItem("name", name);
  localStorage.setItem("email", email);
  localStorage.setItem("message", message);

  function clearWithTransition(setValue, value) {
    let i = value.length;
    const intervalId = setInterval(() => {
      if (i > 0) {
        setValue(value.slice(0, --i));
      }
      else {
        clearInterval(intervalId);
      }
    }, 15);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!/^[a-zA-Z\s]*$/.test(name) || name.length < 2) {
      Store.addNotification({
        title: "Error",
        message: "Please enter a valid name",
        type: "danger",
        container: "bottom-right",
        insert: "bottom",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true
        }
      });
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      Store.addNotification({
        title: "Error",
        message: "Please enter a valid email",
        type: "danger",
        container: "bottom-right",
        insert: "bottom",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true
        }
      });
    } else if (name === "" || email === "" || message === "") {
      Store.addNotification({
        title: "Error",
        message: "All fields must be filled out",
        type: "danger",
        container: "bottom-right",
        insert: "bottom",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true
        }
      });
    } else {
      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("message", message);

      const formData = new FormData();
      formData.append("access_key", "22f58b82-7f86-42ec-ab01-7a82cc4f63ab");
      formData.append("name", name);
      formData.append("email", email);
      formData.append("message", message);

      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formData
        });
        
        const data = await response.json();
        
        if (data.success) {
          Store.addNotification({
            title: "Success",
            message: "Form submitted successfully",
            type: "success",
            container: "bottom-right",
            insert: "bottom",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 5000,
              onScreen: true
            }
          });
          event.target.reset();
          clearWithTransition(setName, name);
          clearWithTransition(setEmail, email);
          clearWithTransition(setMessage, message);
        }
        else {
          Store.addNotification({
            title: "Error",
            message: "Failed to submit form",
            type: "danger",
            container: "bottom-right",
            insert: "bottom",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 5000,
              onScreen: true
            }
          });
        }
      }
      catch (error) {
        Store.addNotification({
          title: "Error",
          message: "Failed to submit form",
          type: "danger",
          container: "bottom-right",
          insert: "bottom",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true
          }
        });
      }
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
          <Title>
            Contact
          </Title>
          <p className="text-left text-gray-800 dark:text-gray-300 mb-2">
            Feel free to reach out to me for any inquiries or just to say hi! 🌟
          </p>
          <p className="text-left text-gray-800 dark:text-gray-300 mb-5">
            If you&apos;d want to cooperate, please fill out the form below. I&apos;ll get back to you as soon as possible. Thank you! 🚀
          </p>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`placeholder-gray-500 p-2 bg-transparent border-2 rounded-md focus:outline-none border-stone-600 dark:border-white transition-colors duration-1000 ${name ? "bg-white text-black" : "bg-transparent"}`} />
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`placeholder-gray-500 my-2 p-2 bg-transparent border-2 rounded-md focus:outline-none border-stone-600 dark:border-white transition-colors duration-1000 ${email ? "bg-white text-black" : "bg-transparent"}`} />
          <textarea
            name="message"
            placeholder="Message"
            rows="10"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={`placeholder-gray-500 p-2 mb-4 border-2 rounded-md focus:outline-none border-stone-600 dark:border-white transition-colors duration-1000 ${message ? "bg-white text-black" : "bg-transparent"}`} />
          <button
            type="submit"
            id="submit"
            className="drop-shadow-dark dark:drop-shadow-light text-center inline-block px-8 py-3 w-max text-base font-medium rounded-md text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:stroke-white hover:from-purple-400 hover:to-blue-600 select-none">  
            Work With Me
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
