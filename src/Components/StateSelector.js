import React from 'react'

//options list with each of the 50 states as options
//props.onChange should be a function taking 1 parameter
export default function StateSelector(props){
    const states = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "District of Columbia", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"]
    
    return(
        <select
            id={props.id}
            onChange={(event)=>{
                props.onChange(event.target.value)
            }}
            style={props.style}
        >
            {states.map((item)=>{
                return(
                    <option 
                        value={item}
                        selected={props.value === item}
                    >
                        {item}
                    </option>
                )
            })}
        </select>
    )
}