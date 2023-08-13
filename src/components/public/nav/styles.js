import styled from "styled-components";

export const Container = styled.div`
  height: 12vh;

  background: grey;
  transition: 1s;

  nav {
    display: flex;
    align-items: center;
    width: 100%;
    min-height: 100%;
    margin: 0 auto;
    /* background: #fff; */
    justify-content: space-between;
    color: #111;
  }

  nav ul {
    list-style: none;
    padding: 0px 10px;
    margin: 10px 0px;
  }

  nav ul li a {
    text-decoration: none;
    color: black;
    // transition: 1s;
  }

  nav ul li span {
    text-decoration: none;
    color: black;
    cursor: pointer;
  }

  nav ul li img {
    height: 6vh;
  }

  nav ul li {
    display: inline-block;
    margin-left: 10px;
    color: black;
    // transition: 1s;
  }

  nav ul:first-of-type li:first-of-type {
    font-weight: bold;
    font-size: 2.1rem;
  }

  .animateIcon {
    color: black;
    cursor: pointer;
    z-index: 4;
    &:hover,
    :focus {
      font-size: 1.5rem;
      // transition: 0.8s;
    }
    &:not(:hover) {
      // transition: 0.8s;
      font-size: 1rem;
    }
  }
`;

export const SubContainer = styled.div`
  height: 12vh;

  background: grey;
  transition: 1s;

  nav {
    display: flex;
    align-items: center;
    width: 100%;
    min-height: 100%;
    margin: 0 auto;
    /* background: #fff; */
    justify-content: space-between;
    color: #111;
  }

  nav ul {
    list-style: none;
    padding: 0px 10px;
    margin: 10px 0px;
  }

  nav ul li a {
    text-decoration: none;
    color: black;
    // transition: 1s;
  }

  .active__admin-menu {
    color: blue;
  }

  nav ul li span {
    text-decoration: none;
    color: black;
    cursor: pointer;
  }

  nav ul li img {
    height: 6vh;
  }

  nav ul li {
    display: inline-block;
    margin-left: 10px;
    color: black;
    // transition: 1s;
  }

  // nav ul:first-of-type li:first-of-type {
  //   font-weight: bold;
  //   font-size: 2.1rem;
  // }
`;
