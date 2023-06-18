import { useState } from "react";
import { useEffect } from "react";
import './App.css';

export default function InfiniteLooping(props) {
  const [instances, setInstances] = useState([1, 2]);
  useEffect(() => {
    console.log(props.children);
  }, [props.children]);
  return (
    <div className="example">
      <div style={{ width: "100%" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute"
          }}
        >
          {instances.map((image, num) => {
            return (
              <div
                style={{
                  animationDuration: `300s`,
                  animationDirection: "right"
                }}
                className="loopingListItem"
              >
                {props.children}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
