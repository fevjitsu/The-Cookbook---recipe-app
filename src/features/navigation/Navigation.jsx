import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faList, faPlus } from "@fortawesome/free-solid-svg-icons";
export default function Navigation({
  isMobile,
  handleAdd,
  handleHome,
  handleAppetizers,
  handleEntrees,
  handleDrinks,
  handleDesserts,
}) {
  let [showCategoriesList, setShowCategoriesList] = useState(false);

  return (
    <header className="animate__animated animate__fadeInDown">
      <h2
        onClick={() => {
          setShowCategoriesList(false);
          handleHome();
        }}
      >
        <FontAwesomeIcon icon={faHome} />
        &nbsp; The Community CookBook
      </h2>
      <nav>
        <ul>
          <li>
            <span
              onClick={() => {
                setShowCategoriesList(!showCategoriesList);
                handleHome();
              }}
              title="Categories"
            >
              <FontAwesomeIcon icon={faList} />
              &nbsp; Categories
            </span>
          </li>

          <li>
            <span
              onClick={() => {
                setShowCategoriesList(false);
                handleAdd();
              }}
              title="Add yours"
            >
              <FontAwesomeIcon icon={faPlus} /> &nbsp; Add yours
            </span>
          </li>

          {/* <li>
            <span
              onClick={() => {}}
              className="btn"
              href="#"
              title="Register / Log In"
            >
              <strike>Register/Log In</strike>
            </span>
          </li> */}
        </ul>
        {showCategoriesList ? (
          <div
            className={"animate__animated animate__fadeInDown categories__list"}
          >
            <button
              onClick={() => {
                handleAppetizers();
                setShowCategoriesList(false);
              }}
              className={" category__list__button"}
            >
              Appetizers
            </button>
            <button
              onClick={() => {
                handleEntrees();
                setShowCategoriesList(false);
              }}
              className={"category__list__button"}
            >
              Entrées
            </button>
            <button
              onClick={() => {
                handleDesserts();
                setShowCategoriesList(false);
              }}
              className={"category__list__button"}
            >
              Desserts
            </button>
            <button
              onClick={() => {
                handleDrinks();
                setShowCategoriesList(false);
              }}
              className={"category__list__button"}
            >
              Drinks
            </button>
          </div>
        ) : null}
      </nav>
    </header>
  );
}
