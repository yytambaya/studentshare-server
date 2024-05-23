const validateDescription = (desc) => {
    var res = {error:"error", result:"Unknown"};
    if(desc != "" && desc != undefined){
        if(reg_desc.test(desc)){
            res = {error:"", result:"description is valid"};
        }else{
            res = {error: "error", result: "invalid description"}    
        }
    }else{
        res = {error: "error", result: "description is empty"}
    }
    return res;
  }