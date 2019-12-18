import PropTypes from 'prop-types';
import React from 'react';
import { IMessage, MessageVideoProps } from './types';
export default class MessageVideo<TMessage extends IMessage = IMessage> extends React.Component<MessageVideoProps<TMessage>> {
    static defaultProps: {
        currentMessage: {
            video: null;
        };
        containerStyle: {};
        videoStyle: {
            width: number;
            height: number;
            borderRadius: number;
            margin: number;
        };
        videoProps: {};
    };
    static propTypes: {
        currentMessage: PropTypes.Requireable<object>;
        containerStyle: PropTypes.Validator<import("react-native").StyleProp<import("react-native").ViewStyle>> | undefined;
        videoStyle: PropTypes.Validator<import("react-native").StyleProp<import("react-native").ViewStyle>> | undefined;
        videoProps: PropTypes.Requireable<object>;
    };
    player: any;
    render(): JSX.Element;
}
