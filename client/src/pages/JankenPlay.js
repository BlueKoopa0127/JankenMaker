import { Num_BCP } from "../App";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useLocation } from "react-router";
import { getJanken, postPlayJanken } from "../api";
export function JankenPlay() {
    const [playerHand, setPlayerHand] = useState(null);
    const [enemyHand, setEnemyHand] = useState(null);
    const [jankenData, setJankenData] = useState(null);
    const path = useLocation().pathname;

    useEffect(async () => {
        const result = await getJanken(path);
        console.log(result);
        setJankenData(result);
    }, []);

    if (jankenData == null) {
        return (<div>読み込み中</div>);
    }
    if (enemyHand == null) {
        setEnemyHand(RandomBCP(jankenData.rock, jankenData.scissors, jankenData.paper));
        console.log(enemyHand);
    }

    function BCP(props) {
        const bcp = Num_BCP(props.bcpNum);
        if (playerHand == null) {
            return (
                <div className="column has-text-centered">
                    <button onClick={() => setPlayerHand(props.bcpNum)}>
                        {bcp}
                    </button>
                </div>
            );
        } else {
            return (
                <div></div>
            );
        }
    }

    function PlayID() {
        if (jankenData == null) {
            return (
                <div>
                    VS ~~~
                </div>
            );
        } else {
            return (
                <div>
                    VS {jankenData.title}
                </div>
            );
        }
    }

    function EnemyHand() {
        if (enemyHand == null || playerHand == null) {
            return (<div />);
        }
        const a = Num_BCP(enemyHand);
        return (
            <div>
                相手の手:{a}
            </div>
        );
    }

    return (
        <main>
            <PlayID />
            <EnemyHand />
            <div className="columns">
                <BCP bcpNum="0" />
                <BCP bcpNum="1" />
                <BCP bcpNum="2" />
            </div>
            <WinLose playerHand={playerHand} enemyHand={enemyHand} path={path} />
            
        </main>
    );
}

function WinLose(props) {
    if (props.playerHand != null) {
        const [ result, win ] = Judge(props.playerHand, props.enemyHand);
        console.log(result);
        console.log(win);
        return (
            <div>
                <div className="has-text-centered">
                    {result}
                </div>
                <div className="breadcrumb is-centered">
                    <Link onClick={async() => await postPlayJanken(props.path, win)} to="/">
                        終了
                    </Link>
                </div>
            </div>
        );
    } else {
        return (
            <div></div>
        );
    }
}

function Judge(p, e) {
    if (p == e) {
        return ["あいこ！", 0];
    }

    if (p == "0" && e == "1" || p == "1" && e == "2" || p == "2" && e == "0") {
        return ["君の勝ち！", 0];
    }

    if (p == "0" && e == "2" || p == "1" && e == "0" || p == "2" && e == "1") {
        return ["君の負け！", 1];
    }

    return ["", -1];
}

function RandomBCP(rock, scissors, paper) {
    const total = rock + scissors + paper;
    const random = Math.random() * total;

    console.log(total);
    console.log(random);

    if (random <= rock) {
        return "0";
    } else if (random <= rock + scissors) {
        return "1";
    } else if (random <= total) {
        return "2";
    } else {
        return "-1";
    }
}

export default JankenPlay;