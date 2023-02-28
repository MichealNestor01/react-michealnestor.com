import { React, useState, Fragment } from "react";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import useInput from "../hooks/useInput";
import { uiActions } from "../store";
import { Helmet } from "react-helmet";
import { domainName } from "../store";

const ContactPage = () => {
  // setup hooks
  const dispatch = useDispatch();
  const [error, setError] = useState({ error: false, message: "" });
  const [message, setMessage] = useState("");

  // setup custom use input objects. Basically a object for test inputs
  const {
    value: name,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangedHandler: nameChangeHandler,
    valueInputBlurHandler: nameTouchedHandler,
    reset: nameReset,
  } = useInput((name) => name.length > 0);

  const {
    value: email,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangedHandler: emailChangeHandler,
    valueInputBlurHandler: emailTouchedHandler,
    reset: emailReset,
  } = useInput((email) => email.includes("@"));

  const {
    value: subject,
    isValid: subjectIsValid,
    hasError: subjectHasError,
    valueChangedHandler: subjectChangeHandler,
    valueInputBlurHandler: subjectTouchedHandler,
    reset: subjectReset,
  } = useInput((subject) => subject.length > 0);

  const formIsValid = emailIsValid && nameIsValid && subjectIsValid;

  // submit handler describes the events when a user tries to submit a contact form
  const submitHandler = (e) => {
    e.preventDefault();
    if (!formIsValid) {
      return;
    }
    const sendContact = async () => {
      const body = JSON.stringify({ name, email, subject, message });

      try {
        const response = await fetch(`${domainName}/api/contacts/`, {
          method: "POST",
          body: body,
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (response.ok && !data.error) {
          dispatch(
            uiActions.showPopup(
              "Success!",
              "Message successfully delivered, I will try to get back to you within 2 working days!"
            )
          );
          setError({ error: false, message: "" });
        } else {
          setError({
            error: true,
            message:
              "Message failed to send, try again or email me directly through michealnestor@outlook.com",
          });
        }
      } catch {
        setError({
          error: true,
          message:
            "Message failed to send, try again or email me directly through michealnestor@outlook.com",
        });
      }
    };
    sendContact();
    nameReset();
    emailReset();
    subjectReset();
    setMessage("");
  };

  // setup the classes for the inputs
  const emailClasses = emailHasError ? `input  input__invalid` : `input`;
  const nameClasses = nameHasError ? `input  input__invalid` : `input`;
  const subjectClasses = subjectHasError ? `input input__invalid` : `input`;

  let buttonVariants = {
    tap: { scale: 0.9 },
    hover: { scale: 1.1, transition: { duration: 0.3 } },
  };

  if (!formIsValid) {
    buttonVariants = {
      tap: { scale: 1 },
      hover: { scale: 1 },
    };
  }

  const formSections = [
    {
      label: "Your Name:",
      hasError: nameHasError,
      errorText: "You have to input your name!",
      inputType: "input",
      input: {
        name: "name",
        type: "text",
        maxLength: "200",
        placeholder: "Your Name",
        class: nameClasses,
        value: name,
        onChange: nameChangeHandler,
        onBlur: nameTouchedHandler,
      },
      textArea: null,
    },
    {
      label: "Email:",
      hasError: emailHasError,
      errorText: "The email must contain an @ symbol",
      inputType: "input",
      input: {
        name: "email",
        type: "email",
        maxLength: "100",
        placeholder: "Your Email",
        class: emailClasses,
        value: email,
        onChange: emailChangeHandler,
        onBlur: emailTouchedHandler,
      },
      textArea: null,
    },
    {
      label: "Subject:",
      hasError: subjectHasError,
      errorText: "You have to input a subject!",
      inputType: "input",
      input: {
        name: "subject",
        type: "text",
        maxLength: "100",
        placeholder: "What is this about?",
        class: subjectClasses,
        value: subject,
        onChange: subjectChangeHandler,
        onBlur: subjectTouchedHandler,
      },
      textArea: null,
    },
    {
      label: "Your Name:",
      hasError: false,
      errorText: "You have to input your name!",
      inputType: "textArea",
      input: null,
      textArea: {
        type: "text",
        rows: "7",
        name: "message",
        placeholder: "Please give me some details regarding how I can help you!",
        value: message,
        class: `input`,
        onChange: (e) => setMessage(e.target.value),
      },
    },
  ].map((section) => {
    let htmlFor;
    if (section.inputType === "input") {
      htmlFor = section.input.name;
    } else {
      htmlFor = section.textArea.name;
    }
    return (
      <section className="section">
        <section className="labelInputWrapper">
          <label className="label" htmlFor={htmlFor}>
            {section.label}
          </label>
          {section.inputType === "input" ? (
            <input
              className={section.input.class}
              type={section.input.type}
              name={section.input.name}
              maxLength={section.input.maxLength}
              placeholder={section.input.placeholder}
              value={section.input.value}
              onChange={section.input.onChange}
              onBlur={section.input.onBlur}
              required
            />
          ) : (
            <textarea
              className={section.textArea.class}
              type={section.textArea.type}
              rows={section.textArea.rows}
              name={section.textArea.name}
              placeholder={section.textArea.placeholder}
              value={section.textArea.value}
              onChange={section.textArea.onChange}
            />
          )}
        </section>
        {section.hasError && <p className="inputError">{section.errorText}</p>}
      </section>
    );
  });

  // return the full page
  return (
    <Fragment>
      <Helmet>
        <title>Micheal Nestor | Contact</title>
        <meta
          name="description"
          content="Micheal Nestor is an experienced software engineer and private tutor"
        />
      </Helmet>
      <section className="contactPage">
        <h1 className="title">Contact Me!</h1>
        {error.error && <h1 className="errorMessage">{error.message}</h1>}
        <form className="form" method="POST" data-netlify="true">
          {formSections}
          <section className="section">
            <motion.button
              variants={buttonVariants}
              whileTap="tap"
              whileHover="hover"
              type="submit"
              className="button"
              disabled={!formIsValid}
            >
              Send Message!
            </motion.button>
          </section>
        </form>
      </section>
    </Fragment>
  );
};

export default ContactPage;
