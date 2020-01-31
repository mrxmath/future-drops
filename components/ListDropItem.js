import React from 'react';
import { Text } from 'react-native';

const ListDropItem = ({title, duration, date}) => {
    return (
        <>
        <Text>{title}</Text>
        <Text>{duration}</Text>
        <Text>{date}</Text>
        </>
    )
}

export default ListDropItem;