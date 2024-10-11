function Validation(){

    // kiểm tra rỗng
    this.KiemTraRong=function(value){
        if(value.trim()===''){
            return true;
        }
        return false;
    }
    // kiểm tra email 
     this. validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      };
// kiểm tra số điện thoại 
      this.phonenumber=function (sdt) {
        var phoneRegex = /^\d{10}$/;
        return phoneRegex.test(sdt);
      }
}
