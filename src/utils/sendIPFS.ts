

export default async function sendDataIpfsMoralis(metadata:string){

    const result=await window.fetch('https://deep-index.moralis.io/api/v2/ipfs/uploadFolder',
    {
      // learn more about this API here: https://graphql-pokemon2.vercel.app/
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'X-API-Key': 'zeoDdxJIlNsVyLqpee6vkVcB70oFbJP9fQahZ3tYwXaQxpfwJ7DNccOliNtR0osN'
      },
      body: JSON.stringify({
        path: 'moralis/test',
        content: metadata
      })
    },);
    console.log("moralis",result);
    console.log("moralis",result.body);
    return result;
  }