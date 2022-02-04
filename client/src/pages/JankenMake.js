import { useEffect, useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Num_BCP } from "../App";
import { useLocation } from "react-router";
import { postMakeJanken } from "../api";

export function JankenMake() {
    const path = useLocation().pathname;
    const [title, setTitle] = useState(null);
    const [rock, setRock] = useState(null);
    const [scissors, setScissors] = useState(null);
    const [paper, setPaper] = useState(null);

    const titleChange = (e) => {
        setTitle(() => e.target.value);
    }
    const rockChange = (e) => {
        setRock(() => e.target.value);
    }
    const scissorsChange = (e) => {
        setScissors(() => e.target.value);
    }
    const paperChange = (e) => {
        setPaper(() => e.target.value);
    }

    function Complete() {
        return (
            <Link to="/" onClick={() => postMakeJanken(path, title, rock, scissors, paper)}>
                製作完了
            </Link>
        );
    }
    

    return (
        <main>
            ジャンケンの製作
            <Title set={titleChange} />
            <Weight bcpNum="0" set={rockChange} />
            <Weight bcpNum="1" set={scissorsChange} />
            <Weight bcpNum="2" set={paperChange} />
            <Complete />
        </main>
    );
}

function Title(props) {
    return (
        <form>
            <label>
                タイトル:
                <input onChange={props.set} type="text" />
            </label>
        </form>
    );
}

function Weight(props) {
    const bcp = Num_BCP(props.bcpNum);
    return (
        <div>
            {bcp}の重み:
            <input onChange={props.set} type="number" />
        </div>
    );
}



export default JankenMake;