import React from "react";
import { Link, useHistory } from "react-router-dom";

import { Button } from '@material-ui/core';


import { Hero } from "../components/Hero";

import "../styles/home.scss";

export function Home() {
  const history = useHistory();


  function navigateToLogin() {
    history.push('/login');
  }
  return (
    <div id="page-home">
      <Hero />
      <main>
        <div className="content">
          <h1>ATM Manager</h1>
          <p className="my-3">Nossa plataforma foi desenvolvida para ultrapassar o espaço e o tempo, trazendo comodidade e conforto até a sua casa.</p>
          <Button
            variant="contained"
            color="primary"
            onClick={navigateToLogin}
          >
            Login
          </Button>
          <div className="my-2">ou</div>
          <Link to="/register" className="link">Cadastrar</Link>
        </div>
      </main>
    </div>
  );
}
