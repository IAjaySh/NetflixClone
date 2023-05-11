import {  ArrowBackIosOutlined, ArrowForwardIosOutlined } from '@material-ui/icons'
import './List.scss'
import ListItem from '../listItem/ListItem'
import { useRef, useState } from 'react'

export default function List({list}) {

    const [isMoved,setisMoved]=useState(false);
    const [slideNum,setslideNum]=useState(0);
    const listRef=useRef();

    const handleArrow=(direction)=>{
        setisMoved(true)

        let distance=listRef.current.getBoundingClientRect().x-50;
    
        if(direction==="left" && slideNum>0){
            setslideNum(slideNum-1);
            listRef.current.style.transform=`translateX(${230+distance}px)`;
        }
        if(direction==="right" && slideNum<=5){
            setslideNum(slideNum+1);
            listRef.current.style.transform=`translateX(${-230+distance}px)`;
        }
        // console.log(distance)
    }

  return (
    <div className='list'>
        <span className="listTitle">{list.title}</span>
        <div className="wrapper">
            <ArrowBackIosOutlined className='slideArrow left' 
            onClick={()=>handleArrow('left')}
            style={{display: !isMoved && 'none'}} />
            <div className="movieContainer" ref={listRef}>
                {list.content.map((item,idx)=>{
                    return(
                        <ListItem item={item}  index={idx} />
                    )
                })}

            </div>
            <ArrowForwardIosOutlined className='slideArrow right' onClick={()=>handleArrow('right')}/>
        </div>
    </div>
  )
}
