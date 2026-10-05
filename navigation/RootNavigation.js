import {
    CommonActions,
    createNavigationContainerRef,
    StackActions,
} from '@react-navigation/native';

export const isReadyRef = { current: false };
export const navigationRef = createNavigationContainerRef();

export const navigate = (name, params) => {
    if (isReadyRef.current && navigationRef.isReady()) {
        navigationRef.navigate(name, params);
    }
};

export const replace = (name, params) => {
    if (isReadyRef.current && navigationRef.isReady()) {
        navigationRef.dispatch(StackActions.replace(name, params));
    }
};

export const goBack = () => {
    if (isReadyRef.current && navigationRef.isReady()) {
        navigationRef.goBack();
    }
};

export const push = (...args) => {
    if (isReadyRef.current && navigationRef.isReady()) {
        navigationRef.dispatch(StackActions.push(...args));
    }
};

export const reset = (...args) => {
    if (isReadyRef.current && navigationRef.isReady()) {
        navigationRef.dispatch(CommonActions.reset(...args));
    }
};
