import React, { useState, useLayoutEffect, useEffect } from 'react';
import { StyleSheet, FlatList, Animated } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import HeaderButton from '../components/HeaderButton';
import ModalDeleteItem from '../components/ModalDeleteItem';
import PlaceItem from '../components/PlaceItem';
import { COLORS } from '../constants';
import { loadPlaces, removePlace } from '../store/places.action';

const PlaceListScreen = ({ navigation }) => {
    const places = useSelector(state => state.places.places);
    const dispatch = useDispatch();
    const [itemSelected, setItemSelected] = useState({});
	const [modalVisible, setModalVisible] = useState(false);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                    <Item
                        title="Nueva"
                        iconName="md-add"
                        onPress={() => navigation.push('Nuevo')}
                    />
                </HeaderButtons>
            )
        })
    }, [navigation]);

    useEffect(() => {
        dispatch(loadPlaces()); 
    }, []);

    //handlers
    const handleModalOpen = id => {
        setItemSelected(places.find(item => item.id === id));
		setModalVisible(true);
	}
    
    const handleModalClose = () => setModalVisible(false);

    const handleConfirmDelete = () => {
		dispatch(removePlace(itemSelected.id));
		setModalVisible(false);
		setItemSelected({});
	}
    
    const RenderRight = (progress, dragX) => {
        const scale = dragX.interpolate({
            inputRange: [-90, -45],
            outputRange: [1, 0],
            extrapolate: 'clamp'
        });

        return (
            <Animated.View style={{...styles.rowBack}}>
                <Animated.View style={{ ...styles.trash, transform: [ { scale } ]}}>
                    <Ionicons name="trash-bin-outline" size={30} color="white" />
                </Animated.View>
            </Animated.View>
        );
    }

    const renderItem = data => (
        <Swipeable 
            useNativeAnimations 
            overshootRight={false} 
            renderRightActions={RenderRight}
            onSwipeableRightOpen={() => dispatch(removePlace(data.item.id))}
        >
            <PlaceItem 
                image={data.item.image}
                address={data.item.address}
                title={data.item.title}
                id={data.item.id}
                onSelect={ () => navigation.navigate('Detalle', data.item )}
                onLongPress={handleModalOpen}
            />
        </Swipeable>
    )

    return (
        <>
            <FlatList
                data={places}
                keyExtractor={item => item.id}
                renderItem={renderItem}
            />
            <ModalDeleteItem 
                modalVisible={modalVisible} 
                closeModal={handleModalClose} 
                itemSelected={itemSelected} 
                onDelete={handleConfirmDelete} 
            />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    rowBack: {
		alignItems: 'center',
		backgroundColor: COLORS.RUFOUS,
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-end',
		paddingLeft: 15,
	},
	trash: {
		height: 30,
		width: 30,
		marginRight: 20,
	},
});

export default PlaceListScreen;
