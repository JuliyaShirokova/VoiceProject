import React, {
    useState,
    useEffect,
} from 'react';
import {
    Animated,
    Text,
    View,
    Easing,
} from 'react-native';

const TransformationBlock = (props) => {
    const [scaling] = useState(new Animated.Value(0));
    const [_opacity] = useState(new Animated.Value(0));

    useEffect(() => {
        Animated.parallel(
            [
                Animated.timing(
                    scaling, {
                        toValue: 1,
                        duration: 3000,
                        delay: props.delay,
                        easing: Easing.linear,
                        useNativeDriver: true
                    }
                ).start(),
                Animated.timing(
                    _opacity, {
                        toValue: 1,
                        duration: 3000,
                        delay: props.delay,
                        easing: Easing.linear,
                        useNativeDriver: true
                    }
                ).start(),
            ]
        );
    }, []);

    const _transformation = scaling.interpolate({
        inputRange: [0, 1],
        outputRange: [0.01, 1]
    });

    const _changeOpasity = _opacity.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0]
    });

    return (<Animated.View 
            style = {{
                ...props.style,
                transform: [{
                    scaleX: _transformation,
                }, {
                    scaleY: _transformation,
                }],
                opacity: _changeOpasity,
            }}> 
            {
                props.children
            } 
        </Animated.View>
    );
};

getTransformedBlocks = (num) => {

    const arr = Array.from({
            length: num,
        },
        function (v, k) {
            return k;
        });

    return arr.map((el, ind, arr) => {
        const _size = Math.min(120, ind * 10);
        return ( <TransformationBlock style = {
                {
                    position: 'absolute',
                    width: _size,
                    height: _size,
                    borderRadius: _size / 2,
                    backgroundColor: 'transparent',
                    borderWidth: 4,
                    borderColor: 'white',
                }
            }
            key = {
                ind
            }
            delay = {
                ind * 500
            }
            />
        );
    });
};

export default () => {
    return ( <View style = {{width: 100, height: 100,alignItems: 'center', justifyContent: 'center'}}>
        {
            getTransformedBlocks(30)
        } 
        </View>);
};