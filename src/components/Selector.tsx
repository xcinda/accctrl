import SwitchSelector from "react-switch-selector";

export default function Selector(props){
  const options = [
    {
      label: "Všichni",
      value: "vsichni",
      selectedBackgroundColor: "#0097e6",
    },
    {
      label: "Aktivní",
      value: "aktivni",
      selectedBackgroundColor: "#0097e6"
    },
    {
      label: "S notifikací",
      value: "notif",
      selectedBackgroundColor: "#0097e6"
    }
  ];

  const onChange = (newValue) => {
    props.changeHandler(newValue);
  };

  const initialSelectedIndex = options.findIndex(({value}) => value === "bar");

  return (
    <div className="h-5/10 flex-1"><SwitchSelector
      onChange={onChange}
      options={options}
      initialSelectedIndex={initialSelectedIndex}
      backgroundColor={"#353b48"}
      fontColor={"#f5f6fa"}
    /></div>
  );
}