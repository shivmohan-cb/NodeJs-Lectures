//Module is a resuable chunk of code which we can acess in another file
export function add(a,b){
 return a+b;
}

export function sub(a,b){
  return a-b;
}

// module.exports = {
//     Add:add,
//     Sub:sub
// }

export default add;