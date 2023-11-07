const handleError = (err) =>{
    let errors ={
        email: "",
        username: "",
        password: ""
    }
    
    if(err.code === 11000 && err.keyValue.email){
        errors.email= "Email already exists"
        return errors
    }
    if(err.code === 11000 && err.keyValue.username){
        errors.username= "username already exists"
        return errors
    }
    if (err.message === "no user"){
        errors.email = "this email is not registered"
        return errors;
    }
    if (err.message === "invalid") {
        errors.email = "this email or password is not correct"
        errors.password= "this email or password is not correct"
        return errors;
    }
    if(err.message.includes('User validation failed')){
        Object.values(err.errors).forEach(({properties})=>{
            errors[properties.path] = properties.message
            
        })
    }
    return errors
}

module.exports = handleError