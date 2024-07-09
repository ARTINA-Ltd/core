import Step from "./Step.jsx";

const Path = (count) => {
  const components = [];

  for (let i = 0; i < 5; i++) {
    if (i % 2 === 0) {
      components.push(<div className="w-48 h-24 flex rounded-full border-dotted border-t-4 border-primary -translate-y-[50%]" key={i}></div>);
    } else if (i % 2 === 1) {
      components.push(<div className="w-24 flex rounded-full h-24 border-dotted border-b-4 border-primary translate-y-[50%]" key={i}></div>);
    }
  }
  return (
    <div className="flex">
      {components.map((item, i) => {
        return (
          <div className="flex">
            {item}
            <Step />
          </div>
        );
      })}
    </div>
  );
};
export default Path;
