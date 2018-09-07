pragma solidity ^0.4.24;

contract TweetStream {

    event newTweet(bytes32 message, bytes8 mood, bytes32 name);
    event newUser(bytes32 name, address account);

    struct Tweet {
        bytes32 message;
        bytes8 mood;
        address from;
    }

    mapping(address => bytes32) users;
    Tweet[] tweets;

    function register(bytes32 name) public {
        require(users[msg.sender] == 0x0);
        users[msg.sender] = name;
        emit newUser(name,msg.sender);
    }

    function getUserName(address account) public view returns (bytes32 name){
        return users[account];
    }

    function tweet(bytes32 message,bytes8 mood) public {
        require(getUserName(msg.sender) != 0x0);
        tweets.push(Tweet(message,mood,msg.sender));
        emit newTweet(message,mood,users[msg.sender]);
    }

}
