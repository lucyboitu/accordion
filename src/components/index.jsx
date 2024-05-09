import { useState } from "react";
import React from "react";
import data from "./data";
import "./style.css";

export default function Accordion() {
  //Single Selection
  const [selected, setSelected] = useState(null);

  //Enable Multi Selection
  const [enableMultiSelection, setEnableMultiSelection] = useState(false);

  //Multi Selection
  const [multiple, setMultiple] = useState([]);

  function handleSingleSelection(getCurrentId) {
    setSelected(getCurrentId === selected ? null : getCurrentId);
  }

  function handleMultiSelection(getCurrentId) {
    let cpyMultiple = [...multiple];
    const findIndexOfCurrentId = cpyMultiple.indexOf(getCurrentId);

    if (findIndexOfCurrentId === -1) cpyMultiple.push(getCurrentId);
    else cpyMultiple.splice(findIndexOfCurrentId, 1);
    setMultiple(cpyMultiple);
    console.log(multiple);
  }
  return (
    <div className="acc-wrapper">
      <div className="accordian">
        <button onClick={() => setEnableMultiSelection(!enableMultiSelection)}>
          Enable Multiple Selection
        </button>
        {data && data.length > 0 ? (
          data.map((dataItem) => (
            <div className="item">
              <div
                onClick={
                  enableMultiSelection
                    ? () => handleMultiSelection(dataItem.id)
                    : () => handleSingleSelection(dataItem.id)
                }
                className="title"
              >
                <h3> {dataItem.question}</h3>
                <span>+</span>
              </div>
              {enableMultiSelection
                ? multiple.indexOf(dataItem.id) !== -1 && (
                    <div className="acc-content">{dataItem.answer}</div>
                  )
                : selected === dataItem.id && (
                    <div className="acc-content">{dataItem.answer}</div>
                  )}
            </div>
          ))
        ) : (
          <div>No Data Found....</div>
        )}
      </div>
    </div>
  );
}
