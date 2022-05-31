import { render } from "./customReact/index";

function component() {
  const data = [
    {
      name: "a",
    },
    {
      name: "b",
    },
    {
      name: "c",
    },
  ];
  const Li = (props) => <li>{props.name}</li>;
  const app = (
    <div style={{ color: "red" }}>
      {data.map((item, index) => {
        return <Li name={item.name} key={index} />;
      })}
    </div>
  );
  console.log(app);
  return render(app);
}

document.body.appendChild(component());
