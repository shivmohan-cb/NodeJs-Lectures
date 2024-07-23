//moudle caching means keeping backup of module state
class Student {
  name;
  constructor(name){
   this.name = name;
  }
  getName(){
    return this.name;
  }
  setName(name){
    this.name =name;
  }
}
export default Student;