import React from "react";

function MainContent() {
  return (
    <main>
      <section id="home">
        <h2>Home</h2>
        <p>This is the home section of the page.</p>
      </section>
      <section id="about">
        <h2>About</h2>
        <p>This section contains information about the page.</p>
      </section>
      <section id="contact">
        <h2>Contact</h2>
        <p>
          You can contact us at{" "}
          <a href="mailto:rh@yahoo.com">rh@yahoo.com</a>.
        </p>
      </section>
    </main>
  );
}

export default MainContent;