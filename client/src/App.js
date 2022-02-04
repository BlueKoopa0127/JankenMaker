import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { useEffect, useState } from "react";
import { getValue } from "./api";

import { JankenList } from "./pages/JankenList";
import { JankenPlay } from "./pages/JankenPlay";
import { JankenMake } from "./pages/JankenMake";



const VISIT = 'count';
const A = 'A', B = 'B', C = 'C';

function Header() {
  return (
    <header className="hero is-light is-bold">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">JankenMaker</h1>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="content has-text-centered">
        <p>このWebページは日本大学文理学部情報科学科 Webプログラミングの演習課題です。</p>
        <p>学生証番号：5420071 氏名：塚田一晃</p>
      </div>
    </footer>
  );
}

export function App() {
  return (
    <Router>
      <Header />
      <section className="section has-background-warning-light">
        <div className="container">
          <Switch>
            <Route path="/" exact>
              <ToLink path="/make" name="ジャンケン製作" />
              <JankenList />
            </Route>
            <Route path="/play/:jankenId" exact>
              <JankenPlay />
            </Route>
            <Route path="/make">
              <ToLink path="/" name="ジャンケン一覧" />
              <JankenMake />
            </Route>
          </Switch>
        </div>
      </section>
      <Footer />
    </Router>
  );
}

function ToLink(props) {
  return (
    <div className="block has-text-right">
      <Link className="button is-warning is-inverted is-outlined" to={props.path}>
        {props.name}
      </Link>
    </div>
  );
}

export function Num_BCP(num) {
  switch(num) {
    case "0":
      return "グー";
    case "1":
      return "チョキ";
    case "2":
      return "パー";
    default:
      return "";
  }
}







/*


function App() {
  return (
    <main>
      <Header />
      <div className="mx-5">
        <HowTo />
        <div className="columns">
          <div className="column has-text-centered"><Click name={A} /></div>
          <div className="column has-text-centered"><Click name={B} /></div>
          <div className="column has-text-centered"><Click name={C} /></div>
        </div>
        <div className="has-text-centered"><Visit /></div>
      </div>
      <Footer />
    </main>
  );
}

function HowTo() {
  return (
    <main>
      <h2 className="breadcrumb is-large m-0 has-text-weight-bold">使い方</h2>
      <p>使い方は簡単。ABCどれかのボタンをクリックするだけ。クリックするとそのボタンが今までに押された回数が出るから一番押されているボタンや一番押されてないボタンを予想してみよう！</p>
    </main>
  );
}

function Visit() {
  const [count, setCount] = useState(null);

  useEffect(async () => {
    const result = await getValue(VISIT);
    setCount(result);
  }, []);

  if (count == null) {
    return (
      <p>このページは-回表示されました！ありがとう！</p>
    );
  }

  return (
    <p>このページは{count}回表示されました！ありがとう！</p>
  );
}

function Click(props) {
  const [clickCount, setCount] = useState(null);

  const clickEvent = async () => {
    const result = await getValue(`click${props.name}`);
    setCount(result);
  };

  if (clickCount == null) {
    return (
      <main>
        <p className="breadcrumb is-large m-0">???</p>
        <button onClick={clickEvent} className="button is-large">{props.name}</button>
      </main>
    );
  }

  return (
    <main>
      <p className="breadcrumb is-large m-0">{clickCount}</p>
      <button onClick={clickEvent} className="button is-large">{props.name}</button>
    </main>
  );
}*/

export default App;