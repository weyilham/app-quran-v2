import React from "react";

function Footer() {
  return (
    <div className="w-full fixed bottom-0 left-0 right-0 shadow-sm z-50">
      <div className="bg-white  text-sm font-primarySemibold flex justify-center items-center p-2">
        <p>
          Copyright © 2024 Ilham Maulana. Reference :{" "}
          <a href="https://equran.id/" target="_blank">
            equran.id
          </a>{" "}
          ❤️
        </p>
      </div>
    </div>
  );
}

export default Footer;
