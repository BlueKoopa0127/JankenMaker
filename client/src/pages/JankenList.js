import { Link } from "react-router-dom";
import { getJankenList } from "../api";
import { useEffect, useState } from "react";
import "bulma/css/bulma.css";
import { useLocation } from "react-router";

export function JankenList() {
    return (
        <main>
            プレイできるジャンケンのリストを表示
            <Gallery />
        </main>
    );
}

function Gallery() {
    const [jankenList, setJankenList] = useState(null);
    const path = useLocation().pathname;
    useEffect(async () => {
        const result = await getJankenList(path);
        console.log(result);
        setJankenList(result);
    }, []);

    if(jankenList == null) {
        return(<div></div>);
    }

    return (
        <div className="is-vcentered is-multiline">
            {jankenList.map((janken) => {
                return (
                    <div key={janken.id} className="is-3">
                        <Item data={janken} />
                    </div>
                );
            })}
        </div>
    );
}

function Item(props) {
    const data = props.data;
    const path = "/play/" + data.id;
    

    return (
        <Link className="columns has-background-primary m-2" to={path}>
            <div className="column">
                {data.title}
            </div>
            <div className="column">
                勝利数：{data.win}
            </div>
            <div className="column">
                プレイ回数：{data.play}
            </div>
        </Link>
    );
}



export default JankenList;