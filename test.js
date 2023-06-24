const apps = [
    {id:1, name:'Jon'}, 
    {id:2, name:'Dave'},
    {id:3, name:'Joe'}
  ]
  
  //remove item with id=2
  const itemToBeRemoved = {id:1}
  
  apps.splice(apps.findIndex(a => a.id === itemToBeRemoved.id) , 1)
  
  //print result
  console.log(apps)