import React, {Component} from 'react';
import { GiftedChat } from 'react-native-gifted-chat'
import PubNubReact from 'pubnub-react';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.pubnub = new PubNubReact({ publishKey: 'pub-c-9f2da332-6668-491d-8a96-cc3318eed30d', subscribeKey: 'sub-c-ae2e29b2-0114-11ea-9c11-e6f6b1b67c9f' });
        this.pubnub.init(this);
      }
    
    state = {
      messages: [],
    };
    componentWillMount() {
      this.setState({
        messages: [
          {
            _id: 1,
            text: "Hello developer",
            createdAt: new Date(),
            user: {
              _id: 2,
              name: "React Native",
              avatar: "https://placeimg.com/140/140/any",
            },
          },
        ],
      });
      this.pubnub.subscribe({
        channels: ['channel1']
      });
       
      this.pubnub.getMessage('channel1', (msg) => {
        console.warn(msg);
      });
    
    }
    onSend(messages = []) {
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }));
    }
    render() {
      return (
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 1,
          }}
        />
      );
    }
  }