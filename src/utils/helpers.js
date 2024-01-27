export const formattedTime=(timestamp)=>{
    let date = new Date(timestamp * 1000); 
    let time = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    return time
}