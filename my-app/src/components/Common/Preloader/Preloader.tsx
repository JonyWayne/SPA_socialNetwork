import React from 'react';
import Ajux_loader from '../../../assets/images/Ajux_loader.gif'



let Preloader:React.FC=()=> {
return <div>
    <img src={Ajux_loader} style={{backgroundColor:''}}/>
</div>
}


export default Preloader;
