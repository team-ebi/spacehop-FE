import React, {useState} from 'react'
import Data from '../../data/businesses'
import './List.css';
export default function List() {
//state for JSON data
const [data, setData] = useState(Data);

    return (
        <div >
        <h1>List View</h1>
            <div id="location-container">
            {/* Mapping through data to display on each bizcard */}
            {data.map((biz, index)=>( 
            <div id="location-cell">
            <img id="business-image" src="https://media.timeout.com/images/105393878/image.jpg"/> <br/>
             <span id="location-name">{biz.name}</span> <br/>
             <img id="location-png" />
            {biz.address_city} <br/>
            <img id="location-png" />
             {biz.address_street} <br/>
             {biz.address_zip} <br/>
             <img id="location-png" /> 
             {biz.business_type} <br/>
            <img id="location-png" />
            {biz.phone} <br/>
            {/* mapping through week days to display each available day */}
            Availability: 
            <select id="days">
                {biz.all_availabilities.map((avail, index)=>(
                    <option>{avail.day}</option>
                ))}
            </select> <br/>
            <img  id="location-png"/> 
            {biz.price} <br/>
            <input type="button" value="Book" id="book-button" ></input>
            </div>))}
        </div>
        </div>
    )
}

