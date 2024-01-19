import React from 'react'
import Star from '../images/stars/star.png';
import EmpStar from '../images/stars/empty star.png';
import {Icon} from '@mui/material'; 

const StarIcon = () => (
    <Icon style={{transform:"scale(1.3)"}}>
        <img src={Star} height={25} width={25} alt="Star"/>
    </Icon>
)
const EmptyStarIcon = () => (
    <Icon style={{transform:"scale(1.3)"}}>
        <img src={EmpStar} height={25} width={25} alt="Empty"/>
    </Icon>
)
export {
    StarIcon,
    EmptyStarIcon
} ;