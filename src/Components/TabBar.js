import React, {
    useState
} from 'react'


/*
props.tabs should be an array of objects with two properties
*obj.label is the label to appear on the tab itself. Each name MUST be unique (case insensitive)
*obj.onselect is a function that triggers when the tab is selected

props.defaultLabel should be a string matching one of the tabs' labels. This one will be selected by default
*/
export default function TabBar(props){
    const [selectedTab, setSelectedTab] = useState(props.defaultLabel ||  props.tabs[0].label.toLowerCase())
    const tabs = props.tabs.map((item) => {
        return(
            <button 
                style={{
                    //these style values are hard coded rn and might need to be calculated based on screen/parent component width later.
                    border: "none",
                    background: "none",
                    width: "200px",
                    margin: "20px 40px",
                    marginRight: "20px",
                    fontFamily: "Inter",
                    fontSize: "25px"
                }}
                onClick={()=>{
                    if (selectedTab !== item.label.toLowerCase()){
                        item.onSelect()
                        setSelectedTab(item.label.toLowerCase())
                    }
                }}
            >
                <p 
                    style={{
                        color: "#152339",
                        textDecorationLine: selectedTab === item.label.toLowerCase()?"underline":"none",
                        textDecorationThickness: "0.15em"
                    }}
                >
                    {item.label}
                </p>
            </button>
        )
    })

    return (
        <table
            style={{
                margin: "0 auto"                
            }}
        >
            <tr>
                {tabs}
            </tr>
        </table>
    )
}