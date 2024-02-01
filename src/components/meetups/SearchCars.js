import React, { useEffect } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

export default function SearchCars() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch();
  });
  return (
    <div className="reset-input">
      <CiSearch className="search-icon" />
      <input id="search" placeholder="Search" />
      <IoMdClose className="close-icon" />
    </div>
  );
}
