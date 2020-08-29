import React from 'react';

const Badge = (props) =>{
    return (
        <div>
        <div>Year licensed: <input name="LicenseYear"  type="number"/></div>
        <div>Badge name:</div>
        <div ><input name="badgeName" placeholder="Name"  type="text" /></div>
        <div >
            <div><input type="checkbox" name='Arrl' /> ARRL logo &nbsp;
                <input type="radio" name="type" value="Pin" /> Pin </div>
            <div><input type="radio" name="type" value="Notch"/> Notch &nbsp;
                <input type="radio" name="type"  value="Magnet" /> Magnet </div>
            <div><input type="radio" name="type"  value="Lanyard" /> Lanyard </div>
            <div>
                <div>Color: <select name="Color">
                    <option value="White">White</option>
                    <option value="Black">Black</option>
                    <option value="Green">Green</option>
                    <option value="Brown">Brown</option>
                    <option value="Red">Red</option>
                    <option value="Blue">Blue</option>
                    <option value="Red White and Blue">Red, White & Blue</option>
                </select>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Badge