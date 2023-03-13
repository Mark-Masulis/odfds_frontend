import React, {
    useState
} from 'react'


/*
props.tabs should be an array of objects with two properties
*obj.label is the label to appear on the tab itself. Each name MUST be unique
*obj.onselect is a function that triggers when the tab is selected
*/
export default function TabBar(props){

    const [selectedTab, setSelectedTab] = useState(props.tabs[0].label)

    const tabs = props.tabs.map((item) => {
        return(
            <button 
                style={{
                    //these style values are hard coded rn and might need to be calculated based on screen/parent component width later.
                    border: "none",
                    background: "none",
                    width: "200px",
                    marginRight: "20px",
                    fontFamily: "Inter",
                    fontSize: "25px"
                }}
                onClick={()=>{
                    if (selectedTab !== item.label){
                        item.onSelect()
                        setSelectedTab(item.label)
                    }
                }}
            >
                <p 
                    style={{
                        color: "#152339",
                        textDecorationLine: selectedTab === item.label?"underline":"none",
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