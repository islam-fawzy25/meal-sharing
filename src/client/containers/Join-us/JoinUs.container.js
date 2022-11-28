import React from "react";
import AddNewMeal from "../../components/meals/newMeal/AddNewMeal.component";
import "./JoinUs.style.css"


export default function JoinUS() {
    return (
        <div className="join-us-container">
            <div className="why-you-join-us">
                <h2>Why You join us?</h2>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nam eget velit vel nulla rutrum commodo. In mattis dolor in sem
                    tincidunt pulvinar. Morbi vestibulum dictum vulputate. Morbi et neque
                    vitae metus consequat feugiat. Vestibulum vestibulum feugiat convallis.
                    Morbi tempus risus in vulputate tempus. Curabitur sem neque, faucibus et
                    tincidunt non, lobortis eget velit. Quisque vel magna leo.
                    Duis odio erat, feugiat vel ipsum quis, pulvinar ornare dui.
                </p>
            </div>
            <div>
                <AddNewMeal />
            </div>
        </div>
    )
}