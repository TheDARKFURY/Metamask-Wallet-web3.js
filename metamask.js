var web3 = new Web3(window.ethereum);

window.ethereum.on('accountsChanged',() => 
{
  document.getElementById("status").innerText="Disconnected";
  document.getElementById("submitbtn").value="Connect Metamask";
  document.getElementById("tranotify").innerText = "HASH";
  // document.getElementById("address_p").innerText = "Address: ...";
  // document.getElementById("balance_p").innerText = "Balance: ";
  connectMetamaskWallet();
})

// var sender = {
//   pubKey:null
// }

async function connectMetamaskWallet()
{
    if (typeof window.ethereum !== 'undefined') {
      console.log(window.ethereum.isMetaMask);
      console.log('MetaMask is installed!');
    } 
    else if (typeof window.ethereum === 'undefined')
    {
      document.getElementById("status").innerText="Install Metamask First";
      alert("You need to install the Metamask first");
      window.open("https://metamask.io/");
    }

    const address = await ethereum.request({ method: 'eth_requestAccounts' });

    console.log(address);
    
    var balance = await web3.eth.getBalance(address[0]);

    console.log("Current Connected Network Balance ---> ", balance/1000000000000000000);
    if (balance !== 'undefined')
    {
        document.getElementById("submitbtn").value = "Switch Network";
        document.getElementById("status").innerText="Connected";
    }
    
    document.getElementById("balance").innerText = (balance/1000000000000000000 + " ETH");
    document.getElementById("address_p").innerText = "Address: " + address;
    document.getElementById("details").style.visibility = "visible";
    document.getElementById("address_p").style.visibility = "visible";
    document.getElementById("balance").style.visibility = "visible";
    document.getElementById("balance_p").style.visibility = "visible";
    document.getElementById("tranotify").style.visibility = "visible";
    document.getElementById("tranotify_p").style.visibility = "visible";
    document.getElementById("sendEther").style.visibility = "visible";
    document.getElementById("recaddress").style.visibility = "visible";
    document.getElementById("ethvalue").style.visibility = "visible";
    document.getElementById("network").style.visibility = "visible";
    document.getElementById("buffer").style.visibility = "hidden";
    document.getElementById("enter").style.visibility = "visible";    


    const networkId = await web3.eth.net.getId();

    console.log("Current Network ---> ", networkId);
    
      if(networkId == 1)
      {
        document.getElementById("currnet").innerText = ("You are on Mainnet");
      }
      else if(networkId == 3)
      {
        document.getElementById("currnet").innerText = ("You are on Ropsten");
      }
      else if(networkId == 4)
      {
        document.getElementById("currnet").innerText = ("You are on Rinkeby");
      }
      else if(networkId == 42)
      {
        document.getElementById("currnet").innerText = ("You are on Kovan");
      }
      else if(networkId == 56)
      {
        document.getElementById("currnet").innerText = ("You are on BSC Smart Chain");
      }
      else if(networkId == 137)
      {
        document.getElementById("currnet").innerText = ("You are on Polygon");
      }
      else
      {
        document.getElementById("currnet").innerText = ("New Network Added!");
      }
    
    const chainId = document.getElementById("network");

    console.log(web3.utils.toHex(chainId.value));
    console.log("New Connected Network is --->", chainId.value);

    try {
            console.log("Network after change ---> ",chainId.value);
            await window.ethereum.request({

            method: 'wallet_switchEthereumChain',

            params: [{chainId: web3.utils.toHex(chainId.value)}]

            })
            balance = await web3.eth.getBalance(address[0]);  
            console.log("New Connected Network Balance ---> ", balance/1000000000000000000);
            document.getElementById("balance").innerText = (balance/1000000000000000000 + " ETH");
            document.getElementById("address").innerText = address;

        } catch(e) {
                console.log(e);
            }
}

async function sendether()
{   
    var ethereum = window.ethereum;
    await ethereum.enable();
    const address = await ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.providers.Web3Provider(ethereum);
    try {
        const sender = address[0];
        const receiver = document.getElementById("recaddress");
        const ethvalue = document.getElementById("ethvalue");
        const finalReceiver = receiver.value;     
        try {
          receiver.value;
        } catch (er) {
        }
        var eth = ethvalue.value;
       if(ethvalue.value < 0)
       {
        alert("Enter ETH value greater than 0")
       }
       if(receiver.value.toString() === address[0].toString())
       {
        alert("Sending ETH to same account is not permitted");
        return;
       }
        console.log("Receiver's Address ---> "+ receiver.value);
        console.log("ETH value to be sent ---> ",ethvalue.value);

        console.log("Address of Sender --->  ",address[0]);
        web3.eth.sendTransaction({
        to:finalReceiver,
        from:address[0], 
        value: web3.utils.toWei(eth, "ether")}
        ,function (err, res){
            console.log('err', err);
            console.log('res', res);
            if (res)
            {
              document.getElementById("tranotify").innerText = ("HASH " + res);
              alert("Transaction Successful");
            }
            else
            {
              document.getElementById("tranotify").innerText = ("Error" + err.message);
              alert("Transaction was cancelled");
            }
        });
          } catch(e) {
        console.log('Error --->> ', e);
        alert(e.message);
        }
}

