import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import "./index.scss";
function Contact() {
  return (
    <section id="contact">
      <div className="container">
        <div className="title">
          <h1>Quick Contact Address</h1>
          <p>
            There are many variations of passages of Lorem Ipsum available,
            <br /> but the majority have suffered alteration.
          </p>
        </div>
        <div className="quick-contacts">
          <div className="quick-contact">
            <i className="fa-light fa-headphones"></i>
            <span>Our Phone Numbers</span>
            <p>
              +994 12 310 0113
              <br />
              +994 50 444 2633
            </p>
          </div>
          <div className="quick-contact">
            <i className="fa-light fa-envelope"></i>
            <span>Our Email Address</span>
            <p>
              nuron.nft@inbox.ru
              <br />
              nuron.nft@inbox.ru
            </p>
          </div>
          <div className="quick-contact">
            <i className="fa-light fa-location-dot"></i>
            <span>Our Location</span>
            <p>
              203B Nizami Street,
              <br /> AF Business House, 2nd Floor
            </p>
          </div>
        </div>
        <div className="content">
          <div className="image">
            <div className="img">
              <img
                src="https://rainbowthemes.net/themes/nuron/wp-content/uploads/2023/03/contact1.png"
                alt=""
              />
            </div>
          </div>
          <Formik
            initialValues={{ name: "", email: "", subject: "", message: "" }}
            validationSchema={Yup.object({
              name: Yup.string()
                .min(5, "Must be 5 characters at least")
                .required("Required"),
              email: Yup.string()
                .email("Invalid email address")
                .required("Required"),
              subject: Yup.string()
                .min(5, "Must be 5 characters at least")
                .required("Required"),
              message: Yup.string()
                .min(20, "Must be 20 characters at least")
                .required("Required"),
            })}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(false);
            }}
          >
            <Form>
              <h2>Contact Us</h2>
              <div className="form">
                <label htmlFor="name">Your name</label>
                <Field name="name" type="text" id="name" />
                <ErrorMessage name="name" component={"span"} />
              </div>
              <div className="form">
                <label htmlFor="email">Email Address</label>
                <Field name="email" type="email" id="email" />
                <ErrorMessage name="email" component={"span"} />
              </div>
              <div className="form">
                <label htmlFor="subject">Subject</label>
                <Field name="subject" type="text" id="subject" />
                <ErrorMessage name="subject" component={"span"} />
              </div>
              <div className="form">
                <label htmlFor="message">Write Message</label>
                <Field name="message" type="text" id="message" as="textarea" />
                <ErrorMessage name="message" component={"span"} />
              </div>

              <button type="submit">Send Message</button>
            </Form>
          </Formik>
        </div>
        <div className="map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2920.7008610522607!2d49.84904458487168!3d40.37719389782147!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307d077c61fef3%3A0xfa4594c97092ca01!2sAF%20Business%20House!5e1!3m2!1sen!2sbd!4v1707418765094!5m2!1sen!2sbd"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
}

export default Contact;
