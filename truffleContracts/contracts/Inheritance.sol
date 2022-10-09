pragma solidity 0.8.17;

//import "@openzeppelin/contracts/access/AccessControl.sol";
// PUSH Comm Contract Interface
interface IPUSHCommInterface {
    function sendNotification(
        address _channel,
        address _recipient,
        bytes calldata _identity
    ) external;
}

contract Inheritance {
    //state variables
    uint256 constant THREEDAYS = 259200;

    struct BriefOwner {
        string Name;
        address OwnerAddress;
        address[] Heirs;
        uint256 pingPeriod;
        uint256 LastPing;
        string BriefIPFSHash;
    }

    mapping(address => bool) public isOwner;
    mapping(address => BriefOwner) public Owners;
    address[] private ownersList;
    /*struct Heir{
        address HierAddress;
    }*/

    string public MSGFirstHalf =
        "Sorry for your loss, the owner of a brief included you as one of their Heirs. The Brief is Encrypted with your public key so that you can decrypt it. it is on IPFS, and you can access it with the following hash";
    string public HeirMessage;
    // events

    //modifiers
    modifier onlyBriefOwners() {
        require(isOwner[msg.sender], "Only a Brief Owner can do this!");
        _;
    }

    //functions

    // adds a new BriefOwner
    function addBriefOwner(
        string memory _Name,
        address[] memory _Heirs,
        uint256 _pingPeriod,
        string memory _BriefIPFSHash
    ) public {
        Owners[msg.sender] = BriefOwner(
            _Name,
            msg.sender,
            _Heirs,
            _pingPeriod,
            block.timestamp,
            _BriefIPFSHash
        );
        ownersList.push(msg.sender);
        isOwner[msg.sender] = true;
    }

    // gets the Heirs list for a BriefOwner
    function getHiers(address owner) public view returns (address[] memory) {
        return Owners[owner].Heirs;
    }

    function getHash(address owner) public view returns (string memory hash) {
        return Owners[owner].BriefIPFSHash;
    }

    function getName(address owner) public view returns (string memory name) {
        return Owners[owner].Name;
    }

    function getDiff() public view returns (uint256 timeDiff) {
        return block.timestamp - Owners[msg.sender].LastPing;
    }

    // function only called by owners to update their last ping to signal that they are alive
    function IamAlive() public onlyBriefOwners {
        Owners[msg.sender].LastPing = block.timestamp;
    }

    function checkOwnersStatus() external {
        for (uint256 i = 0; i < ownersList.length; i++) {
            // if difference is less than three days notify
            if (
                (block.timestamp - Owners[ownersList[i]].LastPing) >=
                (Owners[ownersList[i]].pingPeriod - THREEDAYS)
            ) {
                // send "YOU ONLY HAVE THREE DAYS TO PING NOTIFICATION"
                IPUSHCommInterface(0xb3971BCef2D791bc4027BbfedFb47319A4AAaaAa)
                    .sendNotification(
                        0x8447FBb8a19625Ed3dD4F3F90c9D00C879b95D9c, // from channel - recommended to set channel via dApp and put it's value -> then once contract is deployed, go back and add the contract address as delegate for your channel
                        ownersList[i], // to recipient, put address(this) in case you want Broadcast or Subset. For Targetted put the address to which you want to send
                        bytes(
                            string(
                                // We are passing identity here: https://docs.epns.io/developers/developer-guides/sending-notifications/advanced/notification-payload-types/identity/payload-identity-implementations
                                abi.encodePacked(
                                    "0", // this is notification identity: https://docs.epns.io/developers/developer-guides/sending-notifications/advanced/notification-payload-types/identity/payload-identity-implementations
                                    "+", // segregator
                                    "3", // this is payload type: https://docs.epns.io/developers/developer-guides/sending-notifications/advanced/notification-payload-types/payload (1, 3 or 4) = (Broadcast, targetted or subset)
                                    "+", // segregator
                                    "ONLY 3 DAYS LEFT WE HOPE YOU'RE OK", // this is notificaiton title
                                    "+", // segregator
                                    "You have 3 days to ping you're alive before we share your brief with your Heirs" // notification body
                                )
                            )
                        )
                    );
            }

            // if period passed consider dead
            if (
                (block.timestamp - Owners[ownersList[i]].LastPing) >=
                Owners[ownersList[i]].pingPeriod
            ) {
                removeOwner(i);
                OwnerIsDeceased(ownersList[i]);
            }
        }
    }

    function OwnerIsDeceased(address deceasedOwner) private {
        require(
            (block.timestamp - Owners[deceasedOwner].LastPing) >=
                Owners[deceasedOwner].pingPeriod
        );

        HeirMessage = string.concat(
            MSGFirstHalf,
            Owners[deceasedOwner].BriefIPFSHash
        );
        // send notification to Heirs
        //send the Owners[deceasedOwner].BriefIPFSHash to Owners[deceasedOwner].Heirs[]

        for (uint256 j = 0; j < Owners[deceasedOwner].Heirs.length; j++) {
            IPUSHCommInterface(0xb3971BCef2D791bc4027BbfedFb47319A4AAaaAa)
                .sendNotification(
                    0x8447FBb8a19625Ed3dD4F3F90c9D00C879b95D9c, // from channel - recommended to set channel via dApp and put it's value -> then once contract is deployed, go back and add the contract address as delegate for your channel
                    Owners[deceasedOwner].Heirs[j], // to recipient, put address(this) in case you want Broadcast or Subset. For Targetted put the address to which you want to send
                    bytes(
                        string(
                            // We are passing identity here: https://docs.epns.io/developers/developer-guides/sending-notifications/advanced/notification-payload-types/identity/payload-identity-implementations
                            abi.encodePacked(
                                "0", // this is notification identity: https://docs.epns.io/developers/developer-guides/sending-notifications/advanced/notification-payload-types/identity/payload-identity-implementations
                                "+", // segregator
                                "3", // this is payload type: https://docs.epns.io/developers/developer-guides/sending-notifications/advanced/notification-payload-types/payload (1, 3 or 4) = (Broadcast, targetted or subset)
                                "+", // segregator
                                "SORRY FOR LOSS, SOMETHING FOR YOU", // this is notificaiton title
                                "+", // segregator
                                HeirMessage // notification body
                            )
                        )
                    )
                );
        }
    }

    function removeOwner(uint256 index) internal {
        if (index >= ownersList.length) return;

        ownersList[index] = ownersList[ownersList.length - 1];
        ownersList.pop();
    }
}
