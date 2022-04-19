import React from 'react'
import logo from "assets/ldx.png"
import Image from "next/image";

function index() {
  return (
    <div>
      <Image src={logo} />
    </div>
  );
}

export default index