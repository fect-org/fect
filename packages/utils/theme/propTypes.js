const tuple = (...args)=>{
  const temp = []
  for (const key of args){
    temp.push(key)
  }
  return temp
}


const buttonTypes = tuple('default','success','warning','error')

const normalSizes = tuple('mini','small','medium', 'large')

const normalTypes = tuple('default','success','warning','error')

const themeTypes = tuple('dark','light')


export { buttonTypes,normalSizes , normalTypes,themeTypes }
