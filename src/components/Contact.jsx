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

    if (name.length < 2) {
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
    <div className="flex flex-col mb-10 mx-auto mt-36">
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
          <Title id="0">
            Contact
          </Title>
          <p className="text-left text-gray-800 dark:text-gray-300 mb-5">
            If you&apos;d want to cooperate, please fill out the form below. I&apos;ll get back to you as soon as possible.
          </p>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`text-white outline-0 focus:outline-0 placeholder-gray-500 p-2 bg-gradient-to-t from-slate-100/[.2] to-slate-200[.1] hover:bg-slate-200/[.6] hover:dark:bg-github transition-all duration-300 backdrop-blur-lg rounded-lg shadow-lg border-stone-600 dark:border-white ${name ? "bg-transparent text-black" : "bg-transparent"}`} />
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`text-white outline-0 focus:outline-0 placeholder-gray-500 my-2 p-2 bg-gradient-to-t from-slate-100/[.2] to-slate-200[.1] hover:bg-slate-200/[.6] hover:dark:bg-github transition-all duration-300 backdrop-blur-lg rounded-lg shadow-lg dark:border-white ${email ? "bg-transparent text-black" : "bg-transparent"}`} />
          <textarea
            name="message"
            placeholder="Message"
            rows="10"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={`text-white outline-0 focus:outline-0 placeholder-gray-500 p-2 mb-4 min-h-10 bg-gradient-to-t from-slate-100/[.2] to-slate-200[.1] hover:bg-slate-200/[.6] hover:dark:bg-github transition-all duration-300 backdrop-blur-lg rounded-lg shadow-lg  ${message ? "bg-transparent text-black" : "bg-transparent"}`} />
          <div>
            <button
              type="submit"
              id="submit"
              className="relative text-center inline-block px-5 py-2 text-base font-medium text-white rounded-lg shadow-lg select-none transition-opacity duration-300"
            >
              <span className="relative z-10 pointer-events-none">Submit</span>
              <span className="absolute inset-0 bg-gradient-to-t from-blue-500 to-purple-500 opacity-70 hover:opacity-100 transition-opacity duration-300 rounded-lg"></span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Contact;
