import './App.css';

let instances = [1,2];
export default function InfiniteLooping(props) {
  // useEffect(() => {
  //   console.log(props.children);
  // }, [props.children]);
  return (
    <div className="example">
      <div style={{ width: "100%" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
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
