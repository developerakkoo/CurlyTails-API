// const apps = [
//     {id:1, name:'Jon'}, 
//     {id:2, name:'Dave'},
//     {id:3, name:'Joe'}
//   ]
  
//   //remove item with id=2
//   const itemToBeRemoved = {id:1}
  
//   apps.splice(apps.findIndex(a => a.id === itemToBeRemoved.id) , 1)
  
//   //print result
//   console.log(apps)


// const { generateCustomUuid, generateShortUuid, generateStrongCompactUuid } = require('custom-uuid');
// console.log(generateCustomUuid("012345678911223344ABCDEFGHIJKLMNOPQRSTUVWXYZ", 20));; // ⇨ 'B5B6699247862A569998'
// generateShortUuid() // ⇨ 'DMDvkPec8QUyV9O1'
// generateStrongCompactUuid(); // ⇨ 'xRC4JggRQQFdPwn6MhZs'


// let text ="http://localhost/public/1696491056026.jpeg";
// // const myArray = 
// console.log(text.split("http://localhost/"));

const io = require('socket.io-client');
console.log('here')
const socket = io('http://192.168.0.113:8000'); // Replace with the actual IP address of your laptop



socket.on('connect', () => {
  console.log('Mobile connected to Socket.io');
  socket.on('get:Nifty50', (text) => {
    console.log('Received data:', text);
    console.log('done');
  });
});

socket.on('disconnect', () => {
  console.log('Mobile disconnected from Socket.io');
});
